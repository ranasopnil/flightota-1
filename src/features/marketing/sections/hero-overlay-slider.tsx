"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  division: string;
  tags: string[];
  title: string;
  description: string;
  image: string;
  alt: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metric: {
    label: string;
    value: string;
  };
  accentColor?: string;
  divisionBadgeClass?: string;
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "air-travel",
    division: "DIV. 01",
    divisionBadgeClass: "text-rose-300 bg-rose-500/20 border-rose-500/40",
    tags: ["ONE-WAY, ROUND TRIP, MULTI-CITY", "STANDARD & BRANDED FARES", "PAID FROM YOUR DEPOSIT"],
    title: "Search, Book, Ticket, Refund, Reissue and Void Flights",
    description:
      "One REST API sells every airline we carry. Most fares are held first and issued later from your deposit; instant fares are paid and ticketed in the booking call itself.",
    image: "/images/hero/hero_flight.jpg",
    alt: "Search, Book, Ticket, Refund, Reissue and Void Flights",
    primaryCta: { label: "Explore Flight API", href: "/apis/air-travel-api" },
    secondaryCta: { label: "Read the Guide", href: "/documentation/air-travel-api" },
    metric: { label: "Search Answers In", value: "5–30 s" },
    accentColor: "#dc0e18",
  },
  {
    id: "hotel-network",
    division: "DIV. 02",
    divisionBadgeClass: "text-amber-300 bg-amber-500/20 border-amber-500/40",
    tags: ["PAY NOW OR HOLD", "RATE RE-CHECK", "1–6 ROOMS PER SEARCH"],
    title: "Find, Book and Cancel Hotel Stays Worldwide",
    description:
      "A stay takes five calls: find the destination, search hotels, list one hotel's rooms, re-check the chosen rate, book. Paid now, or held where the rate allows it.",
    image: "/images/hero/hero_hotel.jpg",
    alt: "Find, Book and Cancel Hotel Stays Worldwide",
    primaryCta: { label: "Explore Hotel API", href: "/apis/hotel-api" },
    secondaryCta: { label: "Read the Guide", href: "/documentation/hotel-api" },
    metric: { label: "Results Stay Bookable", value: "15 min" },
    accentColor: "#f59e0b",
  },
  {
    id: "esim-telemetry",
    division: "DIV. 03",
    divisionBadgeClass: "text-emerald-300 bg-emerald-500/20 border-emerald-500/40",
    tags: ["200+ COUNTRIES AND REGIONS", "QR AND ACTIVATION CODE", "ISSUED AT ONCE"],
    title: "Travel eSIMs for 200+ Countries and Regions",
    description:
      "List the plans, buy one, and hand your customer the QR code and activation code from the same response. Orders are paid from your deposit and issued at once.",
    image: "/images/hero/hero_esim.jpg",
    alt: "Travel eSIMs for 200+ Countries and Regions",
    primaryCta: { label: "Explore eSIM API", href: "/apis/esim-api" },
    secondaryCta: { label: "Read the Guide", href: "/documentation/esim-api" },
    metric: { label: "eSIMs of One Plan per Order", value: "1–5" },
    accentColor: "#10b981",
  },
  {
    id: "transfer-mobility",
    division: "DIV. 04",
    divisionBadgeClass: "text-cyan-300 bg-cyan-500/20 border-cyan-500/40",
    tags: ["PRIVATE CARS, VANS, SHUTTLES", "ONE-WAY, RETURN, HOURLY", "CONFIRMED IN SECONDS"],
    title: "Airport and City Transfers Worldwide",
    description:
      "Private cars, vans and shuttles from hundreds of local providers, paid from your deposit and confirmed in seconds. Search, pick a quote, book.",
    image: "/images/hero/hero_transfer.jpg",
    alt: "Airport and City Transfers Worldwide",
    primaryCta: { label: "Explore Transfer API", href: "/apis/airport-transfer-api" },
    secondaryCta: { label: "Read the Guide", href: "/documentation/airport-transfer-api" },
    metric: { label: "Passengers per Search", value: "1–50" },
    accentColor: "#06b6d4",
  },
  {
    id: "visa-clearance",
    division: "DIV. 05",
    divisionBadgeClass: "text-purple-300 bg-purple-500/20 border-purple-500/40",
    tags: ["140+ DESTINATIONS", "OCR PASSPORT VERIFICATION", "EMBASSY GATEWAY"],
    title: "Automated Visa Intelligence & E-Visa Processing",
    description:
      "Real-time border eligibility rules, machine-readable passport OCR extraction, and automated electronic visa application filings for seamless travel readiness.",
    image: "/images/hero/hero_visa.jpg",
    alt: "Automated Visa Intelligence & E-Visa Processing",
    primaryCta: { label: "Explore Visa API", href: "/apis/visa-api" },
    secondaryCta: { label: "Developer Specs", href: "/documentation" },
    metric: { label: "Approval Tracking", value: "Real-Time" },
    accentColor: "#a855f7",
  },
];

