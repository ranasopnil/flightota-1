import { Check, Minus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryIcon } from "@/components/common/category-icon";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { entryPricePer1k } from "@/features/marketplace/lib/catalog";
import type { ApiProduct } from "@/types/catalog";
import { formatCurrency, formatNumber } from "@/utils/format";

const yes = <Check className="mx-auto size-4 text-sea-500" aria-label="Yes" />;
const no = <Minus className="mx-auto size-4 text-muted-foreground" aria-label="No" />;

interface Row {
  label: string;
  render: (p: ApiProduct) => ReactNode;
}

const groups: { title: string; rows: Row[] }[] = [
  {
    title: "Availability",
    rows: [
      { label: "Status", render: (p) => <StatusBadge status={p.status} /> },
      { label: "Version", render: (p) => <code className="font-mono">{p.version}</code> },
      { label: "Sandbox", render: (p) => (p.sandbox ? yes : no) },
      { label: "Production", render: (p) => (p.production ? yes : no) },
      { label: "Supplier adapters", render: (p) => p.supplierAdapters || "—" },
    ],
  },
  {
    title: "Pricing",
    rows: [
      { label: "Free requests / month", render: (p) => (p.pricing.freeRequests ? formatNumber(p.pricing.freeRequests) : "—") },
      { label: "Price from (per 1k)", render: (p) => formatCurrency(entryPricePer1k(p), "USD", 2) },
      {
        label: "Lowest volume price (per 1k)",
        render: (p) => formatCurrency(Math.min(...p.pricing.tiers.map((t) => t.pricePer1k)), "USD", 2),
      },
      {
        label: "Booking-based fee",
        render: (p) => (p.pricing.transactionFee ? `${formatCurrency(p.pricing.transactionFee.amount, "USD", 2)} / ${p.pricing.transactionFee.unit}` : "—"),
      },
    ],
  },
  {
    title: "Limits & performance",
    rows: [
      { label: "Requests / second", render: (p) => p.rateLimits.requestsPerSecond },
      { label: "Requests / minute", render: (p) => formatNumber(p.rateLimits.requestsPerMinute) },
      { label: "Sandbox requests / day", render: (p) => (p.rateLimits.sandboxRequestsPerDay ? formatNumber(p.rateLimits.sandboxRequestsPerDay) : "—") },
      { label: "Latency p50", render: (p) => (p.latencyP50Ms ? `${p.latencyP50Ms} ms` : "—") },
      { label: "Uptime (90 days)", render: (p) => (p.uptime90d ? `${p.uptime90d}%` : "—") },
    ],
  },
  {
    title: "Capabilities",
    rows: [
      { label: "Endpoints", render: (p) => p.endpoints.length },
      {
        label: "Features",
        render: (p) => (
          <ul className="flex flex-col gap-1 text-left">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-1.5">
                <Check className="mt-0.5 size-3.5 shrink-0 text-sea-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },
];

export function ComparisonTable({ products }: { products: ApiProduct[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full min-w-[720px] text-sm">
        <caption className="sr-only">Comparison of {products.map((p) => p.name).join(", ")}</caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="w-56 p-5 text-left align-bottom text-xs font-medium text-muted-foreground">
              {products.length} APIs selected
            </th>
            {products.map((p) => (
              <th key={p.slug} scope="col" className="p-5 text-left align-top font-normal">
                <CategoryIcon category={p.category} size="sm" />
                <Link href={`/apis/${p.slug}`} className="mt-3 block font-heading text-base font-semibold hover:text-primary">
                  {p.name}
                </Link>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.tagline}</p>
                <Button asChild size="sm" variant="outline" className="mt-3">
                  <Link href={`/apis/${p.slug}`}>View details</Link>
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.title}>
            <tr className="bg-muted">
              <th scope="colgroup" colSpan={products.length + 1} className="px-5 py-2 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {group.title}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-b last:border-b-0">
                <th scope="row" className="px-5 py-3 text-left font-medium text-secondary-foreground">
                  {row.label}
                </th>
                {products.map((p) => (
                  <td key={p.slug} className="px-5 py-3 text-center align-top">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
