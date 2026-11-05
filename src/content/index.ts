/**
 * Bundled content: the fallback when no backend is configured and the seed
 * source for the admin database (`npm run cms:seed`). Server-only modules
 * import these through `@/services/server/cms-repository`.
 */
import type { CmsCollections, CmsSingletons, CmsType } from "@/types/cms";
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
  "blog-page": blogPage,
  "guides-page": guidesPage,
  "docs-overview": docsOverview,
};

export const bundledCollections: { [K in keyof CmsCollections]: CmsCollections[K][] } = {
  blog: blogPosts,
  guides,
  legal,
  solutions,
  airlines,
  "api-guides": apiGuides,
};

/** Types whose data the frontend should still read from the bundle even when a backend is configured. */
export const bundledOnly: ReadonlySet<CmsType> = new Set<CmsType>([]);
