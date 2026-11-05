import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { staticPageMetadata } from "@/config/share";
import { imageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import { getSingleton, listEntries } from "@/services/server/cms-repository";
import type { Guide } from "@/types/content";

export const metadata: Metadata = staticPageMetadata("/guides");

const levelStyles: Record<Guide["level"], string> = {
  Beginner: "bg-sea-50 text-sea-700 dark:bg-sea-900/40 dark:text-sea-200",
  Intermediate: "bg-navy-50 text-navy-700 dark:bg-navy-800/50 dark:text-navy-100",
  Advanced: "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-200",
};

export default async function GuidesPage() {
  const [page, guides] = await Promise.all([getSingleton("guides-page"), listEntries("guides")]);
  return (
    <>
      <CmsPageHero hero={page.hero} path="/guides" />
      <Container className="py-14">
        <ul className="app-rail grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:border-primary/40 sm:flex-row"
              >
                <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-48">
                  <Image
                    src={imageSrc(guide.image ?? page.defaultImage)}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={cn("rounded-full px-2 py-0.5 font-medium", levelStyles[guide.level])}>{guide.level}</span>
                    <span className="text-muted-foreground">{guide.apis.join(", ")}</span>
                    <span className="text-muted-foreground">· {guide.readingMinutes} min</span>
                  </div>
                  <h2 className="mt-3 font-heading text-lg font-semibold group-hover:text-primary">{guide.title}</h2>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground line-clamp-2">{guide.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {page.readLabel} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
