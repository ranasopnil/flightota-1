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
  const posts = await listEntries("blog");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getEntry("blog", slug);
  if (!post) return { title: "Post not found" };
  return cmsPageMetadata(`/blog/${post.slug}`, { publishedTime: post.publishedAt });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const path = `/blog/${slug}`;
  const [post, settings, seo] = await Promise.all([getEntry("blog", slug), getSingleton("site-settings"), resolvePageSeo(path)]);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={articleLd(post, { type: "BlogPosting", path, siteUrl: siteConfig.url, siteName: settings.name, image: seo.image })} />
      <BreadcrumbJsonLd crumbs={[{ name: "Blog", path: "/blog" }, { name: post.title, path }]} />
      <ArticleLayout article={post} eyebrow={post.category} backHref="/blog" backLabel="All posts" />
      <CtaBand />
    </>
  );
}
