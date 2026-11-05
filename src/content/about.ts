import type { AboutPageContent } from "@/types/pages";

export const about: AboutPageContent = {
  hero: {
    eyebrow: "ABOUT FLIGHTOTA",
    badge: "140+ Direct Supplier Pipes",
    title: "Developer infrastructure behind the world's best travel products",
    description: "Unified REST APIs for flights, hotels, eSIM connectivity, visas, and ground transport behind one elegant developer-first platform.",
    image: "/images/heroes/about_architecture.jpg",
    metrics: [{ text: "195+ Countries" }, { text: "<120ms Latency", accent: true }, { text: "99.98% Monitored SLA" }],
    actions: [
      { label: "Explore APIs →", href: "/apis", variant: "primary" },
      { label: "API Docs", href: "/documentation", variant: "outline" },
    ],
  },
  paradigm: {
    header: {
      eyebrow: "The Paradigm Shift",
      title: "Why the travel industry needed a clean developer layer",
      description: "Global travel distribution has been trapped in 1990s legacy technology for decades. We rebuilt the stack from the metal up.",
    },
    legacy: {
      label: "The Legacy Way (Fragmented & Fragile)",
      title: "Dozens of disjointed XML contracts & opaque fees",
      items: [
        "Separate commercial negotiations with each airline, GDS, and bed bank provider.",
        "Unpredictable booking drops, non-idempotent commits, and duplicate customer card charges.",
        "Cryptic 2-letter error codes without actionable debugging context or request traces.",
        "Incompatible hotel room rate types, missing tax breakdowns, and manual voucher handling.",
      ],
    },
    modern: {
      label: "The FlightOTA Standard (Fast & Unified)",
      title: "One unified contract with normalized JSON APIs",
      items: [
        "Single Bearer API key unlocks flights, hotels, eSIM, visas, and airport transfers.",
        "100% idempotent booking endpoints with automated 24h void windows and zero duplicate charges.",
        "Structured RFC 7807 error responses with request IDs and instant sandbox simulation.",
        "Automated multi-carrier failover circuit breakers and transparent volume-based billing.",
      ],
    },
  },
  values: {
    header: {
      eyebrow: "Our Guiding Values",
      title: "Engineered for mission-critical reliability",
      description: "Everything we build is designed to handle high transaction volumes with zero compromise on data accuracy.",
    },
    items: [
      { icon: "Target", title: "Mission: Universal Connectivity", text: "Make adding global travel products to software as fast, reliable, and predictable as integrating payment processing. One API, normalized schemas, and zero legacy headaches." },
      { icon: "Eye", title: "Vision: The Connected Journey", text: "Empower every travel enterprise — from fast-growing startups to global OTAs — to book flights, stays, eSIM roaming, visas, and airport transfers in a single atomic transaction." },
      { icon: "ShieldCheck", title: "Financial Rigor & Idempotency", text: "Travel bookings move real customer funds. Every state transition has guaranteed idempotency, distributed circuit breakers, and sub-second automated rollback protection." },
      { icon: "Handshake", title: "Direct Supplier Partnerships", text: "We partner directly with IATA airlines, global bed banks, GSMA mobile networks, and foreign embassies, respecting commercial guidelines and rate limits." },
    ],
  },
  edge: {
    header: {
      eyebrow: "Global Infrastructure",
      title: "Multi-region edge network operating at sub-120ms",
      description: "Our distributed gateway nodes terminate TLS connections closest to your users and route requests to suppliers with maximum throughput.",
    },
    nodes: [
      { city: "Frankfurt", region: "EU Central", latency: "<18ms", role: "Primary European Core & IATA NDC Hub", flag: "🇩🇪" },
      { city: "Singapore", region: "APAC Hub", latency: "<22ms", role: "Bed Bank Aggregator & eSIM Core", flag: "🇸🇬" },
      { city: "North Virginia", region: "US East", latency: "<15ms", role: "GDS Pipes & Global Financial Settlement", flag: "🇺🇸" },
      { city: "Tokyo", region: "APAC East", latency: "<28ms", role: "Low-Latency East Asian Consular Gateway", flag: "🇯🇵" },
      { city: "London", region: "UK & EMEA", latency: "<19ms", role: "Rail, Ground Transport & UKVI ETA Bridge", flag: "🇬🇧" },
      { city: "Sydney", region: "Oceania", latency: "<35ms", role: "Trans-Pacific Cache & ImmiAccount Proxy", flag: "🇦🇺" },
    ],
    onlineLabel: "Online",
    routingLabel: "Active Routing",
  },
  milestones: {
    header: {
      eyebrow: "Our Journey",
      title: "Rapid execution built on proven engineering",
      description: "From our first NDC flight search to an enterprise suite processing hundreds of millions of requests.",
    },
    items: [
      { year: "2023", tag: "Genesis", title: "Founded by Travel Tech Veterans", desc: "Frustrated by archaic 1990s GDS XML protocols and fragmented supplier pipes, our founders built the first prototype of a unified travel REST engine." },
      { year: "2024", tag: "Series Seed", title: "IATA NDC & Flight API General Availability", desc: "Raised $4.5M Seed round and launched direct NDC pipes to 25+ global airlines with sub-200ms seat map calculations and automated 24h void windows." },
      { year: "2025", tag: "Expansion", title: "Global Hotel Bed Banks & eSIM 5G Gateways", desc: "Integrated 1.8M+ deduplicated properties across 12 bed banks, followed by real-time GSMA SM-DP+ cloud eSIM provisioning across 190+ countries." },
      { year: "2026", tag: "Scale", title: "Consular Visa Automation & 400M+ Monthly Calls", desc: "Unveiled IATA Timatic-aligned consular rules engine and scaled infrastructure to handle over 400 million monthly API requests with 99.98% verified uptime." },
    ],
    shippedLabel: "Milestone Shipped",
  },
  team: {
    header: {
      eyebrow: "Leadership Team",
      title: "Built by builders from travel & fintech",
      description: "Our engineers and product leaders have designed systems at Amadeus, Expedia, Stripe, and Twilio.",
    },
    members: [
      { name: "Apurba Roy", role: "Founder & Chief Executive Officer", background: "Ex-Amadeus & Expedia Principal Architect", bio: "14+ years designing high-throughput transaction engines. Passionate about replacing legacy airline EDIFACT/XML with modern developer primitives.", avatar: "AR" },
      { name: "Elena Rostova", role: "Co-Founder & Chief Technology Officer", background: "Ex-Stripe Core Platform, Distributed Systems", bio: "Specialist in zero-allocation Rust networking, fault-tolerant consensus, and multi-region state replication for mission-critical payment systems.", avatar: "ER" },
      { name: "Marcus Vance", role: "VP of Global Airline & Supplier Alliances", background: "Ex-IATA NDC Working Group & Qatar Airways", bio: "Decade-long experience negotiating direct carrier partnerships, commercial bilats, and GDS distribution contracts worldwide.", avatar: "MV" },
      { name: "Dr. Priya Nair", role: "Head of Developer Experience & Protocol Arch", background: "Ex-Twilio DevRel & OpenAPI Initiative", bio: "Author of developer SDKs and OpenAPI specifications. Dedicated to ensuring our sandbox and client libraries feel effortless to integrate.", avatar: "PN" },
    ],
    verifiedLabel: "Verified Leadership",
  },
  ecosystem: {
    header: {
      eyebrow: "Global Travel Ecosystem",
      title: "Bridging legacy GDS protocols with modern travel portals",
      description: "We unify complex airline XML feeds, GDS terminals, and bed bank inventory into developer-first APIs and business platforms.",
    },
    cards: [
      {
        image: "/images/solutions/gds_integration.jpg",
        alt: "Global GDS and Airline Systems",
        eyebrow: "Aviation & GDS Pipes",
        eyebrowTone: "rose",
        title: "Amadeus, Sabre & Travelport Aggregation",
        text: "Direct integration with the world's leading Global Distribution Systems (GDS) and IATA NDC Level 4 carriers. Our engine automatically manages PNR creation, split-ticketing, schedule changes, and queue servicing without manual intervention.",
        tags: ["Amadeus MasterPricer", "Sabre Bargain Finder Max", "Travelport Universal API", "IATA NDC Level 4"],
      },
      {
        image: "/images/solutions/b2b_portal.jpg",
        alt: "B2B Travel Agent Network and ERP",
        eyebrow: "Enterprise Software",
        eyebrowTone: "sky",
        title: "B2B Sub-Agent Portals & Travel ERP",
        text: "Empower your travel agency network with dedicated B2B agent dashboards, tiered markups, sub-agent credit wallets, dynamic packaging engines, and comprehensive mid-office financial accounting ledgers.",
        tags: ["Sub-Agent Network", "Credit & Wallet Engine", "Dynamic Packaging", "Automated Invoicing"],
      },
    ],
  },
  security: {
    header: {
      eyebrow: "Security & Governance",
      title: "Bank-grade protection for money-moving operations",
      description: "We uphold the most rigorous international certifications for transaction integrity and data privacy.",
    },
    items: [
      { title: "PCI-DSS Level 1 Certified", desc: "Audited to the strictest payment card data security standard. Tokenized checkout with zero plain-text card storage.", icon: "Lock" },
      { title: "SOC 2 Type II Attested", desc: "Rigorous third-party evaluation of security, confidentiality, availability, and processing integrity controls.", icon: "Award" },
      { title: "IATA NDC Level 4 Certified", desc: "Official certification recognizing end-to-end Offer & Order management across all complex airline booking workflows.", icon: "FileCheck" },
      { title: "GDPR & CCPA Compliant", desc: "Full data sovereignty controls, zero PII payload logging, and automated traveler consent management.", icon: "ShieldCheck" },
    ],
    auditedLabel: "Audited & Active",
  },
  careers: {
    badge: "We're Hiring",
    title: "Join our mission to reshape global travel architecture",
    text: "We are a remote-first team of 45+ distributed engineers, API designers, and travel industry veterans across 12 timezones.",
    roles: ["💼 Sr. Distributed Systems Engineer (Rust)", "💼 Developer Advocate & API Specialist", "💼 Strategic Carrier Alliances Manager"],
    cta: { label: "View Open Roles", href: "/contact?topic=careers" },
  },
  cta: { title: "Ready to build your next travel product with us?" },
};
