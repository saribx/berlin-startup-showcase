import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, LockOpen } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { startups } from "@/data/startups";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { StartupLogo } from "@/components/startup-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Berlin Hunt — Vote for the top 50 Berlin Startups" },
      { name: "description", content: "Vote for the 50 Berlin startups that should receive funding this cycle." },
      { property: "og:title", content: "Berlin Hunt — Vote for the top 50 Berlin Startups" },
      { property: "og:description", content: "Vote for the 50 Berlin startups that should receive funding this cycle." },
    ],
  }),
  component: Index,
});

// Voting closes 3 days, 12 hours from the user's first visit (for the mockup).
const VOTE_WINDOW_MS = (3 * 24 + 12) * 60 * 60 * 1000;

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const remaining = Math.max(0, targetMs - now);
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((remaining / (60 * 1000)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  return { days, hours, minutes, seconds, remaining };
}

function Index() {
  const [category, setCategory] = useState<string>("All");
  const [target] = useState(() => Date.now() + VOTE_WINDOW_MS);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const categories = useMemo(() => {
    const set = new Set<string>();
    startups.forEach((s) => set.add(s.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(
    () => (category === "All" ? startups : startups.filter((s) => s.category === category)),
    [category],
  );
  const topFifty = filtered.filter((s) => s.id <= 50);
  const belowFifty = filtered.filter((s) => s.id > 50);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <BerlinHuntLogo size={36} className="drop-shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">Berlin Hunt</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Funding cycle 2026
              </span>
            </div>
          </div>
          <CountdownBadge days={days} hours={hours} minutes={minutes} seconds={seconds} />
        </div>
      </header>

      <FundingHero />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Vote for the top 50 Berlin Startups
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Vote now for your favourite startups to get funding.
          </p>
        </motion.div>

        <div className="mb-6 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {topFifty.length > 0 && (
          <div className="relative rounded-2xl border-2 border-emerald-500/70 bg-card shadow-[0_0_0_4px_rgba(16,185,129,0.08)]">
            <div className="flex items-center justify-between gap-3 border-b border-emerald-500/30 bg-emerald-500/[0.06] px-5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                  Funding zone · Top 50
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700/80 dark:text-emerald-400/80">
                Eligible for this cycle
              </span>
            </div>
            <ol className="divide-y divide-border">
              <AnimatePresence initial={false}>
                {topFifty.map((s, i) => (
                  <RankRow key={s.id} s={s} rank={s.id} index={i} />
                ))}
              </AnimatePresence>
            </ol>
          </div>
        )}

        {belowFifty.length > 0 && (
          <>
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                <LockOpen className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Funding cutoff
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
            </div>
            <ol className="divide-y divide-border rounded-2xl border border-border bg-card opacity-90">
              <AnimatePresence initial={false}>
                {belowFifty.map((s, i) => (
                  <RankRow key={s.id} s={s} rank={s.id} index={i} muted />
                ))}
              </AnimatePresence>
            </ol>
          </>
        )}

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Berlin auf die 1.
        </p>
      </main>
    </div>
  );
}

function RankRow({
  s,
  rank,
  index,
  muted,
}: {
  s: (typeof startups)[number];
  rank: number;
  index: number;
  muted?: boolean;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.012, 0.3) }}
    >
      <Link
        to="/startup/$id"
        params={{ id: String(s.id) }}
        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
      >
        <span className={`w-8 text-right text-sm tabular-nums ${muted ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
          {rank}
        </span>
        <StartupLogo
          domain={s.domain}
          name={s.name}
          emoji={s.emoji}
          size={44}
          className="border border-border"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="truncate text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
              {s.name}
            </h3>
            <span className="hidden text-xs text-muted-foreground sm:inline">· {s.category}</span>
          </div>
          <p className="truncate text-sm text-muted-foreground">{s.tagline}</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-border px-3 py-1.5 transition-all group-hover:border-primary group-hover:bg-primary/5">
          <ChevronUp className="h-4 w-4 text-primary" strokeWidth={2.5} />
          <span className="text-xs font-semibold tabular-nums text-foreground">
            {s.votes.toLocaleString()}
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

function FundingHero() {
  const target = 200_000_000;
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const formatted = value.toLocaleString("de-DE");

  return (
    <section className="relative flex min-h-[calc(100vh-69px)] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/40" />
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[420px] max-w-3xl bg-primary/10 blur-3xl" />
      <div className="flex flex-col items-center text-center">
        <span className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Funding pool · Berlin Hunt 2026
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold tracking-tight tabular-nums sm:text-8xl md:text-9xl"
        >
          {formatted} €
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          gehen an die 50 Berliner Startups, die ihr nach unten wählt.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-lg"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownBadge({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const Unit = ({ value, label }: { value: number | string; label: string }) => (
    <div className="flex flex-col items-center leading-none">
      <span className="text-sm font-bold tabular-nums text-foreground">
        {typeof value === "number" ? String(value).padStart(2, "0") : value}
      </span>
      <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
  const Sep = () => <span className="text-sm font-bold text-border">:</span>;
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/40 via-rose-500/30 to-primary/40 opacity-60 blur-sm transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center gap-3 rounded-2xl border border-border bg-card px-3.5 py-2">
        <div className="hidden flex-col items-start leading-none sm:flex">
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Voting
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground">
            Ends in
          </span>
        </div>
        <div className="hidden h-7 w-px bg-border sm:block" />
        <div className="flex items-center gap-2">
          <Unit value={days} label="Days" />
          <Sep />
          <Unit value={hours} label="Hrs" />
          <Sep />
          <Unit value={minutes} label="Min" />
          <span className="hidden sm:contents">
            <Sep />
            <Unit value={seconds} label="Sec" />
          </span>
        </div>
      </div>
    </div>
  );
}