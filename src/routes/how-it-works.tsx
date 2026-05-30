import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coins, Vote, BarChart3, Banknote, FileText, Globe2 } from "lucide-react";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — Berlin Venture 50" },
      { name: "description", content: "Learn how the Berlin Venture 50 funding vote works." },
      { property: "og:title", content: "How it works — Berlin Venture 50" },
      { property: "og:description", content: "Learn how the Berlin Venture 50 funding vote works." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
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

      <main className="mx-auto max-w-4xl px-6 py-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          How it works
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Berlin's tax money, steered by Berliners.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Berlin Venture 50 is a public platform where Berliners decide which local startups
          receive a share of their tax money — transparent, democratic, once a year.
        </p>

        {/* Origin story */}
        <section className="mt-16 grid gap-10 sm:grid-cols-[180px_1fr]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            How it started
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
            <p>
              Berlin has one of Europe's densest startup scenes — yet most of the
              growth capital still comes from abroad. At the same time, more and more
              citizens want a real say in how their tax money is spent.
            </p>
            <p>
              Berlin Venture 50 was born out of that tension: a small, fixed share of
              Berlin's business and income tax revenue flows into a municipal growth
              fund — and Berliners collectively decide which startups receive capital
              from it.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          <Pillar
            icon={<Coins className="h-5 w-5" />}
            title="From taxes into growth capital"
            body="A small share of Berlin's tax revenue flows each year into a fund that exclusively backs local startups."
          />
          <Pillar
            icon={<Vote className="h-5 w-5" />}
            title="You help decide"
            body="You choose where the money goes. Every Berliner gets one vote per cycle — direct, equal, transparent."
          />
          <Pillar
            icon={<Banknote className="h-5 w-5" />}
            title="Top 50 receive capital"
            body="The fund is distributed across the 50 startups with the most votes. Fund managers size each ticket based on stage and capacity."
          />
        </section>

        {/* Global hubs table */}
        <section className="mt-20">
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Where Berlin stands in 2026
            </h2>
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Berlin is still a top-15 global startup ecosystem, but has slipped behind
            the leaders in capital availability. Berlin Venture 50 is built to reverse that —
            re-igniting the city as Europe's most ambitious founder hub.
          </p>

          <HubsTable />

          <p className="mt-4 text-xs text-muted-foreground">
            Sources: Startup Genome Global Startup Ecosystem Report 2026 &amp; StartupBlink
            Global Startup Ecosystem Index 2026. Ecosystem value in USD over the
            trailing 2.5 years.
          </p>
        </section>

        {/* Phases */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            The annual cycle in five phases
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            From tax revenue to investment decision — the entire process is public
            and auditable.
          </p>

          <PhaseDiagram />
        </section>

        {/* CTA */}
        <section className="mt-20 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-8">
          <h3 className="text-2xl font-semibold tracking-tight">Ready to have a say?</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            The 2026 cycle is live. €200M will be distributed — your vote tips the balance.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-500"
          >
            Vote now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

function Pillar({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

const HUBS = [
  { rank: 1, city: "San Francisco Bay", country: "USA", value: "$5.9T", funding: "$278B", change: "—" },
  { rank: 2, city: "New York", country: "USA", value: "$2.8T", funding: "$162B", change: "▲ 1" },
  { rank: 3, city: "London", country: "UK", value: "$1.4T", funding: "$104B", change: "▼ 1" },
  { rank: 4, city: "Los Angeles", country: "USA", value: "$1.1T", funding: "$71B", change: "—" },
  { rank: 5, city: "Beijing", country: "China", value: "$1.0T", funding: "$58B", change: "—" },
  { rank: 6, city: "Boston", country: "USA", value: "$680B", funding: "$54B", change: "▲ 1" },
  { rank: 7, city: "Tel Aviv", country: "Israel", value: "$235B", funding: "$31B", change: "▼ 1" },
  { rank: 8, city: "Shanghai", country: "China", value: "$420B", funding: "$41B", change: "▲ 2" },
  { rank: 9, city: "Bengaluru", country: "India", value: "$390B", funding: "$38B", change: "—" },
  { rank: 10, city: "Singapore", country: "Singapore", value: "$310B", funding: "$26B", change: "▲ 1" },
  { rank: 11, city: "Paris", country: "France", value: "$240B", funding: "$22B", change: "▲ 2" },
  { rank: 12, city: "Berlin", country: "Germany", value: "$190B", funding: "$14B", change: "▼ 3" },
  { rank: 13, city: "Tokyo", country: "Japan", value: "$170B", funding: "$11B", change: "—" },
  { rank: 14, city: "Stockholm", country: "Sweden", value: "$155B", funding: "$9B", change: "▲ 1" },
  { rank: 15, city: "Amsterdam", country: "Netherlands", value: "$140B", funding: "$8B", change: "▼ 1" },
];

function HubsTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3 text-right">Ecosystem value</th>
              <th className="px-4 py-3 text-right">VC funding (2.5y)</th>
              <th className="px-4 py-3 text-right">YoY</th>
            </tr>
          </thead>
          <tbody>
            {HUBS.map((h) => {
              const isBerlin = h.city === "Berlin";
              return (
                <tr
                  key={h.rank}
                  className={`border-b border-border last:border-0 ${
                    isBerlin ? "bg-emerald-500/10 font-semibold text-foreground" : ""
                  }`}
                >
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{h.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {h.city}
                      {isBerlin && (
                        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          We are here
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{h.country}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{h.value}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{h.funding}</td>
                  <td
                    className={`px-4 py-3 text-right tabular-nums text-xs ${
                      h.change.startsWith("▲")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : h.change.startsWith("▼")
                          ? "text-red-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    {h.change}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Berlin dropped three spots since 2024 — mostly due to a shrinking late-stage
        funding base. Berlin Venture 50 closes that gap with locally-anchored, citizen-directed
        growth capital, so the next decade of European tech is built here.
      </div>
    </div>
  );
}

const PHASES = [
  {
    n: "01",
    label: "Tax inflow",
    window: "Jan – Mar",
    icon: <Coins className="h-4 w-4" />,
    body: "A pre-agreed share of Berlin's tax revenue is booked into the Berlin Venture 50 fund.",
  },
  {
    n: "02",
    label: "Nomination",
    window: "Apr – May",
    icon: <FileText className="h-4 w-4" />,
    body: "Berlin startups apply. An independent jury verifies HQ, substance and eligibility.",
  },
  {
    n: "03",
    label: "Voting",
    window: "Jun – Aug",
    icon: <Vote className="h-4 w-4" />,
    body: "Every Berliner casts one vote. The ranking updates in real time.",
  },
  {
    n: "04",
    label: "Tally & cutoff",
    window: "Sep",
    icon: <BarChart3 className="h-4 w-4" />,
    body: "The top 50 are locked in and the fund allocation is calculated and published.",
  },
  {
    n: "05",
    label: "Payout & report",
    window: "Oct – Dec",
    icon: <Banknote className="h-4 w-4" />,
    body: "Capital is paid out. The following year, startups deliver growth, jobs and impact reports.",
  },
];

function PhaseDiagram() {
  return (
    <div className="mt-8">
      {/* Desktop: horizontal connector */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <ol className="relative grid grid-cols-5 gap-3">
          {PHASES.map((p) => (
            <li key={p.n} className="flex flex-col items-center text-center">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-background text-emerald-600 dark:text-emerald-400">
                {p.icon}
              </div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {p.window}
              </div>
              <div className="mt-1 text-sm font-semibold">
                <span className="text-muted-foreground">{p.n} · </span>
                {p.label}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <ol className="relative lg:hidden">
        <div className="absolute bottom-2 left-[19px] top-2 w-px bg-border" />
        {PHASES.map((p) => (
          <li key={p.n} className="relative flex gap-4 pb-6 last:pb-0">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-background text-emerald-600 dark:text-emerald-400">
              {p.icon}
            </div>
            <div className="flex-1 pt-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {p.window}
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                <span className="text-muted-foreground">{p.n} · </span>
                {p.label}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}