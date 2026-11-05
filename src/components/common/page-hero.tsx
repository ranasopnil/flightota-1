import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface PageHeroProps {
  eyebrow?: ReactNode;
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  metrics?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  image?: string;
  className?: string;
}

/** Compact hero used at the top of inner marketing pages with high-visibility photography. */
export function PageHero({
  eyebrow,
  badge,
  title,
  description,
  metrics,
  actions,
  children,
  align = "left",
  image,
  className,
}: PageHeroProps) {
  const isDarkBanner = Boolean(image);

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b py-4 sm:py-8 sm:min-h-[210px] flex items-center",
        isDarkBanner ? "border-slate-800 bg-slate-950 text-white" : "border-border bg-card text-foreground",
        className
      )}
    >
      {/* High-Visibility Background Photography Backdrop */}
      {image ? (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn(
              "object-cover",
              align === "center" ? "object-center" : "object-[75%_center] sm:object-center"
            )}
          />
          {align === "center" ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-transparent to-slate-950/75" />
            </>
          ) : (
            <>
              {/* Left-to-right fade for text contrast, crystal clear on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </>
          )}
        </div>
      ) : (
        <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-40" />
      )}

      <Container className="relative">
        <div className={cn("flex max-w-3xl flex-col gap-1.5 sm:gap-2.5", align === "center" && "mx-auto items-center text-center")}>
          {/* Top Eyebrow & Status Badge */}
          {(eyebrow || badge) && (
            <div className={cn("flex flex-wrap items-center gap-2", align === "center" && "justify-center")}>
              {eyebrow && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md",
                    isDarkBanner
                      ? "border border-white/20 bg-white/10 text-white"
                      : "border border-primary/20 bg-primary/10 text-primary"
                  )}
                >
                  {eyebrow}
                </span>
              )}
              {badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {badge}
                </span>
              )}
            </div>
          )}

          <h1
            className={cn(
              "font-heading text-xl sm:text-4xl font-extrabold tracking-tight text-white",
              !isDarkBanner && "text-foreground"
            )}
          >
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                "line-clamp-2 sm:line-clamp-none text-xs sm:text-sm max-w-2xl leading-relaxed text-slate-200",
                !isDarkBanner && "text-muted-foreground"
              )}
            >
              {description}
            </p>
          )}

          {/* Compact Bottom Bar: Quick Metrics & Action Shortcuts */}
          {(metrics || actions) && (
            <div
              className={cn(
                "mt-1 flex flex-col gap-2.5 sm:mt-1.5 lg:flex-row lg:items-center lg:justify-between sm:pt-2 sm:border-t sm:border-white/15",
                align === "center" && "justify-center"
              )}
            >
              {metrics && (
                <div className="hidden flex-wrap items-center gap-1.5 text-[11px] sm:flex">
                  {metrics}
                </div>
              )}
              {actions && (
                <div className="scrollbar-none -mx-3 flex items-center gap-2 overflow-x-auto px-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&>*]:shrink-0">
                  {actions}
                </div>
              )}
            </div>
          )}
        </div>

        {children && <div className="relative mt-2 sm:mt-3">{children}</div>}
      </Container>
    </section>
  );
}
