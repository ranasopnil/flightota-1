import type { ApiProduct } from "@/types/catalog";
import { airTravelApi } from "./air";
import { esimApi } from "./esim";
import { activitiesApi, carRentalApi } from "./ground";
import { hotelApi } from "./hotel";
import { transferApi } from "./transfer";
import { visaApi } from "./visa";

export { categories } from "./categories";

/**
 * Mock catalog used during UI development and as the dataset of the
 * built-in mock API (/api/v1). Replace with the NestJS catalog service.
 */
export const products: ApiProduct[] = [airTravelApi, hotelApi, esimApi, visaApi, transferApi, carRentalApi, activitiesApi];
