/**
 * API product catalog domain types.
 * These mirror the public contract of the platform backend (NestJS) so the
 * mock data source and the real API are interchangeable.
 */

export type ApiCategorySlug =
  | "air"
  | "hotel"
  | "esim"
  | "visa"
  | "transfer"
  | "car-rental"
  | "activities";

/** Icon keys are resolved to Lucide icons in the UI layer (keeps data serialisable). */
export type CategoryIconKey = "plane" | "hotel" | "sim" | "stamp" | "car-front" | "car" | "ticket";

export interface ApiCategory {
  slug: ApiCategorySlug;
  name: string;
  shortName: string;
  description: string;
  icon: CategoryIconKey;
}

export type ApiStatus = "operational" | "degraded" | "beta" | "coming_soon";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ParamLocation = "path" | "query" | "header" | "body";

export interface ApiParam {
  name: string;
  in: ParamLocation;
  type: string;
  required: boolean;
  description: string;
  example?: string | number | boolean;
}

export interface ApiErrorExample {
  status: number;
  code: string;
  description: string;
}

/** JSON-serialisable value used for request/response examples. */
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface ApiEndpoint {
  id: string;
  group: string;
  method: HttpMethod;
  path: string;
  summary: string;
  description: string;
  params: ApiParam[];
  requestBody?: JsonValue;
  responseExample: JsonValue;
  errors?: ApiErrorExample[];
  /** True when the operation has side effects at a supplier (booking, ticketing, ordering). */
  supplierAction?: boolean;
  /** Replaces the default supplier-action warning for this endpoint. */
  notice?: string;
  /** HTTP status of responseExample. Defaults to 200. */
  successStatus?: number;
  /** Other documented responses, shown after the main example. */
  extraResponses?: { status: number; title: string; body: JsonValue }[];
  /** How long the documented sandbox call took, e.g. "30 s". */
  timing?: string;
}

/** Steps and figures shown on the product page, taken from the product's guide. */
export interface ApiFlow {
  title: string;
  subtitle: string;
  steps: { title: string; endpoint: string; desc: string; badge: string; image: string }[];
  stats: { value: string; label: string }[];
}

/** Where and how a product is called, when it differs from the platform gateway. */
export interface ApiAccess {
  productionUrl: string;
  sandboxUrl: string;
  /** Credentials sent on every request instead of a bearer token. */
  headers: { name: string; value: string; env: string }[];
}

export interface ApiCapability {
  title: string;
  description: string;
}

export interface ApiPricingTier {
  /** Upper bound of monthly requests covered by this tier; null = unlimited. */
  upTo: number | null;
  /** Price in USD per 1,000 requests. */
  pricePer1k: number;
}

export interface ApiProductPricing {
  freeRequests: number;
  tiers: ApiPricingTier[];
  /** Flat fee per successful supplier transaction (booking, order, ticket), if any. */
  transactionFee?: { amount: number; unit: string };
}

export interface ApiRateLimits {
  requestsPerSecond: number;
  requestsPerMinute: number;
  sandboxRequestsPerDay: number;
}

export interface IntegrationStep {
  title: string;
  description: string;
}

export interface ApiProduct {
  slug: string;
  name: string;
  category: ApiCategorySlug;
  tagline: string;
  description: string;
  version: string;
  status: ApiStatus;
  /** Sandbox environment available for testing. */
  sandbox: boolean;
  /** Production access available (requires an approved account and a connected supplier). */
  production: boolean;
  featured: boolean;
  /** Relative popularity score (0-100) used for "Popular" sorting. */
  popularity: number;
  features: string[];
  capabilities: ApiCapability[];
  endpoints: ApiEndpoint[];
  pricing: ApiProductPricing;
  rateLimits: ApiRateLimits;
  integrationSteps: IntegrationStep[];
  /** Number of supplier adapters available behind this product. */
  supplierAdapters: number;
  /** Supplier integration notes shown on the detail page. */
  supplierNote: string;
  latencyP50Ms: number;
  uptime90d: number;
  updatedAt: string;
  tags: string[];
  /** Product-specific base URLs and credentials. */
  access?: ApiAccess;
  /** What the guide says about plans and paying. Replaces request pricing on the product page and cards. */
  planNotes?: string[];
  /** Replaces the rate-limit figures on the product page. */
  rateLimitNote?: string;
  /** Replaces the default fact strip in the product page header. */
  facts?: { label: string; value: string; mono?: boolean }[];
  /** Endpoint shown in the product page header. Defaults to the first one. */
  primaryEndpointId?: string;
  /** Replaces the default banner above the integration steps. */
  integrationBanner?: { title: string; text: string };
  /** Replaces the marketing showcase on the product page. */
  flow?: ApiFlow;
}

export type ApiProductSummary = Omit<ApiProduct, "endpoints" | "capabilities" | "integrationSteps"> & {
  endpointCount: number;
};

export type MarketplaceSort = "popular" | "name" | "price-asc" | "price-desc";

export type PriceBand = "all" | "under-2" | "2-3" | "over-3";

export interface CatalogQuery {
  q?: string;
  category?: ApiCategorySlug | "all";
  status?: ApiStatus | "all";
  price?: PriceBand;
  sandboxOnly?: boolean;
  sort?: MarketplaceSort;
}
