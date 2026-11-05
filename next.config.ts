import type { NextConfig } from "next";

const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://flightota.com").hostname;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    qualities: [90],
    formats: ["image/avif", "image/webp"],
    // Admin uploads are served by the web server under /uploads; next/image fetches them by absolute URL.
    remotePatterns: [{ protocol: "https", hostname: siteHost, pathname: "/uploads/**" }],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
