import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Newspaper } from "lucide-react";

export interface NewsItem {
  title: string;
  excerpt: string;
  source: string;
  postedAgo: string;
}

export const startupNews: Record<number, NewsItem[]> = {
  1: [
    { title: "Helsing closes €600M extension at €12B valuation", excerpt: "General Catalyst leads as Europe doubles down on sovereign defense AI.", source: "Reuters", postedAgo: "vor 2 Std." },
    { title: "HX-2 strike drones enter serial production", excerpt: "Frameworks for tens of thousands of units signed with Ukrainian partners.", source: "Handelsblatt", postedAgo: "vor 8 Std." },
    { title: "Altra software integrated into Eurofighter Typhoon", excerpt: "Airbus and Helsing complete first live mission trials over the North Sea.", source: "Defense News", postedAgo: "vor 1 Tag" },
    { title: "Project Lura expands to maritime autonomy", excerpt: "Helsing teams with Saab on autonomous undersea surveillance.", source: "Bloomberg", postedAgo: "vor 2 Tagen" },
    { title: "European defense spending hits record €380B", excerpt: "NATO members accelerate procurement amid sovereignty push.", source: "FT", postedAgo: "vor 3 Tagen" },
    { title: "Berlin opens new Helsing engineering hub", excerpt: "300 additional engineers to join by end of 2026.", source: "Tagesspiegel", postedAgo: "vor 4 Tagen" },
  ],
  2: [
    { title: "Parloa raises $120M Series C led by Durable Capital", excerpt: "Conversational AI startup triples ARR as enterprises automate support.", source: "TechCrunch", postedAgo: "vor 3 Std." },
    { title: "Deutsche Telekom rolls out Parloa across call centers", excerpt: "AI agents now handle 40% of inbound support volume.", source: "Handelsblatt", postedAgo: "vor 10 Std." },
    { title: "Voice AI market expected to hit $50B by 2028", excerpt: "Enterprise adoption accelerates as latency drops below 300ms.", source: "Gartner", postedAgo: "vor 1 Tag" },
    { title: "Parloa opens New York office", excerpt: "US expansion targets Fortune 500 customer service teams.", source: "Sifted", postedAgo: "vor 2 Tagen" },
    { title: "New multilingual model supports 35 languages", excerpt: "Real-time translation built into every Parloa agent.", source: "The Verge", postedAgo: "vor 5 Tagen" },
  ],
  3: [
    { title: "Trade Republic launches EU-wide IBAN accounts", excerpt: "Neobroker becomes full retail bank for 8M European customers.", source: "Bloomberg", postedAgo: "vor 1 Std." },
    { title: "Savings plans surpass €100B in assets", excerpt: "Younger investors drive growth in passive ETF strategies.", source: "Handelsblatt", postedAgo: "vor 7 Std." },
    { title: "ECB rate cut sends savers searching for yield", excerpt: "Trade Republic's 2.75% rate now leads German market.", source: "FT", postedAgo: "vor 1 Tag" },
    { title: "New crypto staking product goes live", excerpt: "Up to 5% APY on selected tokens, fully MiCA-compliant.", source: "CoinDesk", postedAgo: "vor 3 Tagen" },
    { title: "Trade Republic Card hits 2M users", excerpt: "Debit card with 1% saveback drives daily engagement.", source: "Finanz-Szene", postedAgo: "vor 4 Tagen" },
  ],
};

export function NewsSection({ items }: { items: NewsItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 3);

  return (
    <section className="mt-10">
      <div className="flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          News
        </h2>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {visible.map((n, i) => (
          <motion.article
            key={`${n.title}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
            className="group cursor-pointer rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.02]"
          >
            <h3 className="text-sm font-semibold leading-snug text-foreground">
              {n.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {n.excerpt}
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-medium">{n.source}</span>
              <span>{n.postedAgo}</span>
            </div>
          </motion.article>
        ))}
      </div>

      {items.length > 3 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-opacity hover:opacity-80"
        >
          {showAll ? "Weniger anzeigen" : `Mehr News (${items.length - 3})`}
          <ChevronRight className={`h-3.5 w-3.5 transition-transform ${showAll ? "rotate-90" : ""}`} />
        </button>
      )}
    </section>
  );
}