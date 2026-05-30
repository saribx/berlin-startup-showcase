import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronUp, ExternalLink } from "lucide-react";
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
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
            <ChevronUp className="h-4 w-4 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-semibold tabular-nums">
              {detail.votes.toLocaleString()}
            </span>
          </div>
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
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {detail.name}
              </h1>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {detail.category}
              </span>
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
      </main>
    </div>
  );
}