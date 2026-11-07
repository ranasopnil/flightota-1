import type { SeoFields } from "./content";
import type { CtaContent, FaqItem, HeroAction, LinkItem, SectionCopy } from "./pages";

/** `channel`: a distribution channel (GDS, NDC, LCC); `gds`: one GDS provider. */
export type IntegrationGroup = "channel" | "gds";

export const INTEGRATION_GROUPS = ["channel", "gds"] as const satisfies readonly IntegrationGroup[];

export interface IntegrationStep {
  step: string;
  title: string;
  desc: string;
}

/**
 * A landing page under /integrations: one search intent per page (GDS, NDC,
 * LCC, Amadeus, Sabre, Travelport). Every section carries its own heading so
 * no two pages share copy.
 */
export interface IntegrationPage {
  slug: string;
  group: IntegrationGroup;
  title: string;
  eyebrow: string;
  badge: string;
  /** Hero paragraph; also the default meta description. */
  description: string;
  heroImage: string;
  metrics: { label: string; value: string }[];
  /** Hero buttons, the demo or contact button first. */
  actions: HeroAction[];
  /** Opening section: what the integration is and who it is for. */
  intro: SectionCopy & { paragraphs: string[] };
  howItWorks: SectionCopy & { steps: IntegrationStep[] };
  capabilities: SectionCopy & { items: string[] };
  faq: SectionCopy & { items: FaqItem[] };
  /** Internal links to related integrations, APIs and solutions. */
  related: LinkItem[];
  /** Overrides of the site's closing call-to-action band. */
  cta: Partial<CtaContent>;
  seo?: SeoFields;
}
