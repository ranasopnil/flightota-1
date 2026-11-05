import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/types/pages";
import type { PricingPlan } from "@/types/pricing";

export function PricingOverview({ content, allPlans }: { content: HomePageContent["pricingOverview"]; allPlans: PricingPlan[] }) {
  const plans = allPlans.filter((p) => content.planIds.includes(p.id));
  return (
    <Section tone="muted" id="pricing">
      <SectionHeader eyebrow={content.header.eyebrow} title={content.header.title} description={content.header.description} />
      <div className="app-rail mx-auto mt-4 sm:mt-12 grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="link" size="lg" className="text-sm sm:text-[15px]">
          <Link href="/pricing">
            {content.linkLabel} <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