interface HeroOverlaySliderProps {
  slides?: HeroSlide[];
  intervalMs?: number;
  className?: string;
}

export function HeroOverlaySlider({
  slides = defaultHeroSlides,
  intervalMs = 6000,
  className,
}: HeroOverlaySliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Timer & progress bar loop
  useEffect(() => {
    if (isPaused) return;

    const tickInterval = 50; // update progress every 50ms
    const step = (tickInterval / intervalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, tickInterval);

    return () => clearInterval(timer);
  }, [isPaused, intervalMs, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = slides[current];

  return (
    <section
      aria-label="Featured Travel APIs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative w-full h-[460px] sm:h-[500px] lg:h-[530px] bg-[#070e1b] overflow-hidden select-none",
        className
      )}
    >
      {/* Background imagery with crossfade and ken-burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center sm:brightness-[0.84]"
            />

            {/* Overlays matching https://www.impressivebd.com/ */}
            {/* 1. Horizontal gradient: deep solid on left for text contrast, transparent on right */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#070e1b]/95 via-[#070e1b]/70 sm:via-[#070e1b]/50 to-transparent z-10"
              aria-hidden
            />

            {/* 2. Vertical gradient: bottom dark anchor and subtle top for navbar */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/90 via-transparent to-black/30 z-10"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide text content layer */}
      <div className="relative z-20 flex items-center h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl lg:max-w-3xl pt-4 pb-14 sm:pt-8 sm:pb-20"
          >
            {/* Glass badges */}
            <div className="mb-3 hidden flex-wrap items-center gap-2 sm:mb-4 sm:flex">
              <span
                className={cn(
                  "text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider px-2.5 py-0.5 rounded-lg uppercase border ",
                  currentSlide.divisionBadgeClass || "text-emerald-300 bg-emerald-500/20 border-emerald-500/40"
                )}
              >
                {currentSlide.division}
              </span>
              {currentSlide.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-slate-200 uppercase bg-black/40 backdrop-blur-sm border border-white/20 px-2.5 py-0.5 rounded-lg "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-3 sm:mb-4 text-balance ">
              {currentSlide.title}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed max-w-2xl mb-4 sm:mb-8 font-normal line-clamp-2 sm:line-clamp-3 ">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                href={currentSlide.primaryCta.href}
                className="inline-flex items-center gap-2 bg-[#dc0e18] hover:bg-[#b80b14] text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 group active:scale-95"
              >
                <span>{currentSlide.primaryCta.label}</span>
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href={currentSlide.secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white bg-black/35 backdrop-blur-sm px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95"
              >
                <Terminal className="size-3.5 text-slate-300" />
                <span>{currentSlide.secondaryCta.label}</span>
              </Link>

              {/* Metric pill */}
              <div className="hidden sm:inline-flex items-center gap-2 border border-white/15 bg-black/30 backdrop-blur-sm px-3.5 py-2 rounded-lg text-xs text-slate-300 ">
                <span className="text-slate-400">{currentSlide.metric.label}:</span>
                <span className="font-mono font-semibold text-white">{currentSlide.metric.value}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Overlay Controls Bar (Exact structure of impressivebd.com) */}
      <div className="absolute bottom-3 sm:bottom-6 left-0 w-full z-30 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Slide Index Counter + Active Linear Progress Bar */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-black/45 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 border border-white/15 rounded-lg ">
            <span className="font-mono text-xs font-bold text-white">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="font-mono text-xs text-slate-300">
              {String(slides.length).padStart(2, "0")}
            </span>
            <div className="w-10 sm:w-20 h-[2px] bg-white/20 relative overflow-hidden ml-1 rounded-full">
              <div
                className="h-full bg-[#dc0e18] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Center: Slide indicator dots (Clickable on medium+ screens) */}
          <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1.5 border border-white/15 rounded-lg ">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  idx === current ? "w-6 bg-[#dc0e18]" : "w-2 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>

          {/* Right: Navigation arrow buttons and play/pause */}
          <div className="pointer-events-auto hidden items-center gap-1.5 sm:flex">
            <button
              onClick={togglePause}
              aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
              className="w-8 h-8 rounded-lg bg-black/45 hover:bg-black/70 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              {isPaused ? <Play className="size-3.5 text-slate-200" /> : <Pause className="size-3.5 text-slate-200" />}
            </button>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-8 h-8 rounded-lg bg-black/45 hover:bg-[#dc0e18] border border-white/20 hover:border-[#dc0e18] text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-8 h-8 rounded-lg bg-black/45 hover:bg-[#dc0e18] border border-white/20 hover:border-[#dc0e18] text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
