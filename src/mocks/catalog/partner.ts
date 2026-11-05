import type { ApiErrorExample, ApiParam } from "@/types/catalog";

/** Builders for the catalog entries of the Partner API. */
export const err = (status: number, code: string, description: string): ApiErrorExample => ({ status, code, description });

export const body = (name: string, type: string, required: boolean, description: string, example?: string | number | boolean): ApiParam => ({ name, in: "body", type, required, description, example });

export const query = (name: string, type: string, description: string, example?: string | number): ApiParam => ({ name, in: "query", type, required: false, description, example });

export const pathParam = (name: string, description: string, example: string): ApiParam => ({ name, in: "path", type: "string", required: true, description, example });

export const idempotencyKey = (example: string, description: string): ApiParam => ({ name: "Idempotency-Key", in: "header", type: "string", required: true, description, example });
