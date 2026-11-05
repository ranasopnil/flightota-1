import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/icon-map";
import { Section, SectionHeader } from "@/components/common/section";
import { imageSrc } from "@/lib/image-src";
import type { ApiProduct } from "@/types/catalog";
import type { HomePageContent } from "@/types/pages";

/** The partner APIs, with figures and call flow read from each product's guide data. */
export function PartnerApis({ products, content }: { products: ApiProduct[]; content: HomePageContent["partnerApis"] }) {
  const cards = new Map(content.cards.map((c) => [c.productSlug, c]));
  return (
    <Section id="partner-apis" tone="muted">
      <SectionHeader eyebrow={content.header.eyebrow} title={content.header.title} description={content.header.description} />
      <ul className="app-rail mt-4 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const card = cards.get(product.slug);
          if (!card || !product.flow) return null;
          return (
            <li key={product.slug} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50">
                <div className="relative aspect-[4/3] bg-muted">
                  <Image src={imageSrc(card.image)} alt={card.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 300px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                    <Icon name={card.icon} className="size-4.5 text-primary" />
                    {card.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.summary}</p>

                  <dl className="mt-4 flex flex-col gap-2 border-t pt-3">
                    {product.flow.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="flex items-baseline justify-between gap-3">
                        <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                        <dd className="shrink-0 text-sm font-semibold text-foreground">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <Link href={`/apis/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      {content.viewLabel} <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                    <Link href={`/documentation/${product.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                      {content.guideLabel}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
