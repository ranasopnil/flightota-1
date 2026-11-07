import type { IntegrationsPageContent } from "@/types/pages";

/** The /integrations list page and the shared label on every integration page. */
export const integrationsPage: IntegrationsPageContent = {
  hero: {
    eyebrow: "AIRLINE CONNECTIVITY",
    eyebrowIcon: "Plane",
    badge: "One flight API, every source",
    title: "GDS, NDC & LCC API Integrations",
    description:
      "Amadeus, Sabre and Travelport content, airline NDC direct connects and low-cost carriers, searched, booked and ticketed through one REST flight API and paid from one deposit.",
    image: "/images/solutions/gds_integration.jpg",
    metrics: [{ text: "Amadeus · Sabre · Travelport" }, { text: "Search answers in 5–30 s", accent: true }, { text: "NDC and LCC direct connects" }],
    actions: [
      { label: "Request a demo", href: "/contact?topic=sales", variant: "primary" },
      { label: "Flights API guide →", href: "/documentation/air-travel-api", variant: "outline" },
    ],
  },
  groups: {
    channel: {
      eyebrow: "Distribution channels",
      title: "GDS, NDC and low-cost carrier integration",
      description: "How each kind of airline source reaches your platform, and what changes for your booking flow.",
    },
    gds: {
      eyebrow: "GDS providers",
      title: "Amadeus, Sabre and Travelport",
      description: "The three global distribution systems we query, each with its own page for the agencies that know it.",
    },
  },
  cardCtaLabel: "Read the integration guide",
  relatedTitle: "Related integrations and APIs",
  cta: {
    title: "Ready to connect your platform to every airline source?",
    description: "Tell us what you sell and we will walk through the integration on the sandbox with your routes.",
    primary: { label: "Request a demo", href: "/contact?topic=sales", icon: "PhoneCall" },
  },
};
