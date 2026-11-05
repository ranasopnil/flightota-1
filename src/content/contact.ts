import type { ContactPageContent } from "@/types/pages";

export const contact: ContactPageContent = {
  hero: {
    eyebrow: "GET IN TOUCH",
    badge: "Average Response < 4 Hours",
    title: "Let's talk about your integration",
    description: "Questions about pricing, technical architecture, or enterprise connectivity? Our solutions team is here to assist.",
    image: "/images/heroes/contact_concierge.jpg",
    metrics: [{ text: "Direct Solutions Engineers" }, { text: "Same-Day Onboarding", accent: true }, { text: "24/7 Severity-1 Coverage" }],
    actions: [{ label: "Docs →", href: "/documentation", variant: "outline" }],
  },
  channels: [
    { icon: "Mail", title: "Sales", body: "sales@flightota.com", href: "mailto:sales@flightota.com" },
    { icon: "LifeBuoy", title: "Support", body: "support@flightota.com", href: "mailto:support@flightota.com" },
    { icon: "Clock", title: "Response time", body: "Within one business day. Faster on Growth and Enterprise plans." },
    { icon: "MapPin", title: "Office", body: "Dhaka, Bangladesh" },
  ],
};
