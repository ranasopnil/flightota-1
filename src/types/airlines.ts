export interface AirlineItem {
  /** Same as `id`; every CMS collection entry has a slug. */
  slug: string;
  id: string;
  name: string;
  iata: string;
  icao: string;
  country: string;
  hub: string;
  category: "ndc" | "lcc";
  badgeText: string;
}
