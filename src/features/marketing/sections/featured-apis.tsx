import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { ApiCard } from "@/components/marketplace/api-card";
import { Button } from "@/components/ui/button";
import type { ApiProductSummary } from "@/types/catalog";

export function FeaturedApis({ products }: { products: ApiProductSummary[] }) {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <Section tone="muted" id="featured">
      <SectionHeader
        align="left"
        eyebrow="Featured APIs"
        title="Production-ready APIs your customers use every day"
        description="Normalised responses, sandbox access and transparent per-request pricing."
        action={
          <Button asChild variant="outline" size="xl" className="shrink-0">
            <Link href="/apis">
              View marketplace <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        }
      />
      <div className="mt-6 sm:mt-12 grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.05}>
            <ApiCard product={product} showCompare={false} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
