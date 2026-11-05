import type { Metadata } from "next";
import { pageMetadata } from "@/config/share";
import { siteConfig } from "@/config/site";
import { ApiCategories } from "@/features/marketing/sections/api-categories";
import { CorporateAndMidOffice } from "@/features/marketing/sections/corporate-and-mid-office";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { DeveloperExperience } from "@/features/marketing/sections/developer-experience";
import { DynamicPackaging } from "@/features/marketing/sections/dynamic-packaging";
import { Faq } from "@/features/marketing/sections/faq";
import { Hero } from "@/features/marketing/sections/hero";
import { PartnerApis } from "@/features/marketing/sections/partner-apis";
import { PartnerGetStarted } from "@/features/marketing/sections/partner-get-started";
import { PlatformStats } from "@/features/marketing/sections/platform-stats";
import { PricingOverview } from "@/features/marketing/sections/pricing-overview";
import { SupplierNetwork } from "@/features/marketing/sections/supplier-network";
import { Testimonials } from "@/features/marketing/sections/testimonials";
import { TravelSolutions } from "@/features/marketing/sections/travel-solutions";
import { getProduct, listCategories, listProducts } from "@/services/server/catalog-repository";
import { getSingleton } from "@/services/server/cms-repository";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const [home, pricing, categories, products, air] = await Promise.all([
    getSingleton("home"),
    getSingleton("pricing"),
    listCategories(),
    listProducts(),
    getProduct("air-travel-api"),
  ]);
  const endpointCount = products.reduce((sum, p) => sum + p.endpointCount, 0);
  const partnerSlugs = home.partnerApis.cards.map((c) => c.productSlug).filter((slug) => slug !== "air-travel-api");
  const partnerProducts = (await Promise.all(partnerSlugs.map(getProduct))).filter((p) => p !== null && p !== undefined);
  const sampleEndpoint = air?.endpoints.find((e) => e.id === "flights-search");

  return (
    <>
      <Hero content={home.hero} />
      <PartnerApis products={air ? [air, ...partnerProducts] : partnerProducts} content={home.partnerApis} />
      <PartnerGetStarted content={home.getStarted} />
      <TravelSolutions content={home.travelSolutions} />
      <SupplierNetwork content={home.supplierNetwork} />
      <DynamicPackaging content={home.dynamicPackaging} />
      <CorporateAndMidOffice content={home.corporate} />
      <ApiCategories categories={categories} products={products} content={home.categories} />
      <PlatformStats endpointCount={endpointCount} content={home.stats} />
      {sampleEndpoint && (
        <DeveloperExperience endpoint={sampleEndpoint} baseUrl={air?.access?.sandboxUrl ?? siteConfig.sandboxUrl} access={air?.access} content={home.developerExperience} />
      )}
      <PricingOverview content={home.pricingOverview} allPlans={pricing.plans} />
      <Testimonials content={home.testimonials} />
      <Faq content={home.faq} />
      <CtaBand cta={home.cta} />
    </>
  );
}
