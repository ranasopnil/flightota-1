import { Suspense } from "react";
import { CompareTray } from "@/features/marketplace/components/compare-tray";
import { listProducts } from "@/services/server/catalog-repository";

async function Tray() {
  const products = await listProducts();
  return <CompareTray products={products.map(({ slug, name, category }) => ({ slug, name, category }))} />;
}

export default function ApisLayout({ children }: LayoutProps<"/apis">) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <Tray />
      </Suspense>
    </>
  );
}
