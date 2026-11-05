import { ArrowRight, Building2, Check, Globe, Laptop, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Eyebrow } from "@/components/common/section";
import { cn } from "@/lib/utils";

interface SolutionItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  icon: typeof Building2;
  features: string[];
  cta: { label: string; href: string };
}

const solutions: SolutionItem[] = [
  {
    id: "b2b-portal",
    badge: "B2B Sub-Agent Distribution",
    title: "B2B Travel Agent Portal & Network",
    subtitle: "Built for Travel Wholesalers, Consolidators & Travel Agencies",
    description:
      "A complete multi-tiered B2B travel distribution system. Onboard hundreds of sub-agents, define custom markups, issue agent credit limits, and automate ticket issuance with real-time deposit ledger management.",
    image: "/images/platforms/b2b.jpg",
    alt: "A bright modern office with a laptop by the window",
    icon: Users,
    features: [
      "Multi-level agent hierarchy with role-based staff logins",
      "Dynamic markup engine (airline-wise, cabin-wise, hotel-wise)",
      "Agent deposit wallet, credit limits & automated top-ups",
      "Instant PNR ticket issuance, invoice & voucher generation",
      "Comprehensive sales reports and agent commission ledger",
    ],
    cta: { label: "Explore B2B Portal", href: "/documentation" },
  },
  {
    id: "b2c-portal",
    badge: "B2C Consumer Booking Engine",
    title: "Consumer Internet Booking Engine (IBE)",
    subtitle: "For Online Travel Agencies (OTAs) & Consumer Brands",
    description:
      "High-converting, responsive travel booking engine. Delivers fast flight and hotel searches, interactive seat selection, dynamic baggage upsells, and instant multi-gateway checkout with automated SMS/email vouchers.",
    image: "/images/platforms/b2c.jpg",
    alt: "A person using a laptop and a phone at a table",
    icon: Globe,
    features: [
      "Live flight search with a lowest-fare calendar",
      "Interactive aircraft seat maps, meal & baggage add-ons",
      "Local & international payments (SSLCommerz, bKash, Cards)",
      "Automated e-ticketing, SMS & WhatsApp confirmation alerts",
      "Traveller self-service: date changes & cancellation requests",
    ],
    cta: { label: "View Booking Engine", href: "/apis/air-travel-api" },
  },
  {
    id: "white-label",
    badge: "White Label Portal",
    title: "White Label Travel Platform",
    subtitle: "For Travel Startups, Boutique Agencies & Corporate Portals",
    description:
      "Launch a fully functional, accredited travel booking portal under your own custom domain in less than 48 hours. Zero IATA accreditation or direct GDS contract negotiations needed to start earning commissions.",
    image: "/images/platforms/white-label.jpg",
    alt: "A clean white desk with a large monitor, tablet and phone",
    icon: Laptop,
    features: [
      "Custom domain (travel.yourbrand.com) with SSL included",
      "Customizable brand colors, logos, hero banners & typography",
      "Pre-integrated GDS, NDC & hotel inventory from day one",
      "No direct GDS bond or IATA licensing required to start",
      "Centralized administrative dashboard for markups & bookings",
    ],
    cta: { label: "White Label Details", href: "/pricing" },
  },
  {
    id: "travel-erp",
    badge: "Travel ERP & CRS Back-Office",
    title: "Central Reservation System & Travel ERP",
    subtitle: "For DMCs, Tour Consolidators & Inbound Tour Operators",
    description:
      "Unify mid-office operations, supplier contracts, and dynamic travel packaging. Manage direct inventory extranets, automate airline PNR queues, and reconcile supplier payables with end-to-end financial precision.",
    image: "/images/platforms/erp.jpg",
    alt: "A laptop showing analytics charts on a desk",
    icon: Building2,
    features: [
      "Central Reservation System (CRS) for direct contracted hotels",
      "Dynamic Packaging Engine (Flight + Hotel + Transfer combos)",
      "Automated PNR queue management & ticketing time-limit alerts",
      "Supplier extranet for direct rate loading and room allocation",
      "Multi-currency financial reconciliation & tax invoicing",
    ],
    cta: { label: "ERP Architecture", href: "/about" },
  },
];

export function TravelSolutions() {
  return (
    <section id="travel-solutions" className="border-t py-7 sm:py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>Travel Technology Solutions</Eyebrow>
          <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance text-foreground sm:mt-3 sm:text-4xl">
            End-to-End Travel Platforms for Modern OTAs & Agents
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            Inspired by global travel software leaders like Travelopro, our cloud platform delivers B2B agent
            networks, high-conversion B2C booking engines, white-label portals, and central reservation systems.
          </p>
        </div>

        <div className="app-rail mt-5 flex flex-col gap-10 sm:mt-14 lg:gap-16">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <article key={sol.id} className="grid min-w-0 grid-cols-1 items-center overflow-hidden rounded-xl border bg-card sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent md:grid-cols-2 md:gap-10 lg:gap-16">
                <div className={cn("relative aspect-[3/2] overflow-hidden bg-muted sm:rounded-xl", i % 2 === 1 && "md:order-last")}>
                  <Image src={sol.image} alt={sol.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 768px) 100vw, 600px" className="object-cover" />
                </div>

                <div className="min-w-0 p-4 sm:px-0 sm:pt-5 md:py-0">
                  <p className="flex items-center gap-2 text-xs font-semibold text-primary sm:text-sm">
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {sol.badge}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-foreground sm:text-2xl lg:text-3xl">{sol.title}</h3>
                  <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{sol.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sol.description}</p>

                  <ul className="mt-4 flex flex-col gap-2">
                    {sol.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-[13px] text-foreground/85 sm:text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link href={sol.cta.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline sm:mt-5">
                    {sol.cta.label}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
