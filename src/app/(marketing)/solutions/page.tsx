import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { travelSolutions } from "@/constants/solutions";
import { CtaBand } from "@/features/marketing/sections/cta-band";

export const metadata: Metadata = staticPageMetadata("/solutions");

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Workflow className="size-3 text-brand-300" />
            TRAVEL TECHNOLOGY SOLUTIONS
          </>
        }
        badge="Enterprise Platform Suite"
        title="Complete Travel Software & Portal Solutions"
        description="Inspired by global travel leaders like Travelopro, we provide booking engines, sub-agent distribution networks, corporate travel systems, and central reservation ERPs."
        image="/images/solutions/b2b_portal.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              12 Solutions
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              700+ Global Airlines
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              1.2M+ Accommodations
            </span>
          </>
        }
        actions={
          <>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold h-7 ">
              <Link href="/contact?topic=sales">Book Platform Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            >
              <Link href="/pricing#portal-solutions">View Pricing &rarr;</Link>
            </Button>
            <ShareEmbedModal
              path="/solutions"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />

      <Container className="py-12 sm:py-16 space-y-12">
        {/* Solutions Grid */}
        <div className="app-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelSolutions.map((sol) => (
            <div
              key={sol.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:border-primary/50 "
            >
              {/* Header Image */}
              <div className="relative h-52 w-full overflow-hidden bg-muted">
                <Image
                  src={sol.heroImage}
                  alt={sol.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <Badge className="bg-primary/90 text-white text-xs font-semibold ">
                    {sol.eyebrow}
                  </Badge>
                  <div className="rounded-lg bg-black/60 backdrop-blur-md px-2 py-0.5 text-xs font-semibold text-white border border-white/10">
                    {sol.metrics[0].label}: <span className="text-emerald-400">{sol.metrics[0].value}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-heading text-lg font-bold leading-snug">{sol.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                      <Sparkles className="size-3 text-primary" />
                      Core Capabilities
                    </div>
                    {sol.coreCapabilities.slice(0, 3).map((cap) => (
                      <div key={cap} className="flex items-start gap-2 text-xs text-foreground/85">
                        <Check className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <Button asChild variant="outline" size="sm" className="w-full rounded-lg gap-1.5 group/btn">
                    <Link href={`/solutions/${sol.slug}`}>
                      <span>Explore Platform Specs</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <CtaBand
        title="Ready to launch or modernize your travel platform?"
        description="Our travel technology architects are ready to review your requirements, GDS connectivity, and sub-agent network structure."
      />
    </>
  );
}
