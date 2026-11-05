import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/constants/pricing";

export function PricingOverview() {
  const plans = pricingPlans.filter((p) => ["pay-as-you-go", "growth", "enterprise"].includes(p.id));
  return (
    <Section tone="muted" id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Start free. Pay for what you use. Scale with confidence."
        description="Free sandbox access, usage-based pricing per API, and monthly or annual plans with included requests."
      />
      <div className="app-rail mx-auto mt-4 sm:mt-12 grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="link" size="lg" className="text-sm sm:text-[15px]">
          <Link href="/pricing">
            Compare all plans and API pricing <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
