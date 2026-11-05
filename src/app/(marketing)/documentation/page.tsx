import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryIcon } from "@/components/common/category-icon";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { CodeBlock } from "@/components/common/code-block";
import { StatusBadge } from "@/components/common/status-badge";
import { CodeTabs } from "@/components/documentation/code-tabs";
import { getApiGuide } from "@/mocks/content/api-guides";
import { PARTNER_PRODUCTION_URL, PARTNER_SANDBOX_URL } from "@/mocks/content/partner-api";
import { codeLanguages, generateCodeSample } from "@/lib/code-samples";
import { listProductsDetailed } from "@/services/server/catalog-repository";

export const metadata: Metadata = staticPageMetadata("/documentation");

const accessErrors = [
  { status: 401, code: "unauthenticated", meaning: "Headers missing, or key or secret wrong." },
  { status: 401, code: "credential_inactive", meaning: "Key revoked or expired." },
  { status: 403, code: "ip_whitelist_required, ip_not_whitelisted", meaning: "Whitelist your server's IP on the key." },
  { status: 403, code: "product_not_allowed", meaning: "The key is not enabled for this product." },
  { status: 403, code: "partner_inactive, subscription_*, environment_not_activated", meaning: "Account or API plan not active; live keys work after certification." },
  { status: 429, code: "rate_limited", meaning: "Wait a minute." },
];

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-b py-6 first:pt-0 sm:py-10 last:border-b-0">
      <h2 id={`${id}-title`} className="font-heading text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-sm sm:text-[15.5px] leading-relaxed text-secondary-foreground">{children}</div>
    </section>
  );
}

