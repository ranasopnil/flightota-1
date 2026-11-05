import Link from "next/link";
import { CategoryIcon } from "@/components/common/category-icon";
import { StatusBadge } from "@/components/common/status-badge";
import { entryPricePer1k, startingPricePer1k } from "@/features/marketplace/lib/catalog";
import type { ApiProductSummary } from "@/types/catalog";
import { formatCurrency, formatNumber } from "@/utils/format";

export function ApiPricingTable({ products }: { products: ApiProductSummary[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full min-w-[760px] text-sm">
        <caption className="sr-only">Per-API request pricing</caption>
        <thead className="bg-muted text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-5 py-3 text-left font-medium">API</th>
            <th scope="col" className="px-5 py-3 text-right font-medium">Free / month</th>
            <th scope="col" className="px-5 py-3 text-right font-medium">From / 1k</th>
            <th scope="col" className="px-5 py-3 text-right font-medium">At volume / 1k</th>
            <th scope="col" className="px-5 py-3 text-right font-medium">Booking-based fee</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((p) => (
            <tr key={p.slug}>
              <th scope="row" className="px-5 py-3.5 text-left font-normal">
                <Link href={`/apis/${p.slug}#pricing`} className="group flex items-center gap-3">
                  <CategoryIcon category={p.category} size="sm" />
                  <span className="font-medium group-hover:text-primary">{p.name}</span>
                  {p.status !== "operational" && <StatusBadge status={p.status} />}
                </Link>
              </th>
              <td className="px-5 py-3.5 text-right tabular-nums">{p.pricing.freeRequests ? formatNumber(p.pricing.freeRequests) : "—"}</td>
              <td className="px-5 py-3.5 text-right font-semibold tabular-nums">{formatCurrency(entryPricePer1k(p), "USD", 2)}</td>
              <td className="px-5 py-3.5 text-right tabular-nums">{formatCurrency(startingPricePer1k(p), "USD", 2)}</td>
              <td className="px-5 py-3.5 text-right text-muted-foreground">
                {p.pricing.transactionFee ? (
                  <>
                    <span className="font-medium text-foreground">{formatCurrency(p.pricing.transactionFee.amount, "USD", 2)}</span> /{" "}
                    {p.pricing.transactionFee.unit}
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
