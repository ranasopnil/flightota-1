import type { ApiSuccess } from "@/types/api";
import type { ApiCategory, ApiProduct, ApiProductSummary, CatalogQuery } from "@/types/catalog";
import { baseApi } from "./base-api";

function toSearchParams(query: CatalogQuery) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === "" || value === "all" || value === false) return;
    params.set(key, String(value));
  });
  return params.toString();
}

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ApiCategory[], void>({
      query: () => "/catalog/categories",
      transformResponse: (res: ApiSuccess<ApiCategory[]>) => res.data,
      providesTags: [{ type: "Catalog", id: "CATEGORIES" }],
    }),
    getProducts: build.query<ApiProductSummary[], CatalogQuery>({
      query: (query) => {
        const qs = toSearchParams(query);
        return `/catalog/products${qs ? `?${qs}` : ""}`;
      },
      transformResponse: (res: ApiSuccess<ApiProductSummary[]>) => res.data,
      providesTags: (result) => [
        { type: "Catalog", id: "LIST" },
        ...(result ?? []).map((p) => ({ type: "Product" as const, id: p.slug })),
      ],
    }),
    getProduct: build.query<ApiProduct, string>({
      query: (slug) => `/catalog/products/${encodeURIComponent(slug)}`,
      transformResponse: (res: ApiSuccess<ApiProduct>) => res.data,
      providesTags: (_result, _error, slug) => [{ type: "Product", id: slug }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductQuery } = catalogApi;
