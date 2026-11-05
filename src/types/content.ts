/** Structured rich-text blocks for blog posts, guides and legal pages (CMS-ready shape). */
export type ContentBlock =
  | { type: "heading"; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; code: string; title?: string }
  | { type: "callout"; tone: "info" | "warning"; text: string };

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
