import "server-only";

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getEntry, getSingleton } from "./cms-repository";

export interface ResolvedSeo {
  title: string;
  description: string;
  image: string;
  absoluteTitle?: boolean;
}

export interface SeoOverrides extends Partial<ResolvedSeo> {
  shareTitle?: string;
  publishedTime?: string;
}

const defined = <T extends object>(o: T | undefined) => Object.fromEntries(Object.entries(o ?? {}).filter(([, v]) => v !== undefined)) as Partial<T>;

/**
 * What a page shows when shared: the `seo` document for fixed URLs, then the
 * entry's own seo/image fields for detail pages, then the site defaults.
 */
export async function resolvePageSeo(path: string, overrides?: Partial<ResolvedSeo>): Promise<ResolvedSeo> {
  const [seo, settings] = await Promise.all([getSingleton("seo"), getSingleton("site-settings")]);
  const page = seo.pages[path];
  const base: ResolvedSeo = { title: settings.name, description: settings.description, image: seo.defaultImage };
  if (page) return { ...base, ...page, ...defined(overrides) };

  const [, section, slug] = path.split("/");
  const entry: Partial<ResolvedSeo> = {};
  if (slug && section === "solutions") {
    const e = await getEntry("solutions", slug);
    if (e) Object.assign(entry, { title: e.seo?.title ?? e.title, description: e.seo?.description ?? e.description, image: e.seo?.image ?? e.heroImage });
  } else if (slug && section === "blog") {
    const e = await getEntry("blog", slug);
    if (e) Object.assign(entry, { title: e.seo?.title ?? e.title, description: e.seo?.description ?? e.excerpt, image: e.seo?.image ?? e.image });
  } else if (slug && section === "guides") {
    const e = await getEntry("guides", slug);
    if (e) Object.assign(entry, { title: e.seo?.title ?? e.title, description: e.seo?.description ?? e.excerpt, image: e.seo?.image ?? e.image });
  } else if (slug && (section === "apis" || section === "documentation")) {
    entry.image = seo.catalogImages[slug];
  } else if (!slug && (section === "terms" || section === "privacy")) {
    const e = await getEntry("legal", section);
    if (e) Object.assign(entry, { title: e.seo?.title ?? e.title, description: e.seo?.description ?? e.description, image: e.seo?.image });
  }
  return { ...base, ...defined(entry), ...defined(overrides) };
}

/** Metadata for a page, resolved from the CMS. */
export async function cmsPageMetadata(path: string, overrides?: SeoOverrides): Promise<Metadata> {
  const { shareTitle, publishedTime, ...rest } = overrides ?? {};
  const [resolved, settings] = await Promise.all([resolvePageSeo(path, rest), getSingleton("site-settings")]);
  return buildPageMetadata({ ...resolved, path, siteName: settings.name, shareTitle, publishedTime });
}
