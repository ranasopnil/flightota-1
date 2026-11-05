import { ArrowRight, Car, Hotel, type LucideIcon, Plane, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import type { ApiProduct } from "@/types/catalog";

const CARDS: Record<string, { label: string; summary: string; image: string; alt: string; icon: LucideIcon }> = {
  "air-travel-api": {
    label: "Flights",
    summary: "Search, book, ticket, refund and reissue every airline we carry.",
    image: "/images/partner/flights.jpg",
    alt: "A passenger jet flying through a clear blue sky",
    icon: Plane,
  },
  "hotel-api": {
    label: "Hotels",
    summary: "Find, book and cancel hotel stays worldwide.",
    image: "/images/partner/hotels.jpg",
    alt: "A modern white hotel behind a blue swimming pool",
    icon: Hotel,
  },
  "esim-api": {
    label: "eSIM",
    summary: "Travel eSIMs for 200+ countries and regions, issued at once.",
    image: "/images/partner/esim.jpg",
    alt: "A hand tapping a smartphone screen",
    icon: Smartphone,
  },
  "airport-transfer-api": {
    label: "Transfers",
    summary: "Private cars, vans and shuttles from hundreds of local providers.",
    image: "/images/partner/transfers.jpg",
    alt: "A white passenger van waiting at an airport terminal drop-off",
    icon: Car,
  },
};

/** The partner APIs, with figures and call flow read from each product's guide data. */
export function PartnerApis({ products }: { products: ApiProduct[] }) {
  return (
    <Section id="partner-apis" tone="muted">
      <SectionHeader
        eyebrow="Partner APIs"
        title="Flights, hotels, eSIM and transfers"
        description="The same keys and conventions across all four, paid from your deposit."
      />
      <ul className="app-rail mt-4 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const card = CARDS[product.slug];
          if (!card || !product.flow) return null;
          const Icon = card.icon;
          return (
            <li key={product.slug} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50">
                <div className="relative aspect-[4/3] bg-muted">
                  <Image src={card.image} alt={card.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 300px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                    <Icon className="size-4.5 text-primary" aria-hidden />
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
                      View API <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                    <Link href={`/documentation/${product.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                      Guide
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
