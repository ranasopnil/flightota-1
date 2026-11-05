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

/** Sections of the documentation overview page (anchors on /documentation). */
export const docsGuideSections = [
  { id: "getting-started", label: "Getting started" },
  { id: "conventions", label: "Conventions" },
  { id: "api-overview", label: "API overview" },
  { id: "errors", label: "Errors" },
  { id: "retries", label: "Retries" },
  { id: "updates", label: "Updates" },
  { id: "code-examples", label: "Code examples" },
] as const;
