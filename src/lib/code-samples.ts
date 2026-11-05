import type { ApiAccess, ApiEndpoint, JsonValue } from "@/types/catalog";

export type CodeLanguage = "curl" | "javascript" | "typescript" | "python" | "php";

export const codeLanguages: { id: CodeLanguage; label: string }[] = [
  { id: "curl", label: "cURL" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "php", label: "PHP" },
];

/** Replace {path_params} with their example values. */
function resolvePath(endpoint: ApiEndpoint) {
  return endpoint.path.replace(/\{(\w+)\}/g, (_, name: string) => {
    const param = endpoint.params.find((p) => p.in === "path" && p.name === name);
    return param?.example !== undefined ? String(param.example) : `{${name}}`;
  });
}

function queryString(endpoint: ApiEndpoint) {
  const qs = endpoint.params
    .filter((p) => p.in === "query" && p.example !== undefined)
    .map((p) => `${p.name}=${encodeURIComponent(String(p.example))}`)
    .join("&");
  return qs ? `?${qs}` : "";
}

/** The endpoint's URL with its example path and query values filled in. */
export function resolveEndpointUrl(endpoint: ApiEndpoint, baseUrl: string) {
  return `${baseUrl}${resolvePath(endpoint)}${queryString(endpoint)}`;
}

function indent(text: string, spaces: number) {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line, i) => (i === 0 ? line : pad + line))
    .join("\n");
}

function toPhpArray(value: JsonValue, depth = 1): string {
  const pad = "    ".repeat(depth);
  const closePad = "    ".repeat(depth - 1);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((v) => `${pad}${toPhpArray(v, depth + 1)}`).join(",\n")}\n${closePad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "[]";
    return `[\n${entries.map(([k, v]) => `${pad}'${k}' => ${toPhpArray(v, depth + 1)}`).join(",\n")}\n${closePad}]`;
  }
  if (typeof value === "string") return `'${value.replace(/'/g, "\\'")}'`;
  if (value === null) return "null";
  return String(value);
}

function toPython(value: JsonValue): string {
  return JSON.stringify(value, null, 4)
    .replace(/\btrue\b/g, "True")
    .replace(/\bfalse\b/g, "False")
    .replace(/\bnull\b/g, "None");
}

/**
 * Generate a runnable example for an endpoint. Keys are read from an
 * environment variable, never hard-coded.
 */
export function generateCodeSample(endpoint: ApiEndpoint, language: CodeLanguage, baseUrl: string, access?: ApiAccess) {
  const url = resolveEndpointUrl(endpoint, baseUrl);
  const hasBody = endpoint.requestBody !== undefined;
  const idempotencyParam = endpoint.params.find((p) => p.name === "Idempotency-Key");
  const idempotent = Boolean(idempotencyParam);
  // A documented key is shown as is: retries must reuse it, so it is never random.
  const fixedKey = access && idempotencyParam?.example !== undefined ? String(idempotencyParam.example) : null;
  const json = hasBody ? JSON.stringify(endpoint.requestBody, null, 2) : "";
  const credentials = access?.headers ?? [];
  const accept = access ? [["Accept", "application/json"]] : [];
  // Responses of a product with its own access are not wrapped in a data object.
  const unwrapped = Boolean(access);

  switch (language) {
    case "curl": {
      const lines = [
        `curl -X ${endpoint.method} "${url}"`,
        ...(access ? credentials.map((h) => `  -H "${h.name}: $${h.env}"`) : [`  -H "Authorization: Bearer $FLIGHTOTA_API_KEY"`]),
        ...accept.map(([k, v]) => `  -H "${k}: ${v}"`),
      ];
      if (idempotent) lines.push(`  -H "Idempotency-Key: ${fixedKey ?? "$(uuidgen)"}"`);
      if (hasBody) lines.push(`  -H "Content-Type: application/json"`, `  -d '${json}'`);
      return lines.join(" \\\n");
    }
    case "javascript":
    case "typescript": {
      const headers = [
        ...(access ? credentials.map((h) => `"${h.name}": process.env.${h.env}`) : ["Authorization: `Bearer ${process.env.FLIGHTOTA_API_KEY}`"]),
        ...accept.map(([k, v]) => `"${k}": "${v}"`),
        ...(idempotent ? [fixedKey ? `"Idempotency-Key": "${fixedKey}"` : '"Idempotency-Key": crypto.randomUUID()'] : []),
        ...(hasBody ? ['"Content-Type": "application/json"'] : []),
      ];
      const typeNote = language === "typescript" ? ": Response" : "";
      return [
        `const res${typeNote} = await fetch("${url}", {`,
        `  method: "${endpoint.method}",`,
        `  headers: {\n    ${headers.join(",\n    ")},\n  },`,
        ...(hasBody ? [`  body: JSON.stringify(${indent(json, 2)}),`] : []),
        `});`,
        ``,
        ...(unwrapped
          ? [`const answer = await res.json();`, `if (!res.ok) throw new Error(answer.error.code);`]
          : [`if (!res.ok) throw new Error(\`Request failed: \${res.status}\`);`, `const { data } = await res.json();`]),
      ].join("\n");
    }
    case "python": {
      const headers = [
        ...(access ? credentials.map((h) => `"${h.name}": os.environ["${h.env}"]`) : ['"Authorization": f"Bearer {os.environ[\'FLIGHTOTA_API_KEY\']}"']),
        ...accept.map(([k, v]) => `"${k}": "${v}"`),
        ...(idempotent ? [fixedKey ? `"Idempotency-Key": "${fixedKey}"` : '"Idempotency-Key": str(uuid.uuid4())'] : []),
      ];
      return [
        `import os${idempotent && !fixedKey ? ", uuid" : ""}`,
        `import requests`,
        ``,
        `res = requests.request(`,
        `    "${endpoint.method}",`,
        `    "${url}",`,
        `    headers={${headers.join(", ")}},`,
        ...(hasBody ? [`    json=${indent(toPython(endpoint.requestBody as JsonValue), 4)},`] : []),
        `    timeout=${unwrapped ? 60 : 30},`,
        `)`,
        ...(unwrapped ? [`answer = res.json()`] : [`res.raise_for_status()`, `data = res.json()["data"]`]),
      ].join("\n");
    }
    case "php": {
      const headers = [
        ...(access ? credentials.map((h) => `'${h.name}' => getenv('${h.env}')`) : ["'Authorization' => 'Bearer ' . getenv('FLIGHTOTA_API_KEY')"]),
        ...accept.map(([k, v]) => `'${k}' => '${v}'`),
        ...(idempotent ? [fixedKey ? `'Idempotency-Key' => '${fixedKey}'` : "'Idempotency-Key' => bin2hex(random_bytes(16))"] : []),
      ];
      return [
        `<?php`,
        `$client = new \\GuzzleHttp\\Client();`,
        ``,
        `$response = $client->request('${endpoint.method}', '${url}', [`,
        `    'headers' => [${headers.join(", ")}],`,
        ...(hasBody ? [`    'json' => ${toPhpArray(endpoint.requestBody as JsonValue, 2)},`] : []),
        ...(unwrapped ? [`    'http_errors' => false,`] : []),
        `]);`,
        ``,
        unwrapped ? `$answer = json_decode($response->getBody(), true);` : `$data = json_decode($response->getBody(), true)['data'];`,
      ].join("\n");
    }
  }
}
