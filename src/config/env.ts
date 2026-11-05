/**
 * Typed access to environment variables.
 * NEXT_PUBLIC_* values are inlined at build time and safe for the client.
 */
const vercelProductionHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const env = {
  /** Crawlers can't load share images from localhost, so a Vercel deployment falls back to its production domain. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000"),
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1",
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL ?? "https://api.flightota.com",
} as const;

/** Server-only: when set, Server Components fetch catalog data from this URL instead of the bundled mock. */
export const serverEnv = {
  apiInternalUrl: process.env.API_INTERNAL_URL || "",
} as const;
