import { Check, Minus } from "lucide-react";
import type { ComparisonGroup, PricingPlan } from "@/types/pricing";

export function PlanComparison({ plans, groups }: { plans: PricingPlan[]; groups: ComparisonGroup[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full min-w-[820px] text-sm">
        <caption className="sr-only">Plan feature comparison</caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="w-56 p-5 text-left text-xs font-medium text-muted-foreground">
              Features
            </th>
            {plans.map((plan) => (
              <th key={plan.id} scope="col" className="p-5 text-center font-heading font-semibold">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.title}>
            <tr className="bg-muted">
              <th scope="colgroup" colSpan={plans.length + 1} className="px-5 py-2 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {group.title}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.feature} className="border-b last:border-b-0">
                <th scope="row" className="px-5 py-3 text-left font-medium text-secondary-foreground">
                  {row.feature}
                </th>
                {plans.map((plan) => {
                  const value = row.values[plan.id];
                  return (
                    <td key={plan.id} className="px-5 py-3 text-center">
                      {value === true ? (
                        <Check className="mx-auto size-4 text-sea-500" aria-label="Included" />
                      ) : value === false ? (
                        <Minus className="mx-auto size-4 text-muted-foreground" aria-label="Not included" />
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
