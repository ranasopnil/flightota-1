import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryIcon } from "@/components/common/category-icon";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { StatusBadge } from "@/components/common/status-badge";
import { CodeTabs } from "@/components/documentation/code-tabs";
import { GuideBlocks } from "@/components/documentation/guide-blocks";
import { staticPageMetadata } from "@/config/share";
import { siteConfig } from "@/config/site";
import { codeLanguages, generateCodeSample } from "@/lib/code-samples";
import { imageSrc } from "@/lib/image-src";
import { listProductsDetailed } from "@/services/server/catalog-repository";
import { getSingleton, listEntries } from "@/services/server/cms-repository";
import type { ApiProduct } from "@/types/catalog";

export const metadata: Metadata = staticPageMetadata("/documentation");

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-b py-6 first:pt-0 sm:py-10 last:border-b-0">
      <h2 id={`${id}-title`} className="font-heading text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-sm sm:text-[15.5px] leading-relaxed text-secondary-foreground">{children}</div>
    </section>
  );
}

function ProductCard({ p, showStatus }: { p: ApiProduct; showStatus?: boolean }) {
  return (
    <li>
      <Link href={`/documentation/${p.slug}`} className="group flex h-full items-start gap-3 rounded-lg border bg-card p-4 transition hover:border-primary/30">
        <CategoryIcon category={p.category} size="sm" />
        <span className="flex-1">
          <span className="flex items-center gap-2 font-medium group-hover:text-primary">
            {p.name} <span className="font-mono text-xs text-muted-foreground">{p.version}</span>
          </span>
          <span className="mt-0.5 block text-sm text-muted-foreground">{p.endpoints.length} endpoints</span>
        </span>
        {showStatus && p.status !== "operational" && <span className="hidden sm:inline-flex"><StatusBadge status={p.status} /></span>}
      </Link>
    </li>
  );
}

export default async function DocumentationPage() {
  const [products, guides, overview] = await Promise.all([listProductsDetailed(), listEntries("api-guides"), getSingleton("docs-overview")]);
  const guided = new Set(guides.map((g) => g.slug));
  const exampleProduct = products.find((p) => p.slug === overview.codeExample.productSlug);
  const exampleEndpoint = exampleProduct?.endpoints.find((e) => e.id === overview.codeExample.endpointId);
  const samples = exampleEndpoint
    ? codeLanguages.map((l) => ({ id: l.id, label: l.label, code: generateCodeSample(exampleEndpoint, l.id, exampleProduct?.access?.sandboxUrl ?? siteConfig.sandboxUrl, exampleProduct?.access) }))
    : [];
  const withGuides = products.filter((p) => guided.has(p.slug));
  const others = products.filter((p) => !guided.has(p.slug));
  const { hero } = overview;

  return (
    <div className="max-w-4xl">
      <header className="pb-3 sm:pb-6">
        <div className="relative mb-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-5 sm:p-6 text-white ">
          <Image
            src={imageSrc(hero.image)}
            alt="Developer documentation"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
          <div className="relative z-10 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
                {hero.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {hero.status}
              </span>
            </div>
            <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl text-white">{hero.title}</h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">{hero.description}</p>

            {/* Compact Bottom Bar: Quick Metrics & Action Shortcuts */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/15 text-[11px]">
              {hero.chips.map((chip, i) => (
                <span
                  key={chip}
                  className={i === 1 ? "rounded-md border border-white/15 bg-slate-900/80 px-2 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md" : "rounded-md border border-white/15 bg-slate-900/80 px-2 py-0.5 text-slate-200 backdrop-blur-md"}
                >
                  {chip}
                </span>
              ))}
              <ShareEmbedModal
                path="/documentation"
                size="sm"
                variant="outline"
                className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      </header>

      {overview.sections.map((section) => (
        <DocSection key={section.id} id={section.id} title={section.title}>
          <GuideBlocks blocks={section.blocks} />
          {section.widget === "api-overview" && (
            <>
              <ul className="grid grid-cols-2 gap-2 sm:gap-3">
                {withGuides.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </ul>
              {others.length > 0 && (
                <>
                  <p className="text-sm text-muted-foreground">{overview.apiOverview.othersLabel}</p>
                  <ul className="grid grid-cols-2 gap-2 sm:gap-3">
                    {others.map((p) => (
                      <ProductCard key={p.slug} p={p} showStatus />
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
          {section.widget === "code-example" && (
            <>
              {samples.length > 0 && <CodeTabs samples={samples} title={overview.codeExample.title} />}
              <Link href={overview.codeExample.linkHref} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {overview.codeExample.linkLabel} <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </DocSection>
      ))}
    </div>
  );
}
