"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";
import Link from "next/link";
import { CategoryIcon } from "@/components/common/category-icon";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { compareCleared, compareRemoved, MAX_COMPARE, selectCompare } from "@/redux/slices/apiMarketplaceSlice";
import type { ApiCategorySlug } from "@/types/catalog";

/** Floating comparison tray, shown when at least one API is selected. */
export function CompareTray({ products }: { products: { slug: string; name: string; category: ApiCategorySlug }[] }) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectCompare);
  const items = selected.map((slug) => products.find((p) => p.slug === slug)).filter((p) => p !== undefined);

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          role="region"
          aria-label="API comparison"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-3 bottom-20 sm:bottom-4 z-40 mx-auto max-w-3xl rounded-xl border bg-card/95 p-3 backdrop-blur-lg sm:inset-x-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ul className="flex flex-1 flex-wrap gap-2">
              {items.map((p) => (
                <li key={p.slug} className="flex items-center gap-2 rounded-lg border bg-background py-1 pr-1 pl-1.5 text-sm">
                  <CategoryIcon category={p.category} size="sm" className="size-6 rounded-md [&_svg]:size-3.5" />
                  <span className="font-medium">{p.name}</span>
                  <button
                    type="button"
                    onClick={() => dispatch(compareRemoved(p.slug))}
                    aria-label={`Remove ${p.name}`}
                    className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
              {items.length < MAX_COMPARE && (
                <li className="flex items-center rounded-lg border border-dashed px-3 py-1 text-xs text-muted-foreground">
                  Add up to {MAX_COMPARE - items.length} more
                </li>
              )}
            </ul>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => dispatch(compareCleared())}>
                Clear
              </Button>
              {items.length >= 2 ? (
                <Button asChild>
                  <Link href={`/apis/compare?apis=${items.map((p) => p.slug).join(",")}`}>
                    <GitCompareArrows data-icon="inline-start" /> Compare {items.length}
                  </Link>
                </Button>
              ) : (
                <Button disabled>
                  <GitCompareArrows data-icon="inline-start" /> Select 2+ to compare
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
