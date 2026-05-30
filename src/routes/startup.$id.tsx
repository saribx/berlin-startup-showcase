import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { CountdownBadge } from "@/components/countdown-badge";
import { DiscussionSection } from "@/components/discussion-section";
import { NewsSection, startupNews } from "@/components/news-section";
import { StartupLogo } from "@/components/startup-logo";
import { VoteButton } from "@/components/vote-button";
import { getDetail, startups, type StartupDetail } from "@/data/startups";
import { useVotes } from "@/lib/vote-context";

export const Route = createFileRoute("/startup/$id")({
  loader: ({ params }): { detail: StartupDetail } => {
    const id = Number(params.id);
    if (!startups.find((s) => s.id === id)) throw notFound();
    return { detail: getDetail(id) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.detail.name} — Berlin Venture 50` },
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
  const { hasVoted, toggleVote, voteCount, budgetRemaining } = useVotes();
  const voted = hasVoted(detail.id);
  const count = voteCount(detail.id, detail.votes);

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
          <CountdownBadge />
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
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{detail.name}</h1>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {detail.category}
                </span>
              </div>
              <VoteButton
                variant="hero"
                count={count}
                voted={voted}
                onToggle={() => toggleVote(detail.id)}
                disabled={budgetRemaining === 0}
              />
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

        {startupNews[detail.id] && <NewsSection items={startupNews[detail.id]} />}

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
              <div key={m.label} className="rounded-xl border border-border bg-card p-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.section>

        <DiscussionSection startupId={detail.id} initialComments={detail.comments ?? []} />
      </main>
    </div>
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
  const growth =
    first.value > 0 ? Math.round(((latest.value - first.value) / first.value) * 100) : 0;
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {chart.title}
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {latest.value}
            {chart.unit ? (
              <span className="ml-1 text-sm font-medium text-muted-foreground">{chart.unit}</span>
            ) : null}
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
              <span className="mt-1.5 text-[10px] font-medium text-muted-foreground">
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
