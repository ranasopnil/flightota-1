import type { ComparisonGroup, CreditPack, PricingPlan } from "@/types/pricing";

export const ANNUAL_DISCOUNT_LABEL = "2 months free";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free-trial",
    name: "Free Trial",
    description: "Explore every API in the sandbox.",
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    priceNote: "14 days · sandbox only",
    includedRequests: 10_000,
    overagePer1k: null,
    cta: { label: "Start free", href: "/register?plan=free-trial" },
    features: ["All APIs in the sandbox", "10,000 sandbox requests", "2 test API keys", "Community support"],
  },
  {
    id: "pay-as-you-go",
    name: "Pay As You Go",
    description: "Prepaid wallet, no commitment.",
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    priceNote: "Pay only for usage, from your wallet",
    includedRequests: null,
    overagePer1k: null,
    cta: { label: "Create account", href: "/register?plan=pay-as-you-go" },
    features: ["Production access", "API-specific pricing per 1k", "Prepaid credit wallet", "Usage alerts", "Email support"],
  },
  {
    id: "starter",
    name: "Starter",
    description: "For growing agencies and startups.",
    monthlyPrice: 149,
    annualMonthlyPrice: 124,
    priceNote: "Billed monthly",
    includedRequests: 100_000,
    overagePer1k: 2.5,
    cta: { label: "Choose Starter", href: "/register?plan=starter" },
    features: ["100,000 requests / month", "5 production keys", "Webhooks", "Request logs (14 days)", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "For OTAs scaling across products.",
    monthlyPrice: 599,
    annualMonthlyPrice: 499,
    priceNote: "Billed monthly",
    includedRequests: 1_000_000,
    overagePer1k: 1.8,
    highlighted: true,
    cta: { label: "Choose Growth", href: "/register?plan=growth" },
    features: ["1M requests / month", "Unlimited keys & team members", "IP allow-listing", "Request logs (90 days)", "Shared Slack channel"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom volume, SLAs and supplier setup.",
    monthlyPrice: null,
    annualMonthlyPrice: null,
    priceNote: "Custom contract",
    includedRequests: null,
    overagePer1k: null,
    cta: { label: "Contact sales", href: "/contact?topic=sales" },
    features: ["Volume pricing & markup controls", "Bring your own supplier credentials", "99.95% uptime SLA", "SSO & audit logs", "Named solutions engineer"],
  },
];

export const creditPacks: CreditPack[] = [
  { id: "credits-100", credits: 100, price: 100, bonusPercent: 0 },
  { id: "credits-500", credits: 525, price: 500, bonusPercent: 5 },
  { id: "credits-2000", credits: 2200, price: 2000, bonusPercent: 10 },
];

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Usage",
    rows: [
      { feature: "Included requests / month", values: { "free-trial": "10k (sandbox)", "pay-as-you-go": "—", starter: "100k", growth: "1M", enterprise: "Custom" } },
      { feature: "Overage per 1k requests", values: { "free-trial": "—", "pay-as-you-go": "API rate", starter: "$2.50", growth: "$1.80", enterprise: "Custom" } },
      { feature: "Production access", values: { "free-trial": false, "pay-as-you-go": true, starter: true, growth: true, enterprise: true } },
      { feature: "Booking-based fees", values: { "free-trial": "—", "pay-as-you-go": true, starter: true, growth: true, enterprise: "Negotiable" } },
    ],
  },
  {
    title: "Developer tools",
    rows: [
      { feature: "API keys", values: { "free-trial": "2 test", "pay-as-you-go": "3", starter: "5", growth: "Unlimited", enterprise: "Unlimited" } },
      { feature: "Webhooks", values: { "free-trial": true, "pay-as-you-go": true, starter: true, growth: true, enterprise: true } },
      { feature: "Request log retention", values: { "free-trial": "3 days", "pay-as-you-go": "7 days", starter: "14 days", growth: "90 days", enterprise: "1 year" } },
      { feature: "IP allow-listing", values: { "free-trial": false, "pay-as-you-go": false, starter: true, growth: true, enterprise: true } },
    ],
  },
  {
    title: "Security & support",
    rows: [
      { feature: "Team members", values: { "free-trial": "1", "pay-as-you-go": "3", starter: "5", growth: "Unlimited", enterprise: "Unlimited" } },
      { feature: "SSO (SAML)", values: { "free-trial": false, "pay-as-you-go": false, starter: false, growth: false, enterprise: true } },
      { feature: "Uptime SLA", values: { "free-trial": false, "pay-as-you-go": false, starter: false, growth: "99.9%", enterprise: "99.95%" } },
      { feature: "Support", values: { "free-trial": "Community", "pay-as-you-go": "Email", starter: "Email", growth: "Slack", enterprise: "Dedicated" } },
    ],
  },
];

export const pricingFaqs = [
  {
    question: "How does the annual discount work?",
    answer: "Annual plans are billed once a year at a price equal to 10 months, so you get 2 months free. Included requests reset every month.",
  },
  {
    question: "What happens when I exceed my included requests?",
    answer: "Extra requests are billed at your plan's overage rate and taken from your wallet. You can set hard limits and alerts so there are no surprises.",
  },
  {
    question: "Can I change plans at any time?",
    answer: "Yes. Upgrades take effect immediately and are prorated. Downgrades take effect at the end of the current billing period.",
  },
  {
    question: "Are supplier transaction fees included in the plan?",
    answer: "No. Booking-based fees (for example per ticketed passenger) are charged per successful transaction and listed on each API's pricing.",
  },
];
