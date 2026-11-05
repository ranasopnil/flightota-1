import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";
import { DocsMobileNav } from "@/features/documentation/components/docs-mobile-nav";
import { DocsSidebar } from "@/features/documentation/components/docs-sidebar";
import type { DocsNavProduct, DocsOverviewLink } from "@/features/documentation/docs-nav";
import { listProductsDetailed } from "@/services/server/catalog-repository";
import { getSingleton, listEntries } from "@/services/server/cms-repository";

async function getNav(): Promise<{ products: DocsNavProduct[]; overviewSections: DocsOverviewLink[] }> {
  const [products, guides, overview] = await Promise.all([listProductsDetailed(), listEntries("api-guides"), getSingleton("docs-overview")]);
  const bySlug = new Map(guides.map((g) => [g.slug, g]));
  // Products documented by a partner guide come first; the nav follows those guides.
  const ordered = [...products].sort((a, b) => Number(bySlug.has(b.slug)) - Number(bySlug.has(a.slug)));
  return {
    products: ordered.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      endpoints: p.endpoints.map(({ id, method, path, summary }) => ({ id, method, path, summary })),
      guideSections: bySlug.get(p.slug)?.sections.map((s) => ({ id: s.id, label: s.title })) ?? [],
    })),
    overviewSections: overview.sections.map((s) => ({ id: s.id, label: s.title })),
  };
}

async function Sidebar() {
  const nav = await getNav();
  return <DocsSidebar products={nav.products} overviewSections={nav.overviewSections} />;
}

async function MobileNav() {
  const nav = await getNav();
  return <DocsMobileNav products={nav.products} overviewSections={nav.overviewSections} />;
}

export default function DocumentationLayout({ children }: LayoutProps<"/documentation">) {
  return (
    <Container className="grid grid-cols-1 gap-3 sm:gap-10 py-3 sm:py-10 lg:grid-cols-[250px_1fr]">
      <aside className="hidden lg:block" aria-label="Documentation navigation">
        <div className="scrollbar-none sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <Sidebar />
          </Suspense>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="mb-3 lg:hidden">
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
        </div>
        {children}
      </div>
    </Container>
  );
}
