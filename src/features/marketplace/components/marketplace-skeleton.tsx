import { Skeleton } from "@/components/ui/skeleton";

export function ApiCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg border bg-card p-5">
      <div className="flex justify-between">
        <Skeleton className="size-11 rounded-lg" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-5 w-2/3" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1.5 h-4 w-4/5" />
      <div className="mt-4 flex gap-1.5">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="mt-6 h-10 w-full" />
    </div>
  );
}

export function MarketplaceSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[250px_1fr]" aria-busy="true" aria-label="Loading APIs">
      <div className="hidden flex-col gap-2 lg:flex">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </div>
      <div>
        <Skeleton className="h-11 w-full" />
        <Skeleton className="mt-5 h-5 w-32" />
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <ApiCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
