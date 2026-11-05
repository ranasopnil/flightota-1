import { EndpointReference, EndpointSignature } from "@/components/documentation/endpoint-reference";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ApiAccess, ApiEndpoint } from "@/types/catalog";

function groupEndpoints(endpoints: ApiEndpoint[]) {
  const groups = new Map<string, ApiEndpoint[]>();
  endpoints.forEach((e) => groups.set(e.group, [...(groups.get(e.group) ?? []), e]));
  return [...groups.entries()];
}

/** Grouped, expandable endpoint list for API detail pages. */
export function EndpointList({ endpoints, baseUrl, access }: { endpoints: ApiEndpoint[]; baseUrl: string; access?: ApiAccess }) {
  return (
    <div className="flex flex-col gap-8">
      {groupEndpoints(endpoints).map(([group, items]) => (
        <div key={group}>
          <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{group}</h3>
          <Accordion type="multiple" className="overflow-hidden rounded-lg border bg-card">
            {items.map((endpoint) => (
              <AccordionItem key={endpoint.id} value={endpoint.id} id={`endpoint-${endpoint.id}`} className="border-b last:border-b-0">
                <AccordionTrigger className="items-center gap-4 rounded-none px-4 py-3.5 hover:bg-muted/60 hover:no-underline">
                  <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
                    <EndpointSignature endpoint={endpoint} />
                    <span className="text-sm font-normal text-muted-foreground sm:ml-auto sm:text-right">{endpoint.summary}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="border-t bg-background px-4 pt-5 pb-6">
                  <EndpointReference endpoint={endpoint} baseUrl={baseUrl} access={access} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
