import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const portalPackages = [
  {
    id: "b2b-package",
    title: "B2B Sub-Agent Portal",
    tagline: "For Wholesalers, Consolidators & Travel Agencies",
    price: "$399",
    period: "/ month",
    badge: "Most Popular for Agents",
    badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    image: "/images/solutions/b2b_portal.jpg",
    features: [
      "Unlimited sub-agent accounts with tiered markups",
      "Real-time B2B deposit wallet & credit limit system",
      "Instant PNR issuance with custom agent vouchers",
      "Multi-currency ledger & automated commission tracking",
      "Pre-integrated 700+ Airlines & 1.2M+ Hotels",
    ],
    cta: { label: "Get B2B Portal Demo", href: "/contact?topic=sales" },
  },
  {
    id: "b2c-package",
    title: "B2C Booking Engine",
    tagline: "For New OTAs & Consumer Travel Startups",
    price: "$499",
    period: "/ month",
    badge: "High Conversion",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    image: "/images/solutions/b2c_booking.jpg",
    features: [
      "Responsive flight, hotel & package booking engine",
      "Integrated payment gateways (SSLCommerz, bKash, Cards)",
      "Automated e-ticketing & WhatsApp / SMS confirmations",
      "Live fare calendar & interactive seat map selection",
      "Customer self-service portal for date changes & refunds",
    ],
    cta: { label: "Launch B2C Portal", href: "/contact?topic=sales" },
  },
  {
    id: "csbt-package",
    title: "Corporate Self-Booking Tool",
    tagline: "For TMCs & Enterprise Business Travel",
    price: "$599",
    period: "/ month",
    badge: "Policy Compliance",
    badgeClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    image: "/images/solutions/corporate_booking.jpg",
    features: [
      "Automated travel policy validation & grade cabin caps",
      "Multi-level L1 / L2 manager approval email & SMS workflows",
      "Department cost centers & centralized ghost credit cards",
      "Duty of care traveler tracking & CO2 carbon reporting",
      "Dedicated corporate negotiated airline net fares",
    ],
    cta: { label: "Demo CSBT Engine", href: "/contact?topic=sales" },
  },
  {
    id: "white-label-package",
    title: "Enterprise White-Label ERP",
    tagline: "For Consolidators, DMCs & Corporate Travel",
    price: "Custom",
    period: "Enterprise SLA",
    badge: "Full Extranet & CRS",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    image: "/images/solutions/travel_erp.jpg",
    features: [
      "Central Reservation System (CRS) for direct contracts",
      "Dynamic Packaging Engine (Flight + Hotel combo)",
      "Supplier extranet for hotel rate loading & allotments",
      "PNR queue management & ticketing time-limit automation",
      "Dedicated account manager & 99.99% uptime SLA",
    ],
    cta: { label: "Talk to Solutions Architect", href: "/contact?topic=enterprise" },
  },
];

export function TravelPortalSolutionsPricing() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Platform Licensing</span>
        <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Ready-to-Deploy B2B Portals, B2C Engines & Travel ERP
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          In addition to developer APIs, we provide complete software solutions inspired by global travel technology standards. Launch under your own brand without building from scratch.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {portalPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col justify-between overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:border-primary/50 "
          >
            {/* Image Header */}
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className={cn("font-semibold text-xs border", pkg.badgeClass)}>
                  {pkg.badge}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs text-white/80 font-medium">{pkg.tagline}</div>
                <h3 className="font-heading text-lg font-bold">{pkg.title}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-baseline gap-1.5 pb-4 border-b">
                  <span className="font-heading text-3xl font-extrabold text-foreground">{pkg.price}</span>
                  <span className="text-xs text-muted-foreground">{pkg.period}</span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85">
                      <Check className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button asChild className="w-full rounded-lg gap-1.5" variant={pkg.id === "b2b-package" ? "default" : "outline"}>
                  <Link href={pkg.cta.href}>
                    <span>{pkg.cta.label}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
