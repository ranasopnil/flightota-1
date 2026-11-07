import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { bundledCollections, bundledOnly, bundledSingletons, draftSlugs } from "@/content";
import type { CmsCollections, CmsSingletons, CmsType, CollectionType, SingletonType } from "@/types/cms";
import { BackendNotFoundError, backendConfigured, fetchFromBackend } from "./backend-fetch";

/**
 * Editable site content for Server Components.
 *
 * Every read is cached under the tags `cms`, `cms:<type>` and, for one entry,
 * `cms:<type>:<slug>`; the admin panel revalidates those tags after a save.
 * With API_INTERNAL_URL unset (or a type listed in `bundledOnly`) the bundled
 * data under `src/content` is used, so builds never need a running backend.
 * Bundled reads hide the entries in `draftSlugs`, as the backend hides
 * unpublished documents.
 */
const SINGLETON_SLUG = "_";

const readsFromBackend = (type: CmsType) => backendConfigured() && !bundledOnly.has(type);

/** The bundled entries of a collection, without the drafts. */
function bundledEntries<K extends CollectionType>(type: K): CmsCollections[K][] {
  const entries = bundledCollections[type] as CmsCollections[K][];
  const drafts = draftSlugs[type];
  return drafts?.length ? entries.filter((entry) => !drafts.includes(entry.slug)) : entries;
}

export async function getSingleton<K extends SingletonType>(type: K): Promise<CmsSingletons[K]> {
  "use cache";
  cacheLife("days");
  cacheTag("cms", `cms:${type}`);
  if (!readsFromBackend(type)) return bundledSingletons[type];
  try {
    return await fetchFromBackend<CmsSingletons[K]>(`/content/${type}/${SINGLETON_SLUG}`);
  } catch (error) {
    // A document the admin panel has not been seeded with yet: serve the bundled copy until it is.
    if (error instanceof BackendNotFoundError) return bundledSingletons[type];
    throw error;
  }
}

export async function listEntries<K extends CollectionType>(type: K): Promise<CmsCollections[K][]> {
  "use cache";
  cacheLife("days");
  cacheTag("cms", `cms:${type}`);
  if (!readsFromBackend(type)) return bundledEntries(type);
  return fetchFromBackend<CmsCollections[K][]>(`/content/${type}`);
}

/** One published entry, or null when there is none (the page then calls `notFound()`). */
export async function getEntry<K extends CollectionType>(type: K, slug: string): Promise<CmsCollections[K] | null> {
  "use cache";
  cacheLife("days");
  cacheTag("cms", `cms:${type}`, `cms:${type}:${slug}`);
  if (!readsFromBackend(type)) return bundledEntries(type).find((entry) => entry.slug === slug) ?? null;
  try {
    return await fetchFromBackend<CmsCollections[K]>(`/content/${type}/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof BackendNotFoundError) return null;
    throw error;
  }
}
