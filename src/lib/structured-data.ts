import type { Article } from "@/types/content";
import type { SiteSettings } from "@/types/pages";

/**
 * JSON-LD builders. Every value here must match what the page shows: search
 * engines treat structured data that contradicts the visible content as spam.
 */
export type JsonLdObject = Record<string, unknown>;

export const organizationId = (siteUrl: string) => `${siteUrl}/#organization`;

const absolute = (siteUrl: string, path: string) => (/^https?:\/\//.test(path) ? path : `${siteUrl}${path}`);

/** Social links count only when they point at a profile, not a bare host such as https://x.com. */
const profileLinks = (social: SiteSettings["social"]) =>
  Object.values(social).filter((url) => {
    try {
      return new URL(url).pathname.length > 1;
    } catch {
      return false;
    }
  });

const logo = (siteUrl: string) => ({ "@type": "ImageObject", url: `${siteUrl}/logo-mark.svg` });

export function organizationLd(settings: SiteSettings, siteUrl: string): JsonLdObject {
  const sameAs = profileLinks(settings.social);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(siteUrl),
    name: settings.name,
    legalName: settings.legalName,
    url: siteUrl,
    logo: logo(siteUrl),
    description: settings.description,
    email: settings.salesEmail,
    telephone: settings.phone,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: settings.salesEmail, telephone: settings.phone, availableLanguage: ["en"] },
      { "@type": "ContactPoint", contactType: "customer support", email: settings.supportEmail, availableLanguage: ["en"] },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteLd(settings: SiteSettings, siteUrl: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: settings.name,
    url: siteUrl,
    description: settings.description,
    inLanguage: "en",
    publisher: { "@id": organizationId(siteUrl) },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbLd(crumbs: Crumb[], siteUrl: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absolute(siteUrl, c.path) })),
  };
}

export interface ArticleLdOptions {
  type: "BlogPosting" | "TechArticle";
  path: string;
  siteUrl: string;
  siteName: string;
  /** Resolved share image for the article (its own image or the site default). */
  image: string;
}

export function articleLd(article: Article, { type, path, siteUrl, siteName, image }: ArticleLdOptions): JsonLdObject {
  const url = absolute(siteUrl, path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: article.title,
    description: article.excerpt,
    image: absolute(siteUrl, image),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role },
    publisher: { "@type": "Organization", "@id": organizationId(siteUrl), name: siteName, logo: logo(siteUrl) },
    keywords: article.tags.join(", "),
    inLanguage: "en",
  };
}

/** What a Service needs from a page; solutions and integration pages both have these fields. */
export interface ServiceSource {
  title: string;
  description: string;
  eyebrow: string;
  heroImage: string;
}

export function serviceLd(service: ServiceSource, { path, siteUrl, siteName }: { path: string; siteUrl: string; siteName: string }): JsonLdObject {
  const url = absolute(siteUrl, path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.description,
    serviceType: service.eyebrow,
    url,
    image: absolute(siteUrl, service.heroImage),
    provider: { "@type": "Organization", "@id": organizationId(siteUrl), name: siteName },
    areaServed: "Worldwide",
  };
}
