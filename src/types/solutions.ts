import type { IconKey } from "@/lib/icon-keys";
import type { BadgeTone } from "@/lib/tones";
import type { SeoFields } from "./content";

export type SolutionGroup = "development" | "platform";

export interface TravelSolution {
  slug: string;
  /** Portal development solutions list first, then platform licences. */
  group: SolutionGroup;
  title: string;
  tagline: string;
  eyebrow: string;
  badge: string;
  badgeTone: BadgeTone;
  description: string;
  heroImage: string;
  metrics: { label: string; value: string }[];
  keyBenefits: { title: string; desc: string; icon: IconKey }[];
  coreCapabilities: string[];
  architectureSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  seo?: SeoFields;
}
