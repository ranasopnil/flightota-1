import { revalidateTag } from "next/cache";

/**
 * POST /api/revalidate — called by the admin panel after an edit so cached
 * data ("use cache" + cacheTag) is refreshed.
 *
 * Header: x-revalidate-secret (must equal REVALIDATE_SECRET)
 * Body:   { tags?: string[] }  defaults to ["catalog"]
 *
 * Tag contract: "catalog" and "product:<slug>" for the API catalog;
 * "cms", "cms:<type>" and "cms:<type>:<slug>" for editable content.
 * Uses the "max" profile (stale-while-revalidate): visitors keep getting the
 * cached page while Next rebuilds it in the background.
 */
const ALLOWED_TAG = /^(catalog|product:[\w-]+|cms|cms:[\w-]+(:[\w-]+)?)$/;

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: { code: "unauthorized", message: "Invalid revalidation secret." } }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { tags?: unknown };
  const requested = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string") : ["catalog"];
  const tags = requested.filter((t) => t.length <= 256 && ALLOWED_TAG.test(t));
  const rejected = requested.filter((t) => !tags.includes(t));
  for (const tag of tags) revalidateTag(tag, "max");
  return Response.json({ data: { revalidated: tags, rejected, at: new Date().toISOString() } });
}
