import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/config/env";
import { signedOut, tokenRefreshed } from "@/redux/slices/authSlice";
import type { ApiErrorBody, NormalizedApiError } from "@/types/api";

interface StateWithAuth {
  auth: { accessToken: string | null };
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  credentials: "include", // sends the httpOnly refresh-token cookie
  timeout: 20_000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as StateWithAuth).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept", "application/json");
    return headers;
  },
});

/** Convert any RTK Query error into one predictable shape for the UI. */
export function normalizeError(error: FetchBaseQueryError): NormalizedApiError {
  if (typeof error.status === "number") {
    const body = error.data as Partial<ApiErrorBody> | undefined;
    return {
      status: error.status,
      code: body?.error?.code ?? "http_error",
      message: body?.error?.message ?? `Request failed with status ${error.status}.`,
      fieldErrors: body?.error?.fieldErrors,
    };
  }
  const messages: Record<string, string> = {
    FETCH_ERROR: "Network error. Check your connection and try again.",
    TIMEOUT_ERROR: "The request timed out. Please try again.",
    PARSING_ERROR: "Received an unexpected response from the server.",
  };
  return { status: error.status, code: error.status.toLowerCase(), message: messages[error.status] ?? "Something went wrong." };
}

// De-duplicate concurrent refresh attempts.
let refreshInFlight: Promise<boolean> | null = null;

/**
 * Base query with silent re-authentication: on 401, try /auth/refresh once
 * (cookie-based), then replay the original request.
 */
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, NormalizedApiError> = async (args, api, extra) => {
  let result = await rawBaseQuery(args, api, extra);

  const url = typeof args === "string" ? args : args.url;
  const hadToken = Boolean((api.getState() as StateWithAuth).auth.accessToken);

  if (result.error?.status === 401 && hadToken && !url.startsWith("/auth/")) {
    refreshInFlight ??= (async () => {
      const refresh = await rawBaseQuery({ url: "/auth/refresh", method: "POST" }, api, extra);
      const data = (refresh.data as { data?: { accessToken: string; expiresAt: number } } | undefined)?.data;
      if (data) {
        api.dispatch(tokenRefreshed(data));
        return true;
      }
      api.dispatch(signedOut());
      return false;
    })().finally(() => {
      refreshInFlight = null;
    });

    if (await refreshInFlight) result = await rawBaseQuery(args, api, extra);
  }

  if (result.error) return { error: normalizeError(result.error) };
  return { data: result.data, meta: result.meta };
};

/**
 * Single RTK Query API slice. Feature modules extend it with
 * `baseApi.injectEndpoints` so endpoints stay modular.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Catalog", "Product", "Session", "ApiKey", "Usage", "Subscription", "Invoice", "Wallet", "Webhook", "Organization"],
  endpoints: () => ({}),
});
