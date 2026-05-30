import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronUp, ExternalLink, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { getDetail, startups, type StartupDetail } from "@/data/startups";

export const Route = createFileRoute("/startup/$id")({
  loader: ({ params }): { detail: StartupDetail } => {
    const id = Number(params.id);
    if (!startups.find((s) => s.id === id)) throw notFound();
    return { detail: getDetail(id) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.detail.name} — Berlin Hunt` },
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
  const [voted, setVoted] = useState(false);
  const voteCount = detail.votes + (voted ? 1 : 0);
  type Comment = NonNullable<StartupDetail["comments"]>[number];
  const initialComments: Comment[] = detail.comments ?? [];
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setComments([
      { author: "You", role: "Guest", initials: "YO", time: "just now", body },
      ...comments,
    ]);
    setDraft("");
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
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-muted text-4xl">
            {detail.emoji}
          </div>
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
                onClick={() => setVoted((v) => !v)}
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
          className="mt-10 grid grid-cols-3 gap-3"
        >
          {detail.images.map((img: { color: string; label: string }, i: number) => (
            <div
              key={i}
              className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${img.color} flex items-end p-3 text-xs font-medium text-white/90 shadow-sm`}
            >
              {img.label}
            </div>
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground">
            {detail.description}
          </p>
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
              Discussion ({comments.length})
            </h2>
          </div>

          <form
            onSubmit={submitComment}
            className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-card p-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
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

          <ul className="mt-4 space-y-3">
            {comments.length === 0 && (
              <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No comments yet — be the first to start the discussion.
              </li>
            )}
            {comments.map((c, i) => (
              <motion.li
                key={`${c.author}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-semibold text-foreground">{c.author}</span>
                    <span className="text-xs text-muted-foreground">{c.role}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">{c.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </main>
    </div>
  );
}