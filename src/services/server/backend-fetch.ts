import "server-only";

import { serverEnv } from "@/config/env";
import type { ApiSuccess } from "@/types/api";

/** Thrown when the backend answers 404; callers turn it into `null` or `notFound()`. */
export class BackendNotFoundError extends Error {}

/** True when API_INTERNAL_URL is set, i.e. data should come from the backend instead of the bundle. */
export const backendConfigured = () => Boolean(serverEnv.apiInternalUrl);

/** GET `${API_INTERNAL_URL}${path}` and unwrap the `{ data }` envelope. */
export async function fetchFromBackend<T>(path: string): Promise<T> {
  const res = await fetch(`${serverEnv.apiInternalUrl}${path}`, { headers: { Accept: "application/json" } });
  if (res.status === 404) throw new BackendNotFoundError(path);
  if (!res.ok) throw new Error(`Backend request failed: ${res.status} ${path}`);
  const body = (await res.json()) as ApiSuccess<T>;
  return body.data;
}
