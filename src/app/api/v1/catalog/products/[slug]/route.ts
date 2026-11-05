import { products } from "@/mocks/catalog";
import { apiError, ok } from "@/mocks/http";

/** Mock: GET /api/v1/catalog/products/:slug */
export async function GET(_request: Request, ctx: RouteContext<"/api/v1/catalog/products/[slug]">) {
  const { slug } = await ctx.params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return apiError(404, "not_found", `No API product with slug "${slug}".`);
  return ok(product);
}
