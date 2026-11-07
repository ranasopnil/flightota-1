import type { SeoContent } from "@/types/pages";

const og = (name: string) => `/images/og/${name}.jpg`;

/**
 * Link-preview text and pictures for fixed-URL pages, plus the share image per
 * API product. Blog posts, guides and solutions carry their own `seo` fields.
 */
export const seo: SeoContent = {
  defaultImage: og("hero_flight"),
  pages: {
    "/": {
      title: "Travel Portal Development & API Aggregator | FlightOTA",
      description:
        "Build B2B and B2C travel portals with FlightOTA. Unified GDS, NDC and LCC API integrations, white-label booking engines, hotels and transfers.",
      image: og("hero_flight"),
      absoluteTitle: true,
    },
    "/about": {
      title: "About Us — The Modern Travel API Platform",
      description: "FlightOTA builds high-performance, developer-first travel API infrastructure connecting flights, hotels, eSIM, visas, and ground transport through one unified gateway.",
      image: og("about_architecture"),
    },
    "/airlines": {
      title: "Airlines Directory — NDC & LCC Direct Connect",
      description: "Explore all supported IATA NDC and LCC (Low-Cost Carrier) airlines integrated into FlightOTA. Access rich content, unbundled fares, and zero GDS distribution surcharges.",
      image: og("airlines_tarmac"),
    },
    "/apis": {
      title: "API Marketplace",
      description:
        "Browse and compare travel APIs for flights, hotels, eSIM, visa, airport transfers, car rental and activities. Filter by category, price, status and sandbox availability.",
      image: og("hero_flight"),
    },
    "/apis/compare": {
      title: "Compare APIs",
      description: "Compare travel APIs side by side: pricing, rate limits, sandbox and production availability, latency and features.",
      image: og("compare_telemetry"),
    },
    "/blog": {
      title: "Blog",
      description: "Product updates, engineering deep-dives and insights from the travel API industry.",
      image: og("airlines_tarmac"),
    },
    "/contact": {
      title: "Contact Us",
      description: "Talk to our sales, support or partnerships team about travel API integrations, pricing and supplier connections.",
      image: og("contact_concierge"),
    },
    "/documentation": {
      title: "Documentation",
      description: "Get started with the Partner API: keys, base URLs, conventions, errors, retries and code examples.",
      image: og("guides_planning"),
    },
    "/guides": {
      title: "Integration Guides",
      description: "Step-by-step guides for integrating flight, hotel, eSIM, visa and transfer APIs, from first request to production.",
      image: og("guides_planning"),
    },
    "/pricing": {
      title: "Pricing",
      description:
        "Simple, usage-based pricing for travel APIs. Free sandbox, pay as you go, monthly and annual plans with included requests, and custom enterprise pricing.",
      image: og("pricing_lounge"),
    },
    "/privacy": {
      title: "Privacy Policy",
      description: "How we collect, use and protect personal data.",
      image: og("about_architecture"),
    },
    "/solutions": {
      title: "Travel Technology Solutions — B2B, B2C, CSBT & ERP Platforms",
      description:
        "Explore enterprise travel portal software, sub-agent distribution networks, consumer booking engines, corporate self-booking tools, and central reservation systems.",
      image: og("b2b_portal"),
    },
    "/terms": {
      title: "Terms & Conditions",
      description: "The terms that govern your use of the platform, developer portal and APIs.",
      image: og("about_architecture"),
    },
    "/login": {
      title: "Sign in",
      description: "Sign in to your FlightOTA developer portal to manage API keys, sandbox quotas, and travel integrations.",
      image: og("get-started"),
    },
    "/register": {
      title: "Create Developer Account",
      description: "Sign up for a free developer account on FlightOTA to get sandbox API keys for flights, hotels, eSIM, and visa services.",
      image: og("get-started"),
    },
    "/signup": {
      title: "Sign up",
      description: "Sign up for a free developer account on FlightOTA to get sandbox API keys for flights, hotels, eSIM, and visa services.",
      image: og("get-started"),
    },
  },
  catalogImages: {
    "air-travel-api": og("hero_flight"),
    "hotel-api": og("hero_hotel"),
    "esim-api": og("hero_esim"),
    "visa-api": og("hero_visa"),
    "airport-transfer-api": og("hero_transfer"),
    "car-rental-api": og("car_rental"),
    "travel-activities-api": og("activities"),
  },
};
