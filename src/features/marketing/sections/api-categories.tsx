import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { CategoryCard } from "@/components/marketplace/category-card";
import type { ApiCategory, ApiProductSummary } from "@/types/catalog";

export function ApiCategories({ categories, products }: { categories: ApiCategory[]; products: ApiProductSummary[] }) {
  return (
    <Section id="categories">
      <SectionHeader
        eyebrow="API categories"
        title="Everything a traveller books, behind one gateway"
        description="Seven product lines, each with its own guide, endpoints and examples."
      />
      <div className="app-rail mt-4 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => {
          const inCategory = products.filter((p) => p.category === category.slug);
          const href = inCategory.length === 1 ? `/apis/${inCategory[0].slug}` : `/apis?category=${category.slug}`;
          return (
            <Reveal key={category.slug} delay={i * 0.04}>
              <CategoryCard category={category} href={href} />
            </Reveal>
          );
        })}
        <Reveal delay={0.3}>
          <Link
            href="/apis"
            className="group relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-lg border border-border/80 bg-navy-950 p-5 text-white transition hover:border-primary/40 "
          >
            <Image
              src="/images/categories/flight.jpg"
              alt="Browse the marketplace"
              fill
              sizes="(max-width: 640px) 100vw, 300px"
              className="object-cover object-center opacity-30 brightness-75 contrast-125 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                Full Catalog
              </span>
              <h3 className="mt-2.5 font-heading text-base font-bold text-white">Browse the marketplace</h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-navy-200">
                Search, filter and compare every API by price, limits and availability.
              </p>
            </div>
            <span className="relative z-10 mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground group-hover:underline">
              Explore all APIs <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
