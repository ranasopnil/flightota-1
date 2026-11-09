import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { normalizeCountry, pickRegion } from "@/lib/contact-regions";
import { getSingleton } from "@/services/server/cms-repository";
import { COUNTRY_HEADER, COUNTRY_OVERRIDE_COOKIE } from "@/services/server/visitor-region";

/**
 * GET /api/geo                 which country nginx detected and which office this visitor sees
 * GET /api/geo?set=AE&to=/     preview another office for an hour (cookie), then go to `to`
 * GET /api/geo?set=            drop the preview
 *
 * The preview only changes the displayed phone, address and WhatsApp number.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (params.has("set")) {
    const country = normalizeCountry(params.get("set"));
    const target = new URL(params.get("to") ?? "/", siteConfig.url);
    const response = NextResponse.redirect(target.origin === new URL(siteConfig.url).origin ? target : siteConfig.url);
    if (country) response.cookies.set(COUNTRY_OVERRIDE_COOKIE, country, { path: "/", maxAge: 60 * 60, sameSite: "lax" });
    else response.cookies.delete(COUNTRY_OVERRIDE_COOKIE);
    return response;
  }
  const detected = normalizeCountry(request.headers.get(COUNTRY_HEADER));
  const override = normalizeCountry(request.cookies.get(COUNTRY_OVERRIDE_COOKIE)?.value);
  const settings = await getSingleton("site-settings");
  const region = pickRegion(settings.contactRegions, override ?? detected);
  return NextResponse.json(
    { data: { detected, override, region: region.key, label: region.label } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
