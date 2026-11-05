"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  ChevronRight,
  Key,
  Copy,
  Check,
  ArrowRight,
  Plane,
  Stamp,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Container } from "@/components/common/container";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { CompareToggle } from "@/components/marketplace/compare-toggle";
import { Button } from "@/components/ui/button";
import type { ApiCategory, ApiProduct } from "@/types/catalog";

const HERO_IMAGE_MAP: Record<string, string> = {
  "air-travel-api": "/images/categories/flight.jpg",
  "hotel-api": "/images/categories/hotel.jpg",
  "esim-api": "/images/categories/esim.jpg",
  "visa-api": "/images/categories/visa.jpg",
  "airport-transfer-api": "/images/categories/transfer.jpg",
  "car-rental-api": "/images/categories/car_rental.jpg",
  "activities-api": "/images/categories/activities.jpg",
};

export function ApiDetailHeader({
  product,
  category,
}: {
  product: ApiProduct;
  category: ApiCategory | null;
}) {
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const comingSoon = product.status === "coming_soon";
  const firstEndpoint = product.endpoints.find((e) => e.id === product.primaryEndpointId) ?? product.endpoints[0];
  const primaryMethod = firstEndpoint?.method || "GET";
  const primaryEndpoint = firstEndpoint?.path ?? "";
  const heroImage = HERO_IMAGE_MAP[product.slug] || "/images/hero/hero_flight.jpg";

  const copyPrimaryEndpoint = () => {
    navigator.clipboard.writeText(`${product.access?.productionUrl ?? "https://api.flightota.com"}${primaryEndpoint}`);
    setCopiedEndpoint(true);
    toast.success("Base endpoint URL copied!");
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white py-4 sm:py-8 sm:min-h-[190px] sm:min-h-[210px] flex items-center">
      {/* Editorial Photography Background Banner with Atmospheric Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <Image
          src={heroImage}
          alt={product.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      <Container className="relative space-y-3 sm:space-y-6">
        {/* Breadcrumb Navigation & Operational Pill */}
        <div className="hidden flex-wrap items-center justify-between gap-2 sm:flex">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <li>
                <Link href="/apis" className="hover:text-white transition-colors">
                  APIs Catalog
                </Link>
              </li>
              <ChevronRight className="size-3 text-slate-400" aria-hidden />
              {category && (
                <>
                  <li>
                    <Link
                      href={`/apis?category=${category.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {category.shortName}
                    </Link>
                  </li>
                  <ChevronRight className="size-3 text-slate-400" aria-hidden />
                </>
              )}
              <li aria-current="page" className="font-semibold text-white">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Gateway</span>
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="min-w-0 flex-1">
              {/* Title & Tagline */}
              <h1 className="font-heading text-xl font-extrabold tracking-tight sm:text-3xl text-white">
                {product.name}
              </h1>
              <p className="mt-1 line-clamp-2 text-xs sm:line-clamp-none sm:text-sm leading-relaxed text-slate-200 max-w-2xl">
                {product.tagline}
              </p>

              {/* Quick Endpoint Copy Pill & Category Badges */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={copyPrimaryEndpoint}
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-slate-900/80 hover:bg-slate-800 px-2.5 py-1 font-mono text-[11px] text-white transition-all cursor-pointer backdrop-blur-md active:scale-95"
                >
                  <span className="font-bold text-sky-400">{primaryMethod}</span>
                  <span className="text-slate-200 group-hover:text-white transition-colors truncate max-w-[220px] sm:max-w-none">
                    {primaryEndpoint}
                  </span>
                  {copiedEndpoint ? (
                    <Check className="size-3 text-emerald-400 shrink-0" />
                  ) : (
                    <Copy className="size-3 text-slate-400 shrink-0 group-hover:text-white" />
                  )}
                </button>

                {product.slug === "air-travel-api" && (
                  <Link
                    href="/airlines"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-slate-900/80 hover:bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors"
                  >
                    <Plane className="size-3 text-sky-400" />
                    <span>Airlines</span>
                  </Link>
                )}

                {product.slug === "visa-api" && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    <Stamp className="size-3 text-sky-400" />
                    <span>IATA Timatic Aligned</span>
                  </span>
                )}

                <CompareToggle slug={product.slug} name={product.name} className="ml-1" />
              </div>
            </div>
          </div>

          {/* Action CTAs (Desktop & Tablet) */}
          <div className="scrollbar-none -mx-3 flex shrink-0 items-center gap-2 overflow-x-auto px-3 sm:mx-0 sm:flex-wrap sm:px-0 [&>*]:shrink-0">
            <Button asChild size="default" className="rounded-lg font-semibold gap-1.5">
              {comingSoon ? (
                <Link href={`/contact?topic=sales&api=${product.slug}`}>Join Waitlist</Link>
              ) : (
                <Link href={`/register?api=${product.slug}`}>
                  <Key className="size-3.5" />
                  Get Sandbox Key
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </Button>

            <Button asChild size="default" variant="outline" className="rounded-lg font-medium border-white/20 bg-slate-900/70 hover:bg-slate-800 text-white backdrop-blur-md">
              <Link href={`/documentation/${product.slug}`}>
                <BookOpen className="size-3.5 mr-1" />
                API Docs
              </Link>
            </Button>

            <ShareEmbedModal
              title={product.name}
              description={product.tagline}
              path={`/apis/${product.slug}`}
              size="default"
              variant="outline"
              className="rounded-lg border-white/20 bg-slate-900/70 hover:bg-slate-800 text-white backdrop-blur-md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
