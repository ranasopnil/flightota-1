"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Terminal,
  CheckCircle2,
  Clock,
  RefreshCw,
  Wallet,
  Sliders,
  DollarSign,
  AlertTriangle,
  Receipt,
  FileText,
  Database,
  ArrowRight,
  Percent,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PnrRecord {
  pnr: string;
  pax: string;
  route: string;
  airline: string;
  gds: string;
  ttlRemaining: string;
  status: "auto_issued" | "queued" | "sync_ok" | "urgent_ttl";
  amount: string;
}

const INITIAL_PNRS: PnrRecord[] = [
  {
    pnr: "7K9LPX",
    pax: "Rahman / Anis Mr (1)",
    route: "DAC ✈ DXB",
    airline: "Emirates (EK583)",
    gds: "Amadeus 1A",
    ttlRemaining: "01h 24m",
    status: "queued",
    amount: "৳ 78,450",
  },
  {
    pnr: "QR88MZ",
    pax: "Chowdhury / Sadia Ms (2)",
    route: "DAC ✈ DOH ✈ LHR",
    airline: "Qatar Airways (QR641)",
    gds: "Sabre 1S",
    ttlRemaining: "03h 48m",
    status: "sync_ok",
    amount: "৳ 164,200",
  },
  {
    pnr: "SQ318P",
    pax: "Islam / Tanvir Mr (1)",
    route: "DAC ✈ SIN ✈ SYD",
    airline: "Singapore Airlines (SQ447)",
    gds: "Amadeus 1A",
    ttlRemaining: "06h 15m",
    status: "auto_issued",
    amount: "৳ 128,900",
  },
  {
    pnr: "BG071V",
    pax: "Ahmed / Khadija Mrs (3)",
    route: "DAC ✈ JED",
    airline: "Biman Bangladesh (BG335)",
    gds: "Travelport 1G",
    ttlRemaining: "00h 38m",
    status: "urgent_ttl",
    amount: "৳ 245,600",
  },
];

const SUB_AGENTS = [
  {
    name: "Skyline Aviation & Travels Ltd",
    code: "AG-1049",
    tier: "Platinum Consolidator",
    walletBalance: "৳ 4,850,200",
    creditLimit: "৳ 2,000,000",
    utilizedPercent: 42,
    status: "Active",
    todayBookings: 18,
  },
  {
    name: "Galaxy Global Holidays B2B",
    code: "AG-2018",
    tier: "Gold Partner",
    walletBalance: "৳ 1,230,000",
    creditLimit: "৳ 5,000,000",
    utilizedPercent: 78,
    status: "Active",
    todayBookings: 24,
  },
  {
    name: "FlyNova Corporate Travel Services",
    code: "AG-3310",
    tier: "Corporate TMC",
    walletBalance: "৳ 240,000",
    creditLimit: "৳ 1,500,000",
    utilizedPercent: 94,
    status: "Warning",
    todayBookings: 9,
  },
];

const BSP_RECONCILIATION = [
  {
    supplier: "Amadeus GDS (BSP Billing Period 26-10)",
    remittanceDue: "৳ 18,450,900",
    erpLedgerMatch: "৳ 18,450,900",
    matchRate: "100%",
    status: "Fully Reconciled",
    adms: "0 ADMs",
  },
  {
    supplier: "Sabre Global Distribution (BSP Period 26-10)",
    remittanceDue: "৳ 12,240,000",
    erpLedgerMatch: "৳ 12,240,000",
    matchRate: "100%",
    status: "Fully Reconciled",
    adms: "0 ADMs",
  },
  {
    supplier: "Hotelbeds Wholesale Accommodation",
    remittanceDue: "$ 48,200",
    erpLedgerMatch: "$ 48,200",
    matchRate: "99.8%",
    status: "1 Pending Refund",
    adms: "Resolved",
  },
  {
    supplier: "AirAsia & IndiGo Net Direct Feeds",
    remittanceDue: "৳ 4,180,500",
    erpLedgerMatch: "৳ 4,180,500",
    matchRate: "100%",
    status: "Instant Settle",
    adms: "0 ADMs",
  },
];

