import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { serverEnv } from "@/config/env";
import { toSummary } from "@/features/marketplace/lib/catalog";
import { categories as mockCategories, products as mockProducts } from "@/mocks/catalog";
import type { ApiSuccess } from "@/types/api";
import type { ApiCategory, ApiCategorySlug, ApiProduct, ApiProductSummary } from "@/types/catalog";

/**
 * Server-side catalog data access for Server Components.
 *
 * When API_INTERNAL_URL is set, data is fetched from the platform backend
 * (NestJS). Otherwise the bundled mock catalog is used, so builds and
 * prerendering never depend on a running backend.
 */
async function fetchFromBackend<T>(path: string): Promise<T> {
  const res = await fetch(`${serverEnv.apiInternalUrl}${path}`, { headers: { Accept: "application/json" } });
  if (res.status === 404) throw new CatalogNotFoundError(path);
  if (!res.ok) throw new Error(`Catalog request failed: ${res.status} ${path}`);
  const body = (await res.json()) as ApiSuccess<T>;
  return body.data;
}

export class CatalogNotFoundError extends Error {}

const backendConfigured = () => Boolean(serverEnv.apiInternalUrl);

export async function listCategories(): Promise<ApiCategory[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  return backendConfigured() ? fetchFromBackend<ApiCategory[]>("/catalog/categories") : mockCategories;
}

export async function listProducts(): Promise<ApiProductSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  return backendConfigured() ? fetchFromBackend<ApiProductSummary[]>("/catalog/products") : mockProducts.map(toSummary);
}

export async function getProduct(slug: string): Promise<ApiProduct | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog", `product:${slug}`);
  if (!backendConfigured()) return mockProducts.find((p) => p.slug === slug) ?? null;
  try {
    return await fetchFromBackend<ApiProduct>(`/catalog/products/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof CatalogNotFoundError) return null;
    throw error;
  }
}

/** Full products (with endpoints) — used by the documentation portal. */
export async function listProductsDetailed(): Promise<ApiProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  if (!backendConfigured()) return mockProducts;
  const summaries = await listProducts();
  const detailed = await Promise.all(summaries.map((s) => getProduct(s.slug)));
  return detailed.filter((p): p is ApiProduct => p !== null);
}

export async function getCategory(slug: ApiCategorySlug): Promise<ApiCategory | null> {
  const all = await listCategories();
  return all.find((c) => c.slug === slug) ?? null;
}
