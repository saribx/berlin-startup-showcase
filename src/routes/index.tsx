import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { startups } from "@/data/startups";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Berlin Hunt — Top 50 Berlin Startups" },
      { name: "description", content: "Discover the 50 most upvoted startups from Berlin's tech scene." },
      { property: "og:title", content: "Berlin Hunt — Top 50 Berlin Startups" },
      { property: "og:description", content: "Discover the 50 most upvoted startups from Berlin's tech scene." },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<string>("All");

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
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Berlin Hunt</span>
          </div>
          <nav className="text-sm text-muted-foreground">
            <span className="hidden sm:inline">May 30, 2026</span>
          </nav>
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
            Top 50 Berlin Startups
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
