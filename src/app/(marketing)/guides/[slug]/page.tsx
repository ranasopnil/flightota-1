import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/common/article-layout";
import { pageMetadata } from "@/config/share";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { getEntry, listEntries } from "@/services/server/cms-repository";

export async function generateStaticParams() {
  const guides = await listEntries("guides");
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getEntry("guides", slug);
  if (!guide) return { title: "Guide not found" };
  return pageMetadata({ title: guide.seo?.title ?? guide.title, description: guide.seo?.description ?? guide.excerpt, path: `/guides/${guide.slug}`, publishedTime: guide.publishedAt });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = await getEntry("guides", slug);
  if (!guide) notFound();
  return (
    <>
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