export function TravelErpShowcase() {
  const [activeTab, setActiveTab] = useState<"queues" | "wallets" | "bsp" | "markups">("queues");
  const [pnrs, setPnrs] = useState<PnrRecord[]>(INITIAL_PNRS);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setPnrs((prev) =>
        prev.map((item) =>
          item.status === "queued" ? { ...item, status: "auto_issued" } : item
        )
      );
      setIsSyncing(false);
      toast.success("Amadeus & Sabre PNR queues synced! PNR 7K9LPX auto-issued successfully.");
    }, 900);
  };

  return (
    <div className="space-y-12">
      {/* 1. Live Interactive ERP Cockpit Section */}
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-8">
        {/* Cockpit Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/70 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                <Cpu className="size-3" />
                ERP OPERATIONAL COCKPIT
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Robotic Processing Unit Active
              </span>
            </div>
            <h2 className="mt-2 font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Real-Time Travel ERP &amp; Mid-Office Dashboard
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Inspect how FlightOTA ERP automates PNR queues across Amadeus and Sabre, maintains sub-agent deposit ledgers, and eliminates manual reconciliation.
            </p>
          </div>

          {/* Quick Cockpit Action */}
          <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSimulateSync}
              disabled={isSyncing}
              className="rounded-lg text-xs gap-1.5 cursor-pointer font-semibold"
            >
              <RefreshCw className={`size-3.5 ${isSyncing ? "animate-spin text-primary" : ""}`} />
              <span>{isSyncing ? "Processing Queues..." : "Run Queue Sync"}</span>
            </Button>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold">
              <Link href="/contact?topic=enterprise">Request Live ERP Demo</Link>
            </Button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex gap-2 border-b border-border/70 pb-3 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("queues")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "queues"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Terminal className="size-3.5" />
            <span>PNR Queue Automation (Amadeus / Sabre)</span>
            <Badge variant="outline" className={`ml-1 text-[10px] px-1.5 py-0 border-current ${activeTab === "queues" ? "bg-white/20 text-white" : ""}`}>
              4 Queued
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("wallets")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "wallets"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Wallet className="size-3.5" />
            <span>Sub-Agent Wallets &amp; Credit Lines</span>
            <Badge variant="outline" className={`ml-1 text-[10px] px-1.5 py-0 border-current ${activeTab === "wallets" ? "bg-white/20 text-white" : ""}`}>
              3 Agencies
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bsp")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "bsp"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Receipt className="size-3.5" />
            <span>IATA BSP &amp; Supplier Reconciliation</span>
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("markups")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "markups"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Percent className="size-3.5" />
            <span>Multi-Tier Commission Matrix</span>
          </button>
        </div>

        {/* Tab 1: PNR Queues */}
        {activeTab === "queues" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Database className="size-3.5 text-primary" />
                Active GDS Robotic Queue Monitor (Polling interval: 15s)
              </span>
              <span className="text-muted-foreground text-[11px]">
                Ticketing Time Limit (TTL) auto-protection enabled &bull; Zero expired PNRs
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border/80">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 text-muted-foreground border-b border-border/80 text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">GDS PNR</th>
                    <th className="py-3 px-4">Lead Passenger</th>
                    <th className="py-3 px-4">Flight Segment</th>
                    <th className="py-3 px-4">Carrier &amp; Pipe</th>
                    <th className="py-3 px-4">TTL Countdown</th>
                    <th className="py-3 px-4">Gross Value</th>
                    <th className="py-3 px-4 text-right">Robot Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {pnrs.map((item) => (
                    <tr key={item.pnr} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-foreground flex items-center gap-1.5">
                        <Terminal className="size-3 text-primary" />
                        {item.pnr}
                      </td>
                      <td className="py-3 px-4 text-foreground/90 font-medium">{item.pax}</td>
                      <td className="py-3 px-4 font-semibold text-foreground">{item.route}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        <div>{item.airline}</div>
                        <div className="text-[10px] font-mono text-muted-foreground/75">{item.gds}</div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          item.status === "urgent_ttl" ? "text-amber-600 dark:text-amber-400 animate-pulse" : "text-foreground"
                        }`}>
                          <Clock className="size-3 text-muted-foreground" />
                          {item.ttlRemaining}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-foreground">{item.amount}</td>
                      <td className="py-3 px-4 text-right">
                        {item.status === "auto_issued" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            <CheckCircle2 className="size-3" />
                            Auto-Issued (E-Ticket)
                          </span>
                        )}
                        {item.status === "queued" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                            <Clock className="size-3 animate-spin" />
                            Queued for Issuance
                          </span>
                        )}
                        {item.status === "sync_ok" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                            <CheckCircle2 className="size-3" />
                            Schedule Sync OK
                          </span>
                        )}
                        {item.status === "urgent_ttl" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            <AlertTriangle className="size-3" />
                            Urgent TTL Alert (&lt;1h)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>Integrated with Amadeus Queue 50 / 97 and Sabre Queue 10 automated polling</span>
              </span>
              <span className="font-mono text-[11px] mt-1 sm:mt-0 text-foreground font-semibold">
                Average TTL Processing Latency: 1.2s
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Sub-Agent Wallets */}
        {activeTab === "wallets" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Wallet className="size-3.5 text-primary" />
                Real-Time B2B Deposit Accounts &amp; Automated Overdraft Shields
              </span>
              <span className="text-muted-foreground text-[11px]">
                Instant bank slip verification &bull; Real-time debit before e-ticket issuance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUB_AGENTS.map((agent) => (
                <div
                  key={agent.code}
                  className="rounded-lg border border-border/80 bg-background/80 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground">{agent.code}</span>
                      <h4 className="font-heading text-sm font-bold text-foreground leading-tight">
                        {agent.name}
                      </h4>
                      <Badge variant="outline" className="mt-1 text-[10px] font-semibold">
                        {agent.tier}
                      </Badge>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        agent.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Prepaid Wallet:</span>
                      <span className="font-mono font-bold text-foreground">{agent.walletBalance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Credit Line Limit:</span>
                      <span className="font-mono font-semibold text-foreground">{agent.creditLimit}</span>
                    </div>
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Credit Line Utilized:</span>
                        <span className="font-mono font-bold text-foreground">{agent.utilizedPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            agent.utilizedPercent > 90 ? "bg-amber-500" : "bg-primary"
                          }`}
                          style={{ width: `${agent.utilizedPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Today: {agent.todayBookings} Bookings</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info(`Viewing financial ledger for ${agent.name}`)}
                      className="h-6 text-[10px] px-2 text-primary hover:text-primary cursor-pointer"
                    >
                      View Ledger &rarr;
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: IATA BSP Reconciliation */}
        {activeTab === "bsp" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Receipt className="size-3.5 text-emerald-500" />
                IATA BSP / ARC Statement Auto-Matching vs ERP Ledger
              </span>
              <span className="text-muted-foreground text-[11px]">
                Zero Agency Debit Memos (ADMs) &bull; Automated Hot-File Comparison
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border/80">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 text-muted-foreground border-b border-border/80 text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Supplier / Clearing House</th>
                    <th className="py-3 px-4">BSP Invoiced Remittance</th>
                    <th className="py-3 px-4">ERP Calculated Ledger</th>
                    <th className="py-3 px-4">Matching Rate</th>
                    <th className="py-3 px-4">Audit Status</th>
                    <th className="py-3 px-4 text-right">Debit Memo Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {BSP_RECONCILIATION.map((row) => (
                    <tr key={row.supplier} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">{row.supplier}</td>
                      <td className="py-3 px-4 font-mono font-bold text-foreground">{row.remittanceDue}</td>
                      <td className="py-3 px-4 font-mono text-foreground">{row.erpLedgerMatch}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {row.matchRate}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <CheckCircle2 className="size-3" />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-muted-foreground font-semibold">
                        {row.adms}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Multi-Tier Markups */}
        {activeTab === "markups" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Percent className="size-3.5 text-primary" />
                Dynamic Commercial Pricing Rules &amp; Tiered Markups
              </span>
              <span className="text-muted-foreground text-[11px]">
                Airline-wise, route-wise &amp; channel-wise profit margin automation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Rule #1: B2B Sub-Agents</span>
                  <Badge variant="outline" className="text-[10px]">Active</Badge>
                </div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Biman &amp; Middle East Corridors
                </h4>
                <p className="text-xs text-muted-foreground">
                  Applied when Sub-Agent searches flights between DAC/CTG and Middle East (DXB, DOH, JED).
                </p>
                <div className="p-2.5 rounded-md bg-card border font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  Markup: +3.0% on Net Fare + ৳ 0 Surcharge
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Rule #2: Direct LCC Flights</span>
                  <Badge variant="outline" className="text-[10px]">Active</Badge>
                </div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  IndiGo, AirAsia &amp; flydubai
                </h4>
                <p className="text-xs text-muted-foreground">
                  Flat service fee applied dynamically over wholesale scraper net fares without GDS markup.
                </p>
                <div className="p-2.5 rounded-md bg-card border font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  Markup: +৳ 550 Flat Fee / Passenger
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Rule #3: Corporate CSBT</span>
                  <Badge variant="outline" className="text-[10px]">Active</Badge>
                </div>
                <h4 className="font-heading text-sm font-bold text-foreground">
                  TMC Corporate Contracts
                </h4>
                <p className="text-xs text-muted-foreground">
                  Passes negotiated corporate airline codes with fixed management ticketing fee.
                </p>
                <div className="p-2.5 rounded-md bg-card border font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  Fee: ৳ 750 Management Fee / PNR
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Six Pillars of Travel ERP Architecture */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Complete Modular Suite</span>
          <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Six Enterprise Modules Powering Your Entire Travel Operations
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Eliminate fragmented spreadsheets and disconnects between frontline booking portals and back-office accountants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Module 1 */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/50">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Terminal className="size-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-foreground">
              PNR Queue Robot &amp; TTL Sentinel
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Automate multi-GDS queue scraping across Amadeus (Q50, Q97), Sabre (Q10), and Travelport. Triggers automated ticket issuance when agent wallet funds are confirmed and alerts agents before ticketing deadlines expire.
            </p>
            <ul className="pt-2 border-t border-border/60 space-y-1 text-xs text-foreground/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Zero manual queue checking</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Automated schedule change re-booking</li>
            </ul>
          </div>

          {/* Module 2 */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/50">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="size-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-foreground">
              Multi-Currency General Ledger
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Full double-entry bookkeeping purpose-built for travel agencies. Manages dual currency entries (BDT, USD, AED, EUR, GBP), real-time foreign exchange conversions, and automated bank reconciliation.
            </p>
            <ul className="pt-2 border-t border-border/60 space-y-1 text-xs text-foreground/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Real-time exchange rate sync</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Export to SAP, QuickBooks, Xero &amp; Tally</li>
            </ul>
          </div>

          {/* Module 3 */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/50">
            <div className="flex size-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Wallet className="size-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-foreground">
              Sub-Agent Wallets &amp; Credit Control
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Protect your business from sub-agent credit default. Require upfront prepaid deposits, assign collateralized credit limits, and implement automated ticketing locks the instant an agency reaches 95% threshold.
            </p>
            <ul className="pt-2 border-t border-border/60 space-y-1 text-xs text-foreground/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Automated bank top-up verification</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> White-label agency receipts &amp; vouchers</li>
            </ul>
          </div>

          {/* Module 4 */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/50">
            <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Receipt className="size-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-foreground">
              IATA BSP &amp; Supplier Auto-Matching
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Auto-reconcile IATA Billing and Settlement Plan (BSP) fortnightly statements with your internal ticketing records. Flag discrepancies, incorrect commissions, or carrier ADMs before payment deadlines.
            </p>
            <ul className="pt-2 border-t border-border/60 space-y-1 text-xs text-foreground/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> 99.8% automatic record matching</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Bedbank &amp; LCC supplier reconciliation</li>
            </ul>
          </div>

          {/* Module 5 */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/50">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sliders className="size-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-foreground">
              Dynamic Markups &amp; Split-Commissions
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Configure granular profit margins across airlines, booking classes, origin-destination routes, and agency tiers. Calculate supplier overrides and agent revenue shares automatically during checkout.
            </p>
            <ul className="pt-2 border-t border-border/60 space-y-1 text-xs text-foreground/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Multi-tier sub-agent markup tiers</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Real-time net pricing camouflage</li>
            </ul>
          </div>

          {/* Module 6 */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3 transition-all hover:border-primary/50">
            <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FileText className="size-5" />
            </div>
            <h3 className="font-heading text-base font-bold text-foreground">
              Statutory VAT / GST &amp; Tax Invoices
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ensure statutory tax compliance across domestic and international ticketing. Generate government-compliant VAT/GST tax invoices, withholding tax certificates, and automated audit logs.
            </p>
            <ul className="pt-2 border-t border-border/60 space-y-1 text-xs text-foreground/80">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> Formatted for local tax authorities</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> 1-Click financial statement exports</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Enterprise Integration Stack Ribbon */}
      <div className="rounded-xl border border-border/80 bg-card/60 p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/70 pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest">
              CERTIFIED ECOSYSTEM INTEROPERABILITY
            </span>
            <h3 className="font-heading text-lg font-bold text-foreground mt-0.5">
              Connects with Your Existing Accounting &amp; GDS Infrastructure
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">Certified 2-Way API Connectors</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-lg border border-border/60 bg-background p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-primary">Accounting Software</span>
            <div className="font-bold text-foreground">QuickBooks &amp; Xero</div>
            <p className="text-[11px] text-muted-foreground">Automated chart of accounts &amp; bill synchronization.</p>
          </div>

          <div className="rounded-lg border border-border/60 bg-background p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-primary">Enterprise ERPs</span>
            <div className="font-bold text-foreground">SAP &amp; Tally Prime</div>
            <p className="text-[11px] text-muted-foreground">Direct XML voucher and ledger import support.</p>
          </div>

          <div className="rounded-lg border border-border/60 bg-background p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">GDS &amp; Clearing</span>
            <div className="font-bold text-foreground">Amadeus, Sabre, BSP</div>
            <p className="text-[11px] text-muted-foreground">IATA BSP, ARC, and Sabre Bargain Finder queues.</p>
          </div>

          <div className="rounded-lg border border-border/60 bg-background p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Payment Gateways</span>
            <div className="font-bold text-foreground">SSLCommerz &amp; bKash</div>
            <p className="text-[11px] text-muted-foreground">Automated settlement reconciliation &amp; webhook audits.</p>
          </div>
        </div>
      </div>

      {/* 4. ROI & Operational Efficiency Benchmarks */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
              Measurable Business ROI
            </Badge>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
              Replace 40+ Hours of Weekly Manual Back-Office Labor
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Consolidators running FlightOTA ERP scale transaction volume 4x without hiring additional mid-office ticketing staff.
            </p>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold mt-2">
              <Link href="/contact?topic=sales">
                <span>Book ERP Solution Consultation</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-border/70 bg-card p-4 text-center">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                &lt; 2s
              </div>
              <div className="text-xs font-bold text-foreground mt-1">PNR Queue Issuance</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Down from 14 mins manual</div>
            </div>

            <div className="rounded-lg border border-border/70 bg-card p-4 text-center">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                12 Mins
              </div>
              <div className="text-xs font-bold text-foreground mt-1">Month-End BSP Audit</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Down from 5 full days</div>
            </div>

            <div className="rounded-lg border border-border/70 bg-card p-4 text-center col-span-2 sm:col-span-1">
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                0%
              </div>
              <div className="text-xs font-bold text-foreground mt-1">Uncollateralized Default</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Real-time deposit lock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
