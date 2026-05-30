export type Cycle2025Entry = {
  rank: number;
  name: string;
  sector: string;
  votes: number;
  investmentM: number; // millions of EUR
  domain?: string;
  growthPct: number; // YoY revenue growth in %
  roiPct: number;    // fund-marked ROI in %
  newJobs: number;   // new hires funded in this cycle
};

// Top 25 best-performing Berlin startups in the 2025 cycle.
// Investment is decided by the fund managers — independent from the public vote.
// Investment values sum to exactly 190 (million EUR) — the full 2025 pool.
export const CYCLE_2025: Cycle2025Entry[] = [
  { rank: 1, name: "N26", sector: "Fintech", votes: 11430, investmentM: 28, domain: "n26.com", growthPct: 18, roiPct: 14, newJobs: 280 },
  { rank: 2, name: "Trade Republic", sector: "Fintech", votes: 7180, investmentM: 22, domain: "traderepublic.com", growthPct: 41, roiPct: 32, newJobs: 240 },
  { rank: 3, name: "Auto1 Group", sector: "E-commerce", votes: 18420, investmentM: 18, domain: "auto1-group.com", growthPct: 12, roiPct: 9, newJobs: 190 },
  { rank: 4, name: "GetYourGuide", sector: "Travel", votes: 13240, investmentM: 14, domain: "getyourguide.com", growthPct: 36, roiPct: 24, newJobs: 175 },
  { rank: 5, name: "Wefox", sector: "Insurtech", votes: 12110, investmentM: 12, domain: "wefox.com", growthPct: 22, roiPct: 11, newJobs: 140 },
  { rank: 6, name: "Tier Mobility", sector: "Mobility", votes: 11430, investmentM: 11, domain: "tier.app", growthPct: 8, roiPct: 4, newJobs: 95 },
  { rank: 7, name: "Contentful", sector: "SaaS", votes: 10820, investmentM: 10, domain: "contentful.com", growthPct: 29, roiPct: 21, newJobs: 130 },
  { rank: 8, name: "Forto", sector: "Logistics", votes: 3640, investmentM: 9, domain: "forto.com", growthPct: 15, roiPct: 7, newJobs: 110 },
  { rank: 9, name: "Choco", sector: "FoodTech", votes: 17110, investmentM: 8, domain: "choco.com", growthPct: 54, roiPct: 38, newJobs: 145 },
  { rank: 10, name: "Mambu", sector: "Fintech", votes: 5090, investmentM: 7, domain: "mambu.com", growthPct: 26, roiPct: 17, newJobs: 95 },
  { rank: 11, name: "Solaris", sector: "Fintech", votes: 7960, investmentM: 6, domain: "solarisgroup.com", growthPct: 10, roiPct: 5, newJobs: 70 },
  { rank: 12, name: "HomeToGo", sector: "Travel", votes: 14980, investmentM: 6, domain: "hometogo.com", growthPct: 31, roiPct: 22, newJobs: 85 },
  { rank: 13, name: "Raisin", sector: "Fintech", votes: 4380, investmentM: 5.5, domain: "raisin.com", growthPct: 24, roiPct: 16, newJobs: 80 },
  { rank: 14, name: "Babbel", sector: "EdTech", votes: 10820, investmentM: 5, domain: "babbel.com", growthPct: 19, roiPct: 12, newJobs: 75 },
  { rank: 15, name: "CoachHub", sector: "HRTech", votes: 3210, investmentM: 4.5, domain: "coachhub.com", growthPct: 33, roiPct: 19, newJobs: 90 },
  { rank: 16, name: "Razor Group", sector: "E-commerce", votes: 8540, investmentM: 4, domain: "razor-group.com", growthPct: 6, roiPct: 3, newJobs: 55 },
  { rank: 17, name: "Grover", sector: "Consumer", votes: 12110, investmentM: 3.5, domain: "grover.com", growthPct: 21, roiPct: 11, newJobs: 65 },
  { rank: 18, name: "Ecosia", sector: "GreenTech", votes: 16540, investmentM: 3, domain: "ecosia.org", growthPct: 47, roiPct: 28, newJobs: 90 },
  { rank: 19, name: "Pitch", sector: "SaaS", votes: 5780, investmentM: 2.8, domain: "pitch.com", growthPct: 17, roiPct: 9, newJobs: 45 },
  { rank: 20, name: "Blinkist", sector: "EdTech", votes: 7720, investmentM: 2.5, domain: "blinkist.com", growthPct: 14, roiPct: 8, newJobs: 40 },
  { rank: 21, name: "Omio", sector: "Travel", votes: 6940, investmentM: 2.3, domain: "omio.com", growthPct: 25, roiPct: 15, newJobs: 55 },
  { rank: 22, name: "SoundCloud", sector: "Media", votes: 9870, investmentM: 2, domain: "soundcloud.com", growthPct: 9, roiPct: 4, newJobs: 35 },
  { rank: 23, name: "Zenjob", sector: "HRTech", votes: 6120, investmentM: 1.6, domain: "zenjob.com", growthPct: 28, roiPct: 18, newJobs: 50 },
  { rank: 24, name: "Tomorrow", sector: "Fintech", votes: 5410, investmentM: 1.3, domain: "tomorrow.one", growthPct: 38, roiPct: 23, newJobs: 45 },
  { rank: 25, name: "Bryter", sector: "SaaS", votes: 4620, investmentM: 1, domain: "bryter.com", growthPct: 44, roiPct: 27, newJobs: 60 },
];

export const CYCLE_2025_TOTAL_M = 190;
export const CYCLE_2025_GROWTH_PCT = 23.4; // avg portfolio revenue growth YoY
export const CYCLE_2025_NEW_JOBS = 2840;
export const CYCLE_2025_ROI_PCT = 16.8; // weighted fund ROI
export const CYCLE_2025_VOTERS = 612_400; // Berliners who participated
export const CYCLE_2025_VOTER_TURNOUT_PCT = 28.4;
export const CYCLE_2025_APPLICATIONS = 1_842;

// Quarterly capital deployment (M €) — sums to 190
export const CYCLE_2025_DEPLOYMENT = [
  { quarter: "Q1", deployedM: 18, cumulativeM: 18 },
  { quarter: "Q2", deployedM: 46, cumulativeM: 64 },
  { quarter: "Q3", deployedM: 78, cumulativeM: 142 },
  { quarter: "Q4", deployedM: 48, cumulativeM: 190 },
];
