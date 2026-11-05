import { cn } from "@/lib/utils";
import { statusLabels } from "@/features/marketplace/lib/catalog";
import type { ApiStatus, HttpMethod } from "@/types/catalog";

const statusStyles: Record<ApiStatus, { dot: string; badge: string }> = {
  operational: {
    dot: "bg-success",
    badge: "bg-green-50 text-green-700 ring-green-600/15 dark:bg-green-950/40 dark:text-green-300",
  },
  degraded: {
    dot: "bg-warning",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300",
  },
  beta: {
    dot: "bg-sea-500",
    badge: "bg-sea-50 text-sea-700 ring-sea-600/20 dark:bg-sea-900/40 dark:text-sea-200",
  },
  coming_soon: {
    dot: "bg-navy-300",
    badge: "bg-navy-50 text-navy-600 ring-navy-600/15 dark:bg-navy-800/50 dark:text-navy-200",
  },
};

export function StatusBadge({ status, className }: { status: ApiStatus; className?: string }) {
  const style = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        style.badge,
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", style.dot)} />
      {statusLabels[status]}
    </span>
  );
}

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-sea-50 text-sea-700 ring-sea-600/20 dark:bg-sea-900/40 dark:text-sea-200",
  POST: "bg-navy-50 text-navy-700 ring-navy-600/20 dark:bg-navy-800/50 dark:text-navy-100",
  PUT: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300",
  PATCH: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300",
  DELETE: "bg-brand-50 text-brand-700 ring-brand-600/20 dark:bg-brand-950/40 dark:text-brand-300",
};

export function MethodBadge({ method, className }: { method: HttpMethod; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-14 shrink-0 items-center justify-center rounded-md py-0.5 font-mono text-[11px] font-semibold ring-1 ring-inset",
        methodStyles[method],
        className,
      )}
    >
      {method}
    </span>
  );
}
