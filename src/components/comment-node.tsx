import { motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronUp,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
} from "lucide-react";

import type { Comment } from "@/data/startups";

// Extracted verbatim from startup.$id.tsx so Track B owns the comment tree.
// SPINE STUB: same local-state behavior. Track B feeds it server data
// (displayUpvotes / votedByMe) and wires votes/replies to comments.server.ts.

export function renderBody(body: string) {
  // highlight @mentions in primary color
  const parts = body.split(/(@[a-zA-Z0-9_]+)/g);
  return parts.map((p, i) =>
    p.startsWith("@") ? (
      <span key={i} className="font-medium text-primary">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export interface CommentNodeProps {
  comment: Comment;
  depth: number;
  voted: Record<string, boolean>;
  onVote: (id: string) => void;
  replyOpen: Record<string, boolean>;
  setReplyOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  replyDraft: Record<string, string>;
  setReplyDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSubmitReply: (parentId: string) => void;
}

export function CommentNode({
  comment,
  depth,
  voted,
  onVote,
  replyOpen,
  setReplyOpen,
  replyDraft,
  setReplyDraft,
  onSubmitReply,
}: CommentNodeProps) {
  const isVoted = !!voted[comment.id];
  const displayUpvotes = comment.upvotes + (isVoted ? 1 : 0);
  const open = !!replyOpen[comment.id];

  return (
    <div className="flex gap-3">
      {/* Avatar + thread line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${comment.avatarGradient} text-xs font-semibold text-white shadow-sm`}
        >
          {comment.initials}
        </div>
        {(comment.replies?.length || open) && <div className="mt-2 w-px flex-1 bg-border" />}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1 pb-1">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-sm font-semibold text-foreground">{comment.author}</span>
          {comment.verified && (
            <BadgeCheck
              className="h-4 w-4 fill-primary text-primary-foreground"
              strokeWidth={2.5}
            />
          )}
          {comment.company && (
            <span className="text-sm text-muted-foreground">· {comment.company}</span>
          )}
          {comment.maker && (
            <span className="ml-1 inline-flex items-center rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Maker
            </span>
          )}
        </div>
        {comment.role && <div className="text-xs text-muted-foreground">{comment.role}</div>}

        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          {renderBody(comment.body)}
        </p>

        {/* Actions row */}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <button
            onClick={() => onVote(comment.id)}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted ${
              isVoted ? "text-primary" : ""
            }`}
          >
            <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="font-medium">Upvote ({displayUpvotes})</span>
          </button>
          <button
            onClick={() => setReplyOpen((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="font-medium">Reply</span>
          </button>
          <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted">
            <Flag className="h-3.5 w-3.5" />
            <span className="font-medium">Report</span>
          </button>
          <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted">
            <Share2 className="h-3.5 w-3.5" />
            <span className="font-medium">Share</span>
          </button>
          <span className="ml-1 text-muted-foreground/80">· {comment.time}</span>
          <button className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-muted">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Reply composer */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-3 flex items-start gap-2 rounded-xl border border-border bg-card p-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-rose-600 text-[10px] font-semibold text-primary-foreground">
              YO
            </div>
            <input
              autoFocus
              value={replyDraft[comment.id] ?? ""}
              onChange={(e) => setReplyDraft((prev) => ({ ...prev, [comment.id]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmitReply(comment.id);
                }
              }}
              placeholder={`Reply to @${comment.username}…`}
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={() => onSubmitReply(comment.id)}
              disabled={!(replyDraft[comment.id] ?? "").trim()}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <Send className="h-3 w-3" />
              Reply
            </button>
          </motion.div>
        )}

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <ul className="mt-4 space-y-5">
            {comment.replies.map((r) => (
              <li key={r.id}>
                <CommentNode
                  comment={r}
                  depth={depth + 1}
                  voted={voted}
                  onVote={onVote}
                  replyOpen={replyOpen}
                  setReplyOpen={setReplyOpen}
                  replyDraft={replyDraft}
                  setReplyDraft={setReplyDraft}
                  onSubmitReply={onSubmitReply}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
