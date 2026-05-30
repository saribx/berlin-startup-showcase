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
  { id: 1, name: "Helsing", tagline: "Europe's defense AI for sovereignty and deterrence", votes: 490970, category: "Defense", emoji: "🛡️" },
  { id: 2, name: "Parloa", tagline: "Conversational AI platform for enterprise customer service", votes: 436230, category: "AI", emoji: "🗣️" },
  { id: 3, name: "Trade Republic", tagline: "Mobile broker and savings infrastructure for Europe", votes: 413790, category: "FinTech", emoji: "📈" },
  { id: 4, name: "N26", tagline: "The mobile bank for Europe", votes: 374520, category: "FinTech", emoji: "🏦" },
  { id: 5, name: "Enpal", tagline: "Solar, batteries and heat pumps on subscription", votes: 345280, category: "Climate", emoji: "☀️" },
  { id: 6, name: "Upvest", tagline: "Investment infrastructure API for banks and brokers", votes: 316040, category: "FinTech", emoji: "🧱" },
  { id: 7, name: "GetYourGuide", tagline: "Book unforgettable travel experiences anywhere", votes: 304650, category: "Travel", emoji: "🗺️" },
  { id: 8, name: "n8n", tagline: "Workflow automation and AI agents, source-available", votes: 295130, category: "DevTools", emoji: "🔗" },
  { id: 9, name: "Stark", tagline: "AI-defined drones and autonomous defense systems", votes: 282040, category: "Defense", emoji: "🚁" },
  { id: 10, name: "Sennder", tagline: "Digital road freight forwarding across Europe", votes: 271160, category: "Logistics", emoji: "🚛" },
  { id: 11, name: "Contentful", tagline: "Headless content platform for digital experiences", votes: 249570, category: "DevTools", emoji: "📦" },
  { id: 12, name: "Forto", tagline: "Digital freight forwarding for global supply chains", votes: 241920, category: "Logistics", emoji: "🚢" },
  { id: 13, name: "Flink", tagline: "Groceries delivered to your door in minutes", votes: 236140, category: "Commerce", emoji: "🛒" },
  { id: 14, name: "Raisin", tagline: "Europe-wide marketplace for savings and investments", votes: 228660, category: "FinTech", emoji: "💰" },
  { id: 15, name: "Ada Health", tagline: "AI-powered health assessment and triage", votes: 219480, category: "HealthTech", emoji: "🩺" },
  { id: 16, name: "Choco", tagline: "Digitizing ordering between restaurants and suppliers", votes: 209790, category: "Commerce", emoji: "🍽️" },
  { id: 17, name: "Moss", tagline: "Corporate spend management for European SMEs", votes: 202140, category: "FinTech", emoji: "💳" },
  { id: 18, name: "Pliant", tagline: "Programmable B2B credit cards and payments", votes: 194660, category: "FinTech", emoji: "💼" },
  { id: 19, name: "1KOMMA5°", tagline: "Smart energy platform for the all-electric home", votes: 187350, category: "Climate", emoji: "⚡" },
  { id: 20, name: "Neura Robotics", tagline: "Cognitive humanoid robots for industry and home", votes: 181570, category: "Robotics", emoji: "🤖" },
  { id: 21, name: "Synthflow", tagline: "No-code voice AI agents for any business", votes: 175790, category: "AI", emoji: "🎙️" },
  { id: 22, name: "cargo.one", tagline: "The booking platform for global air cargo", votes: 168310, category: "Logistics", emoji: "✈️" },
  { id: 23, name: "Zolar", tagline: "Configure and install your own solar system online", votes: 162360, category: "Climate", emoji: "🔆" },
  { id: 24, name: "Ostrom", tagline: "Transparent digital electricity for Germany", votes: 156070, category: "Climate", emoji: "🔌" },
  { id: 25, name: "LiveEO", tagline: "Satellite monitoring for critical infrastructure", votes: 149440, category: "Deep Tech", emoji: "🛰️" },
  { id: 26, name: "Climatiq", tagline: "Carbon accounting API for any product or process", votes: 143660, category: "Climate", emoji: "🌍" },
  { id: 27, name: "ecoworks", tagline: "Industrial-scale serial retrofit of buildings", votes: 137370, category: "Climate", emoji: "🏗️" },
  { id: 28, name: "Cloover", tagline: "Financing infrastructure for the energy transition", votes: 131760, category: "Climate", emoji: "💸" },
  { id: 29, name: "AIRMO", tagline: "Methane emissions monitoring from space", votes: 125980, category: "Climate", emoji: "💨" },
  { id: 30, name: "Ratepay", tagline: "White-label buy-now-pay-later for merchants", votes: 120540, category: "FinTech", emoji: "🧾" },
  { id: 31, name: "Midas", tagline: "Tokenized real-world assets for on-chain yield", votes: 115270, category: "FinTech", emoji: "🪙" },
  { id: 32, name: "Finperks", tagline: "Embedded finance benefits for the workforce", votes: 110680, category: "FinTech", emoji: "🎁" },
  { id: 33, name: "Kupando", tagline: "Working capital financing for European SMEs", votes: 106260, category: "FinTech", emoji: "📊" },
  { id: 34, name: "Qontext", tagline: "Enterprise AI knowledge systems on your data", votes: 101840, category: "AI", emoji: "🧠" },
  { id: 35, name: "Cognee", tagline: "Memory infrastructure for AI agents", votes: 97590, category: "AI", emoji: "🧬" },
  { id: 36, name: "Diligent AI", tagline: "Autonomous AI agents for back-office operations", votes: 93510, category: "AI", emoji: "🤝" },
  { id: 37, name: "Gretchen AI", tagline: "Deepfake detection and AI security for enterprises", votes: 89770, category: "AI", emoji: "🛟" },
  { id: 38, name: "GitButler", tagline: "A new Git client built for modern developer workflows", votes: 85860, category: "DevTools", emoji: "🦋" },
  { id: 39, name: "Plato", tagline: "Mentorship and leadership development for engineers", votes: 81440, category: "HR Tech", emoji: "🎓" },
  { id: 40, name: "NetBird", tagline: "WireGuard-based secure networking for distributed teams", votes: 77360, category: "DevTools", emoji: "🐦" },
  { id: 41, name: "Andercore", tagline: "Enterprise infrastructure software for industry", votes: 73620, category: "Deep Tech", emoji: "⚙️" },
  { id: 42, name: "Cellbricks", tagline: "3D-bioprinted human tissue for drug discovery", votes: 69540, category: "BioTech", emoji: "🧫" },
  { id: 43, name: "Metiundo", tagline: "Geospatial intelligence for the built environment", votes: 65630, category: "Deep Tech", emoji: "🗺️" },
  { id: 44, name: "JustPlay", tagline: "Earn real rewards for playing mobile games", votes: 62060, category: "Gaming", emoji: "🎮" },
  { id: 45, name: "Bounti", tagline: "AI sales agents for outbound commerce teams", votes: 58150, category: "AI", emoji: "🎯" },
  { id: 46, name: "Cara Care", tagline: "Digital therapy programs for chronic gut conditions", votes: 54410, category: "HealthTech", emoji: "💚" },
  { id: 47, name: "mika", tagline: "App-based companion for cancer patients", votes: 50670, category: "HealthTech", emoji: "🌸" },
  { id: 48, name: "YOU(th) Health", tagline: "Digital health platform for the next generation", votes: 46760, category: "HealthTech", emoji: "🌱" },
  { id: 49, name: "Aignostics", tagline: "AI for pathology and precision medicine", votes: 43020, category: "BioTech", emoji: "🔬" },
  { id: 50, name: "Remi Health", tagline: "Sustainability and health data for organizations", votes: 39280, category: "HealthTech", emoji: "📈" },
  // Below the funding cutoff — ranks 51–100.
  { id: 51, name: "Tier Mobility", tagline: "Shared micromobility for European cities", votes: 37240, category: "Mobility", emoji: "🛴" },
  { id: 52, name: "Wunder Mobility", tagline: "Operating system for shared fleets", votes: 36560, category: "Mobility", emoji: "🚗" },
  { id: 53, name: "Solarisbank", tagline: "Banking-as-a-service platform for Europe", votes: 35880, category: "FinTech", emoji: "🌞" },
  { id: 54, name: "Bryter", tagline: "No-code automation for legal and compliance", votes: 35030, category: "DevTools", emoji: "⚖️" },
  { id: 55, name: "Builder.ai", tagline: "AI-assembled custom software for SMEs", votes: 34350, category: "AI", emoji: "🧰" },
  { id: 56, name: "Coachhub", tagline: "Digital coaching platform for the global workforce", votes: 33670, category: "HR Tech", emoji: "🧑‍🏫" },
  { id: 57, name: "Personio", tagline: "All-in-one HR software for European SMEs", votes: 32990, category: "HR Tech", emoji: "🧑‍💼" },
  { id: 58, name: "Acolad", tagline: "AI-native language services for enterprises", votes: 32310, category: "AI", emoji: "🗣️" },
  { id: 59, name: "Wandelbots", tagline: "No-code robot programming for industry", votes: 31630, category: "Robotics", emoji: "🦾" },
  { id: 60, name: "Lilium", tagline: "Electric vertical take-off and landing jets", votes: 30780, category: "Mobility", emoji: "🛩️" },
  { id: 61, name: "Volocopter", tagline: "Urban air mobility with electric air taxis", votes: 30270, category: "Mobility", emoji: "🚁" },
  { id: 62, name: "Tomorrow", tagline: "Sustainable mobile banking for the climate", votes: 29760, category: "FinTech", emoji: "🌱" },
  { id: 63, name: "Penta", tagline: "Business banking built for European founders", votes: 29080, category: "FinTech", emoji: "🏛️" },
  { id: 64, name: "Mambu", tagline: "Cloud banking platform for the next generation", votes: 28570, category: "FinTech", emoji: "☁️" },
  { id: 65, name: "Cosuno", tagline: "Procurement platform for construction", votes: 27890, category: "Logistics", emoji: "🏗️" },
  { id: 66, name: "Klang Games", tagline: "Persistent AI-driven game worlds", votes: 27380, category: "Gaming", emoji: "🌌" },
  { id: 67, name: "Wooga", tagline: "Mobile games for a global audience", votes: 26700, category: "Gaming", emoji: "🎲" },
  { id: 68, name: "HelloBetter", tagline: "Evidence-based digital mental health programs", votes: 26190, category: "HealthTech", emoji: "💆" },
  { id: 69, name: "Vivy", tagline: "Personal health assistant and records app", votes: 25680, category: "HealthTech", emoji: "📱" },
  { id: 70, name: "Honeypot", tagline: "Developer-focused job platform", votes: 25170, category: "HR Tech", emoji: "🍯" },
  { id: 71, name: "Talon.One", tagline: "Promotions and loyalty infrastructure for commerce", votes: 24660, category: "Commerce", emoji: "🎟️" },
  { id: 72, name: "Spryker", tagline: "Composable commerce platform for B2B", votes: 24150, category: "Commerce", emoji: "🧱" },
  { id: 73, name: "Mister Spex", tagline: "Omnichannel eyewear retailer", votes: 23640, category: "Commerce", emoji: "👓" },
  { id: 74, name: "Auto1", tagline: "Europe's leading wholesale platform for used cars", votes: 23300, category: "Commerce", emoji: "🚙" },
  { id: 75, name: "HomeToGo", tagline: "Metasearch for vacation rentals worldwide", votes: 22790, category: "Travel", emoji: "🏖️" },
  { id: 76, name: "Omio", tagline: "Multimodal travel booking across Europe", votes: 22450, category: "Travel", emoji: "🚆" },
  { id: 77, name: "FlixBus", tagline: "Long-distance travel by green-powered coach", votes: 22110, category: "Mobility", emoji: "🚌" },
  { id: 78, name: "Babbel", tagline: "Language learning that actually sticks", votes: 21770, category: "EdTech", emoji: "🗯️" },
  { id: 79, name: "Coursera Hub", tagline: "Berlin's hub for European online education", votes: 21260, category: "EdTech", emoji: "🎓" },
  { id: 80, name: "Klar", tagline: "Open-source carbon management software", votes: 20920, category: "Climate", emoji: "🌳" },
  { id: 81, name: "Plan A", tagline: "Decarbonization platform for enterprises", votes: 20580, category: "Climate", emoji: "🅰️" },
  { id: 82, name: "Ineratec", tagline: "Power-to-liquid e-fuels from CO₂ and renewables", votes: 20240, category: "Climate", emoji: "⛽" },
  { id: 83, name: "Sunfire", tagline: "Industrial-scale electrolyzers for green hydrogen", votes: 19900, category: "Climate", emoji: "💧" },
  { id: 84, name: "Marvel Fusion", tagline: "Laser-driven inertial fusion energy", votes: 19560, category: "Deep Tech", emoji: "☢️" },
  { id: 85, name: "Isar Aerospace", tagline: "Small satellite launch services from Europe", votes: 19220, category: "Deep Tech", emoji: "🚀" },
  { id: 86, name: "Polarstern", tagline: "Geospatial AI for defense and security", votes: 18880, category: "Defense", emoji: "⭐" },
  { id: 87, name: "Quantum Brilliance", tagline: "Diamond-based quantum accelerators", votes: 18540, category: "Deep Tech", emoji: "💎" },
  { id: 88, name: "1X Robotics", tagline: "Humanoids for everyday work", votes: 18200, category: "Robotics", emoji: "🤖" },
  { id: 89, name: "Magic Pony", tagline: "On-device generative video models", votes: 17860, category: "AI", emoji: "🦄" },
  { id: 90, name: "DeepL", tagline: "AI translation that actually sounds human", votes: 17520, category: "AI", emoji: "🌐" },
  { id: 91, name: "Langfuse", tagline: "Open-source LLM engineering platform", votes: 17180, category: "DevTools", emoji: "🔭" },
  { id: 92, name: "Tradesmarter", tagline: "Trading infrastructure for European brokers", votes: 16840, category: "FinTech", emoji: "📉" },
  { id: 93, name: "Layer Health", tagline: "Clinical AI agents for hospitals", votes: 16500, category: "HealthTech", emoji: "🏥" },
  { id: 94, name: "Twaice", tagline: "Battery analytics for the electric economy", votes: 16160, category: "Climate", emoji: "🔋" },
  { id: 95, name: "Voltfang", tagline: "Second-life batteries for stationary storage", votes: 15820, category: "Climate", emoji: "🔌" },
  { id: 96, name: "Boost AI Berlin", tagline: "Sales agents that close deals at scale", votes: 15480, category: "AI", emoji: "📞" },
  { id: 97, name: "Replicate Bio", tagline: "AI lab automation for life sciences", votes: 15140, category: "BioTech", emoji: "🧪" },
  { id: 98, name: "Carbonyte", tagline: "Direct air capture pilots across Europe", votes: 14800, category: "Climate", emoji: "🪨" },
  { id: 99, name: "Northvault", tagline: "Compliance copilot for European banks", votes: 14460, category: "FinTech", emoji: "🔒" },
  { id: 100, name: "Spätzle", tagline: "Late-night convenience delivery in Berlin", votes: 14120, category: "Commerce", emoji: "🌃" },
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
    heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80",
    chart: {
      title: "Valuation growth (€B)",
      unit: "€B",
      points: [
        { label: "2021", value: 0.4 },
        { label: "2022", value: 1.7 },
        { label: "2023", value: 4.0 },
        { label: "2024", value: 5.4 },
        { label: "2025", value: 9.0 },
        { label: "2026", value: 12 },
      ],
    },
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
      { label: "MRR", value: "€18M" },
      { label: "Markets", value: "EU + UK" },
    ],
    comments: [
      {
        id: "h1", author: "Lukas Brandt", username: "lukas_brandt", role: "Defense analyst", company: "IISS",
        initials: "LB", avatarGradient: "from-orange-400 to-rose-600", verified: true,
        time: "2d ago", upvotes: 15140,
        body: "Europe finally has a credible sovereign AI defense layer. The pace of Helsing's platform releases is genuinely impressive — Altra in particular is closing the gap with US primes much faster than anyone expected.",
        replies: [
          {
            id: "h1r1", author: "Gundbert Scherf", username: "gundbert", role: "Co-founder & CEO", company: "Helsing",
            initials: "GS", avatarGradient: "from-slate-700 to-slate-900", maker: true, verified: true,
            time: "3d ago", upvotes: 12760,
            body: "@lukas_brandt thanks Lukas. Altra is the result of three years of sensor-fusion work — happy to share more on architecture in the next deep dive.",
          },
          {
            id: "h1r2", author: "Anders Lund", username: "anders_lund", role: "Ex-Saab engineer",
            initials: "AL", avatarGradient: "from-emerald-500 to-teal-700",
            time: "4d ago", upvotes: 9870,
            body: "@gundbert would love a writeup on the autonomy stack specifically — that's the real moat.",
          },
        ],
      },
      {
        id: "h2", author: "Marie Dubois", username: "marie_dubois", role: "Policy advisor", company: "Élysée",
        initials: "MD", avatarGradient: "from-violet-500 to-fuchsia-600", verified: true,
        time: "5d ago", upvotes: 12080,
        body: "Hard to overstate how strategically important this company has become for the EU. Voted.",
        replies: [
          {
            id: "h2r1", author: "Niklas Köhler", username: "niklas_k", role: "VC", company: "General Catalyst",
            initials: "NK", avatarGradient: "from-indigo-500 to-blue-700",
            time: "6d ago", upvotes: 9530,
            body: "@marie_dubois agreed. The next 18 months of European defense procurement will be defined by them.",
          },
        ],
      },
      {
        id: "h3", author: "Sofia Almeida", username: "sofia_a", role: "Robotics engineer",
        initials: "SA", avatarGradient: "from-amber-400 to-orange-600",
        time: "1d ago", upvotes: 9190,
        body: "Career page is wild right now — they're hiring everywhere. Anyone here interviewed recently?",
      },
      {
        id: "h4", author: "Jens Hartmann", username: "jens_h", role: "Bundeswehr advisor", company: "BMVg",
        initials: "JH", avatarGradient: "from-stone-600 to-stone-900", verified: true,
        time: "1w ago", upvotes: 8120,
        body: "What Helsing has done for German procurement timelines alone is worth the valuation. Voted.",
        replies: [
          {
            id: "h4r1", author: "Pia Vogel", username: "pia_v", role: "Procurement officer",
            initials: "PV", avatarGradient: "from-rose-400 to-red-600",
            time: "1w ago", upvotes: 3120,
            body: "@jens_h finally a vendor that ships software faster than we can write requirements.",
          },
        ],
      },
      {
        id: "h5", author: "Ravi Suresh", username: "ravi_s", role: "ML researcher", company: "ETH Zürich",
        initials: "RS", avatarGradient: "from-cyan-500 to-blue-700", verified: true,
        time: "2w ago", upvotes: 6740,
        body: "Their sensor fusion paper at NeurIPS was the most technically interesting defense AI work I've read this year.",
      },
      {
        id: "h6", author: "Beatrice Lefèvre", username: "beatrice_l", role: "Defense correspondent", company: "Le Monde",
        initials: "BL", avatarGradient: "from-fuchsia-500 to-pink-700", verified: true,
        time: "2w ago", upvotes: 5380,
        body: "Interviewed the team last week. The discipline around dual-use ethics is more serious than competitors give them credit for.",
        replies: [
          {
            id: "h6r1", author: "Maximilian Reuter", username: "max_reuter", role: "Policy researcher",
            initials: "MR", avatarGradient: "from-indigo-500 to-purple-700",
            time: "10d ago", upvotes: 1840,
            body: "@beatrice_l do you have a link to the piece? Would love to share with my team.",
          },
          {
            id: "h6r2", author: "Beatrice Lefèvre", username: "beatrice_l", role: "Defense correspondent", company: "Le Monde",
            initials: "BL", avatarGradient: "from-fuchsia-500 to-pink-700", verified: true,
            time: "12d ago", upvotes: 1120,
            body: "@max_reuter going live tomorrow morning. Will drop it here.",
          },
        ],
      },
      {
        id: "h7", author: "Karl Becker", username: "karl_b", role: "Reservist & engineer",
        initials: "KB", avatarGradient: "from-emerald-600 to-green-800",
        time: "3w ago", upvotes: 4210,
        body: "Tried out a public demo at ILA. The latency on the targeting overlay was genuinely a generation ahead of anything I've used in service.",
      },
      {
        id: "h8", author: "Léa Moreau", username: "lea_m", role: "Investor", company: "Eurazeo",
        initials: "LM", avatarGradient: "from-orange-500 to-amber-700", verified: true,
        time: "2d ago", upvotes: 3970,
        body: "Cap table is a who's who of European sovereignty money. The signaling effect for the next defense round across the continent is huge.",
      },
      {
        id: "h9", author: "Henrik Söderberg", username: "henrik_s", role: "Ex-Saab program lead",
        initials: "HS", avatarGradient: "from-sky-600 to-blue-800",
        time: "1d ago", upvotes: 3210,
        body: "Skeptical at first but the field demos this autumn changed my mind. The autonomy stack is real.",
      },
      {
        id: "h10", author: "Anna Kowalski", username: "anna_k", role: "Defense journalist", company: "Politico EU",
        initials: "AK", avatarGradient: "from-rose-500 to-red-700", verified: true,
        time: "1d ago", upvotes: 2890,
        body: "Voted. Whatever you think of defense tech, Europe needs domestic champions and this is the clearest one.",
      },
      {
        id: "h11", author: "Tomás Carvalho", username: "tomas_c", role: "Software engineer",
        initials: "TC", avatarGradient: "from-teal-500 to-cyan-700",
        time: "1d ago", upvotes: 2410,
        body: "Their engineering blog is criminally underrated. The post on real-time data pipelines for sensor fusion was a masterclass.",
      },
      {
        id: "h12", author: "Ingrid Hansen", username: "ingrid_h", role: "Naval officer",
        initials: "IH", avatarGradient: "from-indigo-600 to-blue-900",
        time: "2d ago", upvotes: 2080,
        body: "Curious to see how their maritime variant performs in the Baltic exercises next quarter.",
      },
      {
        id: "h13", author: "Felipe Ortega", username: "felipe_o", role: "Founder", company: "early-stage defense startup",
        initials: "FO", avatarGradient: "from-amber-500 to-orange-700",
        time: "2d ago", upvotes: 1640,
        body: "Helsing's rise pulled my entire funding round closer by 6 months. The category is finally fundable in Europe.",
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
    heroImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80",
    chart: {
      title: "Calls handled per quarter (M)",
      unit: "M",
      points: [
        { label: "Q1'25", value: 110 },
        { label: "Q2'25", value: 160 },
        { label: "Q3'25", value: 215 },
        { label: "Q4'25", value: 280 },
        { label: "Q1'26", value: 360 },
        { label: "Q2'26", value: 470 },
      ],
    },
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
      { label: "MRR", value: "$9.5M" },
      { label: "Calls handled / yr", value: "1B+" },
    ],
    comments: [
      {
        id: "p1", author: "Sina Yıldız", username: "sina_y", role: "Head of CX", company: "Lufthansa Group",
        initials: "SY", avatarGradient: "from-sky-500 to-indigo-600", verified: true,
        time: "3d ago", upvotes: 14460,
        body: "We cut average handling time by 40% on rebooking flows. Voice quality is indistinguishable from a great agent — passengers genuinely don't notice they're not talking to a human.",
        replies: [
          {
            id: "p1r1", author: "Malte Lohscheller", username: "malte_l", role: "Co-founder", company: "Parloa",
            initials: "ML", avatarGradient: "from-violet-500 to-fuchsia-600", maker: true, verified: true,
            time: "4d ago", upvotes: 11230,
            body: "@sina_y thank you Sina — the LH rebooking flow is one of our favorite case studies internally. Excited about what's next on the disruption playbook.",
          },
          {
            id: "p1r2", author: "Daniel Weiss", username: "daniel_w", role: "VP Operations",
            initials: "DW", avatarGradient: "from-teal-500 to-emerald-700",
            time: "5d ago", upvotes: 9020,
            body: "@sina_y any data on customer CSAT vs the previous IVR setup?",
          },
        ],
      },
      {
        id: "p2", author: "Priya Menon", username: "priya_m", role: "AI product lead",
        initials: "PM", avatarGradient: "from-rose-500 to-pink-600",
        time: "1d ago", upvotes: 10890,
        body: "Finally enterprise-grade voice AI that doesn't sound like a 2018 IVR. The agent studio is the best authoring UX I've used.",
      },
      {
        id: "p3", author: "Tobias Renner", username: "tobias_r", role: "Solutions architect", company: "Telefónica",
        initials: "TR", avatarGradient: "from-amber-500 to-orange-600",
        time: "1d ago", upvotes: 10040,
        body: "We benchmarked against three competitors. Orchestration model + low-latency voice put Parloa ahead by a wide margin.",
      },
      {
        id: "p4", author: "Hannah Becker", username: "hannah_b", role: "Customer ops director", company: "Allianz",
        initials: "HB", avatarGradient: "from-blue-500 to-indigo-700", verified: true,
        time: "6d ago", upvotes: 9410,
        body: "Migrated 600+ inbound agents to a Parloa-orchestrated stack. Containment rate jumped from 22% to 61% in the first 8 weeks.",
        replies: [
          {
            id: "p4r1", author: "Stefan Ostrowski", username: "stefan_o", role: "CRO", company: "Parloa",
            initials: "SO", avatarGradient: "from-violet-500 to-fuchsia-600", maker: true, verified: true,
            time: "1w ago", upvotes: 3210,
            body: "@hannah_b love seeing the containment curve from Allianz become the new internal benchmark. Thank you for trusting us early.",
          },
        ],
      },
      {
        id: "p5", author: "Mei Tanaka", username: "mei_t", role: "Conversation designer",
        initials: "MT", avatarGradient: "from-pink-500 to-rose-700",
        time: "1w ago", upvotes: 7820,
        body: "Working in the Agent Studio actually feels closer to writing a screenplay than configuring an IVR. Big leap forward for the craft.",
      },
      {
        id: "p6", author: "Diego Romero", username: "diego_r", role: "VP Engineering", company: "Vodafone",
        initials: "DR", avatarGradient: "from-red-500 to-rose-700", verified: true,
        time: "2w ago", upvotes: 6940,
        body: "Latency is the killer feature. Customers don't perceive a 350ms turn as a bot — anything above 700ms and the spell breaks.",
      },
      {
        id: "p7", author: "Aylin Demir", username: "aylin_d", role: "CX consultant",
        initials: "AD", avatarGradient: "from-emerald-500 to-teal-700",
        time: "2w ago", upvotes: 5610,
        body: "Best part: the agents handle escalations to humans cleanly. No customer ever has to repeat their account number twice.",
      },
      {
        id: "p8", author: "Johan Berg", username: "johan_b", role: "CTO", company: "SAS Group",
        initials: "JB", avatarGradient: "from-sky-600 to-blue-800", verified: true,
        time: "10d ago", upvotes: 4820,
        body: "We replaced 14 vendor contracts with one Parloa deployment. The TCO story alone is staggering.",
      },
      {
        id: "p9", author: "Nora Lindqvist", username: "nora_l", role: "AI policy researcher",
        initials: "NL", avatarGradient: "from-purple-500 to-indigo-700",
        time: "12d ago", upvotes: 3940,
        body: "Their PII handling and EU AI Act readiness documentation are the best I've audited in the conversational AI space.",
      },
      {
        id: "p10", author: "Carlos Mendes", username: "carlos_m", role: "Engineer",
        initials: "CM", avatarGradient: "from-amber-500 to-orange-700",
        time: "3w ago", upvotes: 3110,
        body: "Anyone else notice how seamlessly the agents handle code-switching between German and Turkish? Voice quality on Turkish in particular is wild.",
      },
      {
        id: "p11", author: "Sara Klein", username: "sara_k", role: "Investor", company: "Index Ventures",
        initials: "SK", avatarGradient: "from-fuchsia-500 to-pink-700", verified: true,
        time: "1d ago", upvotes: 2780,
        body: "Parloa is the European applied-AI flagship I keep pointing LPs to when they ask if the continent can produce category leaders.",
      },
      {
        id: "p12", author: "Ben O'Leary", username: "ben_ol", role: "Product manager",
        initials: "BO", avatarGradient: "from-green-500 to-emerald-700",
        time: "1d ago", upvotes: 2210,
        body: "Voted. The platform let us ship a multilingual support flow in 9 days that would've taken our previous vendor a quarter.",
      },
      {
        id: "p13", author: "Lina Aydın", username: "lina_a", role: "Operations lead",
        initials: "LA", avatarGradient: "from-rose-500 to-red-700",
        time: "2d ago", upvotes: 1840,
        body: "Customer effort score moved 18 points after rollout. Nothing else we've tried moved the needle that hard.",
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
    heroImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
    chart: {
      title: "Customers (M)",
      unit: "M",
      points: [
        { label: "2020", value: 0.4 },
        { label: "2021", value: 1.0 },
        { label: "2022", value: 2.2 },
        { label: "2023", value: 4.0 },
        { label: "2024", value: 5.6 },
        { label: "2025", value: 7.0 },
        { label: "2026", value: 8.1 },
      ],
    },
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
      { label: "MRR", value: "€42M" },
      { label: "Markets", value: "17 EU countries" },
    ],
    comments: [
      {
        id: "t1", author: "Elena Rossi", username: "elena_r", role: "FinTech analyst", company: "Sifted",
        initials: "ER", avatarGradient: "from-emerald-500 to-teal-700", verified: true,
        time: "2d ago", upvotes: 17520,
        body: "The most important consumer fintech to come out of Europe this decade. Distribution is unreal — 8M+ customers across 17 markets with extremely lean unit economics.",
        replies: [
          {
            id: "t1r1", author: "Christian Hecker", username: "christian_h", role: "Co-founder & CEO", company: "Trade Republic",
            initials: "CH", avatarGradient: "from-green-600 to-emerald-800", maker: true, verified: true,
            time: "3d ago", upvotes: 14970,
            body: "@elena_r thanks Elena. We're particularly proud of how the cash account and saveback have brought new investors into the market who never owned an ETF before.",
          },
          {
            id: "t1r2", author: "Jonas Keller", username: "jonas_k", role: "Retail investor",
            initials: "JK", avatarGradient: "from-blue-500 to-indigo-700",
            time: "4d ago", upvotes: 10380,
            body: "@christian_h saveback was the feature that finally got my partner to start investing. Massive deal.",
          },
        ],
      },
      {
        id: "t2", author: "Maximilian Voss", username: "max_v", role: "Portfolio manager",
        initials: "MV", avatarGradient: "from-orange-500 to-rose-600",
        time: "5d ago", upvotes: 11740,
        body: "Custody crossed €100B this year. Quietly one of the largest investment platforms in Europe now.",
      },
      {
        id: "t3", author: "Tom Becker", username: "tom_b", role: "Software engineer",
        initials: "TB", avatarGradient: "from-cyan-500 to-blue-700",
        time: "1d ago", upvotes: 9530,
        body: "App performance got noticeably better in the last release. Voted.",
      },
      {
        id: "t4", author: "Marta Lewandowska", username: "marta_l", role: "Finance journalist", company: "Handelsblatt",
        initials: "ML", avatarGradient: "from-amber-500 to-orange-700", verified: true,
        time: "6d ago", upvotes: 12640,
        body: "Trade Republic is doing for European retail investing what N26 tried to do for banking — except they're actually pulling it off across all 17 markets simultaneously.",
        replies: [
          {
            id: "t4r1", author: "Felix Hartmann", username: "felix_h", role: "Reader",
            initials: "FH", avatarGradient: "from-slate-500 to-slate-700",
            time: "1w ago", upvotes: 4120,
            body: "@marta_l the Italian launch in particular has been textbook execution. Bullish.",
          },
        ],
      },
      {
        id: "t5", author: "Sofie Andersen", username: "sofie_a", role: "Retail investor",
        initials: "SA", avatarGradient: "from-pink-500 to-rose-700",
        time: "1w ago", upvotes: 9870,
        body: "Started my first ETF savings plan at 22 because of this app. Three years later it's the foundation of my long-term portfolio.",
      },
      {
        id: "t6", author: "Ricardo Silva", username: "ricardo_s", role: "Bank engineer", company: "Santander",
        initials: "RS", avatarGradient: "from-red-500 to-rose-700", verified: true,
        time: "2w ago", upvotes: 8430,
        body: "Their settlement infrastructure is genuinely impressive. We've benchmarked it internally — order routing latency is best-in-class in Europe.",
      },
      {
        id: "t7", author: "Hanna Virtanen", username: "hanna_v", role: "Designer",
        initials: "HV", avatarGradient: "from-violet-500 to-purple-700",
        time: "2w ago", upvotes: 7290,
        body: "The Saveback UX is one of the cleanest financial product flows I've ever seen. Should be a case study in any product design course.",
      },
      {
        id: "t8", author: "Alexander Volkov", username: "alex_v", role: "ETF strategist", company: "iShares",
        initials: "AV", avatarGradient: "from-blue-500 to-indigo-700", verified: true,
        time: "10d ago", upvotes: 6480,
        body: "TR savings plans now drive a meaningful chunk of European retail ETF inflows. Quietly one of the biggest distribution shifts of the decade.",
      },
      {
        id: "t9", author: "Yara Habib", username: "yara_h", role: "Compliance officer",
        initials: "YH", avatarGradient: "from-teal-500 to-emerald-700",
        time: "12d ago", upvotes: 5310,
        body: "Their KYC flow now processes a new account in under 4 minutes. Operationally that's where the unit economics really live.",
      },
      {
        id: "t10", author: "Mikael Lundberg", username: "mikael_l", role: "Financial advisor",
        initials: "MK", avatarGradient: "from-emerald-600 to-teal-800",
        time: "3w ago", upvotes: 4870,
        body: "Half of my clients under 35 use Trade Republic as their primary investment account. The behavioral shift is irreversible.",
      },
      {
        id: "t11", author: "Chiara Greco", username: "chiara_g", role: "Italian customer",
        initials: "CG", avatarGradient: "from-rose-500 to-red-700",
        time: "2d ago", upvotes: 4120,
        body: "Finally an investment app that doesn't treat Italians like an afterthought. Local IBAN, native language support, the works.",
      },
      {
        id: "t12", author: "Lars Petersen", username: "lars_p", role: "Software engineer",
        initials: "LP", avatarGradient: "from-cyan-500 to-sky-700",
        time: "1d ago", upvotes: 3640,
        body: "Latency on order placement dropped noticeably after the last update. Engineering team clearly cooking.",
      },
      {
        id: "t13", author: "Aiko Yamamoto", username: "aiko_y", role: "Fintech investor", company: "Accel",
        initials: "AY", avatarGradient: "from-fuchsia-500 to-purple-700", verified: true,
        time: "1d ago", upvotes: 3020,
        body: "The path to a public listing is now real. This vote is the easiest one on my list.",
      },
      {
        id: "t14", author: "Pavel Nowak", username: "pavel_n", role: "Polish customer",
        initials: "PN", avatarGradient: "from-amber-500 to-orange-700",
        time: "1d ago", upvotes: 2480,
        body: "Started using TR after their Polish launch. The cash account interest beats my home bank by 2 full percentage points.",
      },
      {
        id: "t15", author: "Hannah Müller", username: "hannah_m", role: "Student",
        initials: "HM", avatarGradient: "from-green-500 to-emerald-700",
        time: "2d ago", upvotes: 1980,
        body: "Started with €25/month at 19. Three years later that habit is the single best financial decision of my life. Voted.",
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