import { siteConfig } from "@/config/site";
import { organizationLd, webSiteLd } from "@/lib/structured-data";
import { getSingleton } from "@/services/server/cms-repository";
import { JsonLd } from "./json-ld";

/** Organization and WebSite JSON-LD, rendered once on every public page by the marketing layout. */
export async function SiteStructuredData() {
  const settings = await getSingleton("site-settings");
  return <JsonLd data={[organizationLd(settings, siteConfig.url), webSiteLd(settings, siteConfig.url)]} />;
}
