import { siteConfig } from "@/config/site";
import { buildOpenApiDocument } from "@/lib/openapi";
import { getProduct, listProducts } from "@/services/server/catalog-repository";

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

/** GET /documentation/:slug/openapi.json — OpenAPI 3.1 spec generated from the catalog. */
export async function GET(_request: Request, ctx: RouteContext<"/documentation/[slug]/openapi.json">) {
  const { slug } = await ctx.params;
  const product = await getProduct(slug);
  if (!product) return Response.json({ error: { code: "not_found", message: "Unknown API" } }, { status: 404 });
  const doc = buildOpenApiDocument(product, { production: siteConfig.gatewayUrl, sandbox: siteConfig.sandboxUrl });
  return Response.json(doc, {
    headers: { "Content-Disposition": `inline; filename="${slug}.openapi.json"` },
  });
}
