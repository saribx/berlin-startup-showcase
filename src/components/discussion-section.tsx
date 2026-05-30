import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

import { CommentNode } from "@/components/comment-node";
import type { Comment } from "@/data/startups";

// Extracted from startup.$id.tsx so Track B owns the discussion. SPINE STUB:
// keeps the current local-state behavior (new comments live only in React
// state). Track B replaces the state with useQuery(listComments) +
// useMutation(addComment / toggleCommentVote) so it persists.

export function DiscussionSection({
  startupId,
  initialComments,
}: {
  startupId: number;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");
  const [votedComments, setVotedComments] = useState<Record<string, boolean>>({});
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setComments([
      {
        id: `you-${Date.now()}`,
        author: "You",
        username: "you",
        role: "Guest",
        initials: "YO",
        avatarGradient: "from-primary to-rose-600",
        time: "just now",
        upvotes: 0,
        body,
      },
      ...comments,
    ]);
    setDraft("");
  };

  const totalCount = (list: Comment[]): number =>
    list.reduce((sum, c) => sum + 1 + (c.replies ? totalCount(c.replies) : 0), 0);

  const toggleCommentVote = (id: string) => {
    setVotedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const submitReply = (parentId: string) => {
    const body = (replyDraft[parentId] ?? "").trim();
    if (!body) return;
    const reply: Comment = {
      id: `you-${parentId}-${Date.now()}`,
      author: "You",
      username: "you",
      role: "Guest",
      initials: "YO",
      avatarGradient: "from-primary to-rose-600",
      time: "just now",
      upvotes: 0,
      body,
    };
    const addReply = (list: Comment[]): Comment[] =>
      list.map((c) =>
        c.id === parentId
          ? { ...c, replies: [...(c.replies ?? []), reply] }
          : { ...c, replies: c.replies ? addReply(c.replies) : c.replies },
      );
    setComments(addReply(comments));
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
          Discussion ({totalCount(comments)})
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
              voted={votedComments}
              onVote={toggleCommentVote}
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
