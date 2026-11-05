import type { NextRequest } from "next/server";
import { z } from "zod";
import { filterProducts, toSummary } from "@/features/marketplace/lib/catalog";
import { products } from "@/mocks/catalog";
import { ok, validationError } from "@/mocks/http";

const querySchema = z.object({
  q: z.string().max(100).optional(),
  category: z.enum(["all", "air", "hotel", "esim", "visa", "transfer", "car-rental", "activities"]).optional(),
  status: z.enum(["all", "operational", "degraded", "beta", "coming_soon"]).optional(),
  price: z.enum(["all", "under-2", "2-3", "over-3"]).optional(),
  sandboxOnly: z.stringbool().optional(),
  sort: z.enum(["popular", "name", "price-asc", "price-desc"]).optional(),
});

/** Mock: GET /api/v1/catalog/products?q=&category=&status=&price=&sandboxOnly=&sort= */
export function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return validationError(parsed.error);
  const result = filterProducts(products.map(toSummary), parsed.data);
  return ok(result, { meta: { total: result.length } });
}
