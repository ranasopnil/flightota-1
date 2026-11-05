import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CategoryIcon } from "@/components/common/category-icon";
import type { ApiCategory } from "@/types/catalog";

const CATEGORY_IMAGES: Record<string, string> = {
  air: "/images/categories/flight.jpg",
  hotel: "/images/categories/hotel.jpg",
  esim: "/images/categories/esim.jpg",
  visa: "/images/categories/visa.jpg",
  transfer: "/images/categories/transfer.jpg",
  "car-rental": "/images/categories/car_rental.jpg",
  activities: "/images/categories/activities.jpg",
};

export function CategoryCard({
  category,
  href,
  count,
}: {
  category: ApiCategory;
  href: string;
  count?: number;
}) {
  const image = CATEGORY_IMAGES[category.slug] || "/images/hero/hero_flight.jpg";

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/80 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 ring-1 ring-border/30"
    >
      {/* Category Photography Header */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-navy-950">
        <Image
          src={image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-transparent" />

        <div className="absolute top-2.5 left-3">
          <CategoryIcon category={category.slug} size="sm" className=" rounded-lg" />
        </div>

        {count !== undefined && (
          <div className="absolute top-2.5 right-3">
            <span className="font-mono text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
              {count} {count === 1 ? "API" : "APIs"}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 pt-2">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
          <span>Explore Category</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
