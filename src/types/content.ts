/** Structured rich-text blocks for blog posts, guides and legal pages (CMS-ready shape). */
export type ContentBlock =
  | { type: "heading"; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; code: string; title?: string }
  | { type: "callout"; tone: "info" | "warning"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string; width?: number; height?: number };

/** Optional overrides for a page's link preview and document title. */
export interface SeoFields {
  title?: string;
  description?: string;
  image?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (yyyy-mm-dd). */
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  author: { name: string; role: string };
  body: ContentBlock[];
  /** Thumbnail on list pages. Falls back to the list page's default image. */
  image?: string;
  seo?: SeoFields;
}

export type BlogPost = Article & { category: "Product" | "Engineering" | "Industry" };

export type Guide = Article & {
  level: "Beginner" | "Intermediate" | "Advanced";
  apis: string[];
};

export interface LegalSection {
  id: string;
  title: string;
  body: ContentBlock[];
}

/** A legal document such as the terms or the privacy policy; routes are fixed per slug. */
export interface LegalDocumentEntry {
  slug: string;
  title: string;
  description: string;
  /** ISO date (yyyy-mm-dd). */
  updatedAt: string;
  heroImage?: string;
  sections: LegalSection[];
  seo?: SeoFields;
}

/** A partner API guide. Text may use `code` and **bold** inline. */
export type ApiGuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; code: string; title?: string; language?: string };

export interface ApiGuideSection {
  id: string;
  title: string;
  blocks: ApiGuideBlock[];
}

export interface ApiGuide {
  title: string;
  intro: string;
  sections: ApiGuideSection[];
}

/** A guide stored by the product slug it documents. */
export type ApiGuideEntry = ApiGuide & { slug: string; seo?: SeoFields };
