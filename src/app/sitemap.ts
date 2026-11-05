import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { listProducts } from "@/services/server/catalog-repository";
import { listEntries } from "@/services/server/cms-repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, guides, solutions] = await Promise.all([listProducts(), listEntries("blog"), listEntries("guides"), listEntries("solutions")]);
  const url = (path: string) => `${siteConfig.url}${path}`;

  const staticPages = ["", "/apis", "/apis/compare", "/pricing", "/documentation", "/guides", "/blog", "/about", "/contact", "/solutions", "/airlines", "/terms", "/privacy"];

  return [
    ...staticPages.map((path) => ({ url: url(path), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...products.flatMap((p) => [
      { url: url(`/apis/${p.slug}`), lastModified: p.updatedAt, priority: 0.8 },
      { url: url(`/documentation/${p.slug}`), lastModified: p.updatedAt, priority: 0.6 },
    ]),
    ...solutions.map((s) => ({ url: url(`/solutions/${s.slug}`), priority: 0.7 })),
    ...guides.map((g) => ({ url: url(`/guides/${g.slug}`), lastModified: g.publishedAt, priority: 0.6 })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.publishedAt, priority: 0.5 })),
  ];
}
