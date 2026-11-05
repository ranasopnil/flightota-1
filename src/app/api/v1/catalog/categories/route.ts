import { categories } from "@/mocks/catalog";
import { ok } from "@/mocks/http";

/** Mock: GET /api/v1/catalog/categories */
export function GET() {
  return ok(categories);
}
