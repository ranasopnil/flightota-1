import type { ApiErrorExample, ApiParam } from "@/types/catalog";

/** Error responses shared by every endpoint. */
export const commonErrors: ApiErrorExample[] = [
  { status: 400, code: "validation_error", description: "One or more request parameters are invalid." },
  { status: 401, code: "unauthorized", description: "The API key is missing, revoked or invalid." },
  { status: 429, code: "rate_limited", description: "Too many requests. Retry after the time given in the Retry-After header." },
];

export const supplierErrors: ApiErrorExample[] = [
  { status: 409, code: "offer_expired", description: "The offer is no longer valid at the supplier. Search or reprice again." },
  { status: 502, code: "supplier_unavailable", description: "The upstream supplier did not respond. No booking was created." },
];

export const idempotencyHeader: ApiParam = {
  name: "Idempotency-Key",
  in: "header",
  type: "string",
  required: true,
  description: "Unique key (UUID v4) that makes retries safe. Reusing a key returns the original result.",
  example: "4f9a2c3e-6b1d-4e8a-9c7f-2d5b8e1a0c34",
};
