import type { SiteSettings } from "@/types/pages";

/** Site identity and contact details. URLs (site, gateway) stay in `@/config/env`. */
export const siteSettings: SiteSettings = {
  name: "FlightOTA",
  legalName: "FlightOTA Technologies Ltd.",
  tagline: "One API. Endless Travel Possibilities.",
  description:
    "FlightOTA is a unified travel API platform. Search, price and book flights, hotels, eSIMs, visas, transfers and more through one consistent, developer-friendly API.",
  keywords: ["travel API", "flight API", "hotel API", "eSIM API", "visa API", "transfer API", "NDC", "GDS", "OTA"],
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
