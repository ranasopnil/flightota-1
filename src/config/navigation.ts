export interface NavLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export const companyNav: NavLink[] = [
  { label: "About us", href: "/about", description: "Our mission, edge network and leadership" },
  { label: "Blog", href: "/blog", description: "Product releases and engineering notes" },
  { label: "Contact us", href: "/contact", description: "Talk to sales, support or partnerships" },
];

export const developerNav: NavLink[] = [
  { label: "Documentation", href: "/documentation", description: "OpenAPI specs and endpoint reference" },
  { label: "Integration guides", href: "/guides", description: "Step-by-step implementation walkthroughs" },
  { label: "Airlines Directory", href: "/airlines", description: "200+ NDC and LCC carriers" },
  { label: "Compare APIs", href: "/apis/compare", description: "Side-by-side telemetry and latency" },
];

export const footerNav: { title: string; items: NavLink[] }[] = [
  {
    title: "Solutions",
    items: [
      { label: "B2B Travel Development Portal", href: "/solutions/b2b-travel-development-portal" },
      { label: "B2C Travel Development Portal", href: "/solutions/b2c-travel-development-portal" },
      { label: "B2B Travel Agent Portal", href: "/solutions/b2b-travel-portal", badge: "Hot" },
      { label: "Consumer Booking Engine", href: "/solutions/b2c-booking-engine" },
      { label: "Corporate CSBT Tool", href: "/solutions/corporate-booking-tool" },
      { label: "Dynamic Packaging Engine", href: "/solutions/dynamic-packaging-engine" },
      { label: "Hotel Extranet & CRS", href: "/solutions/hotel-extranet-crs" },
      { label: "Travel ERP & Back-Office", href: "/solutions/travel-erp-backoffice" },
      { label: "All Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Travel APIs",
    items: [
      { label: "Flight API (NDC & GDS)", href: "/apis/air-travel-api", badge: "<85ms" },
      { label: "Hotel & Stays API", href: "/apis/hotel-api" },
      { label: "Airport Transfers API", href: "/apis/transfer-api" },
      { label: "Car Rental Fleet API", href: "/apis/car-rental-api" },
      { label: "Activities & Tours API", href: "/apis/activities-tours-api" },
      { label: "Global eSIM Roaming API", href: "/apis/esim-api" },
      { label: "Consular Visa API", href: "/apis/visa-assistance-api" },
      { label: "API Marketplace (All 7)", href: "/apis" },
    ],
  },
  {
    title: "Integrations & GDS",
    items: [
      { label: "Amadeus MasterPricer", href: "/airlines" },
      { label: "Sabre Bargain Finder Max", href: "/airlines" },
      { label: "Travelport Galileo & Universal", href: "/airlines" },
      { label: "IATA NDC v21.3 Direct", href: "/airlines" },
      { label: "Airlines Directory (200+)", href: "/airlines", badge: "Live" },
      { label: "Hotelbeds & Bed Banks", href: "/apis/hotel-api" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "API Documentation", href: "/documentation" },
      { label: "Integration Guides", href: "/guides" },
      { label: "Compare Telemetry", href: "/apis/compare" },
      { label: "Platform Pricing", href: "/pricing" },
      { label: "Platform Licenses", href: "/pricing#portal-solutions" },
      { label: "Interactive Sandbox", href: "/apis" },
    ],
  },
  {
    title: "Company & Trust",
    items: [
      { label: "About FlightOTA", href: "/about" },
      { label: "Engineering Blog", href: "/blog" },
      { label: "Contact Sales", href: "/contact?topic=sales" },
      { label: "24/7 Operations Support", href: "/contact?topic=support" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