export default async function DocumentationPage() {
  const products = await listProductsDetailed();
  const exampleEndpoint = products.find((p) => p.slug === "esim-api");
  const orderEndpoint = exampleEndpoint?.endpoints.find((e) => e.id === "esim-order");
  const samples = orderEndpoint
    ? codeLanguages.map((l) => ({ id: l.id, label: l.label, code: generateCodeSample(orderEndpoint, l.id, PARTNER_SANDBOX_URL, exampleEndpoint?.access) }))
    : [];
  const guided = products.filter((p) => getApiGuide(p.slug));
  const others = products.filter((p) => !getApiGuide(p.slug));

  return (
    <div className="max-w-4xl">
      <header className="pb-3 sm:pb-6">
        <div className="relative mb-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-5 sm:p-6 text-white ">
          <Image
            src="/images/heroes/guides_planning.jpg"
            alt="Developer documentation"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
          <div className="relative z-10 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
                DEVELOPER DOCS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                REST v1 &bull; OpenAPI 3.1
              </span>
            </div>
            <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl text-white">
              Partner API
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Flights, hotels, eSIM and transfers: the same keys and conventions, paid from your FlightOTA deposit.
            </p>

            {/* Compact Bottom Bar: Quick Metrics & Action Shortcuts */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/15 text-[11px]">
              <span className="rounded-md border border-white/15 bg-slate-900/80 px-2 py-0.5 text-slate-200 backdrop-blur-md">
                X-Api-Key &amp; X-Api-Secret
              </span>
              <span className="rounded-md border border-white/15 bg-slate-900/80 px-2 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
                BDT minor units
              </span>
              <span className="rounded-md border border-white/15 bg-slate-900/80 px-2 py-0.5 text-slate-200 backdrop-blur-md">
                Idempotency-Key
              </span>
              <ShareEmbedModal
                path="/documentation"
                size="sm"
                variant="outline"
                className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      </header>

      <DocSection id="getting-started" title="Getting started">
        <div className="overflow-x-auto rounded-lg border">
          <table className="app-table w-full min-w-[560px] text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2.5 text-left font-medium">Environment</th>
                <th scope="col" className="px-4 py-2.5 text-left font-medium">Base URL</th>
                <th scope="col" className="px-4 py-2.5 text-left font-medium">Key prefix</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3">Sandbox</td>
                <td className="px-4 py-3 font-mono text-[13px]">{PARTNER_SANDBOX_URL}</td>
                <td className="px-4 py-3 font-mono text-[13px]">ak_test_</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Production</td>
                <td className="px-4 py-3 font-mono text-[13px]">{PARTNER_PRODUCTION_URL}</td>
                <td className="px-4 py-3 font-mono text-[13px]">ak_live_</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Get a key in the agent portal under <strong>API access</strong>, enabled for the product. The secret is shown once.</li>
          <li>Whitelist your server&apos;s public IP on the key. Never call the API from a browser or app.</li>
          <li>Send the two headers on every request. No login call, no token.</li>
          <li>Call <code className="font-mono">GET /ping</code> first. It returns your agency code and the IP we saw.</li>
        </ol>
        <CodeBlock language="http" title="Headers" code={"X-Api-Key: ak_test_your_key_id\nX-Api-Secret: <your secret>\nAccept: application/json\nContent-Type: application/json"} />
      </DocSection>

      <DocSection id="conventions" title="Conventions">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Money</strong> is <code className="font-mono">{'{"amount": <integer minor units>, "currency": "BDT"}'}</code> in your billing currency. A key with <strong>Amounts</strong> switched on the API access page gets currency units instead (<code className="font-mono">15161.94</code>).</li>
          <li><strong>Errors</strong> are <code className="font-mono">{'{"error": {"code": "…", "message": "…"}}'}</code>. Branch on <code className="font-mono">code</code>.</li>
          <li><strong>Ignore fields you do not know</strong>; new ones are added without notice.</li>
          <li><strong>Send an <code className="font-mono">Idempotency-Key</code> header</strong> when you book or order. The same request with the same key returns what was already made.</li>
        </ul>
        <p className="text-sm text-muted-foreground">Times and ids differ by product; each guide lists its own.</p>
      </DocSection>

      <DocSection id="api-overview" title="API overview">
        <ul className="grid grid-cols-2 gap-2 sm:gap-3">
          {guided.map((p) => (
            <li key={p.slug}>
              <Link href={`/documentation/${p.slug}`} className="group flex h-full items-start gap-3 rounded-lg border bg-card p-4 transition hover:border-primary/30">
                <CategoryIcon category={p.category} size="sm" />
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-medium group-hover:text-primary">
                    {p.name} <span className="font-mono text-xs text-muted-foreground">{p.version}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{p.endpoints.length} endpoints</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {others.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground">Other APIs, not part of the partner guides:</p>
            <ul className="grid grid-cols-2 gap-2 sm:gap-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/documentation/${p.slug}`} className="group flex h-full items-start gap-3 rounded-lg border bg-card p-4 transition hover:border-primary/30">
                    <CategoryIcon category={p.category} size="sm" />
                    <span className="flex-1">
                      <span className="flex items-center gap-2 font-medium group-hover:text-primary">
                        {p.name} <span className="font-mono text-xs text-muted-foreground">{p.version}</span>
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{p.endpoints.length} endpoints</span>
                    </span>
                    {p.status !== "operational" && <span className="hidden sm:inline-flex"><StatusBadge status={p.status} /></span>}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </DocSection>

      <DocSection id="errors" title="Errors">
        <p>Access errors are the same across the products. Each guide lists its own codes.</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="app-table w-full min-w-[560px] text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2.5 text-left font-medium">HTTP</th>
                <th scope="col" className="px-4 py-2.5 text-left font-medium">error.code</th>
                <th scope="col" className="px-4 py-2.5 text-left font-medium">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {accessErrors.map((e) => (
                <tr key={e.code}>
                  <td data-label="HTTP" className="px-4 py-2.5 font-mono font-semibold text-primary">{e.status}</td>
                  <td data-label="error.code" className="px-4 py-2.5 font-mono text-[13px]">{e.code}</td>
                  <td data-label="Fix" className="px-4 py-2.5 text-muted-foreground">{e.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection id="retries" title="Retries">
        <p><code className="font-mono">503</code>, <code className="font-mono">429</code> and timeouts are safe to retry. Retry booking only with the same <code className="font-mono">Idempotency-Key</code>.</p>
      </DocSection>

      <DocSection id="updates" title="Updates">
        <p>There are no webhooks yet. Read the booking to follow it: <code className="font-mono">GET /flights/bookings/{"{booking_ref}"}</code>, <code className="font-mono">GET /hotels/bookings/{"{ref}"}</code>.</p>
      </DocSection>

      <DocSection id="code-examples" title="Code examples">
        <p>Every endpoint has examples in cURL, JavaScript, TypeScript, Python and PHP. Here is an eSIM order:</p>
        {samples.length > 0 && <CodeTabs samples={samples} title="POST /esims/orders" />}
        <Link href="/documentation/esim-api" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          Read the eSIM guide <ArrowRight className="size-4" />
        </Link>
      </DocSection>
    </div>
  );
}
