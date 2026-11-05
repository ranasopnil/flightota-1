import { ArrowUpRight, ChevronRight, FlaskConical, Server, Zap } from "lucide-react";
import Link from "next/link";
import { CategoryIcon } from "@/components/common/category-icon";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { StatusBadge } from "@/components/common/status-badge";
import { entryPricePer1k } from "@/features/marketplace/lib/catalog";
import { cn } from "@/lib/utils";
import type { ApiProductSummary } from "@/types/catalog";
import { formatCurrency, formatNumber } from "@/utils/format";
import { CompareToggle } from "./compare-toggle";

interface ApiCardProps {
  product: ApiProductSummary;
  showCompare?: boolean;
  className?: string;
}

const CATEGORY_ACCENT_MAP: Record<string, string> = {
  air: "from-sky-500/20 to-transparent border-t-sky-500/50",
  hotel: "from-amber-500/20 to-transparent border-t-amber-500/50",
  esim: "from-emerald-500/20 to-transparent border-t-emerald-500/50",
  visa: "from-rose-500/20 to-transparent border-t-rose-500/50",
  transfer: "from-indigo-500/20 to-transparent border-t-indigo-500/50",
  "car-rental": "from-teal-500/20 to-transparent border-t-teal-500/50",
  activities: "from-violet-500/20 to-transparent border-t-violet-500/50",
};

/** Marketplace listing card in Grid layout. */
export function ApiCard({ product, showCompare = true, className }: ApiCardProps) {
  const price = entryPricePer1k(product);
  const accent = CATEGORY_ACCENT_MAP[product.category] || "from-primary/20 to-transparent border-t-primary/50";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-border/80 bg-card p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 active:scale-[0.99] overflow-hidden",
        className,
      )}
    >
      {/* Subtle top category glow accent */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", accent)} />

      <div className="flex items-start justify-between gap-3">
        <CategoryIcon category={product.category} className="rounded-lg " />
        <div className="relative z-10 flex items-center gap-1.5">
          <StatusBadge status={product.status} />
          <ShareEmbedModal
            title={product.name}
            description={product.tagline}
            path={`/apis/${product.slug}`}
            size="icon"
            variant="ghost"
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-2">
        <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
          <Link href={`/apis/${product.slug}`} className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        <span className="font-mono text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md shrink-0">
          {product.version}
        </span>
      </div>

      <p className="mt-1 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Key features">
        {product.features.slice(0, 3).map((feature) => (
          <li key={feature} className="rounded-md bg-muted/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
            {feature}
          </li>
        ))}
        {product.features.length > 3 && (
          <li className="rounded-md px-1 py-0.5 text-[11px] text-muted-foreground">+{product.features.length - 3} more</li>
        )}
      </ul>

      {product.facts ? (
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-xs">
          {product.facts.slice(1, 4).map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-[11px] leading-tight text-muted-foreground">{fact.label}</dt>
              <dd className="mt-0.5 font-bold text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-xs">
        <div>
          <dt className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">From</dt>
          <dd className="mt-0.5 font-bold text-foreground">
            {product.status === "coming_soon" ? "—" : `${formatCurrency(price)}/1k`}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Free / mo</dt>
          <dd className="mt-0.5 font-bold text-foreground">{product.pricing.freeRequests ? formatNumber(product.pricing.freeRequests) : "—"}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Endpoints</dt>
          <dd className="mt-0.5 font-bold text-foreground font-mono">{product.endpointCount}</dd>
        </div>
      </dl>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/40 pt-2.5 text-[11px]">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          {product.latencyP50Ms > 0 && (
            <span className="inline-flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              <Zap className="size-3 text-emerald-500 shrink-0" /> ~{product.latencyP50Ms}ms
            </span>
          )}
          <span className={cn("inline-flex items-center gap-1", !product.sandbox && "line-through opacity-50")}>
            <FlaskConical className="size-3 shrink-0" /> Sandbox
          </span>
          <span className={cn("inline-flex items-center gap-1", !product.production && "line-through opacity-50")}>
            <Server className="size-3 shrink-0" /> Prod
          </span>
        </div>
        {showCompare ? (
          <CompareToggle slug={product.slug} name={product.name} />
        ) : (
          <ArrowUpRight className="size-3.5 text-muted-foreground transition group-hover:text-primary" aria-hidden />
        )}
      </div>
    </article>
  );
}

/** Marketplace listing row in App-Style List layout (high density for mobile and quick browsing). */
export function ApiListItem({ product, showCompare = true, className }: ApiCardProps) {
  const price = entryPricePer1k(product);
  return (
    <article
      className={cn(
        "group relative flex items-center justify-between gap-3 sm:gap-4 rounded-lg border border-border/80 bg-card p-3 sm:p-4 transition-all duration-200 hover:border-primary/40 active:scale-[0.99]",
        className,
      )}
    >
      <div className="flex items-start gap-3 sm:items-center sm:gap-3.5 min-w-0 flex-1">
        <CategoryIcon category={product.category} className="shrink-0 size-11 sm:size-12 rounded-lg " />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
              <Link
                href={`/apis/${product.slug}`}
                className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
            </h3>
            <span className="font-mono text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {product.version}
            </span>
            <StatusBadge status={product.status} className="scale-90 origin-left" />
          </div>

          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground max-w-xl sm:line-clamp-1">
            {product.tagline}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">
              {product.planNotes ? "Paid from your deposit" : product.status === "coming_soon" ? "Coming Soon" : `${formatCurrency(price)}/1k`}
            </span>
            <span className="opacity-40">•</span>
            <span>{product.endpointCount} Endpoints</span>
            {!product.planNotes && product.pricing.freeRequests > 0 && (
              <>
                <span className="opacity-40">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {formatNumber(product.pricing.freeRequests)} free/mo
                </span>
              </>
            )}
            {product.latencyP50Ms > 0 && (
              <>
                <span className="opacity-40">•</span>
                <span className="font-mono text-muted-foreground">
                  ~{product.latencyP50Ms}ms
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-1 shrink-0 sm:gap-2">
        {showCompare && (
          <span className="hidden sm:inline-flex">
            <CompareToggle slug={product.slug} name={product.name} />
          </span>
        )}
        <ShareEmbedModal
          title={product.name}
          description={product.tagline}
          path={`/apis/${product.slug}`}
          size="icon"
          variant="ghost"
          className="size-7 rounded-lg text-muted-foreground hover:text-foreground hidden sm:flex"
        />
        <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </article>
  );
}
