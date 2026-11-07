import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroActions } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { BreadcrumbJsonLd, JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-hero";
import { FaqJsonLd, FaqList } from "@/components/marketing/faq-list";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { siteConfig } from "@/config/site";
import { imageSrc } from "@/lib/image-src";
import { serviceLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";
import { getEntry, getSingleton, listEntries } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";
import type { SectionCopy } from "@/types/pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Cache Components need at least one param to prerender. Until the first
 * integration page is published, a placeholder is returned; the page renders
 * the 404 for it (see next.js/docs/messages/empty-generate-static-params).
 */
const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  const pages = await listEntries("integrations");
  return pages.length ? pages.map((page) => ({ slug: page.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getEntry("integrations", slug);
  if (!page) return {};

  return cmsPageMetadata(`/integrations/${slug}`);
}

function Heading({ copy, className }: { copy: SectionCopy; className?: string }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {copy.eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-primary">{copy.eyebrow}</span>}
      <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{copy.title}</h2>
      {copy.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{copy.description}</p>}
    </div>
  );
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const path = `/integrations/${slug}`;
  const [page, section, settings] = await Promise.all([getEntry("integrations", slug), getSingleton("integrations-page"), getSingleton("site-settings")]);

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd data={serviceLd(page, { path, siteUrl: siteConfig.url, siteName: settings.name })} />
      <BreadcrumbJsonLd crumbs={[{ name: "Integrations", path: "/integrations" }, { name: page.title, path }]} />
      <FaqJsonLd items={page.faq.items} />

      <PageHero
        eyebrow={
          <>
            <Plug className="size-3 text-brand-300" />
            {page.eyebrow}
          </>
        }
        badge={page.badge}
        title={page.title}
        description={page.description}
        image={imageSrc(page.heroImage)}
        metrics={
          <>
            {page.metrics.map((m) => (
              <span key={m.label} className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-xs text-slate-200 backdrop-blur-md">
                {m.label}: <strong className="font-mono text-emerald-400">{m.value}</strong>
              </span>
            ))}
          </>
        }
        actions={<HeroActions actions={page.actions} path={path} share={{ title: page.title, description: page.description }} />}
      />

      <Container className="py-10 sm:py-16 space-y-14 sm:space-y-18">
        {/* Intro: what the integration is and who it is for */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Heading copy={page.intro} className="lg:col-span-5" />
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-foreground/85">
            {page.intro.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="rounded-xl border border-border/80 bg-muted/30 p-6 sm:p-10">
          <Heading copy={page.howItWorks} />
          <ol className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {page.howItWorks.steps.map((step) => (
              <li key={step.step} className="rounded-lg border border-border/70 bg-card p-5">
                <span className="font-mono text-2xl font-extrabold text-primary/40">{step.step}</span>
                <h3 className="mt-2 font-heading text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Capabilities */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Heading copy={page.capabilities} className="lg:col-span-5" />
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 rounded-xl border border-border/80 bg-card p-6">
            {page.capabilities.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/70 pt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Heading copy={page.faq} />
          <FaqList items={page.faq.items} />
        </section>

        {/* Related pages */}
        {page.related.length > 0 && (
          <section className="border-t border-border/70 pt-10">
            <h2 className="font-heading text-lg font-bold text-foreground">{section.relatedTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.related.map((link) => (
                <Button key={link.href} asChild variant="outline" size="sm" className="rounded-lg gap-1.5">
                  <Link href={link.href}>
                    {link.label}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        )}
      </Container>

      <CtaBand cta={page.cta} />
    </>
  );
}
