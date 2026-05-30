export interface Startup {
  id: number;
  name: string;
  tagline: string;
  votes: number;
  category: string;
  emoji: string;
}

export interface StartupDetail extends Startup {
  description: string;
  founded: string;
  team: number;
  funding: string;
  users: string;
  website: string;
  images: { color: string; label: string }[];
  metrics: { label: string; value: string }[];
}

export const startups: Startup[] = [
  { id: 1, name: "Zenflow", tagline: "AI-powered focus timer for deep work sessions", votes: 1428, category: "Productivity", emoji: "🧘" },
  { id: 2, name: "Klang", tagline: "Collaborative music production in the browser", votes: 1305, category: "Audio", emoji: "🎧" },
  { id: 3, name: "Brückenbau", tagline: "Connecting freelancers with Berlin agencies", votes: 1187, category: "Marketplace", emoji: "🌉" },
  { id: 4, name: "Mondkraft", tagline: "Renewable energy investing for everyone", votes: 1042, category: "Climate", emoji: "🌙" },
  { id: 5, name: "Pixelhaus", tagline: "Design system platform for product teams", votes: 998, category: "Design", emoji: "🎨" },
  { id: 6, name: "Spreely", tagline: "Local social network for Berlin neighborhoods", votes: 921, category: "Social", emoji: "🗺️" },
  { id: 7, name: "Currywurst.io", tagline: "Find the best street food near you", votes: 884, category: "Food", emoji: "🌭" },
  { id: 8, name: "Tagebuch", tagline: "Private AI journaling with end-to-end encryption", votes: 812, category: "Wellness", emoji: "📓" },
  { id: 9, name: "Velocode", tagline: "Bike-share API for European cities", votes: 778, category: "Mobility", emoji: "🚲" },
  { id: 10, name: "Mietfair", tagline: "Transparent rental price tracking", votes: 745, category: "PropTech", emoji: "🏠" },
  { id: 11, name: "Schichtwerk", tagline: "Shift scheduling for hospitality teams", votes: 712, category: "HR Tech", emoji: "📅" },
  { id: 12, name: "Funkpost", tagline: "Async voice messages for distributed teams", votes: 689, category: "SaaS", emoji: "📡" },
  { id: 13, name: "Kiezgarten", tagline: "Community gardening coordination app", votes: 654, category: "Climate", emoji: "🌱" },
  { id: 14, name: "Bahnhof", tagline: "Real-time train delay predictions", votes: 631, category: "Mobility", emoji: "🚆" },
  { id: 15, name: "Steuerblitz", tagline: "Tax filing in under 10 minutes", votes: 605, category: "FinTech", emoji: "⚡" },
  { id: 16, name: "Werkstatt", tagline: "Booking platform for repair shops", votes: 588, category: "Marketplace", emoji: "🔧" },
  { id: 17, name: "Lichtblick", tagline: "Mental health support via SMS", votes: 562, category: "HealthTech", emoji: "💡" },
  { id: 18, name: "Pfandhaus", tagline: "Deposit return tracker for bottles", votes: 540, category: "Sustainability", emoji: "♻️" },
  { id: 19, name: "Notenheft", tagline: "Sheet music marketplace for indie composers", votes: 521, category: "Audio", emoji: "🎼" },
  { id: 20, name: "Wolkenburg", tagline: "European-hosted cloud storage", votes: 498, category: "Infrastructure", emoji: "☁️" },
  { id: 21, name: "Spielzeit", tagline: "Indie game discovery platform", votes: 477, category: "Gaming", emoji: "🎮" },
  { id: 22, name: "Hafenkran", tagline: "Logistics dashboard for SMEs", votes: 459, category: "Logistics", emoji: "🏗️" },
  { id: 23, name: "Stadtplan", tagline: "Crowdsourced accessibility maps", votes: 438, category: "Civic", emoji: "🗺️" },
  { id: 24, name: "Kaffeepause", tagline: "Coffee subscription from local roasters", votes: 420, category: "Food", emoji: "☕" },
  { id: 25, name: "Fenster", tagline: "Window cleaning marketplace", votes: 401, category: "Services", emoji: "🪟" },
  { id: 26, name: "Rückenwind", tagline: "Headwind-aware cycling navigation", votes: 388, category: "Mobility", emoji: "💨" },
  { id: 27, name: "Sonnenwind", tagline: "Solar panel installation finder", votes: 372, category: "Climate", emoji: "☀️" },
  { id: 28, name: "Tischlein", tagline: "Restaurant reservations without fees", votes: 359, category: "Food", emoji: "🍽️" },
  { id: 29, name: "Buchstabe", tagline: "AI proofreading for German texts", votes: 341, category: "AI", emoji: "✍️" },
  { id: 30, name: "Flohmarkt", tagline: "Hyperlocal second-hand marketplace", votes: 325, category: "Marketplace", emoji: "🛍️" },
  { id: 31, name: "Stadtwerk", tagline: "Smart meter analytics for utilities", votes: 312, category: "Energy", emoji: "⚙️" },
  { id: 32, name: "Postbote", tagline: "Carbon-neutral parcel delivery", votes: 298, category: "Logistics", emoji: "📦" },
  { id: 33, name: "Lehrling", tagline: "Apprenticeship matching platform", votes: 284, category: "EdTech", emoji: "🎓" },
  { id: 34, name: "Eisbär", tagline: "Cold-chain monitoring IoT devices", votes: 271, category: "IoT", emoji: "🐻‍❄️" },
  { id: 35, name: "Weinrebe", tagline: "Natural wine recommendations", votes: 258, category: "Food", emoji: "🍷" },
  { id: 36, name: "Spielplatz", tagline: "Playground reviews for parents", votes: 244, category: "Family", emoji: "🛝" },
  { id: 37, name: "Werkzeug", tagline: "Tool rental between neighbors", votes: 231, category: "Sharing", emoji: "🛠️" },
  { id: 38, name: "Backofen", tagline: "Bakery surplus marketplace", votes: 218, category: "Food", emoji: "🥖" },
  { id: 39, name: "Glashaus", tagline: "Greenhouse automation for urban farms", votes: 205, category: "AgTech", emoji: "🌿" },
  { id: 40, name: "Schreibtisch", tagline: "Hot-desk booking for coworking spaces", votes: 192, category: "PropTech", emoji: "💼" },
  { id: 41, name: "Eichhorn", tagline: "Crypto tax calculator for Germany", votes: 178, category: "FinTech", emoji: "🐿️" },
  { id: 42, name: "Kompass", tagline: "Career coaching marketplace", votes: 165, category: "HR Tech", emoji: "🧭" },
  { id: 43, name: "Mosaik", tagline: "Modular CRM for solo founders", votes: 152, category: "SaaS", emoji: "🧩" },
  { id: 44, name: "Wasserglas", tagline: "Refill water station locator", votes: 139, category: "Sustainability", emoji: "💧" },
  { id: 45, name: "Lichthof", tagline: "Photography studio bookings", votes: 126, category: "Marketplace", emoji: "📸" },
  { id: 46, name: "Stoffwechsel", tagline: "Metabolic health tracking app", votes: 113, category: "HealthTech", emoji: "🔬" },
  { id: 47, name: "Holzweg", tagline: "Sustainable furniture marketplace", votes: 99, category: "Marketplace", emoji: "🪵" },
  { id: 48, name: "Funkturm", tagline: "Mesh network for IoT devices", votes: 84, category: "Infrastructure", emoji: "📶" },
  { id: 49, name: "Glücksrad", tagline: "Gamified savings account", votes: 71, category: "FinTech", emoji: "🎡" },
  { id: 50, name: "Spätkauf", tagline: "Late-night convenience delivery", votes: 58, category: "Delivery", emoji: "🌃" },
];

