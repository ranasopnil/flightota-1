export type BillingCycle = "monthly" | "annual";

/** Plan ids are free-form so the CMS can add plans; the comparison table keys on them. */
export type PlanId = string;

export interface PricingPlan {
  id: PlanId;
  name: string;
  description: string;
  /** Monthly price in USD; null = custom pricing. */
  monthlyPrice: number | null;
  /** Effective monthly price when billed annually; null = custom pricing. */
  annualMonthlyPrice: number | null;
  priceNote: string;
  includedRequests: number | null;
  overagePer1k: number | null;
  highlighted?: boolean;
  cta: { label: string; href: string };
  features: string[];
}

export interface CreditPack {
  id: string;
  credits: number;
  price: number;
  bonusPercent: number;
}

export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  feature: string;
  values: Record<PlanId, ComparisonValue>;
}

export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}
