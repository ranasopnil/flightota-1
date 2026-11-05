import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { listProducts } from "@/services/server/catalog-repository";

async function Header() {
  const products = await listProducts();
  return (
    <SiteHeader
      products={products.map(({ slug, name, category, tagline, status }) => ({ slug, name, category, tagline, status }))}
    />
  );
}

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Suspense fallback={<div className="h-16 border-b" />}>
        <Header />
      </Suspense>
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
