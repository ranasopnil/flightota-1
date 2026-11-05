import { TriangleAlert } from "lucide-react";
import { CodeBlock } from "@/components/common/code-block";
import { MethodBadge } from "@/components/common/status-badge";
import { codeLanguages, generateCodeSample } from "@/lib/code-samples";
import type { ApiAccess, ApiEndpoint } from "@/types/catalog";
import { CodeTabs } from "./code-tabs";
import { ParamsTable } from "./params-table";

/** Full reference for one endpoint: description, parameters, code samples, responses and errors. */
export function EndpointReference({ endpoint, baseUrl, access }: { endpoint: ApiEndpoint; baseUrl: string; access?: ApiAccess }) {
  const samples = codeLanguages.map((lang) => ({ id: lang.id, label: lang.label, code: generateCodeSample(endpoint, lang.id, baseUrl, access) }));
  const errorExample = endpoint.errors?.[0];

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-6">
        <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground">{endpoint.description}</p>

        {endpoint.supplierAction && (
          <div className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {endpoint.notice ? (
              <p>{endpoint.notice}</p>
            ) : (
              <p>
                This operation creates or changes a booking with a supplier. Always send an <code className="font-mono">Idempotency-Key</code>.
                In production it runs only when a supplier is connected. In the sandbox it is simulated.
              </p>
            )}
          </div>
        )}

        <div>
          <h4 className="mb-3 text-sm font-semibold">Parameters</h4>
          <ParamsTable params={endpoint.params} />
        </div>

        {endpoint.errors && endpoint.errors.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold">Errors</h4>
            <ul className="divide-y rounded-lg border text-sm">
              {endpoint.errors.map((err) => (
                <li key={`${err.status}-${err.code}`} className="flex gap-3 px-4 py-2.5">
                  <span className="w-10 shrink-0 font-mono font-semibold text-primary">{err.status}</span>
                  <span className="min-w-0">
                    <code className="font-mono text-[13px] text-foreground">{err.code}</code>
                    <span className="block text-muted-foreground">{err.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <CodeTabs samples={samples} maxHeight={360} />
        <CodeBlock title={`Response · ${endpoint.successStatus ?? 200}`} code={JSON.stringify(endpoint.responseExample, null, 2)} maxHeight={360} />
        {endpoint.extraResponses?.map((extra) => (
          <CodeBlock key={extra.status} title={`Response · ${extra.status} ${extra.title}`} code={JSON.stringify(extra.body, null, 2)} maxHeight={360} />
        ))}
        {errorExample && (
          <CodeBlock
            title={`Error · ${errorExample.status}`}
            code={JSON.stringify(
              { error: { code: errorExample.code, message: errorExample.description, ...(access ? {} : { request_id: "req_01JD8Z4X2N7Q" }) } },
              null,
              2,
            )}
          />
        )}
      </div>
    </div>
  );
}

export function EndpointSignature({ endpoint }: { endpoint: Pick<ApiEndpoint, "method" | "path"> }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <MethodBadge method={endpoint.method} />
      <code className="truncate font-mono text-[13px] text-foreground">{endpoint.path}</code>
    </span>
  );
}
