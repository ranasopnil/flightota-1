import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  GitCompareArrows,
  Globe,
  ShieldCheck,
  Cpu,
  Zap,
  Workflow,
  Sparkles,
  Key,
  Briefcase,
  Hotel,
  Plane,
} from "lucide-react";
import { Container } from "@/components/common/container";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { Button } from "@/components/ui/button";
import { CategorySwiper } from "@/components/marketplace/category-swiper";
import { DeveloperExperience } from "@/features/marketing/sections/developer-experience";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { MarketplaceExplorer } from "@/features/marketplace/components/marketplace-explorer";
import { MarketplaceSkeleton } from "@/features/marketplace/components/marketplace-skeleton";
import { catalogQueryToSearch, parseCatalogQuery } from "@/features/marketplace/lib/catalog";
import { listCategories, listProducts, listProductsDetailed } from "@/services/server/catalog-repository";
import { getSingleton } from "@/services/server/cms-repository";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = staticPageMetadata("/apis");

async function Explorer({ searchParams }: { searchParams: PageProps<"/apis">["searchParams"] }) {
  const [products, categories, params] = await Promise.all([listProducts(), listCategories(), searchParams]);
  const initialQuery = parseCatalogQuery(params);
  // Re-mount when the URL query changes through navigation (e.g. header links).
  return (
    <MarketplaceExplorer
      key={catalogQueryToSearch(initialQuery)}
      products={products}
      categories={categories}
      initialQuery={initialQuery}
    />
  );
}

