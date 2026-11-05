"use client";

import { CategoryGlyph } from "@/components/common/category-icon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { priceBandLabels, statusLabels } from "@/features/marketplace/lib/catalog";
import { cn } from "@/lib/utils";
import type { ApiCategory, ApiCategorySlug, ApiStatus, CatalogQuery, PriceBand } from "@/types/catalog";

interface MarketplaceFiltersProps {
  query: Required<CatalogQuery>;
  categories: ApiCategory[];
  counts: Record<string, number>;
  onChange: (patch: Partial<CatalogQuery>) => void;
}

export function MarketplaceFilters({ query, categories, counts, onChange }: MarketplaceFiltersProps) {
  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Category</legend>
        <ul className="flex flex-col gap-0.5">
          {[{ slug: "all" as const, name: "All APIs" }, ...categories].map((cat) => {
            const active = query.category === cat.slug;
            return (
              <li key={cat.slug}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ category: cat.slug as ApiCategorySlug | "all" })}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition",
                    active ? "bg-primary/10 font-medium text-primary" : "text-secondary-foreground hover:bg-accent",
                  )}
                >
                  {cat.slug === "all" ? (
                    <span className="size-4" aria-hidden />
                  ) : (
                    <CategoryGlyph category={cat.slug} className="size-4 shrink-0" />
                  )}
                  <span className="flex-1 truncate">{cat.name}</span>
                  <span className={cn("text-xs tabular-nums", active ? "text-primary" : "text-muted-foreground")}>{counts[cat.slug] ?? 0}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Price per 1k requests</legend>
        <RadioGroup value={query.price} onValueChange={(v) => onChange({ price: v as PriceBand })} className="gap-2.5">
          {(Object.keys(priceBandLabels) as PriceBand[]).map((band) => (
            <div key={band} className="flex items-center gap-2.5">
              <RadioGroupItem value={band} id={`price-${band}`} />
              <Label htmlFor={`price-${band}`} className="font-normal">
                {priceBandLabels[band]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Status</legend>
        <RadioGroup value={query.status} onValueChange={(v) => onChange({ status: v as ApiStatus | "all" })} className="gap-2.5">
          {(["all", "operational", "beta", "coming_soon"] as const).map((status) => (
            <div key={status} className="flex items-center gap-2.5">
              <RadioGroupItem value={status} id={`status-${status}`} />
              <Label htmlFor={`status-${status}`} className="font-normal">
                {status === "all" ? "Any status" : statusLabels[status]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3.5">
        <Label htmlFor="sandbox-only" className="flex flex-col items-start gap-0.5">
          <span>Sandbox available</span>
          <span className="text-xs font-normal text-muted-foreground">Only APIs you can test today</span>
        </Label>
        <Switch id="sandbox-only" checked={query.sandboxOnly} onCheckedChange={(checked) => onChange({ sandboxOnly: checked })} />
      </div>
    </div>
  );
}
