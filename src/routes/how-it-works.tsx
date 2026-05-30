import { createFileRoute, Link } from "@tanstack/react-router";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — Hauptstadt50" },
      { name: "description", content: "Learn how the Hauptstadt50 funding vote works." },
      { property: "og:title", content: "How it works — Hauptstadt50" },
      { property: "og:description", content: "Learn how the Hauptstadt50 funding vote works." },
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
              <span className="text-[15px] font-semibold tracking-tight">Hauptstadt50</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Funding cycle 2026
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-[13px] font-medium">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              Vote
            </Link>
            <Link
              to="/how-it-works"
              className="text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              How it works
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">How it works</h1>
        <p className="mt-4 text-muted-foreground">Coming soon.</p>
      </main>
    </div>
  );
}