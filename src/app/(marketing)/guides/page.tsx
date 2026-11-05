import { ArrowRight, Compass } from "lucide-react";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { listGuides } from "@/services/server/content-repository";
import type { Guide } from "@/types/content";

export const metadata: Metadata = staticPageMetadata("/guides");

const levelStyles: Record<Guide["level"], string> = {
  Beginner: "bg-sea-50 text-sea-700 dark:bg-sea-900/40 dark:text-sea-200",
  Intermediate: "bg-navy-50 text-navy-700 dark:bg-navy-800/50 dark:text-navy-100",
  Advanced: "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-200",
};

const guideThumbs: Record<string, string> = {
  quickstart: "/images/heroes/guides_planning.jpg",
  "flight-booking-flow": "/images/hero/hero_flight.jpg",
  "hotel-booking-flow": "/images/hero/hero_hotel.jpg",
  "esim-provisioning": "/images/hero/hero_esim.jpg",
  "visa-processing": "/images/hero/hero_visa.jpg",
  "transfer-booking": "/images/hero/hero_transfer.jpg",
  "b2b-sub-agent-network": "/images/solutions/b2b_portal.jpg",
  "dynamic-packaging-workflow": "/images/solutions/dynamic_packaging.jpg",
  "corporate-travel-policy-setup": "/images/solutions/corporate_booking.jpg",
};

export default async function GuidesPage() {
  const guides = await listGuides();
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <Compass className="size-3 text-brand-300" />
            INTEGRATION GUIDES
          </>
        }
        badge="Step-by-Step Walkthroughs"
        title="From first request to production"
        description="Practical walkthroughs of complete integration flows: authentication, booking states, idempotency, and going live."
        image="/images/heroes/guides_planning.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Five-Minute Quickstart
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              6 Core Flows
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Complete Webhook Lifecycle
            </span>
          </>
        }
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <Link href="/documentation">API Reference &rarr;</Link>
            </Button>
            <ShareEmbedModal
              path="/guides"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />
      <Container className="py-14">
        <ul className="app-rail grid gap-6 md:grid-cols-2">
          {guides.map((guide) => {
            const thumb = guideThumbs[guide.slug] || "/images/heroes/guides_planning.jpg";
            return (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:border-primary/40 sm:flex-row"
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-48">
                    <Image
                      src={thumb}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={cn("rounded-full px-2 py-0.5 font-medium", levelStyles[guide.level])}>{guide.level}</span>
                      <span className="text-muted-foreground">{guide.apis.join(", ")}</span>
                      <span className="text-muted-foreground">· {guide.readingMinutes} min</span>
                    </div>
                    <h2 className="mt-3 font-heading text-lg font-semibold group-hover:text-primary">{guide.title}</h2>
                    <p className="mt-1.5 flex-1 text-sm text-muted-foreground line-clamp-2">{guide.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read guide <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
