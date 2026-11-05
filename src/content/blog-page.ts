import type { ListPageContent } from "@/types/pages";

export const blogPage: ListPageContent = {
  hero: {
    eyebrow: "ENGINEERING & PRODUCT",
    eyebrowIcon: "BookOpen",
    badge: "Latest Insights",
    title: "Product updates and engineering notes",
    description: "Architecture deep-dives, protocol breakdowns, and lessons from building unified travel infrastructure.",
    image: "/images/heroes/airlines_tarmac.jpg",
    metrics: [{ text: "NDC 21.3 Architecture" }, { text: "Idempotency Best Practices", accent: true }, { text: "Hotel Bed Bank Aggregation" }],
    actions: [{ label: "Integration Guides →", href: "/guides", variant: "outline" }],
  },
  defaultImage: "/images/heroes/airlines_tarmac.jpg",
  readLabel: "Read article",
};
