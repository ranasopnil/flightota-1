import { env } from "./env";

/**
 * Environment-derived site addresses. Editable identity and contact details
 * live in the CMS (`site-settings`), read through `@/services/server/cms-repository`.
 */
export const siteConfig = {
  /** Brand wordmark used by the logo and as the share fallback before CMS data loads. */
  name: "FlightOTA",
  url: env.siteUrl,
  gatewayUrl: env.gatewayUrl,
  sandboxUrl: env.gatewayUrl.replace("://api.", "://sandbox."),
} as const;

export type SiteConfig = typeof siteConfig;
