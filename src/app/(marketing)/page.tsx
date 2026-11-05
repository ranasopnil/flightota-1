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

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const [categories, products, air] = await Promise.all([listCategories(), listProducts(), getProduct("air-travel-api")]);
  const endpointCount = products.reduce((sum, p) => sum + p.endpointCount, 0);
  const partnerProducts = (await Promise.all(["hotel-api", "esim-api", "airport-transfer-api"].map(getProduct))).filter((p) => p !== null && p !== undefined);
  const sampleEndpoint = air?.endpoints.find((e) => e.id === "flights-search");

  return (
    <>
      <Hero />
      <PartnerApis products={air ? [air, ...partnerProducts] : partnerProducts} />
      <PartnerGetStarted />
      <TravelSolutions />
      <SupplierNetwork />
      <DynamicPackaging />
      <CorporateAndMidOffice />
      <ApiCategories categories={categories} products={products} />
      <PlatformStats endpointCount={endpointCount} />
      {sampleEndpoint && <DeveloperExperience endpoint={sampleEndpoint} baseUrl={air?.access?.sandboxUrl ?? siteConfig.sandboxUrl} access={air?.access} />}
      <PricingOverview />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
