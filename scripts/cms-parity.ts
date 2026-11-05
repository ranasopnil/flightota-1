/**
 * Compare what the backend serves with the bundled content. Exits non-zero on
 * any difference, so a seeded backend and the bundle are known to be identical.
 *
 *   API_INTERNAL_URL=http://127.0.0.1:4000/v1 npm run cms:parity
 */
import { bundledCollections, bundledSingletons } from "@/content";
import { COLLECTION_TYPES, SINGLETON_TYPES } from "@/types/cms";

const base = process.env.API_INTERNAL_URL;
if (!base) {
  console.error("API_INTERNAL_URL is not set");
  process.exit(2);
}

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const normalize = (value: unknown): Json => JSON.parse(JSON.stringify(value));

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${base}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return ((await res.json()) as { data: T }).data;
}

/** First differing path between two JSON values, or null when equal. */
function firstDiff(a: Json, b: Json, at = "$"): string | null {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return `${at}: array vs non-array`;
    if (a.length !== b.length) return `${at}: length ${a.length} vs ${b.length}`;
    for (let i = 0; i < a.length; i += 1) {
      const d = firstDiff(a[i], b[i], `${at}[${i}]`);
      if (d) return d;
    }
    return null;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of keys) {
      const d = firstDiff((a as Record<string, Json>)[key] ?? null, (b as Record<string, Json>)[key] ?? null, `${at}.${key}`);
      if (d) return d;
    }
    return null;
  }
  return a === b ? null : `${at}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`;
}

async function main() {
  let failures = 0;
  for (const type of SINGLETON_TYPES) {
    const diff = firstDiff(normalize(bundledSingletons[type]), normalize(await get(`/content/${type}/_`)));
    console.log(`${diff ? "DIFF" : "OK  "} ${type}${diff ? `  ${diff}` : ""}`);
    if (diff) failures += 1;
  }
  for (const type of COLLECTION_TYPES) {
    const diff = firstDiff(normalize(bundledCollections[type]), normalize(await get(`/content/${type}`)));
    console.log(`${diff ? "DIFF" : "OK  "} ${type}${diff ? `  ${diff}` : ""}`);
    if (diff) failures += 1;
  }
  console.log(failures ? `${failures} type(s) differ` : "All types match the bundle.");
  process.exit(failures ? 1 : 0);
}

void main();
