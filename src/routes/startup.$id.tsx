import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronUp,
  ExternalLink,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { getDetail, startups, type Comment, type StartupDetail } from "@/data/startups";
import { StartupLogo } from "@/components/startup-logo";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/startup/$id")({
  loader: ({ params }): { detail: StartupDetail } => {
    const id = Number(params.id);
    if (!startups.find((s) => s.id === id)) throw notFound();
    return { detail: getDetail(id) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.detail.name} — Berlin50` },
          { name: "description", content: loaderData.detail.tagline },
        ]
      : [],
  }),
  component: StartupPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Startup not found.</p>
    </div>
  ),
});

function StartupPage() {
  const { detail } = Route.useLoaderData();
  const app = useApp();
  const voted = app.hasVoted(detail.id);
  const voteCount = detail.votes + (voted ? 1 : 0);
  const initialComments: Comment[] = detail.comments ?? [];
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all startups
          </Link>
          <span className="text-sm text-muted-foreground">{detail.category}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-5"
        >
          <StartupLogo
            domain={detail.domain}
            name={detail.name}
            emoji={detail.emoji}
            size={80}
            rounded="rounded-2xl"
            className="border border-border shadow-sm"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {detail.name}
                </h1>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {detail.category}
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => app.toggleVote(detail.id)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  voted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                <ChevronUp className="h-4 w-4" strokeWidth={2.5} />
                <span className="tabular-nums">{voteCount.toLocaleString()}</span>
                <span className="hidden sm:inline">{voted ? "Voted" : "Upvote"}</span>
              </motion.button>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">{detail.tagline}</p>
            <a
              href={`https://${detail.website}`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {detail.website}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10"
        >
          {detail.heroImage ? (
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <img
                src={detail.heroImage}
                alt={`${detail.name} hero`}
                className="aspect-[21/6] w-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {detail.images.map((img: { color: string; label: string }, i: number) => (
                <div
                  key={i}
                  className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${img.color} flex items-end p-3 text-xs font-medium text-white/90 shadow-sm`}
                >
                  {img.label}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {detail.chart && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6"
          >
            <BarChart chart={detail.chart} />
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-foreground">
            {detail.description.split("\n\n").map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            By the numbers
          </h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {detail.metrics.map((m: { label: string; value: string }) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.section>

        <motion.section
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
      </main>
    </div>
  );
}

function renderBody(body: string) {
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

function BarChart({
  chart,
}: {
  chart: { title: string; unit?: string; points: { label: string; value: number }[] };
}) {
  const max = Math.max(...chart.points.map((p) => p.value));
  const latest = chart.points[chart.points.length - 1];
  const first = chart.points[0];
  const growth = first.value > 0 ? Math.round(((latest.value - first.value) / first.value) * 100) : 0;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {chart.title}
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {latest.value}
            {chart.unit ? <span className="ml-1 text-sm font-medium text-muted-foreground">{chart.unit}</span> : null}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          ↑ {growth.toLocaleString()}%
        </span>
      </div>
      <div className="mt-5 flex h-40 items-stretch gap-2">
        {chart.points.map((p, i) => {
          const h = Math.max(4, (p.value / max) * 100);
          const isLast = i === chart.points.length - 1;
          return (
            <div key={p.label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full flex-1 items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
                  className={`relative w-full rounded-t-md ${
                    isLast
                      ? "bg-gradient-to-t from-primary to-rose-500"
                      : "bg-gradient-to-t from-primary/50 to-primary/25"
                  }`}
                >
                  {isLast && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold tabular-nums text-primary">
                      {p.value}
                    </span>
                  )}
                </motion.div>
              </div>
              <span className="mt-1.5 text-[10px] font-medium text-muted-foreground">{p.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CommentNodeProps {
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

function CommentNode({
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
        {(comment.replies?.length || open) && (
          <div className="mt-2 w-px flex-1 bg-border" />
        )}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1 pb-1">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-sm font-semibold text-foreground">{comment.author}</span>
          {comment.verified && (
            <BadgeCheck className="h-4 w-4 fill-primary text-primary-foreground" strokeWidth={2.5} />
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
        {comment.role && (
          <div className="text-xs text-muted-foreground">{comment.role}</div>
        )}

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
            onClick={() =>
              setReplyOpen((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))
            }
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
              onChange={(e) =>
                setReplyDraft((prev) => ({ ...prev, [comment.id]: e.target.value }))
              }
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