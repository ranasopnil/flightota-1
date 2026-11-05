"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Plane,
  Search,
  ShieldCheck,
  Zap,
  ArrowDownAZ,
  ArrowUpZA,
} from "lucide-react";
import type { AirlineItem } from "@/types/airlines";
import { AirlineLogo } from "@/features/airlines/components/airline-logo";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AirlinesExplorerContent({ airlines }: { airlines: AirlineItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read active tab directly from query string (?tab=all, ?tab=ndc, ?tab=lcc)
  const tabFromUrl = searchParams.get("tab");
  const sortFromUrl = searchParams.get("sort");
  const initialPage = Number(searchParams.get("page")) || 1;
  const activeTab: "ndc" | "lcc" | "all" =
    tabFromUrl === "lcc" || tabFromUrl === "ndc" ? tabFromUrl : "all";

  // Default sort is strictly A - Z ascending
  const initialSort =
    sortFromUrl === "name-desc" || sortFromUrl === "iata-asc"
      ? sortFromUrl
      : "name-asc";

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState<string>(initialSort);

  const ITEMS_PER_PAGE = 16;

  // Synchronize browser URL on state change
  const syncUrlParams = useCallback(
    (tab: string, query: string, sort: string, page: number) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      if (tab !== "all") params.set("tab", tab);
      if (query.trim()) params.set("search", query.trim());
      if (sort !== "name-asc") params.set("sort", sort);
      if (page > 1) params.set("page", String(page));

      const qs = params.toString();
      const updatedUrl = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, "", updatedUrl);
    },
    [pathname]
  );

  // When tab changes, update URL and Next.js router, reset page to 1
  const handleTabChange = (tab: "ndc" | "lcc" | "all") => {
    setCurrentPage(1);
    syncUrlParams(tab, searchQuery, sortBy, 1);
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    params.delete("page");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // When search changes, update state and URL, reset page to 1
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    syncUrlParams(activeTab, query, sortBy, 1);
  };

  // When sort changes, update state and URL, reset page to 1
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    syncUrlParams(activeTab, searchQuery, newSort, 1);
  };

  // When pagination changes, update state and scroll smoothly to top of directory
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    syncUrlParams(activeTab, searchQuery, sortBy, page);
    const directoryEl = document.getElementById("directory");
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. Filter by category (ndc, lcc, all)
  const categoryFiltered = airlines.filter((airline) => {
    if (activeTab === "ndc") return airline.category === "ndc";
    if (activeTab === "lcc") return airline.category === "lcc";
    return true;
  });

  // 2. Filter by search query (name, IATA code, ICAO code, country, or hub)
  const searchFiltered = categoryFiltered.filter((airline) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      airline.name.toLowerCase().includes(q) ||
      airline.iata.toLowerCase().includes(q) ||
      airline.icao.toLowerCase().includes(q) ||
      airline.country.toLowerCase().includes(q) ||
      airline.hub.toLowerCase().includes(q)
    );
  });

  // 3. Sort records: strictly A - Z ascending by carrier name by default
  const sortedAirlines = [...searchFiltered].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === "iata-asc") {
      return a.iata.localeCompare(b.iata);
    }
    // Default: A - Z ascending
    return a.name.localeCompare(b.name);
  });

  const ndcCount = airlines.filter((a) => a.category === "ndc").length;
  const lccCount = airlines.filter((a) => a.category === "lcc").length;

  // Pagination calculation based on sorted list
  const totalPages = Math.ceil(sortedAirlines.length / ITEMS_PER_PAGE);
  const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedAirlines = sortedAirlines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sortedAirlines.length);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Category Tabs, Search Bar & Sort Options */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-border/70 pb-4">
        {/* Navigation Tabs with URL Sync */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/70 border border-border/60 self-start">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-background text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>All Airlines</span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary">
              {airlines.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("ndc")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "ndc"
                ? "bg-background text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldCheck className="size-3.5" />
            <span>NDC</span>
            <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              {ndcCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("lcc")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "lcc"
                ? "bg-background text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="size-3.5" />
            <span>LCC</span>
            <span className="rounded-full bg-amber-500/10 px-1.5 py-0.2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
              {lccCount}
            </span>
          </button>
        </div>

        {/* Right Section: Sort Selector, Search Input & Result Counter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {sortedAirlines.length > 0 && (
            <span className="hidden xl:inline-block text-xs text-muted-foreground mr-1">
              Showing <strong className="text-foreground">{startIndex + 1}–{endIndex}</strong> of{" "}
              <strong className="text-foreground">{sortedAirlines.length}</strong>
            </span>
          )}

          {/* Sort Selector: A - Z (Ascending) */}
          <div className="w-36">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="h-9 rounded-lg text-xs">
                <SelectValue placeholder="Sort carriers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">
                  <div className="flex items-center gap-1.5">
                    <ArrowDownAZ className="size-3.5" />
                    <span>Name (A &rarr; Z)</span>
                  </div>
                </SelectItem>
                <SelectItem value="name-desc">
                  <div className="flex items-center gap-1.5">
                    <ArrowUpZA className="size-3.5" />
                    <span>Name (Z &rarr; A)</span>
                  </div>
                </SelectItem>
                <SelectItem value="iata-asc">
                  <div className="flex items-center gap-1.5">
                    <span>IATA Code (A &rarr; Z)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search carrier or IATA (EK, 6E, QR)..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              startIcon={<Search className="size-3.5 text-muted-foreground" />}
              clearable
              onClear={() => handleSearchChange("")}
              className="h-9 rounded-lg text-xs"
            />
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sortedAirlines.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-10 text-center bg-card/40">
          <Plane className="mx-auto size-9 text-muted-foreground/50 mb-2" />
          <h3 className="font-heading text-sm font-semibold text-foreground">No airlines found</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
            No carriers matched &quot;{searchQuery}&quot;. Try searching with an IATA code like
            EK, QR, SQ, FZ, 6E, BG, or BA.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSearchChange("")}
            className="mt-3 rounded-lg text-xs"
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Clean Minimal Airlines Grid: Airline Logo, Name, Code, Direct LCC / IATA NDC */}
      <div
        id="airlines-grid-top"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {paginatedAirlines.map((airline) => (
          <div
            key={airline.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-3 transition-colors hover:border-primary/50"
          >
            {/* Airline Logo, Name & Code */}
            <div className="flex items-center gap-2.5 min-w-0">
              <AirlineLogo
                iata={airline.iata}
                name={airline.name}
                size="sm"
              />
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">
                  {airline.name}
                </span>
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground shrink-0">
                  {airline.iata}
                </span>
              </div>
            </div>

            {/* Direct LCC / IATA NDC Badge */}
            <Badge
              variant="outline"
              className={`rounded-md text-[10px] font-semibold shrink-0 px-2 py-0.5 border ${
                airline.category === "ndc"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
              }`}
            >
              {airline.category === "ndc" ? "IATA NDC" : "Direct LCC"}
            </Badge>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-2">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export function AirlinesExplorer({ airlines }: { airlines: AirlineItem[] }) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-10 w-72 rounded-lg bg-muted" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-card/60 border border-border/70" />
            ))}
          </div>
        </div>
      }
    >
      <AirlinesExplorerContent airlines={airlines} />
    </Suspense>
  );
}
