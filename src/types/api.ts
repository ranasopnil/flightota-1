/** Standard response envelope returned by the platform API. */
export interface ApiSuccess<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
    requestId?: string;
  };
}

/** Normalised error shape surfaced to the UI by RTK Query. */
export interface NormalizedApiError {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR";
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
}
