import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  Briefcase,
  FileText,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";
import { StartupLogo } from "@/components/startup-logo";
import {
  CYCLE_2025,
  CYCLE_2025_APPLICATIONS,
  CYCLE_2025_DEPLOYMENT,
  CYCLE_2025_GROWTH_PCT,
  CYCLE_2025_NEW_JOBS,
  CYCLE_2025_ROI_PCT,
  CYCLE_2025_TOTAL_M,
  CYCLE_2025_VOTERS,
  CYCLE_2025_VOTER_TURNOUT_PCT,
} from "@/data/cycle-2025";

export const Route = createFileRoute("/cycles_/2025")({
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

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

function Cycle2025() {
  const sorted = useMemo(
    () => [...CYCLE_2025].sort((a, b) => b.investmentM - a.investmentM),
    [],
  );

  const sectorData = useMemo(() => {
    const map = new Map<string, { value: number; growth: number; jobs: number; count: number }>();
    for (const e of CYCLE_2025) {
      const cur = map.get(e.sector) ?? { value: 0, growth: 0, jobs: 0, count: 0 };
      cur.value += e.investmentM;
      cur.growth += e.growthPct;
      cur.jobs += e.newJobs;
      cur.count += 1;
      map.set(e.sector, cur);
    }
    return Array.from(map.entries())
      .map(([name, v]) => ({
        name,
        value: Number(v.value.toFixed(2)),
        avgGrowth: Number((v.growth / v.count).toFixed(1)),
        jobs: v.jobs,
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const top10Investment = useMemo(() => sorted.slice(0, 10), [sorted]);

  const topPerformers = useMemo(() => {
    const bestROI = [...CYCLE_2025].sort((a, b) => b.roiPct - a.roiPct)[0];
    const fastestGrower = [...CYCLE_2025].sort((a, b) => b.growthPct - a.growthPct)[0];
    const mostJobs = [...CYCLE_2025].sort((a, b) => b.newJobs - a.newJobs)[0];
    const mostVoted = [...CYCLE_2025].sort((a, b) => b.votes - a.votes)[0];
    return { bestROI, fastestGrower, mostJobs, mostVoted };
  }, []);

  const avgTicketM = (CYCLE_2025_TOTAL_M / CYCLE_2025.length).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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

      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/cycles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All cycles
        </Link>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Completed
          </span>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">Cycle 2025</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            25 Berlin startups · €190M fully deployed · 612,400 citizens cast a vote
          </p>
        </div>

        {/* KPI strip */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard icon={<Wallet className="h-4 w-4" />} label="Total invested" value={`${CYCLE_2025_TOTAL_M} M €`} />
          <StatCard icon={<Sparkles className="h-4 w-4" />} label="Fund ROI" value={`+${CYCLE_2025_ROI_PCT}%`} accent />
          <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Avg. growth YoY" value={`+${CYCLE_2025_GROWTH_PCT}%`} accent />
          <StatCard icon={<Briefcase className="h-4 w-4" />} label="New jobs" value={CYCLE_2025_NEW_JOBS.toLocaleString("en-US")} />
          <StatCard icon={<Users className="h-4 w-4" />} label="Voters" value={`${(CYCLE_2025_VOTERS / 1000).toFixed(0)}k`} sub={`${CYCLE_2025_VOTER_TURNOUT_PCT}% turnout`} />
          <StatCard icon={<FileText className="h-4 w-4" />} label="Applications" value={CYCLE_2025_APPLICATIONS.toLocaleString("en-US")} sub={`Avg. €${avgTicketM}M ticket`} />
        </div>

        {/* Highlights */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Cycle highlights
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <HighlightCard
              label="Best ROI"
              startup={topPerformers.bestROI}
              metric={`+${topPerformers.bestROI.roiPct}%`}
            />
            <HighlightCard
              label="Fastest growth"
              startup={topPerformers.fastestGrower}
              metric={`+${topPerformers.fastestGrower.growthPct}% YoY`}
            />
            <HighlightCard
              label="Most new jobs"
              startup={topPerformers.mostJobs}
              metric={`${topPerformers.mostJobs.newJobs} hires`}
            />
            <HighlightCard
              label="Public favorite"
              startup={topPerformers.mostVoted}
              metric={`${topPerformers.mostVoted.votes.toLocaleString("en-US")} votes`}
            />
          </div>
        </section>

        {/* Charts row 1: bar + pie */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          <ChartCard
            title="Top 10 investments"
            subtitle="The largest tickets allocated from the fund"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top10Investment} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={60} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}M`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`€${v}M`, "Investment"]} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} />
                  <Bar dataKey="investmentM" radius={[6, 6, 0, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Investment by sector"
            subtitle="Share of the €190M pool"
          >
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sectorData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={84} paddingAngle={2} stroke="hsl(var(--background))" strokeWidth={2}>
                    {sectorData.map((_, i) => (
                      <Cell key={i} fill={SECTOR_COLORS[i % SECTOR_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`€${v}M`, "Investment"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-3 space-y-1 text-xs">
              {sectorData.map((s, i) => {
                const pct = (s.value / CYCLE_2025_TOTAL_M) * 100;
                return (
                  <li key={s.name} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: SECTOR_COLORS[i % SECTOR_COLORS.length] }} />
                      <span className="text-foreground">{s.name}</span>
                    </span>
                    <span className="tabular-nums text-muted-foreground">€{s.value}M · {pct.toFixed(1)}%</span>
                  </li>
                );
              })}
            </ul>
          </ChartCard>
        </section>

        {/* Charts row 2: deployment + sector growth */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Capital deployment 2025"
            subtitle="Quarterly payouts to portfolio startups"
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CYCLE_2025_DEPLOYMENT} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="deploy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="quarter" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}M`} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number, n) => [`€${v}M`, n === "cumulativeM" ? "Cumulative" : "Quarter"]}
                  />
                  <Area type="monotone" dataKey="cumulativeM" stroke="#10b981" strokeWidth={2} fill="url(#deploy)" />
                  <Bar dataKey="deployedM" fill="#10b981" opacity={0.4} radius={[4, 4, 0, 0]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Avg. growth by sector"
            subtitle="Average YoY revenue growth of funded startups"
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={84} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`+${v}%`, "Avg. growth"]} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} />
                  <Bar dataKey="avgGrowth" radius={[0, 6, 6, 0]}>
                    {sectorData.map((_, i) => (
                      <Cell key={i} fill={SECTOR_COLORS[i % SECTOR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Detailed table */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Funded startups · full breakdown</h2>
            <p className="text-xs text-muted-foreground">
              Sorted by investment volume · allocated by the fund managers, independent of the voting ranking
            </p>
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
                  <th className="px-4 py-2.5 text-right font-semibold">Growth</th>
                  <th className="px-4 py-2.5 text-right font-semibold">ROI</th>
                  <th className="px-4 py-2.5 text-right font-semibold">New jobs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sorted.map((s, i) => (
                  <tr key={s.name} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <StartupLogo name={s.name} domain={s.domain} emoji="🚀" size={26} rounded="rounded-md" />
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.sector}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{s.votes.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      €{s.investmentM.toLocaleString("en-US", { minimumFractionDigits: s.investmentM % 1 ? 1 : 0 })}M
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-600 dark:text-emerald-400">+{s.growthPct}%</td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-600 dark:text-emerald-400">+{s.roiPct}%</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{s.newJobs}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/30 text-sm font-semibold">
                  <td className="px-4 py-3" colSpan={4}>Total</td>
                  <td className="px-4 py-3 text-right tabular-nums">€{CYCLE_2025_TOTAL_M}M</td>
                  <td className="px-4 py-3 text-right tabular-nums text-emerald-600 dark:text-emerald-400">+{CYCLE_2025_GROWTH_PCT}% avg</td>
                  <td className="px-4 py-3 text-right tabular-nums text-emerald-600 dark:text-emerald-400">+{CYCLE_2025_ROI_PCT}% avg</td>
                  <td className="px-4 py-3 text-right tabular-nums">{CYCLE_2025_NEW_JOBS.toLocaleString("en-US")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          All figures are mock data for demonstration purposes.
        </p>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${accent ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function HighlightCard({
  label,
  startup,
  metric,
}: {
  label: string;
  startup: (typeof CYCLE_2025)[number];
  metric: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
      <Award className="absolute -right-3 -top-3 h-16 w-16 text-emerald-500/10" />
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <StartupLogo name={startup.name} domain={startup.domain} emoji="🚀" size={36} rounded="rounded-lg" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{startup.name}</div>
          <div className="truncate text-xs text-muted-foreground">{startup.sector}</div>
        </div>
      </div>
      <div className="mt-3 text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
        {metric}
      </div>
    </div>
  );
}
