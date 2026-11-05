"use client";

import { ArrowRight, Building } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { BillingCycle, PricingPlan } from "@/types/pricing";

export function PricingPlans({ plans, annualDiscountLabel, enterpriseNote }: { plans: PricingPlan[]; annualDiscountLabel: string; enterpriseNote: string }) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const isEnterprise = (p: PricingPlan) => p.monthlyPrice === null && p.annualMonthlyPrice === null;
  const selfServe = plans.filter((p) => !isEnterprise(p));
  const enterprise = plans.find(isEnterprise);

  return (
    <div>
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          value={cycle}
          onValueChange={(v) => v && setCycle(v as BillingCycle)}
          aria-label="Billing cycle"
          variant="outline"
          className="rounded-full bg-card p-1 "
        >
          <ToggleGroupItem value="monthly" className="rounded-full px-5 data-[state=on]:bg-navy-900 data-[state=on]:text-white">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="annual" className="rounded-full px-5 data-[state=on]:bg-navy-900 data-[state=on]:text-white">
            Annual
            <span className="ml-1.5 rounded-full bg-sea-100 px-1.5 py-0.5 text-[10px] font-semibold text-sea-800">{annualDiscountLabel}</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="app-rail mt-4 grid gap-6 sm:mt-12 md:grid-cols-2 xl:grid-cols-4">
        {selfServe.map((plan) => (
          <PricingCard key={plan.id} plan={plan} cycle={cycle} />
        ))}
      </div>

      {enterprise && (
        <div className="relative mt-6 overflow-hidden rounded-lg bg-navy-950 p-8 text-white">
          <div aria-hidden className="bg-grid-light absolute inset-0 opacity-60" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Building className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold">{enterprise.name}</h3>
                <p className="mt-1 max-w-xl text-navy-200">{enterprise.description} {enterpriseNote}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-navy-200">
                  {enterprise.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button asChild size="xl" variant="inverse" className="shrink-0">
              <Link href={enterprise.cta.href}>
                {enterprise.cta.label} <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
