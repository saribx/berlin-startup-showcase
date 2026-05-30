import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Lock, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { startups } from "@/data/startups";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";

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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <BerlinHuntLogo size={36} className="drop-shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">Berlin Hunt</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Funding round 03
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
            <Timer className="h-3.5 w-3.5 text-primary" />
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:inline">
              Voting ends in
            </span>
            <span className="flex items-baseline gap-1 text-sm font-semibold tabular-nums text-foreground">
              <span>{days}</span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">d</span>
              <span>{String(hours).padStart(2, "0")}</span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">h</span>
              <span className="hidden sm:inline">{String(minutes).padStart(2, "0")}</span>
              <span className="hidden text-[10px] font-medium uppercase text-muted-foreground sm:inline">m</span>
              <span className="hidden md:inline">{String(seconds).padStart(2, "0")}</span>
              <span className="hidden text-[10px] font-medium uppercase text-muted-foreground md:inline">s</span>
            </span>
          </div>
        </div>
      </header>

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

        <ol className="divide-y divide-border rounded-2xl border border-border bg-card">
          <AnimatePresence initial={false}>
          {filtered.map((s, i) => (
            <>
            <motion.li
              key={s.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.012, 0.3) }}
            >
              <Link
                to="/startup/$id"
                params={{ id: String(s.id) }}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
              >
                <span className="w-6 text-right text-sm tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-xl">
                  {s.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="truncate text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
                      {s.name}
                    </h3>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      · {s.category}
                    </span>
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
            {category === "All" && s.id === 50 && (
              <motion.li
                key="cutoff"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Lock className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-primary">
                      Funding cutoff — Top 50
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Only startups ranked above this line will be considered for funding this cycle.
                    </p>
                  </div>
                  <span className="hidden shrink-0 rounded-full border border-primary/30 bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary sm:inline-block">
                    Below the line
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              </motion.li>
            )}
            </>
          ))}
          </AnimatePresence>
        </ol>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Made with ♥ in Berlin.
        </p>
      </main>
    </div>
  );
}
