import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck,
  Handshake,
  Lock,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { Section, SectionHeader } from "@/components/common/section";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { CtaBand } from "@/features/marketing/sections/cta-band";

export const metadata: Metadata = staticPageMetadata("/about");

// 1. Mission & Core Values
const values = [
  {
    icon: Target,
    title: "Mission: Universal Connectivity",
    text: "Make adding global travel products to software as fast, reliable, and predictable as integrating payment processing. One API, normalized schemas, and zero legacy headaches.",
  },
  {
    icon: Eye,
    title: "Vision: The Connected Journey",
    text: "Empower every travel enterprise — from fast-growing startups to global OTAs — to book flights, stays, eSIM roaming, visas, and airport transfers in a single atomic transaction.",
  },
  {
    icon: ShieldCheck,
    title: "Financial Rigor & Idempotency",
    text: "Travel bookings move real customer funds. Every state transition has guaranteed idempotency, distributed circuit breakers, and sub-second automated rollback protection.",
  },
  {
    icon: Handshake,
    title: "Direct Supplier Partnerships",
    text: "We partner directly with IATA airlines, global bed banks, GSMA mobile networks, and foreign embassies, respecting commercial guidelines and rate limits.",
  },
];

// 2. Global Edge Network Data Centers
const edgeNodes = [
  { city: "Frankfurt", region: "EU Central", latency: "<18ms", role: "Primary European Core & IATA NDC Hub", flag: "🇩🇪" },
  { city: "Singapore", region: "APAC Hub", latency: "<22ms", role: "Bed Bank Aggregator & eSIM Core", flag: "🇸🇬" },
  { city: "North Virginia", region: "US East", latency: "<15ms", role: "GDS Pipes & Global Financial Settlement", flag: "🇺🇸" },
  { city: "Tokyo", region: "APAC East", latency: "<28ms", role: "Low-Latency East Asian Consular Gateway", flag: "🇯🇵" },
  { city: "London", region: "UK & EMEA", latency: "<19ms", role: "Rail, Ground Transport & UKVI ETA Bridge", flag: "🇬🇧" },
  { city: "Sydney", region: "Oceania", latency: "<35ms", role: "Trans-Pacific Cache & ImmiAccount Proxy", flag: "🇦🇺" },
];

// 3. Platform Milestones Roadmap
const milestones = [
  {
    year: "2023",
    tag: "Genesis",
    title: "Founded by Travel Tech Veterans",
    desc: "Frustrated by archaic 1990s GDS XML protocols and fragmented supplier pipes, our founders built the first prototype of a unified travel REST engine.",
  },
  {
    year: "2024",
    tag: "Series Seed",
    title: "IATA NDC & Flight API General Availability",
    desc: "Raised $4.5M Seed round and launched direct NDC pipes to 25+ global airlines with sub-200ms seat map calculations and automated 24h void windows.",
  },
  {
    year: "2025",
    tag: "Expansion",
    title: "Global Hotel Bed Banks & eSIM 5G Gateways",
    desc: "Integrated 1.8M+ deduplicated properties across 12 bed banks, followed by real-time GSMA SM-DP+ cloud eSIM provisioning across 190+ countries.",
  },
  {
    year: "2026",
    tag: "Scale",
    title: "Consular Visa Automation & 400M+ Monthly Calls",
    desc: "Unveiled IATA Timatic-aligned consular rules engine and scaled infrastructure to handle over 400 million monthly API requests with 99.98% verified uptime.",
  },
];

// 4. Leadership & Engineering Team
const team = [
  {
    name: "Apurba Roy",
    role: "Founder & Chief Executive Officer",
    background: "Ex-Amadeus & Expedia Principal Architect",
    bio: "14+ years designing high-throughput transaction engines. Passionate about replacing legacy airline EDIFACT/XML with modern developer primitives.",
    avatar: "AR",
  },
  {
    name: "Elena Rostova",
    role: "Co-Founder & Chief Technology Officer",
    background: "Ex-Stripe Core Platform, Distributed Systems",
    bio: "Specialist in zero-allocation Rust networking, fault-tolerant consensus, and multi-region state replication for mission-critical payment systems.",
    avatar: "ER",
  },
  {
    name: "Marcus Vance",
    role: "VP of Global Airline & Supplier Alliances",
    background: "Ex-IATA NDC Working Group & Qatar Airways",
    bio: "Decade-long experience negotiating direct carrier partnerships, commercial bilats, and GDS distribution contracts worldwide.",
    avatar: "MV",
  },
  {
    name: "Dr. Priya Nair",
    role: "Head of Developer Experience & Protocol Arch",
    background: "Ex-Twilio DevRel & OpenAPI Initiative",
    bio: "Author of developer SDKs and OpenAPI specifications. Dedicated to ensuring our sandbox and client libraries feel effortless to integrate.",
    avatar: "PN",
  },
];

