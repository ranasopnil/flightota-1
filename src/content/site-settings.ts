import type { SiteSettings } from "@/types/pages";

/** Site identity and contact details. URLs (site, gateway) stay in `@/config/env`. */
export const siteSettings: SiteSettings = {
  name: "FlightOTA",
  legalName: "FlightOTA Technologies Ltd.",
  tagline: "Travel Portal Development & Unified Travel API Aggregation",
  description:
    "FlightOTA is an all-in-one travel technology solutions provider offering B2B and B2C online travel portal development, white-label booking engines, GDS API integration, NDC airline connectivity, LCC API integration, and unified travel API aggregation for OTAs, travel agencies, consolidators, and travel technology companies.",
  keywords: [
    "travel technology solutions",
    "travel portal development",
    "B2B travel portal development",
    "online travel agency software",
    "travel API aggregator",
    "GDS API integration",
    "NDC API integration",
    "LCC API integration",
    "white label travel portal",
    "flight booking engine",
    "hotel booking API",
  ],
  supportEmail: "support@flightota.com",
  salesEmail: "sales@flightota.com",
  phone: "+880 1700-000000",
  phoneHref: "tel:+8801700000000",
  address: "Dhaka, Bangladesh",
  footerAddress: "Gulshan-2, Dhaka 1212 • Singapore Hub",
  copyrightYear: 2026,
  social: {
    github: "https://github.com",
    x: "https://x.com",
    linkedin: "https://www.linkedin.com",
  },
  defaultCta: {
    badge: "Instant Sandbox Provisioning",
    title: "Start building with free sandbox access",
    description: "Create an account, generate a test key and make your first request in minutes. No credit card required.",
    image: "/images/categories/flight.jpg",
    primary: { label: "Get Sandbox Key", href: "/register", icon: "Key" },
    secondary: { label: "Talk to Solutions Team", href: "/contact?topic=sales" },
  },
};
