"use client";

import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { CategoryGlyph } from "@/components/common/category-icon";
import { EmptyState } from "@/components/common/states";
import { ApiCard, ApiListItem } from "@/components/marketplace/api-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  catalogQueryToSearch,
  defaultCatalogQuery,
  filterProducts,
  sortLabels,
  priceBandLabels,
  statusLabels,
} from "@/features/marketplace/lib/catalog";
import { cn } from "@/lib/utils";
import type {
  ApiCategory,
  ApiCategorySlug,
  ApiProductSummary,
  CatalogQuery,
  MarketplaceSort,
} from "@/types/catalog";
import { MarketplaceFilters } from "./marketplace-filters";

interface MarketplaceExplorerProps {
  products: ApiProductSummary[];
  categories: ApiCategory[];
  initialQuery: Required<CatalogQuery>;
}

const QUICK_TAGS = [
  "Flights NDC",
  "Hotels Bed Banks",
  "eSIM 5G",
  "Timatic Visa",
  "Transfers",
];

export function MarketplaceExplorer({
  products,
  categories,
  initialQuery,
}: MarketplaceExplorerProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const results = useMemo(() => filterProducts(products, query), [products, query]);

  // Category counts reflect every filter except the category itself.
  const counts = useMemo(() => {
    const base = filterProducts(products, { ...query, category: "all" });
    const map: Record<string, number> = { all: base.length };
    base.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, [products, query]);

  function update(patch: Partial<CatalogQuery>) {
    const next = { ...query, ...patch } as Required<CatalogQuery>;
    setQuery(next);
    window.history.replaceState(null, "", `${pathname}${catalogQueryToSearch(next)}`);
  }

  function reset() {
    update(defaultCatalogQuery);
  }

  const activeFilterCount =
    Number(query.category !== "all") +
    Number(query.price !== "all") +
    Number(query.status !== "all") +
    Number(query.sandboxOnly);

  const filters = (
    <MarketplaceFilters
      query={query}
      categories={categories}
      counts={counts}
      onChange={update}
    />
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-24">{filters}</div>
      </aside>

      <div className="min-w-0">
        {/* Search & Top Action Bar */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label htmlFor="api-search" className="sr-only">
                Search APIs
              </label>
              <Input
                id="api-search"
                type="search"
                value={query.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search APIs, features or endpoints"
                startIcon={<Search className="size-4" />}
                clearable
                onClear={() => update({ q: "" })}
                size="lg"
                className="text-[14px] sm:text-[15px] rounded-xl "
              />
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              {/* Mobile Filter Sheet Trigger */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="h-11 flex-1 sm:flex-none rounded-xl lg:hidden font-medium text-xs sm:text-sm"
                  >
                    <SlidersHorizontal className="size-4 mr-1.5" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="px-3 sm:px-4 pb-8">{filters}</div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select
                value={query.sort}
                onValueChange={(v) => update({ sort: v as MarketplaceSort })}
              >
                <SelectTrigger
                  className="!h-11 flex-1 sm:min-w-44 rounded-xl text-xs sm:text-sm font-medium"
                  aria-label="Sort APIs"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {(Object.keys(sortLabels) as MarketplaceSort[]).map((key) => (
                    <SelectItem key={key} value={key} className="text-xs sm:text-sm">
                      {sortLabels[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Switcher: Grid vs Native App List */}
              <div className="hidden items-center rounded-xl border border-border/80 bg-muted/40 p-0.5 shrink-0 sm:flex">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "rounded-lg p-2 text-muted-foreground transition-all cursor-pointer active:scale-95",
                    viewMode === "grid"
                      ? "bg-card text-foreground font-bold"
                      : "hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={cn(
                    "rounded-lg p-2 text-muted-foreground transition-all cursor-pointer active:scale-95",
                    viewMode === "list"
                      ? "bg-card text-foreground font-bold"
                      : "hover:text-foreground"
                  )}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Query Suggestion Tags */}
          <div className="hidden flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3 text-primary" /> Popular:
            </span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => update({ q: tag })}
                className="rounded-lg border border-border/60 bg-muted/40 hover:bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground transition-colors cursor-pointer active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Mobile & Tablet App-Style Horizontal Category Pill Bar */}
          <div className="scrollbar-none -mx-3 flex items-center gap-1.5 overflow-x-auto px-3 pb-1 sm:mx-0 sm:mt-1 sm:px-0 sm:pb-1.5 lg:hidden">
            {[{ slug: "all" as const, name: "All APIs" }, ...categories].map((cat) => {
              const active = query.category === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => update({ category: cat.slug as ApiCategorySlug | "all" })}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer active:scale-95 ",
                    active
                      ? "bg-primary text-primary-foreground font-bold"
                      : "border border-border/70 bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.slug !== "all" && (
                    <CategoryGlyph category={cat.slug} className="size-3.5 shrink-0" />
                  )}
                  <span>{"shortName" in cat ? cat.shortName : cat.name}</span>
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {counts[cat.slug] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Active Filter Dismissible Pills */}
        <div className="mt-2 flex min-h-8 flex-wrap items-center justify-between gap-2 sm:mt-4 sm:border-t sm:border-border/60 sm:pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground" aria-live="polite">
              <span className="font-bold text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "API" : "APIs"} found
            </p>

            {/* Active filter dismiss chips */}
            {query.category !== "all" && (
              <Badge
                variant="outline"
                className="gap-1 border-primary/30 bg-primary/10 text-primary text-[11px] font-medium"
              >
                {categories.find((c) => c.slug === query.category)?.name ?? query.category}
                <button
                  type="button"
                  onClick={() => update({ category: "all" })}
                  className="hover:text-foreground cursor-pointer"
                  aria-label="Remove category filter"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}

            {query.price !== "all" && (
              <Badge
                variant="outline"
                className="gap-1 border-border bg-muted/60 text-foreground text-[11px] font-medium"
              >
                Price: {priceBandLabels[query.price]}
                <button
                  type="button"
                  onClick={() => update({ price: "all" })}
                  className="hover:text-primary cursor-pointer"
                  aria-label="Remove price filter"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}

            {query.status !== "all" && (
              <Badge
                variant="outline"
                className="gap-1 border-border bg-muted/60 text-foreground text-[11px] font-medium"
              >
                Status: {statusLabels[query.status]}
                <button
                  type="button"
                  onClick={() => update({ status: "all" })}
                  className="hover:text-primary cursor-pointer"
                  aria-label="Remove status filter"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}

            {query.sandboxOnly && (
              <Badge
                variant="outline"
                className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium"
              >
                Sandbox Ready
                <button
                  type="button"
                  onClick={() => update({ sandboxOnly: false })}
                  className="hover:text-foreground cursor-pointer"
                  aria-label="Remove sandbox only filter"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}

            {query.q && (
              <Badge
                variant="outline"
                className="gap-1 border-border bg-muted/60 text-foreground text-[11px] font-medium"
              >
                Search: “{query.q}”
                <button
                  type="button"
                  onClick={() => update({ q: "" })}
                  className="hover:text-primary cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}
          </div>

          {(activeFilterCount > 0 || query.q) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
            >
              <X className="size-3 mr-1" /> Clear all
            </Button>
          )}
        </div>

        {/* Results: Grid View or App-Style List View */}
        {results.length > 0 ? (
          viewMode === "grid" ? (
            <>
              {/* Phones get the dense list; cards start at sm */}
              <ul className="mt-2 space-y-2 sm:hidden">
                {results.map((product) => (
                  <li key={product.slug}>
                    <ApiListItem product={product} />
                  </li>
                ))}
              </ul>
              <ul className="mt-4 hidden gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
                {results.map((product) => (
                  <li key={product.slug}>
                    <ApiCard product={product} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="mt-2 space-y-2 sm:mt-4 sm:space-y-3">
              {results.map((product) => (
                <li key={product.slug}>
                  <ApiListItem product={product} />
                </li>
              ))}
            </ul>
          )
        ) : (
          <EmptyState
            className="mt-4 py-16"
            title="No APIs match your filters"
            description="Try a different search term or clear some filters."
            action={
              <Button variant="outline" onClick={reset}>
                Reset filters
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
