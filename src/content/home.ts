import type { HomePageContent } from "@/types/pages";

/**
 * Home page copy. Partner names, testimonials and headline metrics are
 * illustrative placeholders; replace them with real figures before launch.
 */
export const home: HomePageContent = {
  hero: {
    slides: [
      {
        id: "travel-technology",
        division: "DIV. 01",
        badgeTone: "rose",
        tags: ["B2B & B2C TRAVEL PORTALS", "GDS, NDC & LCC AGGREGATION", "WHITE-LABEL BOOKING ENGINES"],
        title: "All-in-One Travel Portal Development & API Aggregation",
        description:
          "Build, launch and scale your online travel business with FlightOTA. Our complete travel technology platform combines B2B and B2C booking portal development, white-label travel software, GDS connectivity, NDC airline distribution, LCC integrations and multi-supplier travel APIs into one unified solution.",
        image: "/images/solutions/b2b_portal.jpg",
        alt: "All-in-One Travel Portal Development & API Aggregation",
        primaryCta: { label: "Request a Demo", href: "/contact?topic=sales" },
        secondaryCta: { label: "Explore API Documentation", href: "/documentation" },
        metric: { label: "One Contract Covers", value: "GDS · NDC · LCC" },
        accentColor: "#dc0e18",
      },
      {
        id: "air-travel",
        division: "DIV. 02",
        badgeTone: "rose",
        tags: ["ONE-WAY, ROUND TRIP, MULTI-CITY", "STANDARD & BRANDED FARES", "PAID FROM YOUR DEPOSIT"],
        title: "Search, Book, Ticket, Refund, Reissue and Void Flights",
        description:
          "One REST API sells every airline we carry. Most fares are held first and issued later from your deposit; instant fares are paid and ticketed in the booking call itself.",
        image: "/images/hero/hero_flight.jpg",
        alt: "Search, Book, Ticket, Refund, Reissue and Void Flights",
        primaryCta: { label: "Explore Flight API", href: "/apis/air-travel-api" },
        secondaryCta: { label: "Read the Guide", href: "/documentation/air-travel-api" },
        metric: { label: "Search Answers In", value: "5–30 s" },
        accentColor: "#dc0e18",
      },
      {
        id: "hotel-network",
        division: "DIV. 03",
        badgeTone: "amber",
        tags: ["PAY NOW OR HOLD", "RATE RE-CHECK", "1–6 ROOMS PER SEARCH"],
        title: "Find, Book and Cancel Hotel Stays Worldwide",
        description:
          "A stay takes five calls: find the destination, search hotels, list one hotel's rooms, re-check the chosen rate, book. Paid now, or held where the rate allows it.",
        image: "/images/hero/hero_hotel.jpg",
        alt: "Find, Book and Cancel Hotel Stays Worldwide",
        primaryCta: { label: "Explore Hotel API", href: "/apis/hotel-api" },
        secondaryCta: { label: "Read the Guide", href: "/documentation/hotel-api" },
        metric: { label: "Results Stay Bookable", value: "15 min" },
        accentColor: "#f59e0b",
      },
      {
        id: "esim-telemetry",
        division: "DIV. 04",
        badgeTone: "emerald",
        tags: ["200+ COUNTRIES AND REGIONS", "QR AND ACTIVATION CODE", "ISSUED AT ONCE"],
        title: "Travel eSIMs for 200+ Countries and Regions",
        description:
          "List the plans, buy one, and hand your customer the QR code and activation code from the same response. Orders are paid from your deposit and issued at once.",
        image: "/images/hero/hero_esim.jpg",
        alt: "Travel eSIMs for 200+ Countries and Regions",
        primaryCta: { label: "Explore eSIM API", href: "/apis/esim-api" },
        secondaryCta: { label: "Read the Guide", href: "/documentation/esim-api" },
        metric: { label: "eSIMs of One Plan per Order", value: "1–5" },
        accentColor: "#10b981",
      },
      {
        id: "transfer-mobility",
        division: "DIV. 05",
        badgeTone: "cyan",
        tags: ["PRIVATE CARS, VANS, SHUTTLES", "ONE-WAY, RETURN, HOURLY", "CONFIRMED IN SECONDS"],
        title: "Airport and City Transfers Worldwide",
        description:
          "Private cars, vans and shuttles from hundreds of local providers, paid from your deposit and confirmed in seconds. Search, pick a quote, book.",
        image: "/images/hero/hero_transfer.jpg",
        alt: "Airport and City Transfers Worldwide",
        primaryCta: { label: "Explore Transfer API", href: "/apis/airport-transfer-api" },
        secondaryCta: { label: "Read the Guide", href: "/documentation/airport-transfer-api" },
        metric: { label: "Passengers per Search", value: "1–50" },
        accentColor: "#06b6d4",
      },
      {
        id: "visa-clearance",
        division: "DIV. 06",
        badgeTone: "purple",
        tags: ["140+ DESTINATIONS", "OCR PASSPORT VERIFICATION", "EMBASSY GATEWAY"],
        title: "Automated Visa Intelligence & E-Visa Processing",
        description:
          "Real-time border eligibility rules, machine-readable passport OCR extraction, and automated electronic visa application filings for seamless travel readiness.",
        image: "/images/hero/hero_visa.jpg",
        alt: "Automated Visa Intelligence & E-Visa Processing",
        primaryCta: { label: "Explore Visa API", href: "/apis/visa-api" },
        secondaryCta: { label: "Developer Specs", href: "/documentation" },
        metric: { label: "Approval Tracking", value: "Real-Time" },
        accentColor: "#a855f7",
      },
    ],
    highlightsLabel: "Partner API",
    highlights: ["Same keys and conventions", "Paid from your deposit", "Sandbox on test systems", "Live after certification"],
  },
  partnerApis: {
    header: { eyebrow: "Partner APIs", title: "Flights, hotels, eSIM and transfers", description: "The same keys and conventions across all four, paid from your deposit." },
    cards: [
      { productSlug: "air-travel-api", label: "Flights", summary: "Search, book, ticket, refund and reissue every airline we carry.", image: "/images/partner/flights.jpg", alt: "A passenger jet flying through a clear blue sky", icon: "Plane" },
      { productSlug: "hotel-api", label: "Hotels", summary: "Find, book and cancel hotel stays worldwide.", image: "/images/partner/hotels.jpg", alt: "A modern white hotel behind a blue swimming pool", icon: "Hotel" },
      { productSlug: "esim-api", label: "eSIM", summary: "Travel eSIMs for 200+ countries and regions, issued at once.", image: "/images/partner/esim.jpg", alt: "A hand tapping a smartphone screen", icon: "Smartphone" },
      { productSlug: "airport-transfer-api", label: "Transfers", summary: "Private cars, vans and shuttles from hundreds of local providers.", image: "/images/partner/transfers.jpg", alt: "A white passenger van waiting at an airport terminal drop-off", icon: "Car" },
    ],
    viewLabel: "View API",
    guideLabel: "Guide",
  },
  getStarted: {
    header: { eyebrow: "Getting started", title: "From a sandbox key to live bookings", description: "Four steps to your first call, then certification on the sandbox." },
    image: "/images/partner/get-started.jpg",
    imageAlt: "A laptop showing code on a bright, tidy desk",
    steps: [
      { title: "Get a key", text: "In the agent portal under API access. The secret is shown once; store it server-side only." },
      { title: "Whitelist your server", text: "A key only works from the public IP addresses you add. Never call the API from a browser or mobile app." },
      { title: "Send two headers", text: "X-Api-Key and X-Api-Secret on every request. No login call, no token." },
      { title: "Call ping first", text: "It tells you which agency and key you are, and the IP we saw." },
    ],
    environments: [
      { name: "Sandbox", url: "https://sandbox.flightota.com/api/v1", prefix: "ak_test_", use: "Build and certify" },
      { name: "Production", url: "https://api.flightota.com/api/v1", prefix: "ak_live_", use: "Switched on after certification" },
    ],
    docsCta: { label: "Read the documentation", href: "/documentation" },
    notes: [
      {
        title: "One deposit pays for everything",
        icon: "Wallet",
        items: [
          "Tickets, instant fares, accepted reissue quotes and paid extras are taken from your deposit",
          "Refunds and voids are paid back into it",
          "An issue your deposit cannot cover charges nothing",
          "Prices come in your account's billing currency",
        ],
      },
      {
        title: "Go live after certification",
        icon: "BadgeCheck",
        items: ["Certification is run on the sandbox", "Send us the booking references from the go-live checklist", "When they check out, we switch on your live key"],
      },
    ],
  },
  travelSolutions: {
    header: {
      eyebrow: "Travel Technology Solutions",
      title: "End-to-End Travel Platforms for Modern OTAs & Agents",
      description:
        "Our cloud platform delivers B2B agent networks, high-conversion B2C booking engines, white-label portals and central reservation systems, all built on the same unified travel API that powers our flight, hotel and ancillary products.",
    },
    items: [
      {
        id: "b2b-portal",
        badge: "B2B Sub-Agent Distribution",
        title: "B2B Travel Agent Portal & Network",
        subtitle: "Built for Travel Wholesalers, Consolidators & Travel Agencies",
        description:
          "A complete multi-tiered B2B travel distribution system. Onboard hundreds of sub-agents, define custom markups, issue agent credit limits, and automate ticket issuance with real-time deposit ledger management.",
        image: "/images/platforms/b2b.jpg",
        alt: "A bright modern office with a laptop by the window",
        icon: "Users",
        features: [
          "Multi-level agent hierarchy with role-based staff logins",
          "Dynamic markup engine (airline-wise, cabin-wise, hotel-wise)",
          "Agent deposit wallet, credit limits & automated top-ups",
          "Instant PNR ticket issuance, invoice & voucher generation",
          "Comprehensive sales reports and agent commission ledger",
        ],
        cta: { label: "Explore B2B Portal", href: "/documentation" },
      },
      {
        id: "b2c-portal",
        badge: "B2C Consumer Booking Engine",
        title: "Consumer Internet Booking Engine (IBE)",
        subtitle: "For Online Travel Agencies (OTAs) & Consumer Brands",
        description:
          "High-converting, responsive travel booking engine. Delivers fast flight and hotel searches, interactive seat selection, dynamic baggage upsells, and instant multi-gateway checkout with automated SMS/email vouchers.",
        image: "/images/platforms/b2c.jpg",
        alt: "A person using a laptop and a phone at a table",
        icon: "Globe",
        features: [
          "Live flight search with a lowest-fare calendar",
          "Interactive aircraft seat maps, meal & baggage add-ons",
          "Local & international payments (SSLCommerz, bKash, Cards)",
          "Automated e-ticketing, SMS & WhatsApp confirmation alerts",
          "Traveller self-service: date changes & cancellation requests",
        ],
        cta: { label: "View Booking Engine", href: "/apis/air-travel-api" },
      },
      {
        id: "white-label",
        badge: "White Label Portal",
        title: "White Label Travel Platform",
        subtitle: "For Travel Startups, Boutique Agencies & Corporate Portals",
        description:
          "Launch a fully functional, accredited travel booking portal under your own custom domain in less than 48 hours. Zero IATA accreditation or direct GDS contract negotiations needed to start earning commissions.",
        image: "/images/platforms/white-label.jpg",
        alt: "A clean white desk with a large monitor, tablet and phone",
        icon: "Laptop",
        features: [
          "Custom domain (travel.yourbrand.com) with SSL included",
          "Customizable brand colors, logos, hero banners & typography",
          "Pre-integrated GDS, NDC & hotel inventory from day one",
          "No direct GDS bond or IATA licensing required to start",
          "Centralized administrative dashboard for markups & bookings",
        ],
        cta: { label: "White Label Details", href: "/pricing" },
      },
      {
        id: "travel-erp",
        badge: "Travel ERP & CRS Back-Office",
        title: "Central Reservation System & Travel ERP",
        subtitle: "For DMCs, Tour Consolidators & Inbound Tour Operators",
        description:
          "Unify mid-office operations, supplier contracts, and dynamic travel packaging. Manage direct inventory extranets, automate airline PNR queues, and reconcile supplier payables with end-to-end financial precision.",
        image: "/images/platforms/erp.jpg",
        alt: "A laptop showing analytics charts on a desk",
        icon: "Building2",
        features: [
          "Central Reservation System (CRS) for direct contracted hotels",
          "Dynamic Packaging Engine (Flight + Hotel + Transfer combos)",
          "Automated PNR queue management & ticketing time-limit alerts",
          "Supplier extranet for direct rate loading and room allocation",
          "Multi-currency financial reconciliation & tax invoicing",
        ],
        cta: { label: "ERP Architecture", href: "/about" },
      },
    ],
  },
  supplierNetwork: {
    header: {
      eyebrow: "Global Supplier & GDS Ecosystem",
      title: "One Unified Gateway to 150+ Global Travel Wholesalers",
      description: "Connect to GDS giants, NDC direct airline feeds, bed banks, and tour aggregators through one REST API, with the same keys and conventions.",
    },
    actions: [
      { label: "Browse All 7 APIs", href: "/apis" },
      { label: "View Airlines", href: "/airlines" },
    ],
    image: "/images/platforms/gateway.jpg",
    imageAlt: "City lights across the Earth seen from space at night",
    facts: [
      { title: "Every source at once", text: "Flight search shops every airline source at once; hotel search asks every hotel source at once.", icon: "Search" },
      { title: "Fare families and extras", text: "Every fare family as its own offer, with the seats, bags and meals on sale.", icon: "Layers" },
      { title: "A desk behind the API", text: "Where the airline does not answer by itself, our desk handles it and quotes by hand.", icon: "Headset" },
    ],
    tiers: [
      {
        category: "Global Distribution Systems (GDS)",
        image: "/images/solutions/gds_integration.jpg",
        alt: "An airliner parked at an airport gate at sunset",
        count: "3 Major GDS + NDC Level 4",
        description: "Full low-fare search, automated ticketing, seat map assignment, and PNR servicing.",
        partners: [
          { name: "Amadeus GDS", tag: "MasterPricer & NDC" },
          { name: "Sabre GDS", tag: "Bargain Finder Max" },
          { name: "Travelport", tag: "Galileo & Universal API" },
          { name: "IATA NDC", tag: "Level 4 Direct Connect" },
        ],
      },
      {
        category: "Airlines & Low-Cost Carriers (LCC)",
        image: "/images/solutions/itinerary_builder.jpg",
        alt: "A passenger jet climbing after take-off",
        count: "700+ Global & Regional Airlines",
        description: "Domestic and international routes with instant split-ticketing and baggage ancillary upsells.",
        partners: [
          { name: "Biman Bangladesh", tag: "Direct NDC / API" },
          { name: "US-Bangla Airlines", tag: "Direct Reservation" },
          { name: "Emirates & Qatar", tag: "NDC Rich Content" },
          { name: "AirAsia & IndiGo", tag: "LCC Direct Connect" },
        ],
      },
      {
        category: "Global Hotel Bed Banks",
        image: "/images/categories/hotel.jpg",
        alt: "A modern hotel suite with glass walls",
        count: "1,200,000+ Verified Properties",
        description: "Real-time room availability, static cache feeds, non-refundable & refundable rate plans.",
        partners: [
          { name: "Hotelbeds", tag: "Wholesale Bed Bank" },
          { name: "WebBeds", tag: "Global Inventory" },
          { name: "Expedia EPS", tag: "Rapid API Direct" },
          { name: "Direct CRS Hotels", tag: "Proprietary Contracts" },
        ],
      },
      {
        category: "Ground Transport & Sightseeing",
        image: "/images/categories/transfer.jpg",
        alt: "A dark electric car driving on a road",
        count: "50,000+ Routes & 100K+ Tours",
        description: "Airport private transfers, rental cars, and verified skip-the-line activities.",
        partners: [
          { name: "Viator / TripAdvisor", tag: "Curated Tours" },
          { name: "GetYourGuide", tag: "Attraction Tickets" },
          { name: "Hertz & Avis", tag: "Fleet Car Rentals" },
          { name: "Local Transfers", tag: "Intercity Vehicles" },
        ],
      },
    ],
  },
  dynamicPackaging: {
    header: {
      eyebrow: "Dynamic Packaging Engine",
      title: "Bundle Flights, Hotels & Transfers in One Booking Flow",
      description:
        "Enable your travelers and sub-agents to build custom vacation packages in real time. Dynamic packaging combines wholesale flight seats, direct hotel contracts, and airport ground transfers into a single opaque-price booking with instant consolidated vouchers.",
    },
    highlights: [
      { title: "Opaque Net Rates & Higher Margins", text: "Combine non-published airline consortium fares and wholesale bed bank rates without violating strict public rate parity rules.", icon: "BadgePercent", tone: "emerald" },
      { title: "Automated Single Checkout & Multi-Voucher", text: "One credit card swipe or agent wallet deduction issues the airline PNR, hotel confirmation number, and transfer driver contact automatically.", icon: "Sparkles", tone: "primary" },
      { title: "Flexible Sub-Agent Markups", text: "B2B agencies can set percentage or flat markups on the overall package or on individual components dynamically.", icon: "Tag", tone: "amber" },
    ],
    actions: [
      { label: "Explore Package APIs", href: "/apis/travel-activities-api" },
      { label: "Read Packaging Architecture", href: "/documentation" },
    ],
    preview: {
      image: "/images/solutions/dynamic_packaging.jpg",
      alt: "Dynamic Vacation Package Bundle",
      badge: "Bundle Savings: 18% OFF",
      eyebrow: "Example Package Bundle",
      title: "Dhaka ⇄ Cox's Bazar 5-Star Beach Getaway (4D / 3N)",
      items: [
        { icon: "Plane", tone: "rose", title: "Biman Bangladesh Boeing 787", subtitle: "DAC ⇄ CXB (Round-trip) • Direct NDC Seat", price: "$142", note: "Included" },
        { icon: "Hotel", tone: "amber", title: "Sayeman Beach Resort & Spa", subtitle: "Ocean View Suite • 3 Nights • Breakfast incl.", price: "$280", note: "Included" },
        { icon: "Compass", tone: "sky", title: "Airport VIP Private Transfer", subtitle: "CXB Airport ⇄ Hotel • AC Sedan Meet & Greet", price: "$38", note: "Included" },
      ],
      regularLabel: "Regular Standalone: $460",
      bundleLabel: "Dynamic Net Bundle:",
      bundlePrice: "$377",
      footnote: "Single PNR Issuance",
    },
  },
  corporate: {
    header: {
      eyebrow: "Enterprise Business Automation",
      title: "Corporate Travel Tools, Itinerary Builders & Supplier Extranets",
      description:
        "Enterprise travel technology goes beyond simple search APIs. We deliver the mid-office software, policy approval engines and bespoke tour planning tools that corporate TMCs and high-volume tour operators rely on daily.",
    },
    capabilitiesLabel: "Key Capabilities",
    modules: [
      {
        id: "csbt",
        tag: "TMC & Corporate Travel",
        title: "Corporate Self-Booking Tool (CSBT)",
        subtitle: "Automated Travel Policy & Manager Approvals",
        description:
          "Empower enterprise employees to book compliant business trips while enforcing company travel guidelines. Includes automated manager approval routing, project billing codes, and centralized monthly credit billing.",
        image: "/images/solutions/corporate_booking.jpg",
        alt: "Corporate Self-Booking Tool and business travel management",
        icon: "Briefcase",
        highlights: [
          "Custom policy validation (cabin restrictions by employee tier)",
          "Multi-level L1 / L2 manager approval chains via email & SMS",
          "Cost-center allocation, department codes & GST / VAT invoicing",
          "Corporate negotiated net airline rates & preferred hotel perks",
          "Real-time duty of care tracking and CO2 carbon offset analytics",
        ],
        cta: { label: "Explore Corporate Solution", href: "/contact?topic=enterprise" },
      },
      {
        id: "itinerary-builder",
        tag: "Tour Operators & DMCs",
        title: "Smart Travel Itinerary Builder & Proposal App",
        subtitle: "Day-by-Day Bespoke Vacation Planning",
        description:
          "Transform raw travel components into elegant, professional day-by-day itineraries within minutes. Generate customized branded PDF proposals with high-resolution photos, route maps, and instant online payment links.",
        image: "/images/solutions/itinerary_builder.jpg",
        alt: "Travel Itinerary Builder and proposal software",
        icon: "CalendarCheck2",
        highlights: [
          "Intuitive drag-and-drop day-by-day activity and route planning",
          "Pre-loaded database of 50K+ verified attractions & sightseeing tours",
          "Instant white-label PDF proposal export with custom agency branding",
          "Live interactive mobile web link for clients with accept & pay button",
          "Dynamic cost-sheet calculator with automated agency commission",
        ],
        cta: { label: "Try Itinerary Engine", href: "/apis/travel-activities-api" },
      },
      {
        id: "hotel-extranet",
        tag: "Hoteliers & Local Suppliers",
        title: "Hotel Extranet & Direct Contracting Hub (CRS)",
        subtitle: "Central Reservation System for Proprietary Inventory",
        description:
          "Enable independent hotels, resort chains, and local DMCs to log into a dedicated supplier extranet. Manage direct room allocations, load seasonal rate plans, set cancellation rules, and monitor booking payouts.",
        image: "/images/solutions/hotel_extranet.jpg",
        alt: "Hotel Extranet and central reservation system inventory",
        icon: "Hotel",
        highlights: [
          "Dedicated supplier extranet portal with encrypted multi-user login",
          "Dynamic room allocation calendar with real-time stop-sell controls",
          "Seasonal rate matrices, meal supplement plans & weekend surcharges",
          "Direct hotel voucher generation with instant automated check-in codes",
          "Automated fortnightly supplier payout statements & tax ledgers",
        ],
        cta: { label: "View CRS Extranet", href: "/apis/hotel-api" },
      },
    ],
  },
  categories: {
    header: { eyebrow: "API categories", title: "Everything a traveller books, behind one gateway", description: "Seven product lines, each with its own guide, endpoints and examples." },
    browseCard: { badge: "Full Catalog", title: "Browse the marketplace", description: "Search, filter and compare every API by price, limits and availability.", linkLabel: "Explore all APIs", image: "/images/categories/flight.jpg" },
  },
  stats: {
    header: { eyebrow: "Platform statistics", title: "Built to carry production travel traffic" },
    endpointsLabel: "Documented endpoints",
    items: [
      { value: "700+", label: "Airlines (GDS & LCC)" },
      { value: "1.2M+", label: "Hotels & Properties" },
      { value: "150+", label: "Supplier Adapters" },
      { value: "190+", label: "Global Destinations" },
      { value: "99.99%", label: "Gateway Uptime SLA" },
    ],
  },
  developerExperience: {
    header: {
      eyebrow: "Developer experience",
      title: "One REST API, the same keys and conventions",
      description: "Flights, hotels, eSIM and transfers work the same way. Every call below is in the guides, with a real sandbox example.",
    },
    items: [
      { title: "Two headers, no token", description: "Send X-Api-Key and X-Api-Secret on every request. No login call, no token." },
      { title: "Money is never a float", description: "Integer minor units in your billing currency: 6863200 is 68,632.00 BDT." },
      { title: "Retries that never double-book", description: "If your call times out, send the same request with the same Idempotency-Key: you get the booking that was made, never a second one." },
      { title: "Errors you can branch on", description: "Every error has the same envelope. Branch on error.code; message is for people." },
      { title: "Unknown is null", description: "refundable: null means the airline did not say, not \"no\"." },
      { title: "A sandbox on real test systems", description: "Sandbox bookings go to airline test systems. A refusal there is a real code your integration must handle." },
    ],
    actions: [
      { label: "Read the docs", href: "/documentation" },
      { label: "Integration guides", href: "/guides" },
    ],
  },
  pricingOverview: {
    header: {
      eyebrow: "Pricing",
      title: "Start free. Pay for what you use. Scale with confidence.",
      description: "Free sandbox access, usage-based pricing per API, and monthly or annual plans with included requests.",
    },
    planIds: ["pay-as-you-go", "growth", "enterprise"],
    linkLabel: "Compare all plans and API pricing",
  },
  testimonials: {
    header: { eyebrow: "Customers", title: "Travel companies ship faster with FlightOTA" },
    items: [
      {
        quote:
          "The B2B sub-agent distribution portal allowed us to onboard 240+ travel agents across Bangladesh with custom markups and automated wallet deposits. Ticketing volume doubled in three months.",
        name: "Tanvir Hossain",
        role: "Head of Technology",
        company: "Bengal Global Holidays",
      },
      {
        quote:
          "Switching from fragmented GDS XML terminals to this unified travel gateway eliminated duplicate PNRs and saved our engineering team 400+ hours of custom adapter maintenance.",
        name: "Farhana Rahman",
        role: "VP of Engineering",
        company: "Skyward Travel Consolidators",
      },
      {
        quote:
          "The Dynamic Packaging engine lets us bundle Biman flights with Cox's Bazar resorts and private VIP airport transfers in a single checkout with 18% better margins.",
        name: "Asif Chowdhury",
        role: "Managing Director",
        company: "Horizon Tourism & Leisure",
      },
    ],
  },
  faq: {
    header: { eyebrow: "FAQ", title: "Questions, answered", description: "Can't find what you need?" },
    linkLabel: "Talk to our team",
    linkHref: "/contact",
    items: [
      {
        question: "Do I need my own supplier contracts?",
        answer:
          "No. You can start right away with our aggregated supplier connections. Enterprise customers can also bring their own credentials (for example an existing GDS or bed bank contract), and we route their traffic through those credentials.",
      },
      {
        question: "Is the sandbox free?",
        answer:
          "Yes. Every account gets free sandbox access with realistic test data and daily request allowances. Sandbox bookings are simulated and never reach a real supplier.",
      },
      {
        question: "How is usage billed?",
        answer:
          "Read requests (search, details, availability) are billed per 1,000 requests, with volume tiers. Supplier transactions, such as a ticketed passenger or a confirmed booking, have a small flat fee. You can pay as you go from a prepaid wallet or choose a monthly or annual plan with included requests.",
      },
      {
        question: "What happens if a booking request is retried?",
        answer:
          "Booking, ordering and payment endpoints require an Idempotency-Key header. If you retry with the same key, you get the original result back and the action is not repeated, so you are never charged twice.",
      },
      {
        question: "Can I restrict what an API key can do?",
        answer:
          "Yes. Keys are scoped to specific APIs and permissions (read or write), can be limited to IP allow-lists, and are shown in full only once, when you create them. We store only a secure hash.",
      },
      {
        question: "Which languages do you support?",
        answer:
          "Any language that can make HTTPS requests. We publish OpenAPI specs and official SDKs for TypeScript/JavaScript, Python and PHP, plus cURL examples for every endpoint.",
      },
    ],
  },
  cta: {},
};
