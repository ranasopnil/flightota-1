import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Activity, CheckCircle2 } from "lucide-react";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { AirlinesExplorer } from "@/features/airlines/components/airlines-explorer";
import { AirlineRouteSimulator } from "@/features/airlines/components/airline-route-simulator";
import { NdcComparisonMatrix } from "@/features/airlines/components/ndc-comparison-matrix";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { Button } from "@/components/ui/button";
import { imageSrc } from "@/lib/image-src";
import { hoverBorderToneClasses, iconToneClasses, valueToneClasses } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { getSingleton, listEntries } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/airlines");
}

export default async function AirlinesPage() {
  const [page, airlines] = await Promise.all([getSingleton("airlines-page"), listEntries("airlines")]);
  const { ticker, metrics, telemetry, directory, consolidator } = page;
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. High-Visibility Aviation Hero */}
      <CmsPageHero hero={page.hero} path="/airlines" />

      {/* 2. Main Page Content */}
      <Container className="space-y-10 sm:space-y-14">
        {/* Live Carrier Status Ticker */}
        <div className="rounded-lg border border-border bg-card/70 p-2.5 sm:p-3 overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="shrink-0 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {ticker.label}
            </span>
            <div className="flex gap-6 overflow-x-auto scrollbar-none whitespace-nowrap text-[11px] font-mono">
              {ticker.items.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Row with Enhanced Visual Badges */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={cn("rounded-lg border border-border bg-card p-4 transition-all", hoverBorderToneClasses[m.tone], i === metrics.length - 1 && "col-span-2 sm:col-span-1")}
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{m.label}</span>
                <Icon name={m.icon} className={cn("size-3.5", iconToneClasses[m.tone])} />
              </div>
              <div className={`mt-2 font-heading text-2xl font-extrabold ${m.mono ? `${valueToneClasses[m.tone]} font-mono` : m.tone === "primary" ? "text-foreground" : valueToneClasses[m.tone]}`}>
                {m.value}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{m.note}</div>
            </div>
          ))}
        </div>

        {/* 3. Interactive Route Simulator & Live Aggregation */}
        <AirlineRouteSimulator />

        {/* 4. Live NDC Gateway Telemetry & Alliances Card */}
        <div className="rounded-lg border border-border bg-card p-5 sm:p-7 space-y-5 ">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Activity className="size-4.5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">{telemetry.title}</h3>
                <p className="text-xs text-muted-foreground">{telemetry.description}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {telemetry.statusLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
            {telemetry.alliances.map((a) => (
              <div key={a.name} className="rounded-lg border border-border/70 bg-muted/40 p-3.5 space-y-1">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Icon name={a.icon} className={cn("size-3.5", iconToneClasses[a.tone])} />
                  {a.name}
                </div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{a.members}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-border/70">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 text-xs text-foreground font-medium">
              {telemetry.features.map((f) => (
                <span key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Airlines Interactive Explorer & Directory */}
        <div id="directory" className="space-y-4">
          <div className="flex flex-col gap-1 border-b border-border/70 pb-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">{directory.title}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{directory.description}</p>
          </div>

          <AirlinesExplorer airlines={airlines} />
        </div>

        {/* 6. IATA NDC vs Legacy EDIFACT Comparison Matrix */}
        <NdcComparisonMatrix />

        {/* 7. Multi-GDS Aggregator & Consolidator Engine */}
        <div className="overflow-hidden rounded-lg border border-border bg-card ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="relative h-64 lg:h-auto lg:col-span-5 min-h-[240px]">
              <Image
                src={imageSrc(consolidator.image)}
                alt={consolidator.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">{consolidator.eyebrow}</span>
                <h3 className="font-heading text-lg sm:text-xl font-bold mt-1">{consolidator.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{consolidator.text}</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{consolidator.bodyEyebrow}</span>
                <h3 className="mt-1 font-heading text-xl font-bold text-foreground">{consolidator.bodyTitle}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{consolidator.bodyText}</p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {consolidator.features.map((f) => (
                    <div key={f.title} className="rounded-md border p-3 bg-muted/30">
                      <div className="font-bold text-foreground">{f.title}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground font-medium">{consolidator.footnote}</span>
                <Button asChild size="sm" className="rounded-lg">
                  <Link href={consolidator.cta.href}>{consolidator.cta.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 8. Full-Width Flight Direct Connect CTA Band */}
      <CtaBand cta={page.cta} />
    </div>
  );
}
