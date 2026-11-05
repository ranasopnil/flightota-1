import { Check } from "lucide-react";
import type { ApiProduct } from "@/types/catalog";
import { formatCompact, formatCurrency, formatNumber } from "@/utils/format";

function tierLabel(tiers: ApiProduct["pricing"]["tiers"], index: number) {
  const prev = index === 0 ? 0 : (tiers[index - 1].upTo ?? 0);
  const tier = tiers[index];
  if (tier.upTo === null) return `${formatCompact(prev)}+ requests`;
  return prev === 0 ? `Up to ${formatCompact(tier.upTo)} requests` : `${formatCompact(prev)} – ${formatCompact(tier.upTo)} requests`;
}

export function PricingTiers({ product }: { product: ApiProduct }) {
  const { pricing } = product;
  if (product.planNotes) {
    return (
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {product.planNotes.map((note) => (
          <li key={note} className="flex gap-2.5 rounded-lg border bg-card p-3 text-sm leading-relaxed text-secondary-foreground sm:p-4">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            {note}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <caption className="sr-only">Request pricing tiers for {product.name}</caption>
          <thead className="bg-muted text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-medium">Monthly volume</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Price per 1,000 requests</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pricing.freeRequests > 0 && (
              <tr>
                <td className="px-5 py-3.5">First {formatNumber(pricing.freeRequests)} requests</td>
                <td className="px-5 py-3.5 text-right font-semibold text-sea-600 dark:text-sea-300">Free</td>
              </tr>
            )}
            {pricing.tiers.map((tier, i) => (
              <tr key={i}>
                <td className="px-5 py-3.5">{tierLabel(pricing.tiers, i)}</td>
                <td className="px-5 py-3.5 text-right font-semibold">{formatCurrency(tier.pricePer1k, "USD", 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4">
        {pricing.transactionFee && (
          <div className="rounded-lg border bg-card p-5">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Booking-based fee</p>
            <p className="mt-2 font-heading text-2xl font-semibold">
              {formatCurrency(pricing.transactionFee.amount, "USD", 2)}
              <span className="text-sm font-normal text-muted-foreground"> / {pricing.transactionFee.unit}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Charged only for successful supplier transactions. Retries with the same Idempotency-Key are never billed twice.
            </p>
          </div>
        )}
        <div className="rounded-lg border bg-card p-5">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Rate limits</p>
          {product.rateLimitNote ? (
            <p className="mt-3 text-sm text-muted-foreground">{product.rateLimitNote}</p>
          ) : (
            <>
          <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Per second</dt>
              <dd className="mt-0.5 font-semibold">{product.rateLimits.requestsPerSecond}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Per minute</dt>
              <dd className="mt-0.5 font-semibold">{formatNumber(product.rateLimits.requestsPerMinute)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Sandbox / day</dt>
              <dd className="mt-0.5 font-semibold">{product.rateLimits.sandboxRequestsPerDay ? formatNumber(product.rateLimits.sandboxRequestsPerDay) : "—"}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">Higher limits are available on Growth and Enterprise plans.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
