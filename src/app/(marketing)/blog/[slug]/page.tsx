import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/common/article-layout";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { getEntry, listEntries } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";

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
  const post = await getEntry("blog", slug);
  if (!post) notFound();
  return (
    <>
      <ArticleLayout article={post} eyebrow={post.category} backHref="/blog" backLabel="All posts" />
      <CtaBand />
    </>
  );
}
