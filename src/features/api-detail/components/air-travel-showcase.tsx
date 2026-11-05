import { Armchair, ArrowRight, Clock, Layers, Luggage, ShieldCheck, Utensils, Zap } from "lucide-react";
import Link from "next/link";
import { AirlineLogo } from "@/features/airlines/components/airline-logo";

/** Facts and the sample offer below are from the flights guide (a real sandbox call, 22 Sep 2026). */
const facts = [
  { icon: Clock, label: "Search answers in", value: "5–30 s", note: "Every airline source at once" },
  { icon: Layers, label: "Offers stay bookable", value: "15 min", note: "See expires_at" },
  { icon: ShieldCheck, label: "Most fares", value: "Held first", note: "Issue before hold_expires_at" },
  { icon: Zap, label: "Void window ends", value: "23:59", note: "Asia/Dhaka, on the day of issue" },
];

const segments = [
  { from: "DAC", to: "DOH", flight: "QR 641", aircraft: "77W", departs: "22 Oct, 11:10", arrives: "13:50", minutes: "5h 40m" },
  { from: "DOH", to: "DXB", flight: "QR 1002", aircraft: "77W", departs: "23 Oct, 01:05", arrives: "03:25", minutes: "1h 20m" },
];

const fares = [
  { label: "Adult", amount: "48,449.00" },
  { label: "Child", amount: "38,041.00" },
  { label: "Infant", amount: "7,916.00" },
];

const conditions = [
  { label: "Fare family", value: "ECONOMY CLASSIC" },
  { label: "Checked bag", value: "25 kg" },
  { label: "Cabin bag", value: "1 piece, 7 kg" },
  { label: "Refund fee", value: "17,311.00 BDT" },
  { label: "Change fee", value: "9,892.00 BDT" },
  { label: "Seats available", value: "9" },
];

const extras = [
  { icon: Armchair, kind: "Seat", name: "10A", detail: "Chargeable, bulkhead, window", price: "0.00 BDT" },
  { icon: Luggage, kind: "Baggage", name: "Extra bag 20 kg", detail: "DAC–DXB (illustrative)", price: "4,500.00 BDT" },
  { icon: Utensils, kind: "Meal", name: "Baby meal", detail: "BBML, on all flights", price: "0.00 BDT" },
];

export function AirTravelShowcase() {
  return (
    <div className="space-y-5 sm:space-y-10">
      <dl className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="min-w-0 rounded-lg border border-border/70 bg-card p-3 sm:p-4">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Icon className="size-3.5 shrink-0 text-primary" aria-hidden />
                {fact.label}
              </dt>
              <dd className="mt-1 font-heading text-lg font-bold text-foreground sm:text-xl">{fact.value}</dd>
              <dd className="mt-0.5 text-xs leading-snug text-muted-foreground">{fact.note}</dd>
            </div>
          );
        })}
      </dl>

      <section aria-labelledby="sample-offer">
        <h3 id="sample-offer" className="font-heading text-base font-bold text-foreground sm:text-lg">A real sandbox offer</h3>
        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">One-way DAC to DXB for 1 adult, 1 child and 1 infant, Qatar Airways via Doha.</p>

        <article className="mt-3 grid grid-cols-1 overflow-hidden rounded-xl border border-border/80 bg-card lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0 p-4 sm:p-6">
            <div className="flex items-center gap-2.5">
              <AirlineLogo iata="QR" name="Qatar Airways" size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Qatar Airways</p>
                <p className="text-xs text-muted-foreground">DAC → DXB, 18h 15m</p>
              </div>
            </div>

            <ol className="mt-4 flex flex-col gap-3">
              {segments.map((segment) => (
                <li key={segment.flight} className="rounded-lg border border-border/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-heading text-sm font-bold text-foreground">
                      {segment.from} → {segment.to}
                    </span>
                    <span className="text-xs text-muted-foreground">{segment.minutes}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {segment.departs} to {segment.arrives}, airport local time
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {segment.flight}, {segment.aircraft}, class O
                  </p>
                </li>
              ))}
            </ol>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
              {conditions.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium break-words text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex min-w-0 flex-col border-t border-border/80 bg-muted/30 p-4 sm:p-6 lg:border-t-0 lg:border-l">
            <p className="text-xs font-medium text-muted-foreground">Your deposit pays</p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">94,406.00 BDT</p>
            <ul className="mt-3 flex flex-col gap-1.5 border-t border-border/60 pt-3 text-sm">
              {fares.map((fare) => (
                <li key={fare.label} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">{fare.label}</span>
                  <span className="font-medium text-foreground">{fare.amount} BDT</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Money is always integer minor units: <code className="font-mono">9440600</code> is 94,406.00 BDT.
            </p>
            <Link href="/documentation/air-travel-api#guide-search" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline lg:mt-auto lg:pt-3">
              See the full response <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </article>
      </section>

      <section aria-labelledby="offer-extras">
        <h3 id="offer-extras" className="font-heading text-base font-bold text-foreground sm:text-lg">Seats, bags and meals</h3>
        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">From /extras for this offer. An empty list means nothing is on sale for that kind, which is common.</p>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          {extras.map((extra) => {
            const Icon = extra.icon;
            return (
              <li key={extra.kind} className="flex min-w-0 items-start gap-3 rounded-lg border border-border/70 bg-card p-3 sm:p-4">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">{extra.kind}</p>
                  <p className="text-sm font-semibold text-foreground">{extra.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{extra.detail}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{extra.price}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <Link href="/airlines" className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 sm:p-4">
        View the airlines directory
        <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
      </Link>
    </div>
  );
}
