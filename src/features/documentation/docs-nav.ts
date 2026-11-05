import type { ApiCategorySlug, HttpMethod } from "@/types/catalog";

export interface DocsNavEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
}

export interface DocsNavProduct {
  slug: string;
  name: string;
  category: ApiCategorySlug;
  endpoints: DocsNavEndpoint[];
  /** Chapters of the product's written guide, in guide order. Empty when it has none. */
  guideSections: { id: string; label: string }[];
}

/** An anchor on the documentation overview page (/documentation). */
export interface DocsOverviewLink {
  id: string;
  label: string;
}
