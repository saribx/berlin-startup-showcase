import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Vote } from "lucide-react";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";
import { StartupLogo } from "@/components/startup-logo";
import { startups } from "@/data/startups";
import { CYCLE_2025 } from "@/data/cycle-2025";

export const Route = createFileRoute("/cycles")({
  head: () => ({
    meta: [
      { title: "Cycle overview — Berlin Venture 50" },
      { name: "description", content: "Overview of past and current Berlin Venture 50 funding cycles." },
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
              <span className="text-[15px] font-semibold tracking-tight">Berlin Venture 50</span>
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
            year="2026"
            status="Voting phase"
            statusTone="live"
            icon={<Vote className="h-4 w-4" />}
            amount="200 Mio. €"
            amountLabel="Funding pool"
            blurb="Berliners are choosing which 50 startups receive capital in this cycle. Cast your vote before the voting phase ends."
            logos={startups.slice(0, 3).map((s) => ({
              name: s.name,
              domain: s.domain,
              emoji: s.emoji,
            }))}
            link={
              <Link to="/" className="absolute inset-0" aria-label="Open cycle 2026" />
            }
          />
          <CycleCard
            year="2025"
            status="Completed"
            statusTone="muted"
            icon={<CheckCircle2 className="h-4 w-4" />}
            amount="190 Mio. €"
            amountLabel="Distributed"
            blurb="See which 25 Berlin startups were funded — including investment amounts, ROI, growth and new jobs created."
            logos={CYCLE_2025.slice(0, 3).map((s) => ({
              name: s.name,
              domain: s.domain,
              emoji: "🚀",
            }))}
            link={
              <Link to="/cycles/2025" className="absolute inset-0" aria-label="Open cycle 2025" />
            }
          />
        </div>
      </main>
    </div>
  );
}

function CycleCard({
  year,
  status,
  statusTone,
  icon,
  blurb,
  amount,
  amountLabel,
  logos,
  link,
}: {
  year: string;
  status: string;
  statusTone: "muted" | "live";
  icon: React.ReactNode;
  blurb: string;
  amount: string;
  amountLabel: string;
  logos: { name: string; domain?: string; emoji: string }[];
  link: React.ReactNode;
}) {
  const tone =
    statusTone === "live"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      : "border-border bg-muted text-muted-foreground";
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg">
      {link}
      <div className="relative flex items-start justify-between gap-3">
        <div className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${tone}`}>
          {statusTone === "live" && (
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          )}
          {icon}
          {status}
        </div>
        <div className="flex -space-x-2">
          {logos.map((l) => (
            <StartupLogo
              key={l.name}
              name={l.name}
              domain={l.domain}
              emoji={l.emoji}
              size={28}
              rounded="rounded-full"
              className="ring-2 ring-card"
            />
          ))}
        </div>
      </div>
      <div className="mt-6 text-5xl font-semibold tracking-tight">{year}</div>

      <div className="relative mt-5 rounded-xl border border-border bg-muted/40 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {amountLabel}
        </div>
        <div className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          {amount}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      <div className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
        View
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}