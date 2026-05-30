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
  comments?: { author: string; role: string; initials: string; time: string; body: string }[];
}

// Real Berlin startups (2026). Top 10 = the "heißesten" list, then the rest.
export const startups: Startup[] = [
  { id: 1, name: "Helsing", tagline: "Europe's defense AI for sovereignty and deterrence", votes: 2841, category: "Defense", emoji: "🛡️" },
  { id: 2, name: "Parloa", tagline: "Conversational AI platform for enterprise customer service", votes: 2519, category: "AI", emoji: "🗣️" },
  { id: 3, name: "Trade Republic", tagline: "Mobile broker and savings infrastructure for Europe", votes: 2387, category: "FinTech", emoji: "📈" },
  { id: 4, name: "N26", tagline: "The mobile bank for Europe", votes: 2156, category: "FinTech", emoji: "🏦" },
  { id: 5, name: "Enpal", tagline: "Solar, batteries and heat pumps on subscription", votes: 1984, category: "Climate", emoji: "☀️" },
  { id: 6, name: "Upvest", tagline: "Investment infrastructure API for banks and brokers", votes: 1812, category: "FinTech", emoji: "🧱" },
  { id: 7, name: "GetYourGuide", tagline: "Book unforgettable travel experiences anywhere", votes: 1745, category: "Travel", emoji: "🗺️" },
  { id: 8, name: "n8n", tagline: "Workflow automation and AI agents, source-available", votes: 1689, category: "DevTools", emoji: "🔗" },
  { id: 9, name: "Stark", tagline: "AI-defined drones and autonomous defense systems", votes: 1612, category: "Defense", emoji: "🚁" },
  { id: 10, name: "Sennder", tagline: "Digital road freight forwarding across Europe", votes: 1548, category: "Logistics", emoji: "🚛" },
  { id: 11, name: "Contentful", tagline: "Headless content platform for digital experiences", votes: 1421, category: "DevTools", emoji: "📦" },
  { id: 12, name: "Forto", tagline: "Digital freight forwarding for global supply chains", votes: 1376, category: "Logistics", emoji: "🚢" },
  { id: 13, name: "Flink", tagline: "Groceries delivered to your door in minutes", votes: 1342, category: "Commerce", emoji: "🛒" },
  { id: 14, name: "Raisin", tagline: "Europe-wide marketplace for savings and investments", votes: 1298, category: "FinTech", emoji: "💰" },
  { id: 15, name: "Ada Health", tagline: "AI-powered health assessment and triage", votes: 1244, category: "HealthTech", emoji: "🩺" },
  { id: 16, name: "Choco", tagline: "Digitizing ordering between restaurants and suppliers", votes: 1187, category: "Commerce", emoji: "🍽️" },
  { id: 17, name: "Moss", tagline: "Corporate spend management for European SMEs", votes: 1142, category: "FinTech", emoji: "💳" },
  { id: 18, name: "Pliant", tagline: "Programmable B2B credit cards and payments", votes: 1098, category: "FinTech", emoji: "💼" },
  { id: 19, name: "1KOMMA5°", tagline: "Smart energy platform for the all-electric home", votes: 1055, category: "Climate", emoji: "⚡" },
  { id: 20, name: "Neura Robotics", tagline: "Cognitive humanoid robots for industry and home", votes: 1021, category: "Robotics", emoji: "🤖" },
  { id: 21, name: "Synthflow", tagline: "No-code voice AI agents for any business", votes: 987, category: "AI", emoji: "🎙️" },
  { id: 22, name: "cargo.one", tagline: "The booking platform for global air cargo", votes: 943, category: "Logistics", emoji: "✈️" },
  { id: 23, name: "Zolar", tagline: "Configure and install your own solar system online", votes: 908, category: "Climate", emoji: "🔆" },
  { id: 24, name: "Ostrom", tagline: "Transparent digital electricity for Germany", votes: 871, category: "Climate", emoji: "🔌" },
  { id: 25, name: "LiveEO", tagline: "Satellite monitoring for critical infrastructure", votes: 832, category: "Deep Tech", emoji: "🛰️" },
  { id: 26, name: "Climatiq", tagline: "Carbon accounting API for any product or process", votes: 798, category: "Climate", emoji: "🌍" },
  { id: 27, name: "ecoworks", tagline: "Industrial-scale serial retrofit of buildings", votes: 761, category: "Climate", emoji: "🏗️" },
  { id: 28, name: "Cloover", tagline: "Financing infrastructure for the energy transition", votes: 728, category: "Climate", emoji: "💸" },
  { id: 29, name: "AIRMO", tagline: "Methane emissions monitoring from space", votes: 694, category: "Climate", emoji: "💨" },
  { id: 30, name: "Ratepay", tagline: "White-label buy-now-pay-later for merchants", votes: 662, category: "FinTech", emoji: "🧾" },
  { id: 31, name: "Midas", tagline: "Tokenized real-world assets for on-chain yield", votes: 631, category: "FinTech", emoji: "🪙" },
  { id: 32, name: "Finperks", tagline: "Embedded finance benefits for the workforce", votes: 604, category: "FinTech", emoji: "🎁" },
  { id: 33, name: "Kupando", tagline: "Working capital financing for European SMEs", votes: 578, category: "FinTech", emoji: "📊" },
  { id: 34, name: "Qontext", tagline: "Enterprise AI knowledge systems on your data", votes: 552, category: "AI", emoji: "🧠" },
  { id: 35, name: "Cognee", tagline: "Memory infrastructure for AI agents", votes: 527, category: "AI", emoji: "🧬" },
  { id: 36, name: "Diligent AI", tagline: "Autonomous AI agents for back-office operations", votes: 503, category: "AI", emoji: "🤝" },
  { id: 37, name: "Gretchen AI", tagline: "Deepfake detection and AI security for enterprises", votes: 481, category: "AI", emoji: "🛟" },
  { id: 38, name: "GitButler", tagline: "A new Git client built for modern developer workflows", votes: 458, category: "DevTools", emoji: "🦋" },
  { id: 39, name: "Plato", tagline: "Mentorship and leadership development for engineers", votes: 432, category: "HR Tech", emoji: "🎓" },
  { id: 40, name: "NetBird", tagline: "WireGuard-based secure networking for distributed teams", votes: 408, category: "DevTools", emoji: "🐦" },
  { id: 41, name: "Andercore", tagline: "Enterprise infrastructure software for industry", votes: 386, category: "Deep Tech", emoji: "⚙️" },
  { id: 42, name: "Cellbricks", tagline: "3D-bioprinted human tissue for drug discovery", votes: 362, category: "BioTech", emoji: "🧫" },
  { id: 43, name: "Metiundo", tagline: "Geospatial intelligence for the built environment", votes: 339, category: "Deep Tech", emoji: "🗺️" },
  { id: 44, name: "JustPlay", tagline: "Earn real rewards for playing mobile games", votes: 318, category: "Gaming", emoji: "🎮" },
  { id: 45, name: "Bounti", tagline: "AI sales agents for outbound commerce teams", votes: 295, category: "AI", emoji: "🎯" },
  { id: 46, name: "Cara Care", tagline: "Digital therapy programs for chronic gut conditions", votes: 273, category: "HealthTech", emoji: "💚" },
  { id: 47, name: "mika", tagline: "App-based companion for cancer patients", votes: 251, category: "HealthTech", emoji: "🌸" },
  { id: 48, name: "YOU(th) Health", tagline: "Digital health platform for the next generation", votes: 228, category: "HealthTech", emoji: "🌱" },
  { id: 49, name: "Aignostics", tagline: "AI for pathology and precision medicine", votes: 206, category: "BioTech", emoji: "🔬" },
  { id: 50, name: "Remi Health", tagline: "Sustainability and health data for organizations", votes: 184, category: "HealthTech", emoji: "📈" },
];

