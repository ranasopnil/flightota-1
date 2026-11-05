import { Suspense } from "react";
import { Check, Info } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { siteConfig } from "@/config/site";
import { ApiDetailHeader } from "@/features/api-detail/components/api-detail-header";
import { EndpointList } from "@/features/api-detail/components/endpoint-list";
import { PricingTiers } from "@/features/api-detail/components/pricing-tiers";
import { SectionNav } from "@/features/api-detail/components/section-nav";
import { ApiPlayground } from "@/features/api-detail/components/api-playground";
import { AirTravelShowcase } from "@/features/api-detail/components/air-travel-showcase";
import { ApiFlowShowcase } from "@/features/api-detail/components/api-flow-showcase";
import { VisaShowcase } from "@/features/api-detail/components/visa-showcase";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { getCategory, getProduct, listProducts } from "@/services/server/catalog-repository";
import { getSingleton } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apis/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "API not found" };

  const settings = await getSingleton("site-settings");
  return cmsPageMetadata(`/apis/${product.slug}`, {
    title: `${product.name} — ${product.features.slice(0, 3).join(", ")}`,
    shareTitle: `${product.name} · ${settings.name}`,
    description: product.tagline,
  });
}

function DetailSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28 border-b border-border/70 py-6 sm:py-14 last:border-b-0">
      <h2 id={`${id}-heading`} className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-muted-foreground">{description}</p>}
      <div className="mt-5 sm:mt-8">{children}</div>
    </section>
  );
}

