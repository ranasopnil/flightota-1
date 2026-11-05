"use client";

import { motion } from "framer-motion";
import { Plane, PlaneTakeoff, PlaneLanding, Hotel, Cpu } from "lucide-react";

export function TravelAmbientDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none"
    >
      {/* 1. Flying Airplane 1 — Cruising across upper sky from West to East */}
      <motion.div
        initial={{ x: "-20vw", y: "8vh" }}
        animate={{ x: "120vw", y: "16vh" }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "linear",
        }}
        className="absolute left-0 top-0 flex items-center opacity-85"
      >
        {/* Contrail trail */}
        <div className="h-[1.5px] w-20 sm:w-36 bg-gradient-to-r from-transparent via-primary/30 to-primary/80 mr-1" />
        <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-2 py-1 text-[11px] font-semibold text-primary backdrop-blur-sm">
          <Plane className="size-3.5 rotate-45 text-primary shrink-0" />
          <span className="hidden sm:inline font-mono text-[10px] tracking-tight text-foreground">
            DAC ✈ LHR • Cruising
          </span>
        </div>
      </motion.div>

      {/* 2. Flying Airplane 2 — Cruising across mid-lower sky in the opposite direction */}
      <motion.div
        initial={{ x: "120vw", y: "65vh" }}
        animate={{ x: "-20vw", y: "58vh" }}
        transition={{
          repeat: Infinity,
          duration: 36,
          ease: "linear",
          delay: 14,
        }}
        className="absolute left-0 top-0 flex items-center opacity-70"
      >
        <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-2 py-1 text-[11px] font-semibold text-sea-600 dark:text-sea-400 backdrop-blur-sm">
          <Plane className="size-3.5 -rotate-[135deg] text-sea-500 shrink-0" />
          <span className="hidden sm:inline font-mono text-[10px] tracking-tight text-foreground">
            JFK ✈ DXB • FL380
          </span>
        </div>
        {/* Contrail trail behind */}
        <div className="h-[1.5px] w-20 sm:w-36 bg-gradient-to-l from-transparent via-sea-400/30 to-sea-500/80 ml-1" />
      </motion.div>

      {/* 3. Takeoff Aircraft Widget — Floating in lower-left margin */}
      <motion.aside
        animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
        className="fixed bottom-20 left-3 sm:left-5 z-20 hidden md:flex items-center gap-2 rounded-lg border border-border/70 bg-card/90 px-2.5 py-1.5 text-xs text-foreground backdrop-blur-md"
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <PlaneTakeoff className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-1 text-[11px] font-semibold">
            <span>Takeoff</span>
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">Climbing ↗ FL240</span>
        </div>
      </motion.aside>

      {/* 4. Landing Aircraft Widget — Floating in lower-right margin */}
      <motion.aside
        animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-20 right-3 sm:right-5 z-20 hidden md:flex items-center gap-2 rounded-lg border border-border/70 bg-card/90 px-2.5 py-1.5 text-xs text-foreground backdrop-blur-md"
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <PlaneLanding className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-1 text-[11px] font-semibold">
            <span>Landing</span>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">ILS Appr ↘ Touchdown</span>
        </div>
      </motion.aside>

      {/* 5. Hotel Node — Floating in upper-right margin */}
      <motion.aside
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.6 }}
        className="fixed top-28 right-3 sm:right-5 z-20 hidden xl:flex items-center gap-2 rounded-lg border border-border/60 bg-card/85 px-2.5 py-1.5 text-xs text-foreground backdrop-blur-md"
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <Hotel className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold flex items-center gap-1">
            <span>Hotel API</span>
            <span className="text-[9px] text-amber-500">★★★★★</span>
          </div>
          <span className="text-[10px] text-muted-foreground">1.2M+ Properties</span>
        </div>
      </motion.aside>

      {/* 6. eSIM / Global Connectivity Node — Floating in upper-left margin */}
      <motion.aside
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut", delay: 1.8 }}
        className="fixed top-28 left-3 sm:left-5 z-20 hidden xl:flex items-center gap-2 rounded-lg border border-border/60 bg-card/85 px-2.5 py-1.5 text-xs text-foreground backdrop-blur-md"
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-sea-500/10 text-sea-500">
          <Cpu className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-1 text-[11px] font-semibold">
            <span>eSIM Data</span>
            <span className="size-1.5 rounded-full bg-sea-500 animate-pulse" />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">180+ Countries</span>
        </div>
      </motion.aside>
    </div>
  );
}
