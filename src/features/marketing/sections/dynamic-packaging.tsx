import { ArrowRight, BadgePercent, CheckCircle2, Compass, Hotel, Plane, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Eyebrow } from "@/components/common/section";

export function DynamicPackaging() {
  return (
    <section id="dynamic-packaging" className="relative py-16 sm:py-24 bg-background border-t">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Information & Selling Points */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Eyebrow>Dynamic Packaging Engine</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Bundle Flights, Hotels & Transfers in One Booking Flow
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Enable your travelers and sub-agents to build custom vacation packages in real time. Dynamic packaging combines
              wholesale flight seats, direct hotel contracts, and airport ground transfers into a single opaque-price booking
              with instant consolidated vouchers.
            </p>

            {/* Travelopro-style Highlights */}
            <div className="mt-8 space-y-4 w-full">
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg border bg-card/60">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <BadgePercent className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Opaque Net Rates & Higher Margins</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Combine non-published airline consortium fares and wholesale bed bank rates without violating strict public rate parity rules.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg border bg-card/60">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Automated Single Checkout & Multi-Voucher</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    One credit card swipe or agent wallet deduction issues the airline PNR, hotel confirmation number, and transfer driver contact automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg border bg-card/60">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Tag className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">Flexible Sub-Agent Markups</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    B2B agencies can set percentage or flat markups on the overall package or on individual components dynamically.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-lg gap-2">
                <Link href="/apis/travel-activities-api">
                  <span>Explore Package APIs</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg">
                <Link href="/documentation">Read Packaging Architecture</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Interactive Package Preview */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-lg border bg-card ">
              {/* Header Visual Image */}
              <div className="relative h-48 sm:h-56 w-full">
                <Image
                  src="/images/solutions/dynamic_packaging.jpg"
                  alt="Dynamic Vacation Package Bundle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold ">
                    Bundle Savings: 18% OFF
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Example Package Bundle</span>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                    Dhaka ⇄ Cox&apos;s Bazar 5-Star Beach Getaway (4D / 3N)
                  </h3>
                </div>
              </div>

              {/* Package Component Steps */}
              <div className="p-5 sm:p-6 space-y-3.5">
                {/* Flight item */}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      <Plane className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">Biman Bangladesh Boeing 787</div>
                      <div className="text-[11px] text-muted-foreground">DAC ⇄ CXB (Round-trip) • Direct NDC Seat</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-foreground">$142</span>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Included</div>
                  </div>
                </div>

                {/* Hotel item */}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Hotel className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">Sayeman Beach Resort & Spa</div>
                      <div className="text-[11px] text-muted-foreground">Ocean View Suite • 3 Nights • Breakfast incl.</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-foreground">$280</span>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Included</div>
                  </div>
                </div>

                {/* Transfer item */}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Compass className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">Airport VIP Private Transfer</div>
                      <div className="text-[11px] text-muted-foreground">CXB Airport ⇄ Hotel • AC Sedan Meet & Greet</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-foreground">$38</span>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Included</div>
                  </div>
                </div>

                {/* Pricing & Checkout summary */}
                <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground line-through">Regular Standalone: $460</div>
                    <div className="text-lg font-heading font-bold text-foreground">
                      Dynamic Net Bundle: <span className="text-emerald-600 dark:text-emerald-400 font-mono">$377</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <CheckCircle2 className="size-3 text-emerald-500" /> Single PNR Issuance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
