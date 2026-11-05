import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/common/article-layout";
import { pageMetadata } from "@/config/share";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { getBlogPost, listBlogPosts } from "@/services/server/content-repository";

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, publishedTime: post.publishedAt });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  return (
    <>
      <ArticleLayout article={post} eyebrow={post.category} backHref="/blog" backLabel="All posts" />
      <CtaBand />
    </>
  );
}
