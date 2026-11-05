"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plane,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { AirlineLogo } from "./airline-logo";
import { Button } from "@/components/ui/button";

interface RouteOption {
  id: string;
  origin: { code: string; city: string; airport: string };
  destination: { code: string; city: string; airport: string };
  duration: string;
  distance: string;
  carriers: {
    name: string;
    iata: string;
    flightNo: string;
    category: "ndc" | "lcc";
    departure: string;
    arrival: string;
    cabin: string;
    baseFare: number;
    gdsFee: number;
    currency: string;
    ancillaries: string[];
  }[];
}

const SAMPLE_ROUTES: RouteOption[] = [
  {
    id: "lhr-dxb",
    origin: { code: "LHR", city: "London", airport: "Heathrow Airport" },
    destination: { code: "DXB", city: "Dubai", airport: "Dubai International" },
    duration: "7h 05m",
    distance: "3,421 mi",
    carriers: [
      {
        name: "Emirates",
        iata: "EK",
        flightNo: "EK002",
        category: "ndc",
        departure: "14:20",
        arrival: "00:25",
        cabin: "Economy Saver",
        baseFare: 485,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["Free 30kg Baggage", "3D Seat Selection", "Free Halal Meal", "Instant 24h Void"],
      },
      {
        name: "British Airways",
        iata: "BA",
        flightNo: "BA107",
        category: "ndc",
        departure: "12:40",
        arrival: "22:50",
        cabin: "World Traveller",
        baseFare: 510,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["23kg Checked Bag", "Avios Accrual", "USB-C In-seat Power"],
      },
      {
        name: "Qatar Airways",
        iata: "QR",
        flightNo: "QR004",
        category: "ndc",
        departure: "15:05",
        arrival: "02:15",
        cabin: "Classic Economy",
        baseFare: 460,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["25kg Baggage Included", "Oryx Inflight WiFi", "Hold PNR 72h"],
      },
    ],
  },
  {
    id: "jfk-lhr",
    origin: { code: "JFK", city: "New York", airport: "John F. Kennedy" },
    destination: { code: "LHR", city: "London", airport: "Heathrow Airport" },
    duration: "6h 55m",
    distance: "3,451 mi",
    carriers: [
      {
        name: "British Airways",
        iata: "BA",
        flightNo: "BA178",
        category: "ndc",
        departure: "08:15",
        arrival: "20:10",
        cabin: "World Traveller Plus",
        baseFare: 620,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["2x 23kg Bags", "Priority Boarding", "Direct NDC Pipe"],
      },
      {
        name: "Virgin Atlantic",
        iata: "VS",
        flightNo: "VS004",
        category: "ndc",
        departure: "18:00",
        arrival: "06:10",
        cabin: "Economy Delight",
        baseFare: 590,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["Extra Legroom 34\"", "Premium Meal", "Direct API Token"],
      },
    ],
  },
  {
    id: "sin-hnd",
    origin: { code: "SIN", city: "Singapore", airport: "Changi Airport" },
    destination: { code: "HND", city: "Tokyo", airport: "Haneda Airport" },
    duration: "6h 40m",
    distance: "3,308 mi",
    carriers: [
      {
        name: "Singapore Airlines",
        iata: "SQ",
        flightNo: "SQ634",
        category: "ndc",
        departure: "13:55",
        arrival: "21:35",
        cabin: "Economy Standard",
        baseFare: 540,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["KrisConnect NDC Level 4", "30kg Luggage", "KrisWorld IFE"],
      },
      {
        name: "All Nippon Airways",
        iata: "NH",
        flightNo: "NH844",
        category: "ndc",
        departure: "22:15",
        arrival: "06:30",
        cabin: "Economy Basic",
        baseFare: 525,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["2x 23kg Baggage", "Japanese Meal Box", "Direct PNR Lock"],
      },
    ],
  },
  {
    id: "del-bkk",
    origin: { code: "DEL", city: "Delhi", airport: "Indira Gandhi Airport" },
    destination: { code: "BKK", city: "Bangkok", airport: "Suvarnabhumi Airport" },
    duration: "4h 15m",
    distance: "1,820 mi",
    carriers: [
      {
        name: "IndiGo",
        iata: "6E",
        flightNo: "6E1053",
        category: "lcc",
        departure: "06:00",
        arrival: "11:45",
        cabin: "Regular Fare",
        baseFare: 165,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["Direct LCC Scraper Pipe", "Wholesale Net Rate", "Instant Commit"],
      },
      {
        name: "AirAsia",
        iata: "AK",
        flightNo: "AK89",
        category: "lcc",
        departure: "23:30",
        arrival: "05:15",
        cabin: "Low Fare",
        baseFare: 145,
        gdsFee: 0,
        currency: "USD",
        ancillaries: ["20kg Add-on $18", "Hot Meal Add-on $5", "Pick-a-seat $3"],
      },
    ],
  },
];

