import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { BreadcrumbJsonLd } from "@/components/common/json-ld";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { imageSrc } from "@/lib/image-src";
import { getSingleton, listEntries } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";
import { INTEGRATION_GROUPS } from "@/types/integrations";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/integrations");
}

export default async function IntegrationsPage() {
  const [page, entries] = await Promise.all([getSingleton("integrations-page"), listEntries("integrations")]);
  // Nothing to list until the first integration page is published.
  if (!entries.length) notFound();

  const groups = INTEGRATION_GROUPS.map((key) => ({ key, copy: page.groups[key], items: entries.filter((entry) => entry.group === key) })).filter(
    (group) => group.items.length > 0,
  );

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Integrations", path: "/integrations" }]} />
      <CmsPageHero hero={page.hero} path="/integrations" />

      <Container className="py-12 sm:py-16 space-y-14 sm:space-y-18">
        {groups.map((group) => (
          <section key={group.key}>
            <div className="max-w-2xl">
              {group.copy.eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-primary">{group.copy.eyebrow}</span>}
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{group.copy.title}</h2>
              {group.copy.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{group.copy.description}</p>}
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/integrations/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:border-primary/50"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    <Image
                      src={imageSrc(item.heroImage)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold">{item.eyebrow}</Badge>
                    <h3 className="absolute bottom-3 left-3 right-3 font-heading text-lg font-bold leading-snug text-white">{item.title}</h3>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <p className="line-clamp-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {page.cardCtaLabel}
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </Container>

      <CtaBand cta={page.cta} />
    </>
  );
}
