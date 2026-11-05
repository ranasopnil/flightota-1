import type { SolutionsPageContent } from "@/types/pages";

export const solutionsPage: SolutionsPageContent = {
  hero: {
    eyebrow: "TRAVEL TECHNOLOGY SOLUTIONS",
    eyebrowIcon: "Workflow",
    badge: "Enterprise Platform Suite",
    title: "Complete Travel Software & Portal Solutions",
    description: "Inspired by global travel leaders like Travelopro, we provide booking engines, sub-agent distribution networks, corporate travel systems, and central reservation ERPs.",
    image: "/images/solutions/b2b_portal.jpg",
    metrics: [{ text: "12 Solutions" }, { text: "700+ Global Airlines", accent: true }, { text: "1.2M+ Accommodations" }],
    actions: [
      { label: "Book Platform Demo", href: "/contact?topic=sales", variant: "primary" },
      { label: "View Pricing →", href: "/pricing#portal-solutions", variant: "outline" },
    ],
  },
  cardCapabilitiesLabel: "Core Capabilities",
  cardCtaLabel: "Explore Platform Specs",
  detail: {
    demoCta: { label: "Book Live Demo", href: "/contact?topic=sales" },
    pricingCta: { label: "View Pricing Plans →", href: "/pricing#portal-solutions" },
    advantages: {
      eyebrow: "Strategic Advantages",
      title: "Built for Scale, Automation & Maximum Margin",
      description: "Designed around the operational realities of high-volume travel consolidators, online agencies, and corporate TMCs.",
    },
    lifecycle: {
      eyebrow: "System Lifecycle",
      title: "End-to-End Operational Workflow",
      description: "From onboarding and rule configuration to real-time execution and automated ledger reconciliation.",
    },
    specs: {
      eyebrow: "Technical Specifications",
      title: "Complete Feature Capabilities Included",
      description: "Every deployment includes pre-configured integrations, audit logging, security controls, and responsive web management.",
      cta: { label: "Talk to a Travel Architect", href: "/contact?topic=sales" },
    },
    faqLabel: "Frequently Asked Questions",
    faqTitle: "Questions About This Solution",
    ctaTitleTemplate: "Ready to deploy {{title}}?",
    ctaDescription: "Our engineers will configure your sandboxes, supplier adapters, and custom branding within 48 hours.",
  },
  cta: {
    title: "Ready to launch or modernize your travel platform?",
    description: "Our travel technology architects are ready to review your requirements, GDS connectivity, and sub-agent network structure.",
  },
};
