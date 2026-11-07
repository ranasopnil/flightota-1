/**
 * Export the bundled content (src/content) as JSON, one file per CMS type, plus
 * the enums the backend mirrors in its validation schemas. A collection whose
 * entries include drafts (`draftSlugs`) lists them under `unpublished`, and the
 * backend seed stores those hidden.
 *
 *   npm run cms:seed [outDir]      (default: ./cms-seed)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { bundledCollections, bundledSingletons, draftSlugs } from "@/content";
import { ICON_KEYS } from "@/lib/icon-keys";
import { BADGE_TONES } from "@/lib/tones";
import { COLLECTION_TYPES, SINGLETON_TYPES } from "@/types/cms";

const outDir = path.resolve(process.argv[2] ?? "cms-seed");
mkdirSync(outDir, { recursive: true });

const write = (name: string, value: unknown) => writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(value, null, 2) + "\n");

for (const type of SINGLETON_TYPES) write(type, { type, kind: "singleton", data: bundledSingletons[type] });
for (const type of COLLECTION_TYPES) {
  const unpublished = draftSlugs[type];
  write(type, { type, kind: "collection", data: bundledCollections[type], ...(unpublished?.length ? { unpublished } : {}) });
}
write("_enums", {
  iconKeys: ICON_KEYS,
  badgeTones: BADGE_TONES,
  contentBlockTypes: ["heading", "paragraph", "list", "code", "callout", "image"],
  apiGuideBlockTypes: ["paragraph", "subheading", "list", "checklist", "table", "code"],
  singletonTypes: SINGLETON_TYPES,
  collectionTypes: COLLECTION_TYPES,
});

const counts = COLLECTION_TYPES.map((t) => `${t}=${bundledCollections[t].length}`).join(" ");
console.log(`Wrote ${SINGLETON_TYPES.length} singletons and ${COLLECTION_TYPES.length} collections (${counts}) to ${outDir}`);