// 5. Compliance & Trust Badges
const certifications = [
  {
    title: "PCI-DSS Level 1 Certified",
    desc: "Audited to the strictest payment card data security standard. Tokenized checkout with zero plain-text card storage.",
    icon: Lock,
  },
  {
    title: "SOC 2 Type II Attested",
    desc: "Rigorous third-party evaluation of security, confidentiality, availability, and processing integrity controls.",
    icon: Award,
  },
  {
    title: "IATA NDC Level 4 Certified",
    desc: "Official certification recognizing end-to-end Offer & Order management across all complex airline booking workflows.",
    icon: FileCheck,
  },
  {
    title: "GDPR & CCPA Compliant",
    desc: "Full data sovereignty controls, zero PII payload logging, and automated traveler consent management.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section with Developer Stats Banner - EXACT /apis UI */}
      <PageHero
        eyebrow="ABOUT FLIGHTOTA"
        badge="140+ Direct Supplier Pipes"
        title="Developer infrastructure behind the world's best travel products"
        description="Unified REST APIs for flights, hotels, eSIM connectivity, visas, and ground transport behind one elegant developer-first platform."
        image="/images/heroes/about_architecture.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              195+ Countries
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              &lt;120ms Latency
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              99.98% Monitored SLA
            </span>
          </>
        }
        actions={
          <>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold h-7 ">
              <Link href="/apis">
                Explore APIs &rarr;
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <Link href="/documentation">API Docs</Link>
            </Button>
            <ShareEmbedModal
              path="/about"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />

      {/* 2. The Legacy Problem vs The FlightOTA Standard */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="The Paradigm Shift"
          title="Why the travel industry needed a clean developer layer"
          description="Global travel distribution has been trapped in 1990s legacy technology for decades. We rebuilt the stack from the metal up."
        />

        <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-2">
          {/* The Legacy Nightmare */}
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-destructive font-semibold text-xs uppercase tracking-wider">
              <Clock className="size-4" />
              The Legacy Way (Fragmented & Fragile)
            </div>
            <h3 className="mt-3 font-heading text-lg sm:text-xl font-bold text-foreground">
              Dozens of disjointed XML contracts & opaque fees
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">✕</span>
                <span>Separate commercial negotiations with each airline, GDS, and bed bank provider.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">✕</span>
                <span>Unpredictable booking drops, non-idempotent commits, and duplicate customer card charges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">✕</span>
                <span>Cryptic 2-letter error codes without actionable debugging context or request traces.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">✕</span>
                <span>Incompatible hotel room rate types, missing tax breakdowns, and manual voucher handling.</span>
              </li>
            </ul>
          </div>

          {/* The FlightOTA Modern Standard */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="size-4" />
              The FlightOTA Standard (Fast & Unified)
            </div>
            <h3 className="mt-3 font-heading text-lg sm:text-xl font-bold text-foreground">
              One unified contract with normalized JSON APIs
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Single Bearer API key unlocks flights, hotels, eSIM, visas, and airport transfers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>100% idempotent booking endpoints with automated 24h void windows and zero duplicate charges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Structured RFC 7807 error responses with request IDs and instant sandbox simulation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Automated multi-carrier failover circuit breakers and transparent volume-based billing.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. Core Values */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="Our Guiding Values"
          title="Engineered for mission-critical reliability"
          description="Everything we build is designed to handle high transaction volumes with zero compromise on data accuracy."
        />

        <div className="app-rail mt-4 sm:mt-12 grid gap-4 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 "
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-base sm:text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Global Edge Footprint */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="Global Infrastructure"
          title="Multi-region edge network operating at sub-120ms"
          description="Our distributed gateway nodes terminate TLS connections closest to your users and route requests to suppliers with maximum throughput."
        />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {edgeNodes.map((node) => (
            <div
              key={node.city}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/70 p-4 backdrop-blur-xs transition-all hover:border-primary/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{node.flag}</span>
                    <span className="font-heading font-bold text-sm sm:text-base text-foreground">
                      {node.city}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {node.latency}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground font-medium">
                  {node.region}
                </div>
                <p className="mt-2.5 text-xs text-secondary-foreground leading-relaxed">
                  {node.role}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
                <span>Active Routing</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Company Milestones Timeline */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="Our Journey"
          title="Rapid execution built on proven engineering"
          description="From our first NDC flight search to an enterprise suite processing hundreds of millions of requests."
        />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="relative rounded-xl border border-border/80 bg-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-black text-primary">
                    {m.year}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-semibold border-primary/20 bg-primary/5 text-primary">
                    {m.tag}
                  </Badge>
                </div>
                <h4 className="mt-3 font-heading text-sm sm:text-base font-bold text-foreground">
                  {m.title}
                </h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="size-3" />
                <span>Milestone Shipped</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Leadership & Engineering Team */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="Leadership Team"
          title="Built by builders from travel & fintech"
          description="Our engineers and product leaders have designed systems at Amadeus, Expedia, Stripe, and Twilio."
        />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((person) => (
            <div
              key={person.name}
              className="rounded-xl border border-border/80 bg-card p-5 transition-all hover:border-primary/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-heading font-black text-base border border-primary/20">
                  {person.avatar}
                </div>
                <h4 className="mt-4 font-heading text-base font-bold text-foreground">
                  {person.name}
                </h4>
                <div className="text-xs font-semibold text-primary mt-0.5">
                  {person.role}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground font-mono">
                  {person.background}
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {person.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-500" />
                <span>Verified Leadership</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6b. Travel Technology & GDS Aggregation Ecosystem (Travelopro-inspired) */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="Global Travel Ecosystem"
          title="Bridging legacy GDS protocols with modern travel portals"
          description="We unify complex airline XML feeds, GDS terminals, and bed bank inventory into developer-first APIs and business platforms."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg border bg-card group">
            <div className="relative h-56 w-full">
              <Image
                src="/images/solutions/gds_integration.jpg"
                alt="Global GDS and Airline Systems"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Aviation & GDS Pipes</span>
                <h3 className="font-heading text-xl font-bold">Amadeus, Sabre & Travelport Aggregation</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Direct integration with the world&apos;s leading Global Distribution Systems (GDS) and IATA NDC Level 4 carriers.
                Our engine automatically manages PNR creation, split-ticketing, schedule changes, and queue servicing without manual intervention.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Amadeus MasterPricer</span>
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Sabre Bargain Finder Max</span>
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Travelport Universal API</span>
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">IATA NDC Level 4</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border bg-card group">
            <div className="relative h-56 w-full">
              <Image
                src="/images/solutions/b2b_portal.jpg"
                alt="B2B Travel Agent Network and ERP"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Enterprise Software</span>
                <h3 className="font-heading text-xl font-bold">B2B Sub-Agent Portals & Travel ERP</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empower your travel agency network with dedicated B2B agent dashboards, tiered markups, sub-agent credit
                wallets, dynamic packaging engines, and comprehensive mid-office financial accounting ledgers.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Sub-Agent Network</span>
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Credit & Wallet Engine</span>
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Dynamic Packaging</span>
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">Automated Invoicing</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Enterprise Security & Compliance */}
      <Section className="border-b border-border/60">
        <SectionHeader
          eyebrow="Security & Governance"
          title="Bank-grade protection for money-moving operations"
          description="We uphold the most rigorous international certifications for transaction integrity and data privacy."
        />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.title}
                className="rounded-xl border border-border/80 bg-card p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="mt-4 font-heading text-sm sm:text-base font-bold text-foreground">
                    {cert.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="size-3" />
                  <span>Audited & Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 8. Careers & Hiring Callout */}
      <Container className="py-12 sm:py-16">
        <div className="rounded-lg border border-border/80 bg-card p-6 sm:p-10 relative overflow-hidden ring-1 ring-border/30">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-xs font-semibold">
                We&apos;re Hiring
              </Badge>
              <h3 className="mt-2 font-heading text-xl sm:text-3xl font-extrabold text-foreground">
                Join our mission to reshape global travel architecture
              </h3>
              <p className="mt-2 text-xs sm:text-base text-muted-foreground leading-relaxed">
                We are a remote-first team of 45+ distributed engineers, API designers, and travel industry veterans across 12 timezones.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-lg border border-border/70 bg-card px-2.5 py-1 font-medium text-foreground">
                  💼 Sr. Distributed Systems Engineer (Rust)
                </span>
                <span className="rounded-lg border border-border/70 bg-card px-2.5 py-1 font-medium text-foreground">
                  💼 Developer Advocate & API Specialist
                </span>
                <span className="rounded-lg border border-border/70 bg-card px-2.5 py-1 font-medium text-foreground">
                  💼 Strategic Carrier Alliances Manager
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button asChild size="lg" className="rounded-xl font-semibold ">
                <Link href="/contact?topic=careers">
                  View Open Roles <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* 9. Final CTA */}
      <CtaBand title="Ready to build your next travel product with us?" />
    </>
  );
}
