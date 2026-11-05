import { GitCompareArrows } from "lucide-react";
import { ApiCard } from "@/components/marketplace/api-card";
import type { ApiProductSummary } from "@/types/catalog";

/** Shown when fewer than two APIs are selected for comparison. */
export function ComparePicker({ products }: { products: ApiProductSummary[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-lg border border-dashed bg-card p-5 text-sm text-muted-foreground">
        <GitCompareArrows className="size-5 text-primary" aria-hidden />
        Select two or three APIs with <span className="font-medium text-foreground">Compare</span>, then open the comparison from
        the tray at the bottom of the screen.
      </div>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.slug}>
            <ApiCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
