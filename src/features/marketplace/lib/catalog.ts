import type {
  ApiProduct,
  ApiProductSummary,
  ApiStatus,
  CatalogQuery,
  MarketplaceSort,
  PriceBand,
} from "@/types/catalog";

/** Lowest per-1k request price across a product's tiers. */
export function startingPricePer1k(product: Pick<ApiProduct, "pricing">) {
  return Math.min(...product.pricing.tiers.map((tier) => tier.pricePer1k));
}

/** Entry-level (first tier) per-1k price, the figure shown as "from". */
export function entryPricePer1k(product: Pick<ApiProduct, "pricing">) {
  return product.pricing.tiers[0]?.pricePer1k ?? 0;
}

export function toSummary(product: ApiProduct): ApiProductSummary {
  const { endpoints, capabilities, integrationSteps, ...rest } = product;
  void capabilities;
  void integrationSteps;
  return { ...rest, endpointCount: endpoints.length };
}

export const statusLabels: Record<ApiStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  beta: "Beta",
  coming_soon: "Coming soon",
};

export const sortLabels: Record<MarketplaceSort, string> = {
  popular: "Most popular",
  name: "Name (A–Z)",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export const priceBandLabels: Record<PriceBand, string> = {
  all: "Any price",
  "under-2": "Under $2 / 1k",
  "2-3": "$2 – $3 / 1k",
  "over-3": "Over $3 / 1k",
};

function matchesPriceBand(price: number, band: PriceBand) {
  switch (band) {
    case "under-2":
      return price < 2;
    case "2-3":
      return price >= 2 && price <= 3;
    case "over-3":
      return price > 3;
    default:
      return true;
  }
}

function matchesQuery(product: ApiProductSummary, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [product.name, product.tagline, product.description, ...product.features, ...product.tags]
    .join(" ")
    .toLowerCase();
  return needle.split(/\s+/).every((term) => haystack.includes(term));
}

const sorters: Record<MarketplaceSort, (a: ApiProductSummary, b: ApiProductSummary) => number> = {
  popular: (a, b) => b.popularity - a.popularity,
  name: (a, b) => a.name.localeCompare(b.name),
  "price-asc": (a, b) => entryPricePer1k(a) - entryPricePer1k(b),
  "price-desc": (a, b) => entryPricePer1k(b) - entryPricePer1k(a),
};

/** Pure filtering + sorting used by both the mock API and the marketplace UI. */
export function filterProducts(products: ApiProductSummary[], query: CatalogQuery): ApiProductSummary[] {
  const { q = "", category = "all", status = "all", price = "all", sandboxOnly = false, sort = "popular" } = query;
  return products
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => status === "all" || p.status === status)
    .filter((p) => !sandboxOnly || p.sandbox)
    .filter((p) => matchesPriceBand(entryPricePer1k(p), price))
    .filter((p) => matchesQuery(p, q))
    .sort(sorters[sort]);
}

const categorySlugs = ["air", "hotel", "esim", "visa", "transfer", "car-rental", "activities"] as const;
const statuses = ["operational", "degraded", "beta", "coming_soon"] as const;
const priceBands = ["all", "under-2", "2-3", "over-3"] as const;
const sorts = ["popular", "name", "price-asc", "price-desc"] as const;

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

/** Parse untrusted URL search params into a safe, fully-populated catalog query. */
export function parseCatalogQuery(params: SearchParamsRecord): Required<CatalogQuery> {
  const first = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    q: (first("q") ?? "").slice(0, 100),
    category: pick(first("category"), ["all", ...categorySlugs], "all"),
    status: pick(first("status"), ["all", ...statuses], "all"),
    price: pick(first("price"), priceBands, "all"),
    sandboxOnly: first("sandbox") === "1",
    sort: pick(first("sort"), sorts, "popular"),
  };
}

/** Serialise a query back to a compact URL search string (defaults omitted). */
export function catalogQueryToSearch(query: Required<CatalogQuery>) {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set("q", query.q.trim());
  if (query.category !== "all") params.set("category", query.category);
  if (query.status !== "all") params.set("status", query.status);
  if (query.price !== "all") params.set("price", query.price);
  if (query.sandboxOnly) params.set("sandbox", "1");
  if (query.sort !== "popular") params.set("sort", query.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const defaultCatalogQuery: Required<CatalogQuery> = parseCatalogQuery({});