export default async function ApiDetailPage({ params }: PageProps<"/apis/[slug]">) {
  const { slug } = await params;
  const settings = await getSingleton("site-settings");
  const product = await getProduct(slug);
  if (!product) notFound();
  const category = await getCategory(product.category);

  const isAirTravel = product.slug === "air-travel-api";
  const isVisa = product.slug === "visa-api";
  const flow = product.flow;
  const baseUrls = { production: product.access?.productionUrl ?? siteConfig.gatewayUrl, sandbox: product.access?.sandboxUrl ?? siteConfig.sandboxUrl };

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "playground", label: "Interactive Console" },
    ...(isAirTravel ? [{ id: "airlines", label: "Offers & airlines" }] : []),
    ...(flow ? [{ id: "flow", label: flow.title }] : []),
    ...(isVisa ? [{ id: "visa", label: "eVisa Gateways & Rules" }] : []),
    { id: "endpoints", label: "Endpoints" },
    { id: "pricing", label: product.planNotes ? "Plans & limits" : "Pricing & limits" },
    { id: "integration", label: "Getting started" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    name: product.name,
    description: product.description,
    documentation: `${siteConfig.url}/documentation/${product.slug}`,
    provider: { "@type": "Organization", name: settings.legalName },
  };

  const productImageMap: Record<string, string> = {
    "air-travel-api": "/images/categories/flight.jpg",
    "hotel-api": "/images/categories/hotel.jpg",
    "esim-api": "/images/categories/esim.jpg",
    "visa-api": "/images/categories/visa.jpg",
    "airport-transfer-api": "/images/categories/transfer.jpg",
    "car-rental-api": "/images/categories/car_rental.jpg",
    "activities-api": "/images/categories/activities.jpg",
  };
  const overviewImage = productImageMap[product.slug] || "/images/categories/flight.jpg";

  return (
    <>
      <ApiDetailHeader product={product} category={category} />
      <SectionNav sections={sections} />

      <Container>
        {/* Overview Section */}
        <DetailSection id="overview" title="Overview">
          <div className="grid grid-cols-1 gap-4 sm:gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-sm sm:text-[17px] leading-relaxed text-secondary-foreground font-normal">
                {product.description}
              </p>
              <div className="app-rail mt-4 grid gap-3 sm:mt-8 sm:grid-cols-2">
                {product.capabilities.map((cap) => (
                  <div key={cap.title} className="rounded-lg border border-border/80 bg-card p-4 sm:p-5 ">
                    <h3 className="font-heading text-sm sm:text-base font-semibold text-foreground">{cap.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Product Visual Showcase Card with Real Photography */}
              <div className="relative overflow-hidden rounded-lg border border-border/80 bg-card group ring-1 ring-border/40">
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-navy-950">
                  <Image
                    src={overviewImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 450px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                      Production Gateway
                    </span>
                    {!product.access && (
                      <span className="font-mono text-[10px] font-bold text-emerald-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        &lt;120ms p50
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-heading text-sm font-bold truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h4 className="text-xs font-heading font-bold text-foreground uppercase tracking-wider mb-2.5">
                    Core Capabilities
                  </h4>
                  <ul className="grid gap-2 text-xs text-foreground">
                    {product.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 rounded-lg border border-border/70 bg-card p-4 sm:p-5 text-xs sm:text-sm text-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-heading font-semibold text-foreground">{product.access ? "Sandbox notes" : "Supplier Integration Engine"}</p>
                  <p className="mt-1 leading-relaxed text-muted-foreground text-xs">{product.supplierNote}</p>
                  {product.supplierAdapters > 0 && (
                    <p className="mt-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                      ✓ {product.supplierAdapters} direct carrier adapters live on this gateway.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DetailSection>

        {/* Interactive API Console / Simulator */}
        <DetailSection
          id="playground"
          title="Interactive API Console & Simulator"
          description={
            product.access
              ? "Every call in the guide, with its code and the answer the guide shows. These replay the guide's examples; the real API is called from your server, never from a browser."
              : `Send live test requests through the FlightOTA Sandbox Gateway with simulated ${isVisa ? "consular eVisa" : "API"} responses.`
          }
        >
          <Suspense fallback={<div className="h-96 rounded-xl border border-border/80 bg-card/60 animate-pulse" />}>
            <ApiPlayground product={product} />
          </Suspense>
        </DetailSection>

        {/* Carriers on the flights product */}
        {isAirTravel && (
          <DetailSection
            id="airlines"
            title="Offers, extras and airlines"
            description="One REST API sells every airline we carry."
          >
            <Suspense fallback={<div className="h-64 rounded-xl border border-border/80 bg-card/60 animate-pulse" />}>
              <AirTravelShowcase />
            </Suspense>
          </DetailSection>
        )}

        {/* Call flow from the product's guide */}
        {flow && (
          <DetailSection id="flow" title={flow.title} description={flow.subtitle}>
            <ApiFlowShowcase flow={flow} />
          </DetailSection>
        )}

        {/* Visa Dedicated Consular Network & Workflow */}
        {isVisa && (
          <DetailSection
            id="visa"
            title="Global Consular Network & Visa Processing Lifecycle"
            description="195+ nationalities, 85+ government eVisa gateways, IATA Timatic aligned rules, and live application tracking."
          >
            <VisaShowcase />
          </DetailSection>
        )}

        {/* Endpoints Reference */}
        <DetailSection
          id="endpoints"
          title="Endpoints"
          description={`Base URL: ${baseUrls.production} (production) · ${baseUrls.sandbox} (sandbox). Expand an endpoint for parameters, code samples and example responses.`}
        >
          <EndpointList endpoints={product.endpoints} baseUrl={baseUrls.sandbox} access={product.access} />
        </DetailSection>

        {/* Pricing Tiers */}
        <DetailSection
          id="pricing"
          title={product.planNotes ? "Plans & limits" : "Pricing & Limits"}
          description={product.planNotes ? "Paid from your deposit, in your billing currency." : "Request-based pricing with volume tiers. Plans with included requests are on the pricing page."}
        >
          <PricingTiers product={product} />
        </DetailSection>

        {/* Integration Guide */}
        <DetailSection
          id="integration"
          title={product.access ? "Getting started" : "Integration Guide"}
          description={product.access ? "From a sandbox key to your first call. Live keys are switched on after certification." : "The recommended path from developer sandbox to live production ticketing."}
        >
          {/* Visual Architecture Banner with Real Imagery */}
          <div className="relative mb-6 overflow-hidden rounded-lg border border-border/80 bg-navy-950 p-5 sm:p-7 text-white ">
            <Image
              src={overviewImage}
              alt="Integration Architecture"
              fill
              className="object-cover object-center opacity-20 brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />

            <div className="relative max-w-xl">
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                Developer Fast-Path
              </span>
              <h3 className="mt-2.5 font-heading text-lg sm:text-2xl font-bold">
                {product.integrationBanner?.title ?? "From 0 to Ticketed Booking in 4 Clean REST Steps"}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                {product.integrationBanner?.text ?? "Every request carries an idempotency key and trace header. Use our official SDKs for TypeScript, Python, and Go, or query raw endpoints with standard HTTP clients."}
              </p>
            </div>
          </div>

          <ol className="app-rail grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.integrationSteps.map((step, i) => (
              <li key={step.title} className="relative rounded-lg border border-border/80 bg-card p-4 sm:p-6 ">
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 font-heading text-sm sm:text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </DetailSection>
      </Container>

      <CtaBand title={`Start building with the ${product.name}`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
