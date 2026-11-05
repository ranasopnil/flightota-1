import { newsletterSchema } from "@/lib/validations/leads";
import { apiError, ok, readJson, validationError } from "@/mocks/http";

/** Mock: POST /api/v1/newsletter */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (body === undefined) return apiError(400, "invalid_json", "Request body must be valid JSON.");
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  return ok({ subscribed: true }, { status: 201 });
}
