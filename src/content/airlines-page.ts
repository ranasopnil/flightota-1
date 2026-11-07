import type { AirlinesPageContent } from "@/types/pages";

export const airlinesPage: AirlinesPageContent = {
  hero: {
    eyebrow: "DIRECT AIRLINE NETWORK",
    eyebrowIcon: "Plane",
    badge: "40+ NDC • 60+ LCC Direct Live",
    title: "NDC & LCC Airlines Directory",
    description: "Search, price, and ticket 200+ direct NDC and low-cost airlines with zero GDS surcharges and sub-second responses.",
    image: "/images/heroes/airlines_tarmac.jpg",
    metrics: [{ text: "40+ IATA NDC Direct" }, { text: "<180ms Latency", accent: true }, { text: "Zero GDS Surcharge" }],
    actions: [
      { label: "Get Sandbox Key", href: "/register?api=air-travel-api", variant: "primary", icon: "Key" },
      { label: "Docs →", href: "/documentation/air-travel-api", variant: "outline", icon: "BookOpen" },
    ],
  },
  ticker: {
    label: "LIVE NDC PIPES",
    items: [
      "Emirates (EK) • NDC 21.3 • 132ms",
      "Qatar Airways (QR) • Oryx Direct • 118ms",
      "Singapore Airlines (SQ) • KrisConnect • 145ms",
      "British Airways (BA) • IAG NDC • 128ms",
      "Lufthansa Group (LH) • Direct Pipe • 139ms",
      "IndiGo (6E) • Direct LCC API • 108ms",
      "AirAsia (AK) • Net Fare API • 122ms",
      "Ryanair (FR) • Direct Pipe • 114ms",
    ],
  },
  metrics: [
    { label: "Connected", value: "200+", note: "Global carriers", icon: "Plane", tone: "primary" },
    { label: "Direct NDC", value: "40+", note: "IATA Level 4 certified", icon: "ShieldCheck", tone: "emerald" },
    { label: "Direct LCC", value: "60+", note: "Wholesale net feeds", icon: "Zap", tone: "amber" },
    { label: "GDS Markup", value: "$0", note: "Zero surcharge", icon: "TrendingDown", tone: "emerald" },
    { label: "p50 Latency", value: "<180ms", note: "Parallel offer cache", icon: "Timer", tone: "primary", mono: true },
  ],
  telemetry: {
    title: "Live NDC Gateway Telemetry & Supported Alliances",
    description: "Direct carrier pipe operational metrics, uptime, and certified ancillaries",
    statusLabel: "99.98% Gateway Uptime",
    alliances: [
      { name: "Star Alliance", members: "Lufthansa, Singapore, United, Turkish, Swiss", icon: "Sparkles", tone: "sky" },
      { name: "oneworld", members: "British Airways, Qatar, American, Cathay Pacific", icon: "ShieldCheck", tone: "emerald" },
      { name: "SkyTeam", members: "Air France, KLM, Delta, Saudia, Korean Air", icon: "Globe", tone: "primary" },
      { name: "Direct LCCs", members: "IndiGo, AirAsia, Ryanair, easyJet, flydubai", icon: "Layers", tone: "amber" },
    ],
    features: ["Dynamic 3D SeatMap", "Paid Baggage & Meals", "Zero-Risk 72h Hold PNR", "24-Hour Instant Void"],
  },
  directory: {
    title: "Direct-Connected Carriers Directory",
    description: "Filter by distribution standard (NDC vs LCC), search by IATA code or city hub, and inspect real API requests.",
  },
  consolidator: {
    image: "/images/solutions/gds_integration.jpg",
    alt: "Global GDS and Airline Systems",
    eyebrow: "GDS Consolidator Architecture",
    title: "Amadeus, Sabre & Travelport Integration",
    text: "Combine legacy GDS terminals with direct NDC APIs seamlessly.",
    bodyEyebrow: "Automated Ticketing Queues",
    bodyTitle: "Unified Multi-GDS Consolidation & Instant Ticketing",
    bodyText:
      "Our flight distribution core bridges traditional GDS terminals with modern JSON APIs. Query Amadeus MasterPricer, Sabre Bargain Finder Max and Travelport Galileo concurrently with split-ticketing intelligence.",
    features: [
      { title: "Split-Ticketing Engine", text: "Combine different airlines for outbound and return legs for lowest net fares." },
      { title: "Automated PNR Queue", text: "Automated ticketing time-limit tracking, void window monitoring, and schedule sync." },
      { title: "Ancillary Upsell API", text: "Instant booking of paid baggage, interactive seat maps, and pre-ordered meals." },
      { title: "Multi-Tier Markups", text: "Apply custom B2B sub-agent or B2C customer markups airline-wise and route-wise." },
    ],
    footnote: "Certified IATA NDC Level 4 Capable • Sub-Second Offer Cache",
    cta: { label: "View Flight API Docs →", href: "/apis/air-travel-api" },
  },
  cta: {
    title: "Ready to issue NDC & LCC airline tickets via a single unified API?",
    description: "Provision sandbox keys in seconds, access 200+ global carriers with zero GDS distribution surcharges, and streamline flight booking flows.",
  },
};
