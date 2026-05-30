import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

import { CommentNode } from "@/components/comment-node";
import type { Comment } from "@/data/startups";
import {
  addComment,
  listComments,
  toggleCommentVote,
  type CommentDTO,
} from "@/lib/comments.server";

// Track B — Comments. Server-backed (comments.server.ts) via react-query.
// initialData maps the seed comments so SSR shows content immediately, then the
// client refetches the real tree (live upvote counts + votedByMe).

const qk = (startupId: number) => ["comments", startupId] as const;

function mapStatic(c: Comment): CommentDTO {
  return {
    id: c.id,
    author: c.author,
    username: c.username,
    role: c.role ?? null,
    company: c.company ?? null,
    initials: c.initials,
    avatarGradient: c.avatarGradient,
    verified: !!c.verified,
    maker: !!c.maker,
    time: c.time,
    body: c.body,
    upvotes: c.upvotes,
    votedByMe: false,
    replies: (c.replies ?? []).map(mapStatic),
  };
}

function updateInTree(
  list: CommentDTO[],
  id: string,
  fn: (c: CommentDTO) => CommentDTO,
): CommentDTO[] {
  return list.map((c) =>
    c.id === id ? fn(c) : c.replies.length ? { ...c, replies: updateInTree(c.replies, id, fn) } : c,
  );
}

function insertNode(list: CommentDTO[], parentId: string | null, node: CommentDTO): CommentDTO[] {
  if (!parentId) return [node, ...list];
  return list.map((c) =>
    c.id === parentId
      ? { ...c, replies: [...c.replies, node] }
      : c.replies.length
        ? { ...c, replies: insertNode(c.replies, parentId, node) }
        : c,
  );
}

function countTree(list: CommentDTO[]): number {
  return list.reduce((sum, c) => sum + 1 + countTree(c.replies), 0);
}

export function DiscussionSection({
  startupId,
  initialComments,
}: {
  startupId: number;
  initialComments: Comment[];
}) {
  const qc = useQueryClient();
  const { data: comments = [] } = useQuery({
    queryKey: qk(startupId),
    queryFn: () => listComments({ data: { startupId } }),
    initialData: () => initialComments.map(mapStatic),
  });

  const [draft, setDraft] = useState("");
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});

  const addMut = useMutation({
    mutationFn: (vars: { parentId: string | null; body: string }) =>
      addComment({ data: { startupId, parentId: vars.parentId ?? undefined, body: vars.body } }),
    onSuccess: (created, vars) => {
      qc.setQueryData<CommentDTO[]>(qk(startupId), (prev = []) =>
        insertNode(prev, vars.parentId, created),
      );
    },
  });

  const voteMut = useMutation({
    mutationFn: (commentId: string) => toggleCommentVote({ data: { commentId } }),
    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: qk(startupId) });
      const prev = qc.getQueryData<CommentDTO[]>(qk(startupId)) ?? [];
      qc.setQueryData<CommentDTO[]>(
        qk(startupId),
        updateInTree(prev, commentId, (c) => ({
          ...c,
          votedByMe: !c.votedByMe,
          upvotes: c.upvotes + (c.votedByMe ? -1 : 1),
        })),
      );
      return { prev };
    },
    onError: (_err, _commentId, ctx) => {
      if (ctx?.prev) qc.setQueryData(qk(startupId), ctx.prev);
    },
    onSuccess: (res, commentId) => {
      qc.setQueryData<CommentDTO[]>(qk(startupId), (prev = []) =>
        updateInTree(prev, commentId, (c) => ({
          ...c,
          votedByMe: res.voted,
          upvotes: res.displayUpvotes,
        })),
      );
    },
  });

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    addMut.mutate({ parentId: null, body });
    setDraft("");
  };

  const submitReply = (parentId: string) => {
    const body = (replyDraft[parentId] ?? "").trim();
    if (!body) return;
    addMut.mutate({ parentId, body });
    setReplyDraft((prev) => ({ ...prev, [parentId]: "" }));
    setReplyOpen((prev) => ({ ...prev, [parentId]: false }));
  };

  return (
    <motion.section
      data-startup-id={startupId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="mt-10"
    >
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Discussion ({countTree(comments)})
        </h2>
      </div>

      <form
        onSubmit={submitComment}
        className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-card p-3"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-rose-600 text-xs font-semibold text-primary-foreground">
          YO
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share your thoughts on this startup…"
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
          Post
        </button>
      </form>

      <ul className="mt-6 space-y-6">
        {comments.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No comments yet — be the first to start the discussion.
          </li>
        )}
        {comments.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
          >
            <CommentNode
              comment={c}
              depth={0}
              onVote={(id) => voteMut.mutate(id)}
              replyOpen={replyOpen}
              setReplyOpen={setReplyOpen}
              replyDraft={replyDraft}
              setReplyDraft={setReplyDraft}
              onSubmitReply={submitReply}
            />
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
