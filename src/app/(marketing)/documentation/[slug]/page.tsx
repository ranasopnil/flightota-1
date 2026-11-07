import { FileJson, Info } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/common/category-icon";
import { BreadcrumbJsonLd } from "@/components/common/json-ld";
import { ShareButton } from "@/components/common/share-button";
import { StatusBadge } from "@/components/common/status-badge";
import { EndpointReference, EndpointSignature } from "@/components/documentation/endpoint-reference";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ApiGuideView } from "@/features/documentation/components/api-guide-view";
import { imageSrc } from "@/lib/image-src";
import { getProduct, listProducts } from "@/services/server/catalog-repository";
import { getEntry, getSingleton } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

async function referenceDescription(name: string) {
  const overview = await getSingleton("docs-overview");
  return overview.referenceDescriptionTemplate.replace("{{name}}", name);
}

export async function generateMetadata({ params }: PageProps<"/documentation/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Documentation not found" };
  return cmsPageMetadata(`/documentation/${product.slug}`, { title: `${product.name} reference`, description: await referenceDescription(product.name) });
}

export default async function ApiReferencePage({ params }: PageProps<"/documentation/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [guide, overview] = await Promise.all([getEntry("api-guides", product.slug), getSingleton("docs-overview")]);
  const baseUrl = product.access?.sandboxUrl ?? siteConfig.sandboxUrl;
  const description = overview.referenceDescriptionTemplate.replace("{{name}}", product.name);

  return (
    <div>
      <BreadcrumbJsonLd crumbs={[{ name: "Documentation", path: "/documentation" }, { name: `${product.name} reference`, path: `/documentation/${product.slug}` }]} />
      <header className="relative mb-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-4 sm:mb-6 sm:p-6 text-white ">
        <Image
          src={imageSrc(overview.productHeroImages[product.slug] ?? overview.defaultProductHeroImage)}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            <div className="flex size-12 items-center justify-center rounded-lg border border-white/20 bg-slate-900/85 p-2 shrink-0 backdrop-blur-md">
              <CategoryIcon category={product.category} className="size-6 text-primary" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">{product.name}</h1>
                <StatusBadge status={product.status} />
              </div>
              <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-200 leading-relaxed">{product.tagline}</p>
              <p className="mt-2 font-mono text-xs text-slate-300">
                Version {product.version} · {product.endpoints.length} endpoints
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-lg border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md">
              <a href={`/documentation/${product.slug}/openapi.json`} target="_blank" rel="noopener">
                <FileJson data-icon="inline-start" /> OpenAPI spec
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-lg border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md">
              <Link href={`/apis/${product.slug}`}>Product page</Link>
            </Button>
            <ShareButton
              title={`${product.name} reference`}
              description={description}
              path={`/documentation/${product.slug}`}
              size="sm"
              variant="outline"
              className="rounded-lg border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md"
            />
          </div>
        </div>
      </header>

      <div className="mt-4 flex gap-3 rounded-lg border border-navy-200 bg-navy-50 p-3 text-xs sm:p-4 sm:text-sm text-navy-800 dark:border-navy-700 dark:bg-navy-900/40 dark:text-navy-100">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>
          Examples use the sandbox base URL <code className="font-mono">{baseUrl}</code>. {product.supplierNote}
        </p>
      </div>

      {guide && <ApiGuideView guide={guide} />}

      {guide && (
        <h2 id="endpoint-reference" className="mt-10 scroll-mt-24 font-heading text-2xl font-semibold tracking-tight">
          {overview.referenceHeading}
        </h2>
      )}
      <div className="flex flex-col">
        {product.endpoints.map((endpoint) => (
          <section key={endpoint.id} id={endpoint.id} aria-labelledby={`${endpoint.id}-title`} className="scroll-mt-20 border-b py-6 sm:py-10 last:border-b-0">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{endpoint.group}</p>
            <h2 id={`${endpoint.id}-title`} className="mt-1 font-heading text-xl font-semibold">
              {endpoint.summary}
            </h2>
            <div className="mt-3 rounded-lg border bg-muted/60 px-3 py-2">
              <EndpointSignature endpoint={endpoint} />
            </div>
            <div className="mt-6">
              <EndpointReference endpoint={endpoint} baseUrl={baseUrl} access={product.access} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
