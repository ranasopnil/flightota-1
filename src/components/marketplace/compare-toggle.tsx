"use client";

import { Check, GitCompareArrows } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { compareToggled, MAX_COMPARE, selectCompare } from "@/redux/slices/apiMarketplaceSlice";

export function CompareToggle({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const dispatch = useAppDispatch();
  const compare = useAppSelector(selectCompare);
  const selected = compare.includes(slug);

  function toggle() {
    if (!selected && compare.length >= MAX_COMPARE) {
      toast.warning(`You can compare up to ${MAX_COMPARE} APIs`, { description: "Remove one from the comparison tray first." });
      return;
    }
    dispatch(compareToggled(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={selected}
      aria-label={selected ? `Remove ${name} from comparison` : `Add ${name} to comparison`}
      className={cn(
        "relative z-10 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition",
        selected ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {selected ? <Check className="size-3.5" /> : <GitCompareArrows className="size-3.5" />}
      {selected ? "Comparing" : "Compare"}
    </button>
  );
}
