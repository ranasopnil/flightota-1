import type { ApiGuideBlock } from "@/types/content";
import type { ApiAccess, JsonValue } from "@/types/catalog";

/** Shared by the Partner API guides: flights, hotels, eSIM and transfers. */
export const PARTNER_SANDBOX_URL = "https://sandbox.flightota.com/api/v1";
export const PARTNER_PRODUCTION_URL = "https://api.flightota.com/api/v1";

export const partnerAccess: ApiAccess = {
  productionUrl: PARTNER_PRODUCTION_URL,
  sandboxUrl: PARTNER_SANDBOX_URL,
  headers: [
    { name: "X-Api-Key", value: "ak_test_your_key_id", env: "FLIGHTOTA_API_KEY" },
    { name: "X-Api-Secret", value: "<your secret>", env: "FLIGHTOTA_API_SECRET" },
  ],
};

export const bdt = (amount: number): JsonValue => ({ amount, currency: "BDT" });

/** JSON formatted like the guides: short objects stay on one line. */
export function prettyJson(value: JsonValue, indent = 0): string {
  const compact = JSON.stringify(value).replace(/":/g, '": ').replace(/,"/g, ', "');
  if (typeof value !== "object" || value === null || compact.length + indent <= 92) return compact;
  const pad = " ".repeat(indent + 2);
  const close = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((v) => pad + prettyJson(v, indent + 2)).join(",\n")}\n${close}]`;
  }
  const entries = Object.entries(value);
  return `{\n${entries.map(([k, v]) => `${pad}${JSON.stringify(k)}: ${prettyJson(v, indent + 2)}`).join(",\n")}\n${close}}`;
}

export const p = (text: string): ApiGuideBlock => ({ type: "paragraph", text });
export const h = (text: string): ApiGuideBlock => ({ type: "subheading", text });
export const ul = (...items: string[]): ApiGuideBlock => ({ type: "list", items });
export const ol = (...items: string[]): ApiGuideBlock => ({ type: "list", items, ordered: true });
export const checklist = (...items: string[]): ApiGuideBlock => ({ type: "checklist", items });
export const table = (headers: string[], ...rows: string[][]): ApiGuideBlock => ({ type: "table", headers, rows });
export const http = (code: string, title?: string): ApiGuideBlock => ({ type: "code", code, title, language: "http" });
export const json = (value: JsonValue, title?: string): ApiGuideBlock => ({ type: "code", code: prettyJson(value), title, language: "json" });
