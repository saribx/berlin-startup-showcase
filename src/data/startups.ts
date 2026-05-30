export interface Startup {
  id: number;
  name: string;
  tagline: string;
  votes: number;
  category: string;
  emoji: string;
}

export interface Comment {
  id: string;
  author: string;
  username: string;
  role: string;
  company?: string;
  initials: string;
  avatarGradient: string;
  verified?: boolean;
  maker?: boolean;
  time: string;
  body: string;
  upvotes: number;
  replies?: Comment[];
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
  comments?: Comment[];
  heroImage?: string;
  chart?: {
    title: string;
    unit?: string;
    points: { label: string; value: number }[];
  };
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
  // Below the funding cutoff — ranks 51–100.
  { id: 51, name: "Tier Mobility", tagline: "Shared micromobility for European cities", votes: 172, category: "Mobility", emoji: "🛴" },
  { id: 52, name: "Wunder Mobility", tagline: "Operating system for shared fleets", votes: 168, category: "Mobility", emoji: "🚗" },
  { id: 53, name: "Solarisbank", tagline: "Banking-as-a-service platform for Europe", votes: 164, category: "FinTech", emoji: "🌞" },
  { id: 54, name: "Bryter", tagline: "No-code automation for legal and compliance", votes: 159, category: "DevTools", emoji: "⚖️" },
  { id: 55, name: "Builder.ai", tagline: "AI-assembled custom software for SMEs", votes: 155, category: "AI", emoji: "🧰" },
  { id: 56, name: "Coachhub", tagline: "Digital coaching platform for the global workforce", votes: 151, category: "HR Tech", emoji: "🧑‍🏫" },
  { id: 57, name: "Personio", tagline: "All-in-one HR software for European SMEs", votes: 147, category: "HR Tech", emoji: "🧑‍💼" },
  { id: 58, name: "Acolad", tagline: "AI-native language services for enterprises", votes: 143, category: "AI", emoji: "🗣️" },
  { id: 59, name: "Wandelbots", tagline: "No-code robot programming for industry", votes: 139, category: "Robotics", emoji: "🦾" },
  { id: 60, name: "Lilium", tagline: "Electric vertical take-off and landing jets", votes: 134, category: "Mobility", emoji: "🛩️" },
  { id: 61, name: "Volocopter", tagline: "Urban air mobility with electric air taxis", votes: 131, category: "Mobility", emoji: "🚁" },
  { id: 62, name: "Tomorrow", tagline: "Sustainable mobile banking for the climate", votes: 128, category: "FinTech", emoji: "🌱" },
  { id: 63, name: "Penta", tagline: "Business banking built for European founders", votes: 124, category: "FinTech", emoji: "🏛️" },
  { id: 64, name: "Mambu", tagline: "Cloud banking platform for the next generation", votes: 121, category: "FinTech", emoji: "☁️" },
  { id: 65, name: "Cosuno", tagline: "Procurement platform for construction", votes: 117, category: "Logistics", emoji: "🏗️" },
  { id: 66, name: "Klang Games", tagline: "Persistent AI-driven game worlds", votes: 114, category: "Gaming", emoji: "🌌" },
  { id: 67, name: "Wooga", tagline: "Mobile games for a global audience", votes: 110, category: "Gaming", emoji: "🎲" },
  { id: 68, name: "HelloBetter", tagline: "Evidence-based digital mental health programs", votes: 107, category: "HealthTech", emoji: "💆" },
  { id: 69, name: "Vivy", tagline: "Personal health assistant and records app", votes: 104, category: "HealthTech", emoji: "📱" },
  { id: 70, name: "Honeypot", tagline: "Developer-focused job platform", votes: 101, category: "HR Tech", emoji: "🍯" },
  { id: 71, name: "Talon.One", tagline: "Promotions and loyalty infrastructure for commerce", votes: 98, category: "Commerce", emoji: "🎟️" },
  { id: 72, name: "Spryker", tagline: "Composable commerce platform for B2B", votes: 95, category: "Commerce", emoji: "🧱" },
  { id: 73, name: "Mister Spex", tagline: "Omnichannel eyewear retailer", votes: 92, category: "Commerce", emoji: "👓" },
  { id: 74, name: "Auto1", tagline: "Europe's leading wholesale platform for used cars", votes: 90, category: "Commerce", emoji: "🚙" },
  { id: 75, name: "HomeToGo", tagline: "Metasearch for vacation rentals worldwide", votes: 87, category: "Travel", emoji: "🏖️" },
  { id: 76, name: "Omio", tagline: "Multimodal travel booking across Europe", votes: 85, category: "Travel", emoji: "🚆" },
  { id: 77, name: "FlixBus", tagline: "Long-distance travel by green-powered coach", votes: 83, category: "Mobility", emoji: "🚌" },
  { id: 78, name: "Babbel", tagline: "Language learning that actually sticks", votes: 81, category: "EdTech", emoji: "🗯️" },
  { id: 79, name: "Coursera Hub", tagline: "Berlin's hub for European online education", votes: 78, category: "EdTech", emoji: "🎓" },
  { id: 80, name: "Klar", tagline: "Open-source carbon management software", votes: 76, category: "Climate", emoji: "🌳" },
  { id: 81, name: "Plan A", tagline: "Decarbonization platform for enterprises", votes: 74, category: "Climate", emoji: "🅰️" },
  { id: 82, name: "Ineratec", tagline: "Power-to-liquid e-fuels from CO₂ and renewables", votes: 72, category: "Climate", emoji: "⛽" },
  { id: 83, name: "Sunfire", tagline: "Industrial-scale electrolyzers for green hydrogen", votes: 70, category: "Climate", emoji: "💧" },
  { id: 84, name: "Marvel Fusion", tagline: "Laser-driven inertial fusion energy", votes: 68, category: "Deep Tech", emoji: "☢️" },
  { id: 85, name: "Isar Aerospace", tagline: "Small satellite launch services from Europe", votes: 66, category: "Deep Tech", emoji: "🚀" },
  { id: 86, name: "Polarstern", tagline: "Geospatial AI for defense and security", votes: 64, category: "Defense", emoji: "⭐" },
  { id: 87, name: "Quantum Brilliance", tagline: "Diamond-based quantum accelerators", votes: 62, category: "Deep Tech", emoji: "💎" },
  { id: 88, name: "1X Robotics", tagline: "Humanoids for everyday work", votes: 60, category: "Robotics", emoji: "🤖" },
  { id: 89, name: "Magic Pony", tagline: "On-device generative video models", votes: 58, category: "AI", emoji: "🦄" },
  { id: 90, name: "DeepL", tagline: "AI translation that actually sounds human", votes: 56, category: "AI", emoji: "🌐" },
  { id: 91, name: "Langfuse", tagline: "Open-source LLM engineering platform", votes: 54, category: "DevTools", emoji: "🔭" },
  { id: 92, name: "Tradesmarter", tagline: "Trading infrastructure for European brokers", votes: 52, category: "FinTech", emoji: "📉" },
  { id: 93, name: "Layer Health", tagline: "Clinical AI agents for hospitals", votes: 50, category: "HealthTech", emoji: "🏥" },
  { id: 94, name: "Twaice", tagline: "Battery analytics for the electric economy", votes: 48, category: "Climate", emoji: "🔋" },
  { id: 95, name: "Voltfang", tagline: "Second-life batteries for stationary storage", votes: 46, category: "Climate", emoji: "🔌" },
  { id: 96, name: "Boost AI Berlin", tagline: "Sales agents that close deals at scale", votes: 44, category: "AI", emoji: "📞" },
  { id: 97, name: "Replicate Bio", tagline: "AI lab automation for life sciences", votes: 42, category: "BioTech", emoji: "🧪" },
  { id: 98, name: "Carbonyte", tagline: "Direct air capture pilots across Europe", votes: 40, category: "Climate", emoji: "🪨" },
  { id: 99, name: "Northvault", tagline: "Compliance copilot for European banks", votes: 38, category: "FinTech", emoji: "🔒" },
  { id: 100, name: "Spätzle", tagline: "Late-night convenience delivery in Berlin", votes: 36, category: "Commerce", emoji: "🌃" },
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
      {
        id: "h1", author: "Lukas Brandt", username: "lukas_brandt", role: "Defense analyst", company: "IISS",
        initials: "LB", avatarGradient: "from-orange-400 to-rose-600", verified: true,
        time: "2h ago", upvotes: 42,
        body: "Europe finally has a credible sovereign AI defense layer. The pace of Helsing's platform releases is genuinely impressive — Altra in particular is closing the gap with US primes much faster than anyone expected.",
        replies: [
          {
            id: "h1r1", author: "Gundbert Scherf", username: "gundbert", role: "Co-founder & CEO", company: "Helsing",
            initials: "GS", avatarGradient: "from-slate-700 to-slate-900", maker: true, verified: true,
            time: "1h ago", upvotes: 28,
            body: "@lukas_brandt thanks Lukas. Altra is the result of three years of sensor-fusion work — happy to share more on architecture in the next deep dive.",
          },
          {
            id: "h1r2", author: "Anders Lund", username: "anders_lund", role: "Ex-Saab engineer",
            initials: "AL", avatarGradient: "from-emerald-500 to-teal-700",
            time: "40m ago", upvotes: 11,
            body: "@gundbert would love a writeup on the autonomy stack specifically — that's the real moat.",
          },
        ],
      },
      {
        id: "h2", author: "Marie Dubois", username: "marie_dubois", role: "Policy advisor", company: "Élysée",
        initials: "MD", avatarGradient: "from-violet-500 to-fuchsia-600", verified: true,
        time: "6h ago", upvotes: 24,
        body: "Hard to overstate how strategically important this company has become for the EU. Voted.",
        replies: [
          {
            id: "h2r1", author: "Niklas Köhler", username: "niklas_k", role: "VC", company: "General Catalyst",
            initials: "NK", avatarGradient: "from-indigo-500 to-blue-700",
            time: "5h ago", upvotes: 9,
            body: "@marie_dubois agreed. The next 18 months of European defense procurement will be defined by them.",
          },
        ],
      },
      {
        id: "h3", author: "Sofia Almeida", username: "sofia_a", role: "Robotics engineer",
        initials: "SA", avatarGradient: "from-amber-400 to-orange-600",
        time: "1d ago", upvotes: 7,
        body: "Career page is wild right now — they're hiring everywhere. Anyone here interviewed recently?",
      },
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
      {
        id: "p1", author: "Sina Yıldız", username: "sina_y", role: "Head of CX", company: "Lufthansa Group",
        initials: "SY", avatarGradient: "from-sky-500 to-indigo-600", verified: true,
        time: "3h ago", upvotes: 38,
        body: "We cut average handling time by 40% on rebooking flows. Voice quality is indistinguishable from a great agent — passengers genuinely don't notice they're not talking to a human.",
        replies: [
          {
            id: "p1r1", author: "Malte Lohscheller", username: "malte_l", role: "Co-founder", company: "Parloa",
            initials: "ML", avatarGradient: "from-violet-500 to-fuchsia-600", maker: true, verified: true,
            time: "2h ago", upvotes: 19,
            body: "@sina_y thank you Sina — the LH rebooking flow is one of our favorite case studies internally. Excited about what's next on the disruption playbook.",
          },
          {
            id: "p1r2", author: "Daniel Weiss", username: "daniel_w", role: "VP Operations",
            initials: "DW", avatarGradient: "from-teal-500 to-emerald-700",
            time: "1h ago", upvotes: 6,
            body: "@sina_y any data on customer CSAT vs the previous IVR setup?",
          },
        ],
      },
      {
        id: "p2", author: "Priya Menon", username: "priya_m", role: "AI product lead",
        initials: "PM", avatarGradient: "from-rose-500 to-pink-600",
        time: "1d ago", upvotes: 17,
        body: "Finally enterprise-grade voice AI that doesn't sound like a 2018 IVR. The agent studio is the best authoring UX I've used.",
      },
      {
        id: "p3", author: "Tobias Renner", username: "tobias_r", role: "Solutions architect", company: "Telefónica",
        initials: "TR", avatarGradient: "from-amber-500 to-orange-600",
        time: "1d ago", upvotes: 12,
        body: "We benchmarked against three competitors. Orchestration model + low-latency voice put Parloa ahead by a wide margin.",
      },
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
      {
        id: "t1", author: "Elena Rossi", username: "elena_r", role: "FinTech analyst", company: "Sifted",
        initials: "ER", avatarGradient: "from-emerald-500 to-teal-700", verified: true,
        time: "5h ago", upvotes: 56,
        body: "The most important consumer fintech to come out of Europe this decade. Distribution is unreal — 8M+ customers across 17 markets with extremely lean unit economics.",
        replies: [
          {
            id: "t1r1", author: "Christian Hecker", username: "christian_h", role: "Co-founder & CEO", company: "Trade Republic",
            initials: "CH", avatarGradient: "from-green-600 to-emerald-800", maker: true, verified: true,
            time: "4h ago", upvotes: 41,
            body: "@elena_r thanks Elena. We're particularly proud of how the cash account and saveback have brought new investors into the market who never owned an ETF before.",
          },
          {
            id: "t1r2", author: "Jonas Keller", username: "jonas_k", role: "Retail investor",
            initials: "JK", avatarGradient: "from-blue-500 to-indigo-700",
            time: "3h ago", upvotes: 14,
            body: "@christian_h saveback was the feature that finally got my partner to start investing. Massive deal.",
          },
        ],
      },
      {
        id: "t2", author: "Maximilian Voss", username: "max_v", role: "Portfolio manager",
        initials: "MV", avatarGradient: "from-orange-500 to-rose-600",
        time: "8h ago", upvotes: 22,
        body: "Custody crossed €100B this year. Quietly one of the largest investment platforms in Europe now.",
      },
      {
        id: "t3", author: "Tom Becker", username: "tom_b", role: "Software engineer",
        initials: "TB", avatarGradient: "from-cyan-500 to-blue-700",
        time: "1d ago", upvotes: 9,
        body: "App performance got noticeably better in the last release. Voted.",
      },
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