import { revalidateTag } from "next/cache";

/**
 * POST /api/revalidate — called by the admin panel after catalog edits so the
 * cached catalog ("use cache" + cacheTag) is dropped immediately.
 *
 * Header: x-revalidate-secret (must equal REVALIDATE_SECRET)
 * Body:   { tags?: string[] }  defaults to ["catalog"]
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: { code: "unauthorized", message: "Invalid revalidation secret." } }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { tags?: unknown };
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === "string" && t.length > 0 && t.length <= 256)
    : ["catalog"];
  // "max" = stale-while-revalidate: visitors get the cached page while Next rebuilds it in the background.
  for (const tag of tags) revalidateTag(tag, "max");
  return Response.json({ data: { revalidated: tags, at: new Date().toISOString() } });
}
