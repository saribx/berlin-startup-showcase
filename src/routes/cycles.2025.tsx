import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";
import {
  CYCLE_2025,
  CYCLE_2025_GROWTH_PCT,
  CYCLE_2025_NEW_JOBS,
  CYCLE_2025_TOTAL_M,
} from "@/data/cycle-2025";

export const Route = createFileRoute("/cycles/2025")({
  head: () => ({
    meta: [
      { title: "Cycle 2025 — Hauptstadt50" },
      { name: "description", content: "Results of the 2025 Hauptstadt50 funding cycle." },
    ],
  }),
  component: Cycle2025,
});

const SECTOR_COLORS = [
  "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6",
  "#14b8a6", "#ec4899", "#f97316", "#06b6d4", "#84cc16",
  "#a855f7", "#0ea5e9", "#eab308",
];

function Cycle2025() {
  const sorted = useMemo(
    () => [...CYCLE_2025].sort((a, b) => b.investmentM - a.investmentM),
    [],
  );

  const sectorData = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of CYCLE_2025) map.set(e.sector, (map.get(e.sector) ?? 0) + e.investmentM);
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
      .sort((a, b) => b.value - a.value);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <BerlinHuntLogo size={36} className="drop-shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">Hauptstadt50</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Cycle archive
              </span>
            </div>
          </Link>
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <Link
          to="/cycles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All cycles
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Completed
            </span>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">Cycle 2025</h1>
            <p className="mt-2 text-muted-foreground">
              25 Berliner Startups · 190 M € fully distributed
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Wallet className="h-4 w-4" />}
            label="Total invested"
            value={`${CYCLE_2025_TOTAL_M} M €`}
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Portfolio growth YoY"
            value={`+${CYCLE_2025_GROWTH_PCT}%`}
            accent
          />
          <StatCard
            icon={<Briefcase className="h-4 w-4" />}
            label="New jobs created"
            value={CYCLE_2025_NEW_JOBS.toLocaleString("de-DE")}
          />
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold">Funded startups</h2>
              <p className="text-xs text-muted-foreground">Sorted by investment volume</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold">#</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Startup</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Sector</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Votes</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.map((s, i) => (
                    <tr key={s.name} className="transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3 text-muted-foreground tabular-nums">{i + 1}</td>
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.sector}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                        {s.votes.toLocaleString("de-DE")}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold tabular-nums">
                        {s.investmentM.toLocaleString("de-DE", { minimumFractionDigits: s.investmentM % 1 ? 1 : 0 })} M €
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border bg-muted/30 text-sm font-semibold">
                    <td className="px-4 py-3" colSpan={4}>Total</td>
                    <td className="px-4 py-3 text-right tabular-nums">{CYCLE_2025_TOTAL_M} M €</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Investment by sector</h2>
            <p className="text-xs text-muted-foreground">Share of the 190 M € pool</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  >
                    {sectorData.map((_, i) => (
                      <Cell key={i} fill={SECTOR_COLORS[i % SECTOR_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => [`${v} M €`, "Investment"]}
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 space-y-1.5 text-xs">
              {sectorData.map((s, i) => {
                const pct = (s.value / CYCLE_2025_TOTAL_M) * 100;
                return (
                  <li key={s.name} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-sm"
                        style={{ background: SECTOR_COLORS[i % SECTOR_COLORS.length] }}
                      />
                      <span className="text-foreground">{s.name}</span>
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {s.value} M € · {pct.toFixed(1)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div
        className={`mt-2 text-3xl font-semibold tracking-tight ${
          accent ? "text-emerald-600 dark:text-emerald-400" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}