import { env } from "./env";

export const siteConfig = {
  name: "FlightOTA",
  legalName: "FlightOTA Technologies Ltd.",
  tagline: "One API. Endless Travel Possibilities.",
  description:
    "FlightOTA is a unified travel API platform. Search, price and book flights, hotels, eSIMs, visas, transfers and more through one consistent, developer-friendly API.",
  url: env.siteUrl,
  gatewayUrl: env.gatewayUrl,
  sandboxUrl: env.gatewayUrl.replace("://api.", "://sandbox."),
  supportEmail: "support@flightota.com",
  salesEmail: "sales@flightota.com",
  /** Placeholder — replace with the registered office address. */
  address: "Dhaka, Bangladesh",
  copyrightYear: 2026,
  social: {
    github: "https://github.com",
    x: "https://x.com",
    linkedin: "https://www.linkedin.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
