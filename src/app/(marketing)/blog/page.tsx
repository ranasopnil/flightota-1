import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { imageSrc } from "@/lib/image-src";
import { getSingleton, listEntries } from "@/services/server/cms-repository";
import { formatIsoDate } from "@/utils/format";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/blog");
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getSingleton("blog-page"), listEntries("blog")]);
  const [featured, ...rest] = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <>
      <CmsPageHero hero={page.hero} path="/blog" />
      <Container className="py-14">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-lg border bg-card transition hover:border-primary/40 md:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative min-h-64 overflow-hidden bg-muted">
              <Image
                src={imageSrc(featured.image ?? page.defaultImage)}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-8">
              <time dateTime={featured.publishedAt} className="text-sm text-muted-foreground">
                {formatIsoDate(featured.publishedAt)}
              </time>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight group-hover:text-primary sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {page.readLabel} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        )}

        <ul className="app-rail mt-4 sm:mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:border-primary/40 "
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={imageSrc(post.image ?? page.defaultImage)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                    {formatIsoDate(post.publishedAt)}
                  </time>
                  <h2 className="mt-3 font-heading text-lg font-semibold group-hover:text-primary">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <span className="mt-5 text-xs font-medium text-muted-foreground">{post.readingMinutes} min read</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
