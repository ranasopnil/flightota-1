import { Coins } from "lucide-react";
import type { Metadata } from "next";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Section, SectionHeader } from "@/components/common/section";
import { FaqJsonLd, FaqList } from "@/components/marketing/faq-list";
import { staticPageMetadata } from "@/config/share";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { ApiPricingTable } from "@/features/pricing/components/api-pricing-table";
import { TravelPortalSolutionsPricing } from "@/features/pricing/components/travel-portal-solutions-pricing";
import { PlanComparison } from "@/features/pricing/components/plan-comparison";
import { PricingPlans } from "@/features/pricing/components/pricing-plans";
import { listProducts } from "@/services/server/catalog-repository";
import { getSingleton } from "@/services/server/cms-repository";
import { formatCurrency, formatNumber } from "@/utils/format";

export const metadata: Metadata = staticPageMetadata("/pricing");

export default async function PricingPage() {
  const [page, products] = await Promise.all([getSingleton("pricing"), listProducts()]);
  const { sections } = page;
  return (
    <>
      <CmsPageHero hero={page.hero} path="/pricing" />

      <Section className="pt-14">
        <PricingPlans plans={page.plans} annualDiscountLabel={page.annualDiscountLabel} enterpriseNote={page.enterpriseNote} />
      </Section>

      <Section tone="muted" id="api-pricing">
        <SectionHeader align="left" eyebrow={sections.apiPricing.eyebrow} title={sections.apiPricing.title} description={sections.apiPricing.description} />
        <div className="mt-10">
          <ApiPricingTable products={products} />
        </div>
      </Section>

      <Section id="wallet">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeader align="left" eyebrow={sections.wallet.eyebrow} title={sections.wallet.title} description={sections.wallet.description} />
          <ul className="app-rail grid gap-4 sm:grid-cols-3">
            {page.creditPacks.map((pack) => (
              <li key={pack.id} className="flex flex-col rounded-lg border bg-card p-6">
                <Coins className="size-6 text-primary" aria-hidden />
                <p className="mt-4 font-heading text-2xl font-semibold">{formatCurrency(pack.price)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatNumber(pack.credits)} credits</p>
                {pack.bonusPercent > 0 ? (
                  <span className="mt-4 w-fit rounded-full bg-sea-50 px-2 py-0.5 text-xs font-semibold text-sea-700 dark:bg-sea-900/40 dark:text-sea-200">
                    +{pack.bonusPercent}% bonus
                  </span>
                ) : (
                  <span className="mt-4 text-xs text-muted-foreground">{page.creditNote}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="portal-solutions">
        <TravelPortalSolutionsPricing packages={page.portalPackages} header={sections.portal} />
      </Section>

      <Section tone="muted" id="compare-plans">
        <SectionHeader align="left" eyebrow={sections.compare.eyebrow} title={sections.compare.title} description={sections.compare.description} />
        <div className="mt-10">
          <PlanComparison plans={page.plans} groups={page.comparisonGroups} />
        </div>
      </Section>

      <Section id="pricing-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader align="left" eyebrow={sections.faq.eyebrow} title={sections.faq.title} description={sections.faq.description} />
          <FaqList items={page.faqs} />
        </div>
        <FaqJsonLd items={page.faqs} />
      </Section>

      <CtaBand cta={page.cta} />
    </>
  );
}
