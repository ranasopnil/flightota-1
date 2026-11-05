import type { ListPageContent } from "@/types/pages";

export const guidesPage: ListPageContent = {
  hero: {
    eyebrow: "INTEGRATION GUIDES",
    eyebrowIcon: "Compass",
    badge: "Step-by-Step Walkthroughs",
    title: "From first request to production",
    description: "Practical walkthroughs of complete integration flows: authentication, booking states, idempotency, and going live.",
    image: "/images/heroes/guides_planning.jpg",
    metrics: [{ text: "Five-Minute Quickstart" }, { text: "6 Core Flows", accent: true }, { text: "Complete Webhook Lifecycle" }],
    actions: [{ label: "API Reference →", href: "/documentation", variant: "outline" }],
  },
  defaultImage: "/images/heroes/guides_planning.jpg",
  readLabel: "Read guide",
};
