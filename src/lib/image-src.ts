import { siteConfig } from "@/config/site";

/**
 * Images uploaded through the admin panel live under /uploads, served by the
 * web server rather than by Next. `next/image` fetches them by absolute URL,
 * which `next.config.ts` allows for the site host. Bundled images pass through.
 */
export function imageSrc(path: string): string {
  if (path.startsWith("/uploads/")) return `${siteConfig.url}${path}`;
  return path;
}
