"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ConsoleExample {
  id: string;
  label: string;
  method: "GET" | "POST";
  path: string;
  response: string;
  latency: string;
}

/** Trimmed from the examples in the partner guides. */
const examples: ConsoleExample[] = [
  {
    id: "flights",
    label: "Flights",
    method: "POST",
    path: "/flights/search",
    latency: "30 s",
    response: `{
  "search_id": "srh_01m34mpemkpjehfke5rdpwrd8q",
  "currency": "BDT",
  "offers": [{
    "offer_id": "ofr_01m34mpempz46w64zzecwd3p6z",
    "total": { "amount": 9440600, "currency": "BDT" },
    "carrier": "QR",
    "instant_ticket": false
  }]
}`,
  },
  {
    id: "hotels",
    label: "Hotels",
    method: "POST",
    path: "/hotels/search",
    latency: "34 s",
    response: `{
  "search_id": "srh_01m34q7w1fmxw6tgp917fwnqrt",
  "currency": "BDT",
  "offers": [{
    "offer_id": "ofr_01m34q7w1fmxw6tgp917fwnqrv",
    "total": { "amount": 900792, "currency": "BDT" },
    "hotel": { "name": "Royal Tulip Hotel", "star_rating": 3 }
  }]
}`,
  },
  {
    id: "esim",
    label: "eSIM",
    method: "GET",
    path: "/esims/places",
    latency: "",
    response: `{
  "currency": "BDT",
  "places": [{
    "code": "AE",
    "name": "United Arab Emirates",
    "kind": "country",
    "plans": 12,
    "from": { "amount": 38500, "currency": "BDT" }
  }]
}`,
  },
];

/** Decorative API console in the hero. Cycles through examples; pauses on interaction. */
export function HeroConsole({ baseUrl }: { baseUrl: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const example = examples[index];

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % examples.length), 4200);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-code text-code-foreground ring-1 ring-navy-900/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div role="tablist" aria-label="Example API" className="ml-2 flex gap-1">
          {examples.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition",
                i === index ? "bg-white/10 text-white" : "text-navy-300 hover:text-white",
              )}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("rounded px-1.5 py-0.5 text-[11px] font-semibold", example.method === "GET" ? "bg-sea-500/20 text-sea-300" : "bg-brand-500/20 text-brand-300")}>
            {example.method}
          </span>
          <span className="truncate text-navy-200">
            <span className="text-navy-400">{baseUrl}</span>
            {example.path}
          </span>
        </div>
        <div className="text-navy-400">
          <span className="text-sea-300">X-Api-Key</span>: ak_live_••••••••3f9a
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-sea-300">
              <span className="size-1.5 rounded-full bg-sea-400" /> 200 OK
            </span>
            <span className="text-navy-400">{example.latency}</span>
          </div>
          <div className="relative h-[232px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.pre
                key={example.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 overflow-hidden p-3 text-navy-100"
              >
                {example.response}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
