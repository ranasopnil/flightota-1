import type { ApiGuideEntry } from "@/types/content";
import { esimGuide } from "./esim";
import { flightsGuide } from "./flights";
import { hotelsGuide } from "./hotels";
import { transfersGuide } from "./transfers";

/** Partner API guides, keyed by the product slug they document. */
export const apiGuides: ApiGuideEntry[] = [
  { slug: "air-travel-api", ...flightsGuide },
  { slug: "hotel-api", ...hotelsGuide },
  { slug: "esim-api", ...esimGuide },
  { slug: "airport-transfer-api", ...transfersGuide },
];

export function getApiGuideEntry(slug: string): ApiGuideEntry | undefined {
  return apiGuides.find((g) => g.slug === slug);
}
