import { contactSchema } from "@/lib/validations/leads";
import { apiError, ok, readJson, validationError } from "@/mocks/http";

/**
 * Mock: POST /api/v1/contact
 * Validates with the same schema as the form. The real backend stores the
 * request and routes it to sales, support or partnerships. This mock only
 * acknowledges it and does not send any email.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (body === undefined) return apiError(400, "invalid_json", "Request body must be valid JSON.");
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  const id = crypto.randomUUID();
  return ok({ id, reference: `REQ-${id.slice(0, 8).toUpperCase()}` }, { status: 201 });
}
