import type { SiteSettings } from "@/types/pages";

/**
 * Site identity and contact details. URLs (site, gateway) stay in `@/config/env`.
 * The Dubai and USA phone numbers and the street addresses are placeholders:
 * replace them in the admin panel (Site settings → Regional contact details).
 */
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
  address: "Dhaka, Bangladesh",
  contactRegions: {
    fallback: "us",
    regions: [
      {
        key: "bd",
        label: "Dhaka office",
        countries: ["BD"],
        phone: "+880 1332-564506",
        phoneHref: "tel:+8801332564506",
        addressLines: ["Gulshan-2, Dhaka 1212", "Bangladesh"],
        whatsapp: "8801332564506",
      },
      {
        key: "me",
        label: "Dubai office",
        countries: ["AE", "SA", "QA", "KW", "OM", "BH", "JO", "IQ", "LB", "SY", "YE", "PS", "EG", "IR", "TR", "IL"],
        phone: "+971 4 000 0000",
        phoneHref: "tel:+97140000000",
        addressLines: ["Dubai", "United Arab Emirates"],
      },
      {
        key: "us",
        label: "USA office",
        countries: [],
        phone: "+1 (000) 000-0000",
        phoneHref: "tel:+10000000000",
        addressLines: ["United States"],
      },
    ],
  },
  whatsapp: {
    enabled: true,
    number: "8801332564506",
    label: "Chat on WhatsApp",
    message: "Hello FlightOTA, I would like to know more about your travel technology solutions.",
  },
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
