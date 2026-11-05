import type { ZodError } from "zod";
import type { ApiErrorBody } from "@/types/api";

/** Helpers for the built-in mock API. Responses follow the platform envelope. */
export function ok<T>(data: T, init?: ResponseInit & { meta?: Record<string, unknown> }) {
  const { meta, ...rest } = init ?? {};
  return Response.json(meta ? { data, meta } : { data }, rest);
}

export function apiError(status: number, code: string, message: string, fieldErrors?: Record<string, string[]>) {
  const body: ApiErrorBody = { error: { code, message, ...(fieldErrors ? { fieldErrors } : {}) } };
  return Response.json(body, { status });
}

export function validationError(error: ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return apiError(400, "validation_error", "One or more fields are invalid.", fieldErrors);
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}
