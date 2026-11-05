import type { ApiEndpoint, ApiParam, ApiProduct, JsonValue } from "@/types/catalog";

type OpenApiSchema = Record<string, unknown>;

function schemaFor(param: ApiParam): OpenApiSchema {
  const t = param.type.toLowerCase();
  if (t === "integer") return { type: "integer" };
  if (t === "boolean") return { type: "boolean" };
  if (t === "number") return { type: "number" };
  if (t === "date") return { type: "string", format: "date" };
  if (t === "datetime") return { type: "string", format: "date-time" };
  if (t.endsWith("[]")) return { type: "array", items: {} };
  if (t === "string") return { type: "string" };
  return { type: "object", description: param.type };
}

/** One response per status, with every error code of that status as a named example. */
function errorResponses(endpoint: ApiEndpoint) {
  const byStatus = new Map<number, NonNullable<ApiEndpoint["errors"]>>();
  for (const e of endpoint.errors ?? []) byStatus.set(e.status, [...(byStatus.get(e.status) ?? []), e]);
  return Object.fromEntries(
    [...byStatus].map(([status, errors]) => [
      String(status),
      {
        description: errors.map((e) => `${e.code}: ${e.description}`).join("\n"),
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
            examples: Object.fromEntries(errors.map((e) => [e.code, { value: { error: { code: e.code, message: e.description } } }])),
          },
        },
      },
    ]),
  );
}

function operation(endpoint: ApiEndpoint) {
  const bodyParams = endpoint.params.filter((p) => p.in === "body");
  const op: Record<string, unknown> = {
    operationId: endpoint.id,
    summary: endpoint.summary,
    description: endpoint.description,
    tags: [endpoint.group],
    parameters: endpoint.params
      .filter((p) => p.in !== "body")
      .map((p) => ({
        name: p.name,
        in: p.in,
        required: p.in === "path" ? true : p.required,
        description: p.description,
        schema: schemaFor(p),
        ...(p.example !== undefined ? { example: p.example } : {}),
      })),
    responses: {
      ...errorResponses(endpoint),
      ...Object.fromEntries(
        (endpoint.extraResponses ?? [])
          .filter((r) => r.status < 400)
          .map((r) => [String(r.status), { description: r.title, content: { "application/json": { example: r.body } } }]),
      ),
      [String(endpoint.successStatus ?? 200)]: {
        description: "Successful response",
        content: { "application/json": { example: endpoint.responseExample as JsonValue } },
      },
    },
  };
  if (bodyParams.length || endpoint.requestBody !== undefined) {
    op.requestBody = {
      required: bodyParams.some((p) => p.required),
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: bodyParams.filter((p) => p.required).map((p) => p.name),
            properties: Object.fromEntries(bodyParams.map((p) => [p.name, { ...schemaFor(p), description: p.description }])),
          },
          ...(endpoint.requestBody !== undefined ? { example: endpoint.requestBody } : {}),
        },
      },
    };
  }
  return op;
}

/** Build an OpenAPI 3.1 document for a product from the catalog model. */
export function buildOpenApiDocument(product: ApiProduct, servers: { production: string; sandbox: string }) {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const endpoint of product.endpoints) {
    paths[endpoint.path] ??= {};
    paths[endpoint.path][endpoint.method.toLowerCase()] = operation(endpoint);
  }
  const access = product.access;
  const securitySchemes: Record<string, unknown> = access
    ? Object.fromEntries(access.headers.map((h) => [h.name, { type: "apiKey", in: "header", name: h.name }]))
    : { bearerAuth: { type: "http", scheme: "bearer", description: "Your API key" } };
  return {
    openapi: "3.1.0",
    info: { title: product.name, version: product.version, description: product.description },
    servers: [
      { url: access?.productionUrl ?? servers.production, description: "Production" },
      { url: access?.sandboxUrl ?? servers.sandbox, description: "Sandbox" },
    ],
    security: [Object.fromEntries(Object.keys(securitySchemes).map((name) => [name, []]))],
    paths,
    components: {
      securitySchemes,
      schemas: {
        Error: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["code", "message"],
              properties: { code: { type: "string" }, message: { type: "string" }, request_id: { type: "string" } },
            },
          },
        },
      },
    },
  };
}