export const startupDetails: Record<number, StartupDetail> = {
  1: {
    ...startups[0],
    description:
      "Helsing builds AI software for defense, integrating real-time sensor data into a unified picture for operators and autonomous platforms. Headquartered in Munich with a major Berlin presence, Helsing has become Europe's most valuable defense AI company, partnering with governments and primes on air, land and maritime systems to strengthen democratic deterrence.",
    founded: "2021",
    team: 850,
    funding: "€1.4B (Series D)",
    users: "Multiple NATO nations",
    website: "helsing.ai",
    images: [
      { color: "from-slate-700 to-slate-900", label: "Altra Mission Software" },
      { color: "from-zinc-700 to-slate-800", label: "Autonomous Platforms" },
      { color: "from-neutral-700 to-zinc-900", label: "Sensor Fusion" },
    ],
    metrics: [
      { label: "Founded", value: "2021" },
      { label: "Team size", value: "850+" },
      { label: "Last round", value: "€1.4B Series D" },
      { label: "Valuation", value: "€12B" },
      { label: "HQ", value: "Munich / Berlin" },
      { label: "Markets", value: "EU + UK" },
    ],
    comments: [
      { author: "Lukas Brandt", role: "Defense analyst", initials: "LB", time: "2h ago", body: "Europe finally has a credible sovereign AI defense layer. The pace of Helsing's platform releases is genuinely impressive." },
      { author: "Marie Dubois", role: "Policy advisor, Paris", initials: "MD", time: "6h ago", body: "Hard to overstate how strategically important this company has become for the EU. Voted." },
      { author: "Anders Lund", role: "Ex-Saab engineer", initials: "AL", time: "1d ago", body: "Sensor fusion quality is on a different level. The autonomy stack is the real moat." },
    ],
  },
  2: {
    ...startups[1],
    description:
      "Parloa is a conversational AI platform that lets enterprises automate customer service across phone, chat and messaging with human-quality voice agents. Used by airlines, telcos and insurers, Parloa raised a large round in 2026 pushing its valuation to roughly $3B and making it one of Europe's flagship applied-AI companies.",
    founded: "2017",
    team: 320,
    funding: "$120M Series C",
    users: "Enterprises in 25+ countries",
    website: "parloa.com",
    images: [
      { color: "from-indigo-500 to-violet-700", label: "Agent Studio" },
      { color: "from-violet-500 to-fuchsia-600", label: "Voice Console" },
      { color: "from-blue-500 to-indigo-700", label: "Analytics" },
    ],
    metrics: [
      { label: "Founded", value: "2017" },
      { label: "Team size", value: "320" },
      { label: "Last round", value: "$120M Series C" },
      { label: "Valuation", value: "~$3B" },
      { label: "Enterprise logos", value: "200+" },
      { label: "Calls handled / yr", value: "1B+" },
    ],
    comments: [
      { author: "Sina Yıldız", role: "Head of CX, Lufthansa Group", initials: "SY", time: "3h ago", body: "We cut average handling time by 40% on rebooking flows. Voice quality is indistinguishable from a great agent." },
      { author: "Daniel Weiss", role: "VP Operations", initials: "DW", time: "7h ago", body: "Best agent-building UX in the market right now. The orchestration model is the secret sauce." },
      { author: "Priya Menon", role: "AI product lead", initials: "PM", time: "1d ago", body: "Finally enterprise-grade voice AI that doesn't sound like a 2018 IVR." },
    ],
  },
  3: {
    ...startups[2],
    description:
      "Trade Republic is Europe's mobile broker and savings platform, offering commission-free trading, ETF savings plans, a cash account paying real interest and a Visa debit card with saveback. With millions of customers and tens of billions of euros under custody, it has become the default investing app for a generation of Europeans.",
    founded: "2015",
    team: 900,
    funding: "$1.3B raised",
    users: "8M+ customers",
    website: "traderepublic.com",
    images: [
      { color: "from-emerald-500 to-teal-700", label: "Portfolio" },
      { color: "from-teal-500 to-cyan-700", label: "Savings Plans" },
      { color: "from-green-500 to-emerald-700", label: "Card & Saveback" },
    ],
    metrics: [
      { label: "Founded", value: "2015" },
      { label: "Team size", value: "900" },
      { label: "Total raised", value: "$1.3B" },
      { label: "Customers", value: "8M+" },
      { label: "Assets in custody", value: "€100B+" },
      { label: "Markets", value: "17 EU countries" },
    ],
    comments: [
      { author: "Jonas Keller", role: "Retail investor", initials: "JK", time: "1h ago", body: "Switched my entire ETF savings plan over two years ago and never looked back. The card with saveback is genuinely useful." },
      { author: "Elena Rossi", role: "FinTech analyst, Milan", initials: "ER", time: "5h ago", body: "The most important consumer fintech to come out of Europe this decade. Distribution is unreal." },
      { author: "Tom Becker", role: "Software engineer", initials: "TB", time: "1d ago", body: "App performance got noticeably better in the last release. Voted." },
    ],
  },
};

export function getDetail(id: number): StartupDetail {
  const existing = startupDetails[id];
  if (existing) return existing;
  const base = startups.find((s) => s.id === id)!;
  const slug = base.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .replace(/^-+|-+$/g, "");
  return {
    ...base,
    description: `${base.name} is a Berlin-based ${base.category.toLowerCase()} company building ${base.tagline.toLowerCase()}. More detailed information about traction, team and funding for ${base.name} will be added soon.`,
    founded: "—",
    team: 0,
    funding: "Undisclosed",
    users: "—",
    website: `${slug}.com`,
    images: [
      { color: "from-slate-400 to-slate-600", label: "Coming soon" },
      { color: "from-zinc-400 to-zinc-600", label: "Coming soon" },
      { color: "from-neutral-400 to-neutral-600", label: "Coming soon" },
    ],
    metrics: [
      { label: "Category", value: base.category },
      { label: "Based in", value: "Berlin" },
      { label: "Funding", value: "Undisclosed" },
      { label: "Details", value: "Coming soon" },
    ],
  };
}