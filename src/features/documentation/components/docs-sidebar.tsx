"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { CategoryGlyph } from "@/components/common/category-icon";
import { MethodBadge } from "@/components/common/status-badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { HttpMethod } from "@/types/catalog";
import type { DocsNavProduct, DocsOverviewLink } from "../docs-nav";

/** Searchable docs navigation: guide sections, API references and individual endpoints. */
export function DocsSidebar({ products, overviewSections, onNavigate }: { products: DocsNavProduct[]; overviewSections: DocsOverviewLink[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo<{ key: string; href: string; label: string; hint: string; method?: HttpMethod }[] | null>(() => {
    if (!q) return null;
    const sections = overviewSections
      .filter((s) => s.label.toLowerCase().includes(q))
      .map((s) => ({ key: s.id, href: `/documentation#${s.id}`, label: s.label, hint: "Guide" }));
    const chapters = products.flatMap((p) =>
      p.guideSections
        .filter((s) => `${s.label} ${p.name}`.toLowerCase().includes(q))
        .map((s) => ({ key: `${p.slug}-${s.id}`, href: `/documentation/${p.slug}#${s.id}`, label: s.label, hint: p.name })),
    );
    const endpoints = products.flatMap((p) =>
      p.endpoints
        .filter((e) => `${e.summary} ${e.path} ${e.method} ${p.name}`.toLowerCase().includes(q))
        .map((e) => ({ key: `${p.slug}-${e.id}`, href: `/documentation/${p.slug}#${e.id}`, label: e.summary, hint: p.name, method: e.method })),
    );
    return [...sections, ...chapters, ...endpoints].slice(0, 30);
  }, [q, products, overviewSections]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="docs-search" className="sr-only">
          Search documentation
        </label>
        <Input
          id="docs-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs…"
          startIcon={<Search className="size-4" />}
          clearable
          onClear={() => setQuery("")}
        />
      </div>

      {results ? (
        <div aria-live="polite">
          <p className="mb-2 text-xs text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <ul className="flex flex-col gap-0.5">
            {results.map((r) => (
              <li key={r.key}>
                <Link href={r.href} onClick={onNavigate} className="flex flex-col gap-1 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
                  <span className="flex items-center gap-2 font-medium">
                    {r.method && <MethodBadge method={r.method} className="w-12 text-[10px]" />}
                    <span className="truncate">{r.label}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{r.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <nav aria-label="Guides">
            <p className="mb-2 px-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Guides</p>
            <ul className="flex flex-col">
              {overviewSections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/documentation#${s.id}`}
                    onClick={onNavigate}
                    className="block rounded-lg px-2.5 py-1.5 text-sm text-secondary-foreground hover:bg-accent hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="API reference">
            <p className="mb-2 px-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">API reference</p>
            <ul className="flex flex-col">
              {products.map((p) => {
                const active = pathname === `/documentation/${p.slug}`;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/documentation/${p.slug}`}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition",
                        active ? "bg-primary/10 font-medium text-primary" : "text-secondary-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <CategoryGlyph category={p.category} className="size-4 shrink-0" />
                      {p.name}
                    </Link>
                    {active && (
                      <ul className="my-1 ml-4 flex flex-col border-l pl-2">
                        {p.guideSections.map((s) => (
                          <li key={s.id}>
                            <a href={`#${s.id}`} onClick={onNavigate} className="block truncate rounded-md px-2 py-1 text-[13px] text-secondary-foreground hover:text-foreground">
                              {s.label}
                            </a>
                          </li>
                        ))}
                        {p.guideSections.length > 0 && (
                          <li className="mt-2 px-2 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">Endpoints</li>
                        )}
                        {p.endpoints.map((e) => (
                          <li key={e.id}>
                            <a href={`#${e.id}`} onClick={onNavigate} className="block truncate rounded-md px-2 py-1 text-[13px] text-muted-foreground hover:text-foreground">
                              {e.summary}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
