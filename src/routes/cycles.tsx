import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Vote } from "lucide-react";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/cycles")({
  head: () => ({
    meta: [
      { title: "Cycle overview — Hauptstadt50" },
      { name: "description", content: "Overview of past and current Hauptstadt50 funding cycles." },
    ],
  }),
  component: Cycles,
});

function Cycles() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <BerlinHuntLogo size={36} className="drop-shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">Hauptstadt50</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Funding cycle 2026
              </span>
            </div>
          </Link>
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cycle overview</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Every year, Berliners decide which local startups receive a share of the public funding pool.
          Browse past results or jump into the active vote.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <CycleCard
            to="/cycles/2025"
            year="2025"
            status="Completed"
            statusTone="muted"
            icon={<CheckCircle2 className="h-4 w-4" />}
            blurb="190 M € distributed across 25 winning startups."
          />
          <CycleCard
            to="/"
            year="2026"
            status="Voting phase"
            statusTone="live"
            icon={<Vote className="h-4 w-4" />}
            blurb="200 M € on the line. Vote now for the top 50."
          />
        </div>
      </main>
    </div>
  );
}

function CycleCard({
  to,
  year,
  status,
  statusTone,
  icon,
  blurb,
}: {
  to: string;
  year: string;
  status: string;
  statusTone: "muted" | "live";
  icon: React.ReactNode;
  blurb: string;
}) {
  const tone =
    statusTone === "live"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      : "border-border bg-muted text-muted-foreground";
  return (
    <Link
      to={to}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg"
    >
      <div className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${tone}`}>
        {statusTone === "live" && (
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        )}
        {icon}
        {status}
      </div>
      <div className="mt-6 text-5xl font-semibold tracking-tight">{year}</div>
      <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
        View
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}