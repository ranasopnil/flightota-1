/**
 * Marketing copy and placeholder social proof.
 * NOTE: partner names, testimonials and headline metrics are illustrative
 * placeholders — replace them with real, verifiable figures before launch.
 */

export const heroHighlights = [
  "Same keys and conventions",
  "Paid from your deposit",
  "Sandbox on test systems",
  "Live after certification",
];

export const whyChooseUs = [
  {
    icon: "layers",
    title: "One contract, every GDS & supplier",
    description: "A single normalised JSON schema across Amadeus, Sabre, Travelport, NDC, bed banks, and eSIM operators. Add suppliers without rewriting client code.",
  },
  {
    icon: "shield",
    title: "Built for money-moving calls",
    description: "Idempotency keys on every booking, payment and order endpoint, so retries never create duplicate bookings, orphaned PNRs, or double charges.",
  },
  {
    icon: "gauge",
    title: "Fast browse-cache & observable",
    description: "Sub-90ms regional edge caching, per-request tracing IDs, and full request logs with sensitive PCI/PII data securely redacted.",
  },
  {
    icon: "plug",
    title: "Multi-supplier failover",
    description: "Automated health checks and circuit breakers route search and booking traffic away from degraded suppliers without downtime.",
  },
  {
    icon: "wallet",
    title: "B2B agent wallets & transparent billing",
    description: "Real-time deposit wallets, tiered sub-agent markups, prepaid balances, usage alerts, and automated multi-currency invoicing.",
  },
  {
    icon: "headset",
    title: "Dedicated travel engineers on support",
    description: "Direct integration reviews, a shared engineering Slack channel, and named solutions engineers for enterprise portal launches.",
  },
] as const;

export const howItWorks = [
  { step: "01", title: "Create an account", description: "Sign up, verify your email and configure your B2B or B2C organisation in a couple of minutes." },
  { step: "02", title: "Get sandbox keys", description: "Create test API keys with specific scopes, GDS mocks, and IP allow-lists to start calling endpoints immediately." },
  { step: "03", title: "Build and test flows", description: "Use our typed SDKs, Postman collection, and realistic flight/hotel sandbox data to build booking flows end-to-end." },
  { step: "04", title: "Launch into production", description: "Connect live suppliers, configure your agent markups, pick a plan, and switch to live keys with 99.99% SLA." },
];

export const platformStats = [
  { value: "700+", label: "Airlines (GDS & LCC)" },
  { value: "1.2M+", label: "Hotels & Properties" },
  { value: "150+", label: "Supplier Adapters" },
  { value: "190+", label: "Global Destinations" },
  { value: "99.99%", label: "Gateway Uptime SLA" },
];

export const developerExperience = [
  { title: "Two headers, no token", description: "Send X-Api-Key and X-Api-Secret on every request. No login call, no token." },
  { title: "Money is never a float", description: "Integer minor units in your billing currency: 6863200 is 68,632.00 BDT." },
  { title: "Retries that never double-book", description: "If your call times out, send the same request with the same Idempotency-Key: you get the booking that was made, never a second one." },
  { title: "Errors you can branch on", description: "Every error has the same envelope. Branch on error.code; message is for people." },
  { title: "Unknown is null", description: "refundable: null means the airline did not say, not \"no\"." },
  { title: "A sandbox on real test systems", description: "Sandbox bookings go to airline test systems. A refusal there is a real code your integration must handle." },
];

export const testimonials = [
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
];

export const faqs = [
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
];
