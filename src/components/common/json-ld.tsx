import { siteConfig } from "@/config/site";
import { breadcrumbLd, type Crumb, type JsonLdObject } from "@/lib/structured-data";

/** Renders JSON-LD scripts. `<` is escaped so no content can close the tag early. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}

/** BreadcrumbList for a page; "Home" is added in front of the crumbs given. */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  return <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...crumbs], siteConfig.url)} />;
}
