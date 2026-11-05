import type { ComponentProps } from "react";
import { getSingleton } from "@/services/server/cms-repository";
import { resolvePageSeo } from "@/services/server/seo";
import { ShareEmbedModal } from "./share-embed-modal";

type ShareButtonProps = Omit<ComponentProps<typeof ShareEmbedModal>, "image" | "siteName">;

/** The share dialog for a page, with its title, text and picture resolved from the CMS. */
export async function ShareButton({ path, title, description, ...props }: ShareButtonProps) {
  const [seo, settings] = await Promise.all([resolvePageSeo(path, { title, description }), getSingleton("site-settings")]);
  return <ShareEmbedModal path={path} title={seo.title} description={seo.description} image={seo.image} siteName={settings.name} {...props} />;
}
