import { Car, CarFront, CardSim, Hotel, Plane, Stamp, Ticket, type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApiCategorySlug, CategoryIconKey } from "@/types/catalog";

const icons: Record<CategoryIconKey, LucideIcon> = {
  plane: Plane,
  hotel: Hotel,
  sim: CardSim,
  stamp: Stamp,
  "car-front": CarFront,
  car: Car,
  ticket: Ticket,
};

const categoryIcon: Record<ApiCategorySlug, CategoryIconKey> = {
  air: "plane",
  hotel: "hotel",
  esim: "sim",
  visa: "stamp",
  transfer: "car-front",
  "car-rental": "car",
  activities: "ticket",
};

/** Per-category colour accents, kept within the brand palette. */
const tones: Record<ApiCategorySlug, string> = {
  air: "bg-brand-50 text-brand-600 ring-brand-100 dark:bg-brand-950/40 dark:text-brand-300 dark:ring-brand-900/60",
  hotel: "bg-navy-50 text-navy-700 ring-navy-100 dark:bg-navy-800/40 dark:text-navy-200 dark:ring-navy-700/60",
  esim: "bg-sea-50 text-sea-600 ring-sea-100 dark:bg-sea-900/40 dark:text-sea-300 dark:ring-sea-800/60",
  visa: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60",
  transfer: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900/60",
  "car-rental": "bg-sky-50 text-sky-600 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900/60",
  activities: "bg-rose-50 text-rose-600 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900/60",
};

export function CategoryGlyph({ category, ...props }: { category: ApiCategorySlug } & LucideProps) {
  const Icon = icons[categoryIcon[category]];
  return <Icon aria-hidden {...props} />;
}

export function CategoryIcon({
  category,
  size = "md",
  className,
}: {
  category: ApiCategorySlug;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg ring-1 ring-inset",
        tones[category],
        size === "sm" && "size-8 rounded-lg [&_svg]:size-4",
        size === "md" && "size-11 [&_svg]:size-5",
        size === "lg" && "size-14 rounded-lg [&_svg]:size-7",
        className,
      )}
    >
      <CategoryGlyph category={category} strokeWidth={1.75} />
    </span>
  );
}
