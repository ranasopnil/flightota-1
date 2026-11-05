import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ShareButton } from "@/components/common/share-button";
import type { Article } from "@/types/content";
import { formatIsoDate } from "@/utils/format";
import { Container } from "./container";
import { ContentBlocks, headingsOf } from "./content-blocks";

interface ArticleLayoutProps {
  article: Article;
  eyebrow: string;
  backHref: string;
  backLabel: string;
  meta?: ReactNode;
}

export function ArticleLayout({ article, eyebrow, backHref, backLabel, meta }: ArticleLayoutProps) {
  const toc = headingsOf(article.body);
  return (
    <article>
      <header className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white py-5 sm:py-7">
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/images/heroes/about_architecture.jpg"
            alt="Article background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </div>
        <Container className="relative max-w-4xl">
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="size-3.5" /> {backLabel}
          </Link>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
              {eyebrow}
            </span>
          </div>
          <h1 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-white sm:text-4xl text-balance">{article.title}</h1>
          <p className="mt-2 text-xs sm:text-base text-slate-200 leading-relaxed">{article.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-3 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="font-medium text-white">{article.author.name}</span>
              <time dateTime={article.publishedAt}>{formatIsoDate(article.publishedAt)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {article.readingMinutes} min read
              </span>
              {meta}
            </div>
            <ShareButton
              title={article.title}
              description={article.excerpt}
              path={article.slug ? `${backHref}/${article.slug}` : backHref}
              size="sm"
              variant="outline"
              className="rounded-lg border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md"
            />
          </div>
        </Container>
      </header>

      <Container className="grid max-w-6xl gap-12 py-14 lg:grid-cols-[1fr_220px]">
        <ContentBlocks blocks={article.body} className="min-w-0" />
        {toc.length > 1 && (
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">On this page</p>
              <ul className="mt-3 flex flex-col gap-2 border-l text-sm">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </Container>
    </article>
  );
}
