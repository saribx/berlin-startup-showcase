import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Coins,
  Info,
  LogIn,
  LogOut,
  PiggyBank,
  Plus,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AddBalanceDialog } from "@/components/add-balance-dialog";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";
import { StartupLogo } from "@/components/startup-logo";
import { useAuth } from "@/lib/auth-context";
import { usePortfolio, type Portfolio } from "@/lib/use-portfolio";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Berlin Venture 50" },
      {
        name: "description",
        content: "Your stake in the Berlin Venture 50 citizen fund and its returns.",
      },
      { property: "og:title", content: "Your account — Berlin Venture 50" },
    ],
  }),
  component: AccountPage,
});

const eur = (n: number) => `€${Math.round(n).toLocaleString("de-DE")}`;
const eurSigned = (n: number) =>
  `${n < 0 ? "−" : "+"}€${Math.abs(Math.round(n)).toLocaleString("de-DE")}`;
const pct = (r: number, signed = false) => `${signed && r > 0 ? "+" : ""}${(r * 100).toFixed(1)}%`;
const eurCompact = (n: number) => {
  const a = Math.abs(n);
  if (a >= 1_000_000)
    return `€${(n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 2 })}M`;
  if (a >= 1_000) return `€${(n / 1_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}k`;
  return `€${n}`;
};

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <BerlinHuntLogo size={36} className="drop-shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">Berlin Venture 50</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Your account
              </span>
            </div>
          </Link>
          <SiteNav />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

function AccountPage() {
  const { user, logout, openLogin } = useAuth();
  const { portfolio, isLoading } = usePortfolio();

  if (isLoading || !portfolio) {
    return (
      <Shell>
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
          Loading your account…
        </div>
      </Shell>
    );
  }

  if (!portfolio.signedIn) {
    return (
      <Shell>
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Wallet className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-semibold">Sign in to view your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add capital to the Berlin Venture 50 citizen fund and track the returns from the
            startups Berliners voted to back.
          </p>
          <button
            type="button"
            onClick={() => openLogin("Sign in to see your fund stake and returns.")}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:from-emerald-400"
          >
            <LogIn className="h-4 w-4" strokeWidth={2.5} />
            Sign in
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <AccountView portfolio={portfolio} name={user?.name ?? "Citizen"} onSignOut={logout} />
    </Shell>
  );
}

function AccountView({
  portfolio: p,
  name,
  onSignOut,
}: {
  portfolio: Portfolio;
  name: string;
  onSignOut: () => void;
}) {
  const hasFunds = p.balanceEur > 0;
  const addButton = (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/30 transition-all hover:from-emerald-400 active:scale-[0.98]"
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} />
      Add balance
    </button>
  );

  return (
    <>
      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your account</h1>
        <AddBalanceDialog trigger={addButton} />
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={<PiggyBank className="h-4 w-4" />}
          label="Balance"
          value={eur(p.balanceEur)}
          sub={
            p.depositedEur > 0
              ? `€100 welcome credit + ${eur(p.depositedEur)} added`
              : "€100 welcome credit"
          }
        />
        <SummaryCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Projected value · 1yr"
          value={eur(p.projectedValueEur)}
          sub={`at +${pct(p.blendedRate)} blended fund rate`}
          accent
        />
        <SummaryCard
          icon={<ArrowUpRight className="h-4 w-4" />}
          label="Projected return · 1yr"
          value={eurSigned(p.projectedReturnEur)}
          sub={pct(p.blendedRate, true)}
          positive={p.projectedReturnEur >= 0}
        />
      </div>

      {/* Projection chart */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Projected value</h2>
            <p className="text-xs text-muted-foreground">
              Your stake over the next 12 months at the fund's current blended rate
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="h-3 w-3" />+{pct(p.blendedRate)} / yr
          </span>
        </div>

        {hasFunds ? (
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={p.series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="acct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(m: number) => (m === 0 ? "Now" : `${m}m`)}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={eurCompact}
                  width={48}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelFormatter={(m) => (Number(m) === 0 ? "Now" : `In ${m} months`)}
                  formatter={(v: number, key) => [
                    eur(v),
                    key === "value" ? "Projected value" : "Invested",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="contributed"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#acct)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
            <Coins className="h-7 w-7 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">No capital added yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              The fund is already running at +{pct(p.blendedRate)} / yr. Add balance to put your
              capital to work alongside Berlin's tax pool.
            </p>
            <div className="mt-4">
              <AddBalanceDialog trigger={addButton} />
            </div>
          </div>
        )}
      </section>

      {/* Fund holdings */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3">
          <h2 className="text-sm font-semibold">Where the fund invests</h2>
          <p className="text-xs text-muted-foreground">
            The fund managers size each ticket from the €{(p.poolEur / 1_000_000).toFixed(0)}M pool
            — independent of the voting ranking. You don't pick; you share in the blend.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Startup</th>
                <th className="px-4 py-2.5 text-right font-semibold">Fund ticket</th>
                <th className="px-4 py-2.5 text-right font-semibold">Share</th>
                <th className="px-4 py-2.5 text-right font-semibold">Proj. return</th>
                <th className="px-4 py-2.5 text-right font-semibold">Your stake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {p.holdings.map((h) => (
                <tr key={h.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <StartupLogo
                        name={h.name}
                        domain={h.domain ?? undefined}
                        emoji={h.emoji}
                        size={28}
                        rounded="rounded-md"
                      />
                      <div className="leading-tight">
                        <div className="font-medium">{h.name}</div>
                        <div className="text-[11px] text-muted-foreground">{h.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">
                    {eurCompact(h.ticketEur)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {pct(h.share)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right tabular-nums ${
                      h.rate >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                    }`}
                  >
                    {pct(h.rate, true)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {hasFunds ? (
                      <span>
                        {eur(h.yourStakeEur)}{" "}
                        <span
                          className={`text-[11px] ${
                            h.yourGainEur >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-500"
                          }`}
                        >
                          ({eurSigned(h.yourGainEur)})
                        </span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-5 py-2.5 text-[11px] text-muted-foreground">
          Showing the fund's {p.holdings.length} largest tickets of {p.fundedCount} funded startups.
        </div>
      </section>

      {/* Deposit history + profile */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Deposit history</h2>
          {p.history.length > 0 ? (
            <ul className="mt-3 divide-y divide-border">
              {p.history.map((d) => (
                <li key={d.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {new Date(d.createdAt * 1000).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    {d.welcome && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                        Welcome credit
                      </span>
                    )}
                  </span>
                  <span className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                    +{eur(d.amountEur)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No deposits yet.</p>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Profile</h2>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Wallet className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="font-medium">{name}</div>
                <div className="text-[11px] text-muted-foreground">Berlin Venture 50 citizen</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </section>
      </div>

      <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Info className="h-3.5 w-3.5" />
        Illustrative · simulated fund performance. Figures are projections, not financial advice.
      </p>
    </>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  accent,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  positive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "border-emerald-500/30 bg-emerald-500/5" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-emerald-600 dark:text-emerald-400">{icon}</span>
        {label}
      </div>
      <div
        className={`mt-2 text-2xl font-bold tabular-nums ${
          positive === undefined
            ? "text-foreground"
            : positive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500"
        }`}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
