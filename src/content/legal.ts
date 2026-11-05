import type { LegalDocumentEntry } from "@/types/content";

/**
 * TEMPLATE LEGAL TEXT — not legal advice.
 * Have qualified counsel review and adapt these documents before launch.
 */
export const legal: LegalDocumentEntry[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    description: "Please read these terms carefully before using the platform or the APIs.",
    updatedAt: "2026-11-01",
    heroImage: "/images/heroes/about_architecture.jpg",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of these terms",
        body: [
          { type: "paragraph", text: "These Terms & Conditions govern your access to and use of the platform, the developer portal and the APIs. By creating an account or using the APIs, you agree to these terms on behalf of yourself and the organisation you represent." },
        ],
      },
      {
        id: "accounts",
        title: "2. Accounts and API keys",
        body: [
          { type: "list", items: ["You are responsible for every activity under your account and API keys.", "Keep API keys confidential. Never embed them in client-side code.", "Tell us immediately if you suspect a key has been compromised, and revoke it in the developer portal."] },
        ],
      },
      {
        id: "supplier-services",
        title: "3. Supplier services",
        body: [
          { type: "paragraph", text: "Travel inventory (flights, accommodation, eSIMs, visa processing, ground transport and activities) is provided by third-party suppliers. Bookings are subject to the supplier's own terms, fare rules and policies, which we pass on through the API." },
          { type: "paragraph", text: "Sandbox environments return simulated data. Sandbox transactions are not real bookings and create no obligations with any supplier." },
        ],
      },
      {
        id: "fees",
        title: "4. Fees and billing",
        body: [
          { type: "paragraph", text: "Fees are charged as described on the pricing page and in your order form. Request-based fees are calculated from metered usage. Booking-based fees apply only to successful supplier transactions. Prepaid wallet credits are non-transferable." },
        ],
      },
      {
        id: "acceptable-use",
        title: "5. Acceptable use",
        body: [
          { type: "list", items: ["Do not scrape, resell or cache supplier content beyond the limits allowed in the documentation.", "Do not try to get around rate limits, quotas or security controls.", "Do not create speculative or fictitious bookings."] },
        ],
      },
      {
        id: "liability",
        title: "6. Limitation of liability",
        body: [{ type: "paragraph", text: "To the extent permitted by law, our total liability arising out of these terms is limited to the fees you paid in the twelve months before the event giving rise to the claim." }],
      },
      {
        id: "changes",
        title: "7. Changes",
        body: [{ type: "paragraph", text: "We may update these terms. We will give at least 30 days' notice of material changes through the developer portal or by email." }],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "We collect only what we need to run the service, and we protect it carefully.",
    updatedAt: "2026-11-01",
    heroImage: "/images/heroes/about_architecture.jpg",
    sections: [
      {
        id: "overview",
        title: "1. Overview",
        body: [{ type: "paragraph", text: "This Privacy Policy explains how we collect, use and protect personal data when you use our website, developer portal and APIs." }],
      },
      {
        id: "data-we-collect",
        title: "2. Data we collect",
        body: [
          { type: "list", items: ["Account data: name, email, organisation and role.", "Usage data: API request metadata such as endpoint, status, latency and timestamps.", "Traveller data that you send through the APIs to fulfil bookings, which we process on your behalf as a processor."] },
        ],
      },
      {
        id: "how-we-use",
        title: "3. How we use data",
        body: [{ type: "list", items: ["To provide, secure and bill for the service.", "To pass traveller data to suppliers only when needed to fulfil a booking.", "To send service and security notifications."] }],
      },
      {
        id: "security",
        title: "4. Security",
        body: [
          { type: "paragraph", text: "API keys are stored as one-way hashes. Request logs shown in the developer portal redact authentication headers, tokens and personal data. Data is encrypted in transit and at rest." },
        ],
      },
      {
        id: "retention",
        title: "5. Retention",
        body: [{ type: "paragraph", text: "Request logs are kept for the retention period of your plan. Booking records are kept for as long as accounting and legal obligations require." }],
      },
      {
        id: "rights",
        title: "6. Your rights",
        body: [{ type: "paragraph", text: "You can request access to, correction of or deletion of your personal data by contacting our support team. Traveller requests should go to the travel business that collected the data." }],
      },
    ],
  },
];
