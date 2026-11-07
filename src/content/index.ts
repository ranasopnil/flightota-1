/**
 * Bundled content: the fallback when no backend is configured and the seed
 * source for the admin database (`npm run cms:seed`). Server-only modules
 * import these through `@/services/server/cms-repository`.
 */
import type { CmsCollections, CmsSingletons, CmsType, CollectionType } from "@/types/cms";
import { about } from "./about";
import { airlines } from "./airlines";
import { airlinesPage } from "./airlines-page";
import { apiGuides } from "./api-guides";
import { blogPosts } from "./blog";
import { blogPage } from "./blog-page";
import { contact } from "./contact";
import { docsOverview } from "./docs-overview";
import { guides } from "./guides";
import { guidesPage } from "./guides-page";
import { home } from "./home";
import { integrations } from "./integrations";
import { integrationsPage } from "./integrations-page";
import { legal } from "./legal";
import { navigation } from "./navigation";
import { pricing } from "./pricing";
import { seo } from "./seo";
import { siteSettings } from "./site-settings";
import { solutions } from "./solutions";
import { solutionsPage } from "./solutions-page";

export const bundledSingletons: CmsSingletons = {
  "site-settings": siteSettings,
  navigation,
  seo,
  home,
  about,
  contact,
  "airlines-page": airlinesPage,
  pricing,
  "solutions-page": solutionsPage,
  "integrations-page": integrationsPage,
  "blog-page": blogPage,
  "guides-page": guidesPage,
  "docs-overview": docsOverview,
};

export const bundledCollections: { [K in keyof CmsCollections]: CmsCollections[K][] } = {
  blog: blogPosts,
  guides,
  legal,
  solutions,
  integrations,
  airlines,
  "api-guides": apiGuides,
};

/** Types whose data the frontend should still read from the bundle even when a backend is configured. */
export const bundledOnly: ReadonlySet<CmsType> = new Set<CmsType>([]);

/**
 * Entries that are drafts for the owner to review in the admin panel. The seed
 * marks them unpublished, the bundle hides them, and the parity check skips
 * them. Remove a slug here once its entry is published.
 */
export const draftSlugs: { readonly [K in CollectionType]?: readonly string[] } = {
  solutions: ["online-travel-agency-development", "white-label-travel-portal", "travel-api-aggregation"],
  integrations: [
    "gds-api-integration", "ndc-api-integration", "lcc-api-integration",
    "amadeus-api-integration", "sabre-api-integration", "travelport-api-integration",
  ],
};
