import type { ApiParam } from "@/types/catalog";

const order: ApiParam["in"][] = ["path", "header", "query", "body"];

export function ParamsTable({ params }: { params: ApiParam[] }) {
  if (!params.length) {
    return <p className="text-sm text-muted-foreground">This endpoint takes no parameters.</p>;
  }
  const sorted = [...params].sort((a, b) => order.indexOf(a.in) - order.indexOf(b.in));
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="app-table w-full min-w-[560px] text-left text-sm">
        <thead className="bg-muted text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Parameter</th>
            <th scope="col" className="px-4 py-2.5 font-medium">In</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {sorted.map((param) => (
            <tr key={`${param.in}-${param.name}`} className="align-top">
              <td className="px-4 py-3">
                <code className="font-mono text-[13px] font-medium text-foreground">{param.name}</code>
                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  <span className="font-mono text-muted-foreground">{param.type}</span>
                  {param.required ? (
                    <span className="font-medium text-primary">required</span>
                  ) : (
                    <span className="text-muted-foreground">optional</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-secondary-foreground">{param.in}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {param.description}
                {param.example !== undefined && (
                  <div className="mt-1 text-xs">
                    Example: <code className="font-mono text-foreground">{String(param.example)}</code>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