export function AirlineRouteSimulator() {
  const [selectedRouteId, setSelectedRouteId] = useState("lhr-dxb");
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const route = SAMPLE_ROUTES.find((r) => r.id === selectedRouteId) || SAMPLE_ROUTES[0];

  const simulatedPayload = {
    route: `${route.origin.code} -> ${route.destination.code}`,
    duration: route.duration,
    offers: route.carriers.map((c) => ({
      carrier: c.iata,
      carrier_name: c.name,
      flight_number: c.flightNo,
      departs_at: c.departure,
      arrives_at: c.arrival,
      total: { amount: c.baseFare, currency: c.currency },
      extras: c.ancillaries,
    })),
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(simulatedPayload, null, 2));
    setCopied(true);
    toast.success("Simulated NDC flight payload copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border/80 bg-card p-4 sm:p-7 ring-1 ring-border/30 space-y-6">
      {/* Header and Route Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">
              Developer Playground
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Route Simulator
            </span>
          </div>
          <h3 className="mt-1.5 font-heading text-lg sm:text-xl font-bold text-foreground">
            Test Live NDC & LCC Route Aggregation
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Select a high-traffic international corridor to inspect direct airline pipes, net fares, and zero GDS distribution fees.
          </p>
        </div>

        {/* JSON Inspector Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button
            type="button"
            variant={showJson ? "default" : "outline"}
            size="sm"
            onClick={() => setShowJson(!showJson)}
            className="rounded-lg text-xs gap-1.5 cursor-pointer"
          >
            <Code2 className="size-3.5" />
            <span>{showJson ? "Hide JSON" : "Inspect JSON Response"}</span>
          </Button>
        </div>
      </div>

      {/* Corridor Route Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {SAMPLE_ROUTES.map((r) => {
          const isSelected = r.id === selectedRouteId;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRouteId(r.id)}
              className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/40 "
                  : "border-border/70 bg-card hover:bg-muted/60 text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs font-bold text-foreground flex items-center gap-1">
                  {r.origin.code} <Plane className="size-3 text-primary rotate-45" /> {r.destination.code}
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">{r.duration}</span>
              </div>
              <span className="text-[11px] text-muted-foreground truncate w-full mt-1">
                {r.origin.city} to {r.destination.city}
              </span>
            </button>
          );
        })}
      </div>

      {/* JSON View (Collapsible) */}
      {showJson && (
        <div className="relative rounded-lg border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 overflow-x-auto ">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Terminal className="size-3 text-emerald-400" />
              POST /flights/search &middot; simulated
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={copyPayload}
              className="h-6 text-[10px] text-slate-300 hover:text-white px-2 gap-1 rounded-md"
            >
              {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
              {copied ? "Copied" : "Copy JSON"}
            </Button>
          </div>
          <pre className="max-h-72 overflow-y-auto scrollbar-none text-[11px] leading-relaxed">
            {JSON.stringify(simulatedPayload, null, 2)}
          </pre>
        </div>
      )}

      {/* Live Carrier Offers Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">
            Available Direct Carrier Offers on {route.origin.code} &rarr; {route.destination.code} ({route.distance})
          </span>
          <span className="text-muted-foreground text-[11px]">
            Pricing updated &lt;2m ago &bull; Verified NDC Pipes
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {route.carriers.map((carrier) => (
            <div
              key={carrier.flightNo}
              className="group flex flex-col justify-between rounded-lg border border-border/80 bg-background/80 p-4 transition-all hover:border-primary/40 ring-1 ring-border/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                  <div className="flex items-center gap-2">
                    <AirlineLogo iata={carrier.iata} name={carrier.name} size="sm" />
                    <div>
                      <h4 className="font-heading text-xs font-bold text-foreground">
                        {carrier.name}
                      </h4>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {carrier.flightNo} &bull; {carrier.departure} &rarr; {carrier.arrival}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase ${
                      carrier.category === "ndc"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {carrier.category === "ndc" ? "NDC Pipe" : "LCC Direct"}
                  </span>
                </div>

                {/* Price Display */}
                <div className="my-3 flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] text-muted-foreground font-medium">Net Wholesale Fare</div>
                    <div className="font-heading text-xl font-extrabold text-foreground">
                      ${carrier.baseFare}{" "}
                      <span className="text-xs font-normal text-muted-foreground font-mono">
                        {carrier.currency}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      <ShieldCheck className="size-3" />
                      $0 GDS Fee
                    </div>
                    <div className="text-[9px] text-muted-foreground line-through mt-0.5">
                      Legacy: ${carrier.baseFare + 24}
                    </div>
                  </div>
                </div>

                {/* Ancillaries Chips */}
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {carrier.ancillaries.map((anc) => (
                    <span
                      key={anc}
                      className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 text-muted-foreground"
                    >
                      {anc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="size-3" />
                  Instant Ticket
                </span>

                <Button asChild size="sm" variant="ghost" className="h-7 text-xs gap-1 text-primary hover:text-primary">
                  <Link href={`/apis/air-travel-api`}>
                    API Docs <ArrowRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
