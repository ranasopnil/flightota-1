import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BillingCycle, PricingPlan } from "@/types/pricing";
import { formatCurrency, formatNumber } from "@/utils/format";

export function planPrice(plan: PricingPlan, cycle: BillingCycle) {
  return cycle === "annual" ? plan.annualMonthlyPrice : plan.monthlyPrice;
}

export function PricingCard({ plan, cycle = "monthly", compact = false }: { plan: PricingPlan; cycle?: BillingCycle; compact?: boolean }) {
  const price = planPrice(plan, cycle);
  const highlighted = plan.highlighted;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-lg border bg-card p-6",
        highlighted && "border-primary ring-1 ring-primary",
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          Most popular
        </span>
      )}
      <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

      <div className="mt-5 flex items-baseline gap-1.5">
        {price === null ? (
          <span className="font-heading text-3xl font-semibold tracking-tight">Custom</span>
        ) : (
          <span className="font-heading text-4xl font-semibold tracking-tight">{formatCurrency(price)}</span>
        )}
        {price !== null && price > 0 && <span className="text-sm text-muted-foreground">/mo</span>}
      </div>
      <p className="mt-1 min-h-5 text-xs text-muted-foreground">
        {price !== null && price > 0 && cycle === "annual" ? `Billed ${formatCurrency(price * 12)} yearly` : plan.priceNote}
      </p>

      <Button asChild size="xl" variant={highlighted ? "default" : "outline"} className="mt-6 w-full">
        <Link href={plan.cta.href}>{plan.cta.label}</Link>
      </Button>

      {!compact && (
        <>
          {plan.includedRequests !== null && (
            <p className="mt-6 text-sm font-medium">
              {formatNumber(plan.includedRequests)} requests included
              {plan.overagePer1k !== null && (
                <span className="font-normal text-muted-foreground"> · then {formatCurrency(plan.overagePer1k)}/1k</span>
              )}
            </p>
          )}
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-sea-500" aria-hidden />
                <span className="text-secondary-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
