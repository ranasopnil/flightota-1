import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * What a page shows when its link is shared: the Open Graph / Twitter tags, the
 * share dialog preview and the iframe embed all read from here.
 * Images live in /public/images/og at 1200×630 and stay small enough for
 * WhatsApp and similar apps to load them in a link preview.
 */
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

const og = (name: string) => `/images/og/${name}.jpg`;

export const DEFAULT_SHARE_IMAGE = og("hero_flight");

export interface SharePage {
  title: string;
  description: string;
  image: string;
}

/** Pages with a fixed URL. */
export const sharePages = {
  "/about": {
    title: "About Us — The Modern Travel API Platform",
    description: `${siteConfig.name} builds high-performance, developer-first travel API infrastructure connecting flights, hotels, eSIM, visas, and ground transport through one unified gateway.`,
    image: og("about_architecture"),
  },
  "/airlines": {
    title: "Airlines Directory — NDC & LCC Direct Connect",
    description: `Explore all supported IATA NDC and LCC (Low-Cost Carrier) airlines integrated into ${siteConfig.name}. Access rich content, unbundled fares, and zero GDS distribution surcharges.`,
    image: og("airlines_tarmac"),
  },
  "/apis": {
    title: "API Marketplace",
    description:
      "Browse and compare travel APIs for flights, hotels, eSIM, visa, airport transfers, car rental and activities. Filter by category, price, status and sandbox availability.",
    image: og("hero_flight"),
  },
  "/apis/compare": {
    title: "Compare APIs",
    description: "Compare travel APIs side by side: pricing, rate limits, sandbox and production availability, latency and features.",
    image: og("compare_telemetry"),
  },
  "/blog": {
    title: "Blog",
    description: "Product updates, engineering deep-dives and insights from the travel API industry.",
    image: og("airlines_tarmac"),
  },
  "/contact": {
    title: "Contact Us",
    description: "Talk to our sales, support or partnerships team about travel API integrations, pricing and supplier connections.",
    image: og("contact_concierge"),
  },
  "/documentation": {
    title: "Documentation",
    description: "Get started with the Partner API: keys, base URLs, conventions, errors, retries and code examples.",
    image: og("guides_planning"),
  },
  "/guides": {
    title: "Integration Guides",
    description: "Step-by-step guides for integrating flight, hotel, eSIM, visa and transfer APIs, from first request to production.",
    image: og("guides_planning"),
  },
  "/pricing": {
    title: "Pricing",
    description:
      "Simple, usage-based pricing for travel APIs. Free sandbox, pay as you go, monthly and annual plans with included requests, and custom enterprise pricing.",
    image: og("pricing_lounge"),
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "How we collect, use and protect personal data.",
    image: og("about_architecture"),
  },
  "/solutions": {
    title: "Travel Technology Solutions — B2B, B2C, CSBT & ERP Platforms",
    description:
      "Explore enterprise travel portal software, sub-agent distribution networks, consumer booking engines, corporate self-booking tools, and central reservation systems.",
    image: og("b2b_portal"),
  },
  "/terms": {
    title: "Terms & Conditions",
    description: "The terms that govern your use of the platform, developer portal and APIs.",
    image: og("about_architecture"),
  },
  "/login": {
    title: "Sign in",
    description: `Sign in to your ${siteConfig.name} developer portal to manage API keys, sandbox quotas, and travel integrations.`,
    image: og("get-started"),
  },
  "/register": {
    title: "Create Developer Account",
    description: `Sign up for a free developer account on ${siteConfig.name} to get sandbox API keys for flights, hotels, eSIM, and visa services.`,
    image: og("get-started"),
  },
  "/signup": {
    title: "Sign up",
    description: `Sign up for a free developer account on ${siteConfig.name} to get sandbox API keys for flights, hotels, eSIM, and visa services.`,
    image: og("get-started"),
  },
} as const satisfies Record<string, SharePage>;

export type SharePagePath = keyof typeof sharePages;

/** Detail pages, keyed by the last URL segment. An API uses the same image on /apis and /documentation. */
const detailImages: Record<string, string> = {
  // APIs
  "air-travel-api": og("hero_flight"),
  "hotel-api": og("hero_hotel"),
  "esim-api": og("hero_esim"),
  "visa-api": og("hero_visa"),
  "airport-transfer-api": og("hero_transfer"),
  "car-rental-api": og("car_rental"),
  "travel-activities-api": og("activities"),
  // Solutions
  "b2b-travel-development-portal": og("dev_b2b"),
  "b2c-travel-development-portal": og("dev_b2c"),
  "flight-booking-portal": og("dev_flight"),
  "hotel-booking-portal": og("dev_hotel"),
  "esim-portal": og("esim"),
  "transfer-booking-portal": og("transfers"),
  "b2b-travel-portal": og("b2b_portal"),
  "b2c-booking-engine": og("b2c_booking"),
  "corporate-booking-tool": og("corporate_booking"),
  "dynamic-packaging-engine": og("dynamic_packaging"),
  "hotel-extranet-crs": og("hotel_extranet"),
  "travel-erp-backoffice": og("travel_erp"),
  // Blog
  "transfer-api-general-availability": og("hero_transfer"),
  "idempotency-for-travel-bookings": og("dev_flight"),
  "esim-upsell-playbook": og("hero_esim"),
  "normalising-hotel-content": og("hero_hotel"),
  // Guides
  quickstart: og("get-started"),
  "flight-booking-flow": og("hero_flight"),
  "b2b-sub-agent-network": og("b2b_portal"),
  "dynamic-packaging-workflow": og("dynamic_packaging"),
  "corporate-travel-policy-setup": og("corporate_booking"),
  "hotel-booking-flow": og("hero_hotel"),
};

export function getSharePage(path: string): SharePage | undefined {
  return (sharePages as Record<string, SharePage | undefined>)[path];
}

export function shareImageForPath(path: string): string {
  return getSharePage(path)?.image ?? detailImages[path.split("/").pop() ?? ""] ?? DEFAULT_SHARE_IMAGE;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Use `title` as the whole document title, skipping the root layout template. */
  absoluteTitle?: boolean;
  /** Title for the share card when it should differ from the document title. */
  shareTitle?: string;
  /** Set for blog posts and guides, which are shared as articles. */
  publishedTime?: string;
}

/**
 * Next.js replaces `openGraph` and `twitter` as whole objects when it merges
 * metadata, and page titles and descriptions do not flow into them. A page has
 * to set all of them, or its link preview shows the root layout's card.
 */
export function pageMetadata({ title, description, path, absoluteTitle, shareTitle, publishedTime }: PageMetadataOptions): Metadata {
  const cardTitle = shareTitle ?? (absoluteTitle ? title : `${title} · ${siteConfig.name}`);
  const image = shareImageForPath(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(publishedTime ? { type: "article" as const, publishedTime } : { type: "website" as const }),
      siteName: siteConfig.name,
      title: cardTitle,
      description,
      url: path,
      images: [{ url: image, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: cardTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
      images: [image],
    },
  };
}

export function staticPageMetadata(path: SharePagePath): Metadata {
  const { title, description } = sharePages[path];
  return pageMetadata({ title, description, path });
}
