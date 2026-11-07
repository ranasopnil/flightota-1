import type { AirlineItem } from "./airlines";
import type { ApiGuideEntry, BlogPost, Guide, LegalDocumentEntry } from "./content";
import type { IntegrationPage } from "./integrations";
import type {
  AboutPageContent, AirlinesPageContent, ContactPageContent, DocsOverviewContent, HomePageContent, IntegrationsPageContent, ListPageContent,
  NavigationContent, PricingContent, SeoContent, SiteSettings, SolutionsPageContent,
} from "./pages";
import type { TravelSolution } from "./solutions";

/** One document per type. */
export interface CmsSingletons {
  "site-settings": SiteSettings;
  navigation: NavigationContent;
  seo: SeoContent;
  home: HomePageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
  "airlines-page": AirlinesPageContent;
  pricing: PricingContent;
  "solutions-page": SolutionsPageContent;
  "integrations-page": IntegrationsPageContent;
  "blog-page": ListPageContent;
  "guides-page": ListPageContent;
  "docs-overview": DocsOverviewContent;
}

/** Many documents per type, each with a `slug`. */
export interface CmsCollections {
  blog: BlogPost;
  guides: Guide;
  legal: LegalDocumentEntry;
  solutions: TravelSolution;
  integrations: IntegrationPage;
  airlines: AirlineItem;
  "api-guides": ApiGuideEntry;
}

export type SingletonType = keyof CmsSingletons;
export type CollectionType = keyof CmsCollections;
export type CmsType = SingletonType | CollectionType;

export const SINGLETON_TYPES = [
  "site-settings", "navigation", "seo", "home", "about", "contact", "airlines-page", "pricing", "solutions-page",
  "integrations-page", "blog-page", "guides-page", "docs-overview",
] as const satisfies readonly SingletonType[];

export const COLLECTION_TYPES = ["blog", "guides", "legal", "solutions", "integrations", "airlines", "api-guides"] as const satisfies readonly CollectionType[];
