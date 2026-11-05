import { Coins } from "lucide-react";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Section, SectionHeader } from "@/components/common/section";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { Button } from "@/components/ui/button";
import { FaqJsonLd, FaqList } from "@/components/marketing/faq-list";
import { comparisonGroups, creditPacks, pricingFaqs, pricingPlans } from "@/constants/pricing";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { ApiPricingTable } from "@/features/pricing/components/api-pricing-table";
import { TravelPortalSolutionsPricing } from "@/features/pricing/components/travel-portal-solutions-pricing";
import { PlanComparison } from "@/features/pricing/components/plan-comparison";
import { PricingPlans } from "@/features/pricing/components/pricing-plans";
import { listProducts } from "@/services/server/catalog-repository";
import { formatCurrency, formatNumber } from "@/utils/format";

export const metadata: Metadata = staticPageMetadata("/pricing");

export default async function PricingPage() {
  const products = await listProducts();
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Coins className="size-3 text-brand-300" />
            PRICING &amp; PLANS
          </>
        }
        badge="5,000 Free Calls / Month"
        title="Simple pricing that scales with your bookings"
        description="Start free in the sandbox. Go live with pay-as-you-go or a monthly plan with volume discounts. Pay only for successful transactions."
        image="/images/heroes/pricing_lounge.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Zero Setup Fees
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              $0.002 / Search
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              100% Idempotent Retries
            </span>
          </>
        }
        actions={
          <>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold h-7 ">
              <Link href="/register">
                Start Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <Link href="/contact?topic=sales">
                Contact Sales
              </Link>
            </Button>
            <ShareEmbedModal
              path="/pricing"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />

      <Section className="pt-14">
        <PricingPlans plans={pricingPlans} />
      </Section>

      <Section tone="muted" id="api-pricing">
        <SectionHeader
          align="left"
          eyebrow="API-specific pricing"
          title="Per-request pricing for every API"
          description="Requests beyond your plan's allowance, and all Pay As You Go usage, are billed at these rates with automatic volume tiers."
        />
        <div className="mt-10">
          <ApiPricingTable products={products} />
        </div>
      </Section>

      <Section id="wallet">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeader
            align="left"
            eyebrow="Credit wallet"
            title="Prepay and get bonus credits"
            description="Top up your wallet to cover usage and booking fees. Larger top-ups include bonus credits. Set alerts and hard limits to stay in control."
          />
          <ul className="app-rail grid gap-4 sm:grid-cols-3">
            {creditPacks.map((pack) => (
              <li key={pack.id} className="flex flex-col rounded-lg border bg-card p-6">
                <Coins className="size-6 text-primary" aria-hidden />
                <p className="mt-4 font-heading text-2xl font-semibold">{formatCurrency(pack.price)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatNumber(pack.credits)} credits</p>
                {pack.bonusPercent > 0 ? (
                  <span className="mt-4 w-fit rounded-full bg-sea-50 px-2 py-0.5 text-xs font-semibold text-sea-700 dark:bg-sea-900/40 dark:text-sea-200">
                    +{pack.bonusPercent}% bonus
                  </span>
                ) : (
                  <span className="mt-4 text-xs text-muted-foreground">1 credit = $1 of usage</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="portal-solutions">
        <TravelPortalSolutionsPricing />
      </Section>

      <Section tone="muted" id="compare-plans">
        <SectionHeader align="left" eyebrow="Compare plans" title="Every plan, side by side" />
        <div className="mt-10">
          <PlanComparison plans={pricingPlans} groups={comparisonGroups} />
        </div>
      </Section>

      <Section id="pricing-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader align="left" eyebrow="FAQ" title="Billing questions" />
          <FaqList items={pricingFaqs} />
        </div>
        <FaqJsonLd items={pricingFaqs} />
      </Section>

      <CtaBand title="Need volume pricing or custom markup?" description="Talk to our team about enterprise contracts, supplier credentials and SLAs." />
    </>
  );
}
