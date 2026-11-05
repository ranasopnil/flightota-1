import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { bundledCollections, bundledOnly, bundledSingletons } from "@/content";
import type { CmsCollections, CmsSingletons, CmsType, CollectionType, SingletonType } from "@/types/cms";
import { BackendNotFoundError, backendConfigured, fetchFromBackend } from "./backend-fetch";

/**
 * Editable site content for Server Components.
 *
 * Every read is cached under the tags `cms`, `cms:<type>` and, for one entry,
 * `cms:<type>:<slug>`; the admin panel revalidates those tags after a save.
 * With API_INTERNAL_URL unset (or a type listed in `bundledOnly`) the bundled
 * data under `src/content` is used, so builds never need a running backend.
 */
const SINGLETON_SLUG = "_";

const readsFromBackend = (type: CmsType) => backendConfigured() && !bundledOnly.has(type);

export async function getSingleton<K extends SingletonType>(type: K): Promise<CmsSingletons[K]> {
  "use cache";
  cacheLife("days");
  cacheTag("cms", `cms:${type}`);
  if (!readsFromBackend(type)) return bundledSingletons[type];
  return fetchFromBackend<CmsSingletons[K]>(`/content/${type}/${SINGLETON_SLUG}`);
}

export async function listEntries<K extends CollectionType>(type: K): Promise<CmsCollections[K][]> {
  "use cache";
  cacheLife("days");
  cacheTag("cms", `cms:${type}`);
  if (!readsFromBackend(type)) return bundledCollections[type] as CmsCollections[K][];
  return fetchFromBackend<CmsCollections[K][]>(`/content/${type}`);
}

/** One published entry, or null when there is none (the page then calls `notFound()`). */
export async function getEntry<K extends CollectionType>(type: K, slug: string): Promise<CmsCollections[K] | null> {
  "use cache";
  cacheLife("days");
  cacheTag("cms", `cms:${type}`, `cms:${type}:${slug}`);
  if (!readsFromBackend(type)) {
    const entries = bundledCollections[type] as CmsCollections[K][];
    return entries.find((entry) => entry.slug === slug) ?? null;
  }
  try {
    return await fetchFromBackend<CmsCollections[K]>(`/content/${type}/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof BackendNotFoundError) return null;
    throw error;
  }
}
