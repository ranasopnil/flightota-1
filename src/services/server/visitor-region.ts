import "server-only";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { siteSettings as bundledSettings } from "@/content/site-settings";
import { normalizeCountry, pickRegion } from "@/lib/contact-regions";
import { getSingleton } from "@/services/server/cms-repository";
import type { ContactRegion } from "@/types/pages";

/**
 * The visitor's country and the office whose phone, address and WhatsApp
 * number they should see. nginx looks the country up from the client address
 * (GeoIP, /etc/nginx/conf.d/geoip.conf) and passes it as X-Country-Code; the
 * header is absent when the country is unknown and in local development.
 *
 * Both functions read request headers, so a component calling them is dynamic:
 * render it inside its own <Suspense> so the rest of the page stays in the
 * static shell.
 */

/** Set by /api/geo?set=XX to preview another office; wins over the detected country. */
export const COUNTRY_OVERRIDE_COOKIE = "fo_country";
export const COUNTRY_HEADER = "x-country-code";

export const getVisitorCountry = cache(async (): Promise<string | null> => {
  const [requestHeaders, cookieStore] = await Promise.all([headers(), cookies()]);
  return normalizeCountry(cookieStore.get(COUNTRY_OVERRIDE_COOKIE)?.value) ?? normalizeCountry(requestHeaders.get(COUNTRY_HEADER));
});

export const getVisitorRegion = cache(async (): Promise<ContactRegion> => {
  const [settings, country] = await Promise.all([getSingleton("site-settings"), getVisitorCountry()]);
  // A backend that has not been reseeded with the office list yet falls back to the bundled offices.
  const contact = settings.contactRegions?.regions?.length ? settings.contactRegions : bundledSettings.contactRegions;
  return pickRegion(contact, country);
});
