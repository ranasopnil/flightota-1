import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { blogPosts } from "@/mocks/content/blog";
import { guides } from "@/mocks/content/guides";
import type { BlogPost, Guide } from "@/types/content";

/** Content access layer. Swap the mock arrays for a headless CMS without touching pages. */
export async function listBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await listBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function listGuides(): Promise<Guide[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  return guides;
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const all = await listGuides();
  return all.find((g) => g.slug === slug) ?? null;
}
