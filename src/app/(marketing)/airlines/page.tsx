import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  Key,
  BookOpen,
  CheckCircle2,
  Globe,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingDown,
  Timer,
} from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { AirlinesExplorer } from "@/features/airlines/components/airlines-explorer";
import { AirlineRouteSimulator } from "@/features/airlines/components/airline-route-simulator";
import { NdcComparisonMatrix } from "@/features/airlines/components/ndc-comparison-matrix";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = staticPageMetadata("/airlines");

export default function AirlinesPage() {
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. High-Visibility Aviation Hero */}
      <PageHero
        image="/images/heroes/airlines_tarmac.jpg"
        eyebrow={
          <>
            <Plane className="size-3 text-brand-300" />
            DIRECT AIRLINE NETWORK
          </>
        }
        badge="40+ NDC • 60+ LCC Direct Live"
        title="NDC & LCC Airlines Directory"
        description="Search, price, and ticket 200+ direct NDC and low-cost airlines with zero GDS surcharges and sub-second responses."
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              40+ IATA NDC Direct
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              &lt;180ms Latency
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Zero GDS Surcharge
            </span>
          </>
        }
        actions={
          <>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold h-7">
              <Link href="/register?api=air-travel-api">
                <Key className="size-3 mr-1" />
                Get Sandbox Key
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            >
              <Link href="/documentation/air-travel-api">
                <BookOpen className="size-3 mr-1" />
                Docs &rarr;
              </Link>
            </Button>
            <ShareEmbedModal
              path="/airlines"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />

      {/* 2. Main Page Content */}
      <Container className="space-y-10 sm:space-y-14">
        {/* Live Carrier Status Ticker */}
        <div className="rounded-lg border border-border bg-card/70 p-2.5 sm:p-3 overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="shrink-0 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE NDC PIPES
            </span>
            <div className="flex gap-6 overflow-x-auto scrollbar-none whitespace-nowrap text-[11px] font-mono">
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Emirates (EK) &bull; NDC 21.3 &bull; 132ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Qatar Airways (QR) &bull; Oryx Direct &bull; 118ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Singapore Airlines (SQ) &bull; KrisConnect &bull; 145ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> British Airways (BA) &bull; IAG NDC &bull; 128ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Lufthansa Group (LH) &bull; Direct Pipe &bull; 139ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> IndiGo (6E) &bull; Direct LCC API &bull; 108ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> AirAsia (AK) &bull; Net Fare API &bull; 122ms
              </span>
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Ryanair (FR) &bull; Direct Pipe &bull; 114ms
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Row with Enhanced Visual Badges */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 ">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Connected
              </span>
              <Plane className="size-3.5 text-primary" />
            </div>
            <div className="mt-2 font-heading text-2xl font-extrabold text-foreground">
              200+
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Global carriers</div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 transition-all hover:border-emerald-500/40 ">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Direct NDC
              </span>
              <ShieldCheck className="size-3.5 text-emerald-500" />
            </div>
            <div className="mt-2 font-heading text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              40+
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">IATA Level 4 certified</div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/40 ">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Direct LCC
              </span>
              <Zap className="size-3.5 text-amber-500" />
            </div>
            <div className="mt-2 font-heading text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              60+
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Wholesale net feeds</div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 transition-all hover:border-emerald-500/40 ">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                GDS Markup
              </span>
              <TrendingDown className="size-3.5 text-emerald-500" />
            </div>
            <div className="mt-2 font-heading text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              $0
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Zero surcharge</div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 col-span-2 sm:col-span-1 transition-all hover:border-primary/40 ">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                p50 Latency
              </span>
              <Timer className="size-3.5 text-primary" />
            </div>
            <div className="mt-2 font-heading text-2xl font-extrabold text-primary font-mono">
              &lt;180ms
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Parallel offer cache</div>
          </div>
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
                <h3 className="font-heading text-base font-bold text-foreground">
                  Live NDC Gateway Telemetry & Supported Alliances
                </h3>
                <p className="text-xs text-muted-foreground">
                  Direct carrier pipe operational metrics, uptime, and certified ancillaries
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.98% Gateway Uptime
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
            <div className="rounded-lg border border-border/70 bg-muted/40 p-3.5 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-sky-500" />
                Star Alliance
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                Lufthansa, Singapore, United, Turkish, Swiss
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/40 p-3.5 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                oneworld
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                British Airways, Qatar, American, Cathay Pacific
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/40 p-3.5 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Globe className="size-3.5 text-primary" />
                SkyTeam
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                Air France, KLM, Delta, Saudia, Korean Air
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/40 p-3.5 space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Layers className="size-3.5 text-amber-500" />
                Direct LCCs
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                IndiGo, AirAsia, Ryanair, easyJet, flydubai
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border/70">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 text-xs text-foreground font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>Dynamic 3D SeatMap</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>Paid Baggage & Meals</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>Zero-Risk 72h Hold PNR</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>24-Hour Instant Void</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5. Airlines Interactive Explorer & Directory */}
        <div id="directory" className="space-y-4">
          <div className="flex flex-col gap-1 border-b border-border/70 pb-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
              Direct-Connected Carriers Directory
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Filter by distribution standard (NDC vs LCC), search by IATA code or city hub, and inspect real API requests.
            </p>
          </div>

          <AirlinesExplorer />
        </div>

        {/* 6. IATA NDC vs Legacy EDIFACT Comparison Matrix */}
        <NdcComparisonMatrix />

        {/* 7. Multi-GDS Aggregator & Consolidator Engine (Travelopro-inspired) */}
        <div className="overflow-hidden rounded-lg border border-border bg-card ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="relative h-64 lg:h-auto lg:col-span-5 min-h-[240px]">
              <Image
                src="/images/solutions/gds_integration.jpg"
                alt="Global GDS and Airline Systems"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  GDS Consolidator Architecture
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold mt-1">
                  Amadeus, Sabre & Travelport Integration
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Combine legacy GDS terminals with direct NDC APIs seamlessly.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Automated Ticketing Queues
                </span>
                <h3 className="mt-1 font-heading text-xl font-bold text-foreground">
                  Unified Multi-GDS Consolidation & Instant Ticketing
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Inspired by enterprise travel portals like Travelopro, our flight distribution core bridges traditional GDS terminals with modern JSON APIs. Query Amadeus MasterPricer, Sabre Bargain Finder Max, and Travelport Galileo concurrently with split-ticketing intelligence.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="font-bold text-foreground">Split-Ticketing Engine</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Combine different airlines for outbound and return legs for lowest net fares.
                    </div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="font-bold text-foreground">Automated PNR Queue</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Automated ticketing time-limit tracking, void window monitoring, and schedule sync.
                    </div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="font-bold text-foreground">Ancillary Upsell API</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Instant booking of paid baggage, interactive seat maps, and pre-ordered meals.
                    </div>
                  </div>
                  <div className="rounded-md border p-3 bg-muted/30">
                    <div className="font-bold text-foreground">Multi-Tier Markups</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Apply custom B2B sub-agent or B2C customer markups airline-wise and route-wise.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground font-medium">
                  Certified IATA NDC Level 4 Capable &bull; Sub-Second Offer Cache
                </span>
                <Button asChild size="sm" className="rounded-lg">
                  <Link href="/apis/air-travel-api">View Flight API Docs &rarr;</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 8. Full-Width Flight Direct Connect CTA Band (Provides clean breathing room before footer) */}
      <CtaBand
        title="Ready to issue NDC & LCC airline tickets via a single unified API?"
        description="Provision sandbox keys in seconds, access 200+ global carriers with zero GDS distribution surcharges, and streamline flight booking flows."
      />
    </div>
  );
}
