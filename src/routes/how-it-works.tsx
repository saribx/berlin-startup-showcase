import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coins, Vote, BarChart3, Banknote, FileText } from "lucide-react";
import { BerlinHuntLogo } from "@/components/berlin-hunt-logo";
import { SiteNav } from "@/components/site-nav";

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
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          How it works
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Berliner Steuergeld, von Berlinern gelenkt.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Hauptstadt50 ist eine öffentliche Plattform, auf der die Bürger*innen Berlins
          entscheiden, in welche lokalen Startups ein Teil ihres Steuergeldes investiert
          wird – transparent, demokratisch und einmal pro Jahr.
        </p>

        {/* Origin story */}
        <section className="mt-16 grid gap-10 sm:grid-cols-[180px_1fr]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Wie es entstand
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
            <p>
              Berlin hat eine der dichtesten Startup-Szenen Europas – doch ein großer Teil
              des Wachstumskapitals kommt aus dem Ausland. Gleichzeitig wünschen sich
              viele Bürger*innen mehr Mitsprache darüber, was mit ihren Steuern passiert.
            </p>
            <p>
              Aus diesem Spannungsfeld entstand Hauptstadt50: ein kleiner, fest definierter
              Anteil aus den Gewerbe- und Einkommenssteuereinnahmen wird in einen
              kommunalen Wachstumsfonds umgelenkt – und die Berliner*innen entscheiden
              gemeinsam, welche Startups daraus Kapital erhalten.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          <Pillar
            icon={<Coins className="h-5 w-5" />}
            title="Aus Steuern wird Wachstumskapital"
            body="Ein kleiner Betrag der Berliner Steuereinnahmen fließt jährlich in einen Fonds, der ausschließlich lokales Wachstumskapital bereitstellt."
          />
          <Pillar
            icon={<Vote className="h-5 w-5" />}
            title="Du entscheidest mit"
            body="In welche Startups das Geld fließt, bestimmst auch du. Jede Berlinerin und jeder Berliner hat eine Stimme pro Cycle."
          />
          <Pillar
            icon={<Banknote className="h-5 w-5" />}
            title="Top 50 erhalten die Mittel"
            body="Der Fonds wird auf die 50 Startups mit den meisten Stimmen verteilt – die genaue Aufteilung folgt dem Ranking."
          />
        </section>

        {/* Phases */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Der jährliche Cycle in fünf Phasen
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Vom Steuerbescheid bis zur Investitionsentscheidung – der gesamte Prozess
            ist öffentlich nachvollziehbar.
          </p>

          <PhaseDiagram />
        </section>

        {/* CTA */}
        <section className="mt-20 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-8">
          <h3 className="text-2xl font-semibold tracking-tight">Bereit mitzuentscheiden?</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Der Cycle 2026 läuft. 200 Mio. € werden verteilt – deine Stimme gibt den Ausschlag.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-500"
          >
            Jetzt abstimmen
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

const PHASES = [
  {
    n: "01",
    label: "Steuerzufluss",
    window: "Jan – Mär",
    icon: <Coins className="h-4 w-4" />,
    body: "Ein vorab beschlossener Anteil der Berliner Steuereinnahmen wird in den Hauptstadt50-Fonds gebucht.",
  },
  {
    n: "02",
    label: "Nominierung",
    window: "Apr – Mai",
    icon: <FileText className="h-4 w-4" />,
    body: "Berliner Startups bewerben sich, eine unabhängige Jury prüft Sitz, Substanz und Förderfähigkeit.",
  },
  {
    n: "03",
    label: "Voting",
    window: "Jun – Aug",
    icon: <Vote className="h-4 w-4" />,
    body: "Alle Berliner*innen stimmen ab. Eine Stimme pro Person, das Ranking aktualisiert sich live.",
  },
  {
    n: "04",
    label: "Auszählung & Cutoff",
    window: "Sep",
    icon: <BarChart3 className="h-4 w-4" />,
    body: "Die Top 50 werden festgelegt, die Mittelverteilung nach Ranking berechnet und veröffentlicht.",
  },
  {
    n: "05",
    label: "Auszahlung & Report",
    window: "Okt – Dez",
    icon: <Banknote className="h-4 w-4" />,
    body: "Das Kapital wird ausgezahlt. Im Folgejahr liefern Startups Wachstums-, Job- und Impact-Reports.",
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