export default async function MarketplacePage({ searchParams }: PageProps<"/apis">) {
  const [categories, detailedProducts, home] = await Promise.all([
    listCategories(),
    listProductsDetailed(),
      getSingleton("home"),
  ]);

  const flights = detailedProducts.find((p) => p.slug === "air-travel-api");
  const sampleEndpoint = flights?.endpoints.find((e) => e.id === "flights-search");

  return (
    <>
      {/* 1. Compact High-Visibility Aviation & Travel Hero (KEPT INTACT AS REQUESTED) */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white py-4 sm:py-8 sm:min-h-[210px] flex items-center">
        {/* Full Background Photography with Directional Contrast - Clearly Visible */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/categories/flight.jpg"
            alt="Travel APIs Global Gateway"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] sm:object-center"
          />
          {/* Left-to-right fade for text contrast, crystal clear on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </div>

        <Container className="relative">
          <div className="flex flex-col gap-1.5 sm:gap-2.5 max-w-3xl">
            {/* Top Eyebrow & Status Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
                <Globe className="size-3 text-brand-300" />
                API MARKETPLACE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                7 APIs
              </span>
            </div>

            {/* Title & Concise Subtitle */}
            <h1 className="font-heading text-xl sm:text-4xl font-extrabold tracking-tight text-white">
              Every travel API your product needs
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Unified REST APIs for flights, hotels, eSIMs, visas, and transfers with the same keys and conventions.
            </p>

            {/* Compact Bottom Bar: Quick Metrics & Action Shortcuts */}
            <div className="mt-1 flex flex-col gap-2.5 sm:mt-1.5 sm:flex-row sm:items-center sm:justify-between sm:pt-2 sm:border-t sm:border-white/15">
              <div className="hidden flex-wrap items-center gap-1.5 text-[11px] sm:flex">
                <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
                  X-Api-Key &amp; X-Api-Secret
                </span>
                <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
                  Paid from your deposit
                </span>
                <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
                  Live after certification
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                  <Link href="/apis/compare">
                    <GitCompareArrows className="size-3 mr-1" />
                    Compare Matrix
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="rounded-lg text-xs font-semibold h-7 text-brand-300 hover:text-white">
                  <Link href="/documentation">
                    API Docs &rarr;
                  </Link>
                </Button>
                <ShareEmbedModal
                  path="/apis"
                  size="sm"
                  variant="outline"
                  className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Visual Travel Categories Strip with Real Bangladesh Photography */}
      <section className="border-b border-border/70 bg-muted/25 py-5 sm:py-10">
        <Container className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="size-3" />
                Travel Product Verticals
              </div>
              <h2 className="mt-1 font-heading text-xl sm:text-2xl font-bold text-foreground">
                Browse APIs by Category
              </h2>
            </div>
            <Link
              href="/airlines"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              View 200+ NDC &amp; LCC Airlines &rarr;
            </Link>
          </div>

          <Suspense fallback={<div className="h-44 rounded-lg bg-card border border-border/80 animate-pulse" />}>
            <CategorySwiper categories={categories} />
          </Suspense>
        </Container>
      </section>

      {/* 3. Main Marketplace Explorer & Catalog Filtering */}
      <Container className="py-5 sm:py-12">
        <Suspense fallback={<MarketplaceSkeleton />}>
          <Explorer searchParams={searchParams} />
        </Suspense>
      </Container>

      {/* 4. Enterprise Architecture & Reliability Standards */}
      <section className="border-y border-border/70 bg-card/60 py-7 sm:py-16">
        <Container className="space-y-4 sm:space-y-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Cpu className="size-3.5" />
              Unified API Mesh
            </span>
            <h2 className="mt-2 font-heading text-xl sm:text-3xl font-bold tracking-tight text-foreground">
              Built for high-volume travel bookings
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The partner APIs share the same keys and error envelope, eliminating integration overhead across fragmented suppliers.
            </p>
          </div>

          <div className="app-rail grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/80 bg-card p-5 transition hover:border-primary/40 ">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Key className="size-5" />
              </div>
              <h3 className="mt-3.5 font-heading text-sm font-bold text-foreground">
                Two headers, no token
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Send X-Api-Key and X-Api-Secret on every request. No login call, no token.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-card p-5 transition hover:border-primary/40 ">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Workflow className="size-5" />
              </div>
              <h3 className="mt-3.5 font-heading text-sm font-bold text-foreground">
                Live answers, read back any time
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                There are no webhooks yet. The booking is always the source of truth: read it to follow what happened.</p>
            </div>

            <div className="rounded-lg border border-border/80 bg-card p-5 transition hover:border-primary/40 ">
              <div className="flex size-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-3.5 font-heading text-sm font-bold text-foreground">
                100% Idempotent Retries
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Guaranteed safe network retries using client-supplied <code className="font-mono text-[11px] bg-muted px-1 rounded">Idempotency-Key</code> headers without double-booking.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-card p-5 transition hover:border-primary/40 ">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Zap className="size-5" />
              </div>
              <h3 className="mt-3.5 font-heading text-sm font-bold text-foreground">
                Paid from your deposit
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Tickets, orders and rides are paid from your deposit. Refunds and voids are paid back into it.
              </p>
            </div>
          </div>

          {/* Travelopro-scale Enterprise Travel Modules Showcase */}
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 sm:mt-8 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b sm:gap-4 sm:pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Travel Technology Protocols</span>
                <h3 className="mt-1 font-heading text-lg sm:text-2xl font-bold text-foreground">
                  Complete Booking Engine &amp; Mid-Office Infrastructure
                </h3>
              </div>
              <Button asChild size="sm" className="rounded-lg shrink-0">
                <Link href="/contact?topic=enterprise">Request Full API Schema &rarr;</Link>
              </Button>
            </div>

            <div className="app-rail mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              <div className="rounded-lg border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <Plane className="size-4" />
                  <span>Aviation &amp; GDS Core</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Amadeus, Sabre &amp; Travelport GDS consolidation alongside direct IATA NDC Level 4 pipes. Features dynamic 3D seat maps, automated PNR queues, and zero-surcharge net ticketing.
                </p>
                <div className="pt-2 border-t flex flex-wrap gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <span className="bg-muted px-2 py-0.5 rounded">NDC 21.3</span>
                  <span className="bg-muted px-2 py-0.5 rounded">Split-Ticketing</span>
                  <span className="bg-muted px-2 py-0.5 rounded">TTL Alerts</span>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Hotel className="size-4" />
                  <span>Wholesale Stays &amp; Extranet</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aggregated room rates across 1.2M+ properties via Hotelbeds, WebBeds, and Expedia EPS, plus direct hotelier extranet (CRS) for proprietary contracted room inventory.
                </p>
                <div className="pt-2 border-t flex flex-wrap gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <span className="bg-muted px-2 py-0.5 rounded">Static Cache</span>
                  <span className="bg-muted px-2 py-0.5 rounded">Allotment Extranet</span>
                  <span className="bg-muted px-2 py-0.5 rounded">Rate Parity</span>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm">
                  <Briefcase className="size-4" />
                  <span>Corporate CSBT &amp; ERP</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enterprise self-booking tool with policy validation, multi-tier manager approvals, department cost centers, and automated reconciliation for TMCs.
                </p>
                <div className="pt-2 border-t flex flex-wrap gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <span className="bg-muted px-2 py-0.5 rounded">L1/L2 Approvals</span>
                  <span className="bg-muted px-2 py-0.5 rounded">Agent Wallets</span>
                  <span className="bg-muted px-2 py-0.5 rounded">Tax Invoicing</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Live Interactive Developer Code Sandbox Playground */}
      {sampleEndpoint && (
        <DeveloperExperience endpoint={sampleEndpoint} baseUrl={flights?.access?.sandboxUrl ?? siteConfig.sandboxUrl} access={flights?.access} content={home.developerExperience} />
      )}

      {/* 6. Instant Sandbox CTA Band */}
      <CtaBand />
    </>
  );
}
