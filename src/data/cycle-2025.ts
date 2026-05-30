export type Cycle2025Entry = {
  rank: number;
  name: string;
  sector: string;
  votes: number;
  investmentM: number; // millions of EUR
};

// Top 25 best-performing Berlin startups in the 2025 cycle.
// Investment values sum to exactly 190 (million EUR) — the full 2025 pool.
export const CYCLE_2025: Cycle2025Entry[] = [
  { rank: 1, name: "N26", sector: "Fintech", votes: 18420, investmentM: 28 },
  { rank: 2, name: "Trade Republic", sector: "Fintech", votes: 17110, investmentM: 22 },
  { rank: 3, name: "Auto1 Group", sector: "E-commerce", votes: 14980, investmentM: 18 },
  { rank: 4, name: "GetYourGuide", sector: "Travel", votes: 13240, investmentM: 14 },
  { rank: 5, name: "Wefox", sector: "Insurtech", votes: 12110, investmentM: 12 },
  { rank: 6, name: "Tier Mobility", sector: "Mobility", votes: 11430, investmentM: 11 },
  { rank: 7, name: "Contentful", sector: "SaaS", votes: 10820, investmentM: 10 },
  { rank: 8, name: "Forto", sector: "Logistics", votes: 9870, investmentM: 9 },
  { rank: 9, name: "Choco", sector: "FoodTech", votes: 9210, investmentM: 8 },
  { rank: 10, name: "Mambu", sector: "Fintech", votes: 8540, investmentM: 7 },
  { rank: 11, name: "Solaris", sector: "Fintech", votes: 7960, investmentM: 6 },
  { rank: 12, name: "HomeToGo", sector: "Travel", votes: 7720, investmentM: 6 },
  { rank: 13, name: "Raisin", sector: "Fintech", votes: 7180, investmentM: 5.5 },
  { rank: 14, name: "Babbel", sector: "EdTech", votes: 6940, investmentM: 5 },
  { rank: 15, name: "CoachHub", sector: "HRTech", votes: 6510, investmentM: 4.5 },
  { rank: 16, name: "Razor Group", sector: "E-commerce", votes: 6120, investmentM: 4 },
  { rank: 17, name: "Grover", sector: "Consumer", votes: 5780, investmentM: 3.5 },
  { rank: 18, name: "Ecosia", sector: "GreenTech", votes: 5410, investmentM: 3 },
  { rank: 19, name: "Pitch", sector: "SaaS", votes: 5090, investmentM: 2.8 },
  { rank: 20, name: "Blinkist", sector: "EdTech", votes: 4860, investmentM: 2.5 },
  { rank: 21, name: "Omio", sector: "Travel", votes: 4620, investmentM: 2.3 },
  { rank: 22, name: "SoundCloud", sector: "Media", votes: 4380, investmentM: 2 },
  { rank: 23, name: "Zenjob", sector: "HRTech", votes: 3990, investmentM: 1.6 },
  { rank: 24, name: "Tomorrow", sector: "Fintech", votes: 3640, investmentM: 1.3 },
  { rank: 25, name: "Bryter", sector: "SaaS", votes: 3210, investmentM: 1 },
];

export const CYCLE_2025_TOTAL_M = 190;
export const CYCLE_2025_GROWTH_PCT = 23.4; // avg portfolio revenue growth YoY
export const CYCLE_2025_NEW_JOBS = 2840;