const richMetrics = [
  { label: "Founded", key: "founded" },
];

export const startupDetails: Record<number, StartupDetail> = {
  1: {
    ...startups[0],
    description:
      "Zenflow combines neuroscience-backed focus techniques with an adaptive AI timer that learns your peak hours. Schedule deep work sessions, block distracting apps, and track your weekly focus score. Built in Kreuzberg by ex-Spotify engineers, Zenflow is used by over 40,000 knowledge workers across Europe.",
    founded: "2022",
    team: 14,
    funding: "€3.2M Seed",
    users: "42,000+",
    website: "zenflow.berlin",
    images: [
      { color: "from-orange-400 to-rose-500", label: "Focus Dashboard" },
      { color: "from-rose-500 to-pink-600", label: "Session Analytics" },
      { color: "from-amber-400 to-orange-500", label: "AI Coach" },
    ],
    metrics: [
      { label: "Founded", value: "2022" },
      { label: "Team size", value: "14 people" },
      { label: "Funding", value: "€3.2M Seed" },
      { label: "Active users", value: "42,000+" },
      { label: "MRR", value: "€85K" },
      { label: "Retention (90d)", value: "68%" },
    ],
  },
  2: {
    ...startups[1],
    description:
      "Klang is a browser-based DAW that lets producers, vocalists, and instrumentalists jam together in real time, anywhere in the world. With sub-30ms latency, built-in synths, and a sample library curated by Berlin's underground, Klang is reshaping how electronic music gets made.",
    founded: "2021",
    team: 22,
    funding: "€7.5M Series A",
    users: "120,000+",
    website: "klang.studio",
    images: [
      { color: "from-violet-500 to-purple-700", label: "Live Session" },
      { color: "from-fuchsia-500 to-violet-600", label: "Sample Library" },
      { color: "from-indigo-500 to-blue-700", label: "Mixer View" },
    ],
    metrics: [
      { label: "Founded", value: "2021" },
      { label: "Team size", value: "22 people" },
      { label: "Funding", value: "€7.5M Series A" },
      { label: "Active users", value: "120,000+" },
      { label: "Tracks created", value: "2.1M" },
      { label: "Avg session", value: "47 min" },
    ],
  },
  3: {
    ...startups[2],
    description:
      "Brückenbau is the trusted bridge between Berlin's 18,000+ creative freelancers and the agencies that need them. Vetted talent, transparent pricing, and contracts that protect both sides. No race-to-the-bottom bidding, ever.",
    founded: "2020",
    team: 11,
    funding: "€1.8M Seed",
    users: "8,400 freelancers",
    website: "brueckenbau.de",
    images: [
      { color: "from-emerald-500 to-teal-700", label: "Talent Browser" },
      { color: "from-teal-500 to-cyan-700", label: "Project Brief" },
      { color: "from-green-500 to-emerald-700", label: "Contract Flow" },
    ],
    metrics: [
      { label: "Founded", value: "2020" },
      { label: "Team size", value: "11 people" },
      { label: "Funding", value: "€1.8M Seed" },
      { label: "Freelancers", value: "8,400" },
      { label: "GMV (2025)", value: "€12.4M" },
      { label: "Match rate", value: "73%" },
    ],
  },
};

export function getDetail(id: number): StartupDetail {
  const existing = startupDetails[id];
  if (existing) return existing;
  const base = startups.find((s) => s.id === id)!;
  return {
    ...base,
    description: `${base.name} is a Berlin-based ${base.category.toLowerCase()} startup building ${base.tagline.toLowerCase()}. Detailed information about this product is coming soon — the team is currently in stealth mode preparing their public launch.`,
    founded: "2023",
    team: 6,
    funding: "Pre-seed",
    users: "Private beta",
    website: `${base.name.toLowerCase()}.berlin`,
    images: [
      { color: "from-slate-400 to-slate-600", label: "Coming soon" },
      { color: "from-zinc-400 to-zinc-600", label: "Coming soon" },
      { color: "from-neutral-400 to-neutral-600", label: "Coming soon" },
    ],
    metrics: [
      { label: "Founded", value: "2023" },
      { label: "Team size", value: "6 people" },
      { label: "Funding", value: "Pre-seed" },
      { label: "Stage", value: "Private beta" },
    ],
  };
}