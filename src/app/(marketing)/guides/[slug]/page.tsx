import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/common/article-layout";
import { BreadcrumbJsonLd, JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import { articleLd } from "@/lib/structured-data";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { getEntry, getSingleton, listEntries } from "@/services/server/cms-repository";
import { cmsPageMetadata, resolvePageSeo } from "@/services/server/seo";

export async function generateStaticParams() {
  const guides = await listEntries("guides");
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getEntry("guides", slug);
  if (!guide) return { title: "Guide not found" };
  return cmsPageMetadata(`/guides/${guide.slug}`, { publishedTime: guide.publishedAt });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const path = `/guides/${slug}`;
  const [guide, settings, seo] = await Promise.all([getEntry("guides", slug), getSingleton("site-settings"), resolvePageSeo(path)]);
  if (!guide) notFound();
  return (
    <>
      <JsonLd data={articleLd(guide, { type: "TechArticle", path, siteUrl: siteConfig.url, siteName: settings.name, image: seo.image })} />
      <BreadcrumbJsonLd crumbs={[{ name: "Guides", path: "/guides" }, { name: guide.title, path }]} />
      <ArticleLayout
        article={guide}
        eyebrow={`${guide.level} guide`}
        backHref="/guides"
        backLabel="All guides"
        meta={<span className="rounded-full bg-muted px-2 py-0.5 text-xs">{guide.apis.join(", ")}</span>}
      />
      <CtaBand />
    </>
  );
}
