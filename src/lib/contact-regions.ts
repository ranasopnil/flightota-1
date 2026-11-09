import type { ContactRegion, ContactRegions, WhatsAppSettings } from "@/types/pages";

/**
 * Which office a visitor sees. Pure helpers shared by the server components,
 * the structured data and the /api/geo route; the country itself comes from
 * nginx (see services/server/visitor-region.ts).
 */

/** ISO 3166-1 alpha-2 code in upper case, or null for anything else. */
export const normalizeCountry = (code: unknown): string | null =>
  typeof code === "string" && /^[A-Za-z]{2}$/.test(code.trim()) ? code.trim().toUpperCase() : null;

/** The office shown when the visitor's country matches none (or is unknown). */
export function fallbackRegion(contact: ContactRegions): ContactRegion {
  return contact.regions.find((r) => r.key === contact.fallback) ?? contact.regions[0];
}

/** The first office listing the visitor's country, else the fallback office. */
export function pickRegion(contact: ContactRegions, country: string | null): ContactRegion {
  if (country) {
    const match = contact.regions.find((r) => r.countries.some((c) => c.trim().toUpperCase() === country));
    if (match) return match;
  }
  return fallbackRegion(contact);
}

/** Digits only, as wa.me expects. */
export const whatsappDigits = (value: string | undefined) => (value ?? "").replace(/\D/g, "");

/** Chat link for the visitor's office, or null when the button is off or no number is set. */
export function whatsappHref(settings: WhatsAppSettings, region: ContactRegion): string | null {
  const number = whatsappDigits(region.whatsapp) || whatsappDigits(settings.number);
  if (!settings.enabled || !number) return null;
  const text = settings.message.trim();
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
