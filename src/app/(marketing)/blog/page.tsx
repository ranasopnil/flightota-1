import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { Button } from "@/components/ui/button";
import { listBlogPosts } from "@/services/server/content-repository";
import { formatIsoDate } from "@/utils/format";

export const metadata: Metadata = staticPageMetadata("/blog");

export default async function BlogPage() {
  const [featured, ...rest] = await listBlogPosts();
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <BookOpen className="size-3 text-brand-300" />
            ENGINEERING &amp; PRODUCT
          </>
        }
        badge="Latest Insights"
        title="Product updates and engineering notes"
        description="Architecture deep-dives, protocol breakdowns, and lessons from building unified travel infrastructure."
        image="/images/heroes/airlines_tarmac.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              NDC 21.3 Architecture
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              Idempotency Best Practices
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Hotel Bed Bank Aggregation
            </span>
          </>
        }
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <Link href="/guides">Integration Guides &rarr;</Link>
            </Button>
            <ShareEmbedModal
              path="/blog"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />
      <Container className="py-14">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-lg border bg-card transition hover:border-primary/40 md:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative min-h-64 overflow-hidden bg-muted">
              <Image
                src="/images/heroes/airlines_tarmac.jpg"
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
                Read article <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        )}

        <ul className="app-rail mt-4 sm:mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((post, idx) => {
            const postImages = [
              "/images/hero/hero_hotel.jpg",
              "/images/hero/hero_esim.jpg",
              "/images/categories/flight.jpg",
              "/images/hero/hero_visa.jpg",
              "/images/hero/hero_transfer.jpg",
            ];
            const postThumb = postImages[idx % postImages.length];

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:border-primary/40 "
                >
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    <Image
                      src={postThumb}
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
            );
          })}
        </ul>
      </Container>
    </>
  );
}
