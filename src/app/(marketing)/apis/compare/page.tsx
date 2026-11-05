import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GitCompareArrows } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { ShareButton } from "@/components/common/share-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ComparisonTable } from "@/features/marketplace/components/comparison-table";
import { ComparePicker } from "@/features/marketplace/components/compare-picker";
import { getProduct, listProducts } from "@/services/server/catalog-repository";
import type { ApiProduct } from "@/types/catalog";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/apis/compare");
}

async function Comparison({ searchParams }: { searchParams: PageProps<"/apis/compare">["searchParams"] }) {
  const params = await searchParams;
  const raw = Array.isArray(params.apis) ? params.apis[0] : params.apis;
  const slugs = [...new Set((raw ?? "").split(",").map((s) => s.trim()).filter(Boolean))].slice(0, 3);

  const [all, ...selected] = await Promise.all([listProducts(), ...slugs.map((slug) => getProduct(slug))]);
  const products = selected.filter((p): p is ApiProduct => p !== null);

  if (products.length < 2) {
    return <ComparePicker products={all} />;
  }
  return <ComparisonTable products={products} />;
}

export default function ComparePage({ searchParams }: PageProps<"/apis/compare">) {
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <GitCompareArrows className="size-3 text-brand-300" />
            API MATRIX
          </>
        }
        badge="Side-by-Side Analysis"
        title="Compare APIs side by side"
        description="Pricing, rate limits, latency, sandbox quotas, and capabilities at a glance. Select up to three APIs."
        image="/images/heroes/compare_telemetry.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Latency Benchmarks
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              7 Active APIs
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Webhook Verification
            </span>
          </>
        }
        actions={
          <>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold h-7 ">
              <Link href="/apis">Catalog &rarr;</Link>
            </Button>
            <ShareButton
              path="/apis/compare"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />
      <Container className="py-12">
        <Suspense fallback={<Skeleton className="h-[520px] w-full rounded-lg" />}>
          <Comparison searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
