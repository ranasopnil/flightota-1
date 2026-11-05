import { ArrowRight, Briefcase, CalendarCheck2, Check, Hotel, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Eyebrow } from "@/components/common/section";

const corporateModules = [
  {
    id: "csbt",
    tag: "TMC & Corporate Travel",
    title: "Corporate Self-Booking Tool (CSBT)",
    subtitle: "Automated Travel Policy & Manager Approvals",
    description:
      "Empower enterprise employees to book compliant business trips while enforcing company travel guidelines. Includes automated manager approval routing, project billing codes, and centralized monthly credit billing.",
    image: "/images/solutions/corporate_booking.jpg",
    alt: "Corporate Self-Booking Tool and business travel management",
    icon: Briefcase,
    highlights: [
      "Custom policy validation (cabin restrictions by employee tier)",
      "Multi-level L1 / L2 manager approval chains via email & SMS",
      "Cost-center allocation, department codes & GST / VAT invoicing",
      "Corporate negotiated net airline rates & preferred hotel perks",
      "Real-time duty of care tracking and CO2 carbon offset analytics",
    ],
    cta: { label: "Explore Corporate Solution", href: "/contact?topic=enterprise" },
  },
  {
    id: "itinerary-builder",
    tag: "Tour Operators & DMCs",
    title: "Smart Travel Itinerary Builder & Proposal App",
    subtitle: "Day-by-Day Bespoke Vacation Planning",
    description:
      "Transform raw travel components into elegant, professional day-by-day itineraries within minutes. Generate customized branded PDF proposals with high-resolution photos, route maps, and instant online payment links.",
    image: "/images/solutions/itinerary_builder.jpg",
    alt: "Travel Itinerary Builder and proposal software",
    icon: CalendarCheck2,
    highlights: [
      "Intuitive drag-and-drop day-by-day activity and route planning",
      "Pre-loaded database of 50K+ verified attractions & sightseeing tours",
      "Instant white-label PDF proposal export with custom agency branding",
      "Live interactive mobile web link for clients with accept & pay button",
      "Dynamic cost-sheet calculator with automated agency commission",
    ],
    cta: { label: "Try Itinerary Engine", href: "/apis/travel-activities-api" },
  },
  {
    id: "hotel-extranet",
    tag: "Hoteliers & Local Suppliers",
    title: "Hotel Extranet & Direct Contracting Hub (CRS)",
    subtitle: "Central Reservation System for Proprietary Inventory",
    description:
      "Enable independent hotels, resort chains, and local DMCs to log into a dedicated supplier extranet. Manage direct room allocations, load seasonal rate plans, set cancellation rules, and monitor booking payouts.",
    image: "/images/solutions/hotel_extranet.jpg",
    alt: "Hotel Extranet and central reservation system inventory",
    icon: Hotel,
    highlights: [
      "Dedicated supplier extranet portal with encrypted multi-user login",
      "Dynamic room allocation calendar with real-time stop-sell controls",
      "Seasonal rate matrices, meal supplement plans & weekend surcharges",
      "Direct hotel voucher generation with instant automated check-in codes",
      "Automated fortnightly supplier payout statements & tax ledgers",
    ],
    cta: { label: "View CRS Extranet", href: "/apis/hotel-api" },
  },
];

export function CorporateAndMidOffice() {
  return (
    <section id="corporate-mid-office" className="relative py-16 sm:py-24 bg-card/60 border-t">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Eyebrow>Enterprise Business Automation</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Corporate Travel Tools, Itinerary Builders & Supplier Extranets
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Travelopro-scale travel technology goes beyond simple search APIs. We deliver the mid-office software,
            policy approval engines, and bespoke tour planning tools that corporate TMCs and high-volume tour operators rely on daily.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="app-rail mt-4 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {corporateModules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:border-primary/50 "
              >
                {/* Visual Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                  <Image
                    src={module.image}
                    alt={module.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Top Badge & Metric */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <Badge className="bg-primary/90 text-white font-semibold text-xs ">
                      {module.tag}
                    </Badge> 
                  </div>

                  {/* Overlay Bottom Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <Icon className="size-3.5 text-primary" />
                      <span>{module.subtitle}</span>
                    </div>
                    <h3 className="mt-1 font-heading text-lg font-bold text-white leading-snug">
                      {module.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>

                    {/* Feature highlights */}
                    <div className="mt-5 border-t pt-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5 mb-2.5">
                        <Sparkles className="size-3 text-primary" />
                        Key Capabilities
                      </div>
                      <ul className="space-y-2">
                        {module.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-foreground/85">
                            <Check className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-6 pt-4 border-t flex items-center justify-between">
                    <Button asChild variant="outline" size="sm" className="w-full rounded-lg gap-1.5 group/btn">
                      <Link href={module.cta.href}>
                        <span>{module.cta.label}</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
