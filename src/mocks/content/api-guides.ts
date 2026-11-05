import type { ApiGuide } from "@/types/content";
import { esimGuide } from "./esim-guide";
import { flightsGuide } from "./flights-guide";
import { hotelsGuide } from "./hotels-guide";
import { transfersGuide } from "./transfers-guide";

/** Full written guides, by product slug. */
const apiGuides: Record<string, ApiGuide> = {
  "air-travel-api": flightsGuide,
  "hotel-api": hotelsGuide,
  "esim-api": esimGuide,
  "airport-transfer-api": transfersGuide,
};

export function getApiGuide(slug: string): ApiGuide | undefined {
  return apiGuides[slug];
}
