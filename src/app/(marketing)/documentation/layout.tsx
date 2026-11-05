import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";
import { DocsMobileNav } from "@/features/documentation/components/docs-mobile-nav";
import { DocsSidebar } from "@/features/documentation/components/docs-sidebar";
import type { DocsNavProduct } from "@/features/documentation/docs-nav";
import { getApiGuide } from "@/mocks/content/api-guides";
import { listProductsDetailed } from "@/services/server/catalog-repository";

async function getNav(): Promise<DocsNavProduct[]> {
  const products = await listProductsDetailed();
  // Products documented by a partner guide come first; the nav follows those guides.
  const ordered = [...products].sort((a, b) => Number(Boolean(getApiGuide(b.slug))) - Number(Boolean(getApiGuide(a.slug))));
  return ordered.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    endpoints: p.endpoints.map(({ id, method, path, summary }) => ({ id, method, path, summary })),
    guideSections: getApiGuide(p.slug)?.sections.map((s) => ({ id: s.id, label: s.title })) ?? [],
  }));
}

async function Sidebar() {
  return <DocsSidebar products={await getNav()} />;
}

async function MobileNav() {
  return <DocsMobileNav products={await getNav()} />;
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
