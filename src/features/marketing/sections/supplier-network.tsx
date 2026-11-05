import { Headset, Layers, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Eyebrow } from "@/components/common/section";

interface SupplierTier {
  category: string;
  count: string;
  description: string;
  partners: { name: string; tag: string }[];
  image: string;
  alt: string;
}

const supplierTiers: SupplierTier[] = [
  {
    category: "Global Distribution Systems (GDS)",
    image: "/images/solutions/gds_integration.jpg",
    alt: "An airliner parked at an airport gate at sunset",
    count: "3 Major GDS + NDC Level 4",
    description: "Full low-fare search, automated ticketing, seat map assignment, and PNR servicing.",
    partners: [
      { name: "Amadeus GDS", tag: "MasterPricer & NDC" },
      { name: "Sabre GDS", tag: "Bargain Finder Max" },
      { name: "Travelport", tag: "Galileo & Universal API" },
      { name: "IATA NDC", tag: "Level 4 Direct Connect" },
    ],
  },
  {
    category: "Airlines & Low-Cost Carriers (LCC)",
    image: "/images/solutions/itinerary_builder.jpg",
    alt: "A passenger jet climbing after take-off",
    count: "700+ Global & Regional Airlines",
    description: "Domestic and international routes with instant split-ticketing and baggage ancillary upsells.",
    partners: [
      { name: "Biman Bangladesh", tag: "Direct NDC / API" },
      { name: "US-Bangla Airlines", tag: "Direct Reservation" },
      { name: "Emirates & Qatar", tag: "NDC Rich Content" },
      { name: "AirAsia & IndiGo", tag: "LCC Direct Connect" },
    ],
  },
  {
    category: "Global Hotel Bed Banks",
    image: "/images/categories/hotel.jpg",
    alt: "A modern hotel suite with glass walls",
    count: "1,200,000+ Verified Properties",
    description: "Real-time room availability, static cache feeds, non-refundable & refundable rate plans.",
    partners: [
      { name: "Hotelbeds", tag: "Wholesale Bed Bank" },
      { name: "WebBeds", tag: "Global Inventory" },
      { name: "Expedia EPS", tag: "Rapid API Direct" },
      { name: "Direct CRS Hotels", tag: "Proprietary Contracts" },
    ],
  },
  {
    category: "Ground Transport & Sightseeing",
    image: "/images/categories/transfer.jpg",
    alt: "A dark electric car driving on a road",
    count: "50,000+ Routes & 100K+ Tours",
    description: "Airport private transfers, rental cars, and verified skip-the-line activities.",
    partners: [
      { name: "Viator / TripAdvisor", tag: "Curated Tours" },
      { name: "GetYourGuide", tag: "Attraction Tickets" },
      { name: "Hertz & Avis", tag: "Fleet Car Rentals" },
      { name: "Local Transfers", tag: "Intercity Vehicles" },
    ],
  },
];

const facts = [
  { title: "Every source at once", text: "Flight search shops every airline source at once; hotel search asks every hotel source at once.", icon: Search },
  { title: "Fare families and extras", text: "Every fare family as its own offer, with the seats, bags and meals on sale.", icon: Layers },
  { title: "A desk behind the API", text: "Where the airline does not answer by itself, our desk handles it and quotes by hand.", icon: Headset },
];

export function SupplierNetwork() {
  return (
    <section id="supplier-network" className="bg-navy-950 py-7 text-white sm:py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <Eyebrow tone="dark">Global Supplier & GDS Ecosystem</Eyebrow>
            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance text-white sm:mt-3 sm:text-4xl">
              One Unified Gateway to 150+ Global Travel Wholesalers
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-200 sm:mt-4 sm:text-lg">
              Connect to GDS giants, NDC direct airline feeds, bed banks, and tour aggregators through one REST API,
              with the same keys and conventions.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:gap-3">
              <Button asChild className="rounded-lg bg-primary text-white hover:bg-primary/90">
                <Link href="/apis">Browse All 7 APIs</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-lg border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Link href="/airlines">View Airlines</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-xl bg-navy-900">
            <Image src="/images/platforms/gateway.jpg" alt="City lights across the Earth seen from space at night" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 border-y border-white/10 py-5 sm:mt-10 sm:py-6 md:grid-cols-3 md:gap-8">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <li key={fact.title} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-white" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold text-white sm:text-base">{fact.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-navy-300 sm:text-sm">{fact.text}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="app-rail mt-5 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {supplierTiers.map((tier) => (
            <article key={tier.category} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-900/50 transition-colors hover:border-white/25">
              <div className="relative aspect-[16/10] bg-navy-900">
                <Image src={tier.image} alt={tier.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 300px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-semibold text-rose-300">{tier.count}</p>
                <h3 className="mt-1 font-heading text-base font-semibold text-white">{tier.category}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-300">{tier.description}</p>
                <ul className="mt-3 flex flex-col gap-1.5 border-t border-white/10 pt-3 text-xs">
                  {tier.partners.map((partner) => (
                    <li key={partner.name} className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-white">{partner.name}</span>
                      <span className="text-right text-[11px] text-navy-400">{partner.tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
