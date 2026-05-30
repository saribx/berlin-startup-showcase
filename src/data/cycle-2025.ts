export type Cycle2025Entry = {
  rank: number;
  name: string;
  sector: string;
  votes: number;
  investmentM: number; // millions of EUR
  domain?: string;
};

// Top 25 best-performing Berlin startups in the 2025 cycle.
// Investment is decided by the fund managers — independent from the public vote.
// Investment values sum to exactly 190 (million EUR) — the full 2025 pool.
export const CYCLE_2025: Cycle2025Entry[] = [
  { rank: 1, name: "N26", sector: "Fintech", votes: 11430, investmentM: 28, domain: "n26.com" },
  { rank: 2, name: "Trade Republic", sector: "Fintech", votes: 7180, investmentM: 22, domain: "traderepublic.com" },
  { rank: 3, name: "Auto1 Group", sector: "E-commerce", votes: 18420, investmentM: 18, domain: "auto1-group.com" },
  { rank: 4, name: "GetYourGuide", sector: "Travel", votes: 4860, investmentM: 14, domain: "getyourguide.com" },
  { rank: 5, name: "Wefox", sector: "Insurtech", votes: 13240, investmentM: 12, domain: "wefox.com" },
  { rank: 6, name: "Tier Mobility", sector: "Mobility", votes: 6510, investmentM: 11, domain: "tier.app" },
  { rank: 7, name: "Contentful", sector: "SaaS", votes: 9210, investmentM: 10, domain: "contentful.com" },
  { rank: 8, name: "Forto", sector: "Logistics", votes: 3640, investmentM: 9, domain: "forto.com" },
  { rank: 9, name: "Choco", sector: "FoodTech", votes: 17110, investmentM: 8, domain: "choco.com" },
  { rank: 10, name: "Mambu", sector: "Fintech", votes: 5090, investmentM: 7, domain: "mambu.com" },
  { rank: 11, name: "Solaris", sector: "Fintech", votes: 7960, investmentM: 6, domain: "solarisgroup.com" },
  { rank: 12, name: "HomeToGo", sector: "Travel", votes: 14980, investmentM: 6, domain: "hometogo.com" },
  { rank: 13, name: "Raisin", sector: "Fintech", votes: 4380, investmentM: 5.5, domain: "raisin.com" },
  { rank: 14, name: "Babbel", sector: "EdTech", votes: 10820, investmentM: 5, domain: "babbel.com" },
  { rank: 15, name: "CoachHub", sector: "HRTech", votes: 3210, investmentM: 4.5, domain: "coachhub.com" },
  { rank: 16, name: "Razor Group", sector: "E-commerce", votes: 8540, investmentM: 4, domain: "razor-group.com" },
  { rank: 17, name: "Grover", sector: "Consumer", votes: 12110, investmentM: 3.5, domain: "grover.com" },
  { rank: 18, name: "Ecosia", sector: "GreenTech", votes: 16540, investmentM: 3, domain: "ecosia.org" },
  { rank: 19, name: "Pitch", sector: "SaaS", votes: 5780, investmentM: 2.8, domain: "pitch.com" },
  { rank: 20, name: "Blinkist", sector: "EdTech", votes: 7720, investmentM: 2.5, domain: "blinkist.com" },
  { rank: 21, name: "Omio", sector: "Travel", votes: 6940, investmentM: 2.3, domain: "omio.com" },
  { rank: 22, name: "SoundCloud", sector: "Media", votes: 9870, investmentM: 2, domain: "soundcloud.com" },
  { rank: 23, name: "Zenjob", sector: "HRTech", votes: 6120, investmentM: 1.6, domain: "zenjob.com" },
  { rank: 24, name: "Tomorrow", sector: "Fintech", votes: 5410, investmentM: 1.3, domain: "tomorrow.one" },
  { rank: 25, name: "Bryter", sector: "SaaS", votes: 4620, investmentM: 1, domain: "bryter.com" },
];

export const CYCLE_2025_TOTAL_M = 190;
export const CYCLE_2025_GROWTH_PCT = 23.4; // avg portfolio revenue growth YoY
export const CYCLE_2025_NEW_JOBS = 2840;