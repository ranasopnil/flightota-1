import type { Metadata } from "next";

/** Link-preview pictures live in /public/images/og (or /uploads) at 1200×630. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image: string;
  siteName: string;
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
export function buildPageMetadata({ title, description, path, image, siteName, absoluteTitle, shareTitle, publishedTime }: PageMetadataInput): Metadata {
  const cardTitle = shareTitle ?? (absoluteTitle ? title : `${title} · ${siteName}`);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(publishedTime ? { type: "article" as const, publishedTime } : { type: "website" as const }),
      siteName,
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
