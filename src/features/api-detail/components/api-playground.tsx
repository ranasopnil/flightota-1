"use client";

import { useMemo, useState, useRef } from "react";
import {
  Play,
  Copy,
  Check,
  RotateCw,
  Terminal,
  Zap,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateCodeSample, resolveEndpointUrl } from "@/lib/code-samples";
import type { ApiProduct } from "@/types/catalog";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface EndpointScenario {
  id: string;
  name: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  requestPayload?: string;
  pythonCode: string;
  nodeCode: string;
  curlCode: string;
  mockResponse: unknown;
  latencyMs: number;
  /** HTTP status of the example. Defaults to 200 OK. */
  statusLabel?: string;
  /** The documented call time, when the guide gives one. Hides the simulated latency. */
  timeLabel?: string;
}

const STATUS_TEXT: Record<number, string> = { 200: "200 OK", 201: "201 Created", 202: "202 Accepted" };

/** One console entry per catalog endpoint, with the code and answer its reference shows. */
function scenariosFromProduct(product: ApiProduct): EndpointScenario[] {
  const baseUrl = product.access?.sandboxUrl ?? "https://sandbox.flightota.com";
  return product.endpoints.map((endpoint) => ({
    id: endpoint.id,
    name: endpoint.summary,
    method: endpoint.method === "GET" ? "GET" : "POST",
    path: resolveEndpointUrl(endpoint, ""),
    description: endpoint.description,
    curlCode: generateCodeSample(endpoint, "curl", baseUrl, product.access),
    nodeCode: generateCodeSample(endpoint, "javascript", baseUrl, product.access),
    pythonCode: generateCodeSample(endpoint, "python", baseUrl, product.access),
    mockResponse: endpoint.responseExample,
    latencyMs: 0,
    statusLabel: STATUS_TEXT[endpoint.successStatus ?? 200],
    timeLabel: endpoint.timing ?? "",
  }));
}

const VISA_SCENARIOS: EndpointScenario[] = [
  {
    id: "visa-requirements",
    name: "Check Entry Requirements",
    method: "GET",
    path: "/visa/v1/requirements?nationality=BD&destination=JP&purpose=tourism",
    description: "Verify visa requirement, eVisa availability, and transit rules by passport",
    curlCode: `curl -X GET "https://sandbox.flightota.com/visa/v1/requirements?nationality=BD&destination=JP&purpose=tourism" \\
  -H "Authorization: Bearer YOUR_SANDBOX_KEY"`,
    nodeCode: `import { FlightOTAClient } from "@flightota/sdk";

const flightota = new FlightOTAClient({ apiKey: "YOUR_SANDBOX_KEY" });

const reqs = await flightota.visa.requirements.check({
  nationality: "BD",
  destination: "JP",
  purpose: "tourism",
});

console.log(\`Visa Status: \${reqs.data.requirement} | eVisa: \${reqs.data.evisa}\`);`,
    pythonCode: `from flightota import FlightOTAClient

client = FlightOTAClient(api_key="YOUR_SANDBOX_KEY")

reqs = client.visa.requirements.check(
    nationality="BD",
    destination="JP",
    purpose="tourism"
)
print(f"Requirement: {reqs.data.requirement} | eVisa Available: {reqs.data.evisa}")`,
    mockResponse: {
      status: "success",
      data: {
        destination: {
          iso2: "JP",
          name: "Japan",
          passport_validity_required_months: 6,
          blank_pages_required: 2,
        },
        traveller: {
          nationality: "BD",
          passport: "Standard / Ordinary",
        },
        requirement: "visa_required",
        evisa_available: true,
        visa_on_arrival: false,
        recommended_category: "tourist_single",
        processing_estimate: "5 to 7 business days",
        official_fee: "25.00 USD",
        timatic_rules: [
          "Passports must be valid for the duration of stay.",
          "Confirmed return or onward ticket required upon check-in.",
          "Digital Japanese e-Visa (MOFA) is valid for single-entry up to 90 days.",
        ],
      },
    },
    latencyMs: 98,
  },
  {
    id: "visa-documents",
    name: "Fetch Document Checklist",
    method: "GET",
    path: "/visa/v1/countries/JP/visa-types/tourist_single/documents",
    description: "Inspect required biometric photo specs, financial proof, and format rules",
    curlCode: `curl -X GET "https://sandbox.flightota.com/visa/v1/countries/JP/visa-types/tourist_single/documents" \\
  -H "Authorization: Bearer YOUR_SANDBOX_KEY"`,
    nodeCode: `const docs = await flightota.visa.countries.getDocuments("JP", "tourist_single");
console.log(docs.data.documents.map(d => d.name));`,
    pythonCode: `docs = client.visa.countries.get_documents("JP", "tourist_single")
for doc in docs.data.documents:
    print(f"Document: {doc.name} (Mandatory: {doc.required})")`,
    mockResponse: {
      status: "success",
      data: {
        country: "JP",
        visa_type: "tourist_single",
        documents: [
          {
            id: "doc_bio_page",
            name: "Passport Bio-Data Page",
            required: true,
            format: ["pdf", "jpeg", "png"],
            max_size_mb: 5,
            specifications: "Clear color scan, no glare, full machine-readable MRZ visible",
          },
          {
            id: "doc_photo",
            name: "Biometric Passport Photo",
            required: true,
            format: ["jpeg", "png"],
            dimensions: "45mm x 35mm",
            background: "Pure white",
          },
          {
            id: "doc_bank_stmt",
            name: "Bank Statement (Last 6 Months)",
            required: true,
            format: ["pdf"],
            max_size_mb: 10,
            specifications: "Certified bank seal, minimum closing balance $2,500 equivalent",
          },
        ],
      },
    },
    latencyMs: 112,
  },
  {
    id: "visa-validate",
    name: "Pre-Flight OCR Passport Validate",
    method: "POST",
    path: "/visa/v1/applications/validate",
    description: "Scan passport MRZ and check for 6-month validity compliance before submission",
    curlCode: `curl -X POST "https://sandbox.flightota.com/visa/v1/applications/validate" \\
  -H "Authorization: Bearer YOUR_SANDBOX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "country_iso": "JP",
    "passport_mrz": "P<BGDRAHMAN<<ANIS<<<<<<<<<<<<<<<<<<<<<<\\nA012345678BGD8501015M2901017<<<<<<<<<<<<<<04"
  }'`,
    nodeCode: `const validation = await flightota.visa.applications.validate({
  countryIso: "JP",
  passportMrz: "P<BGDRAHMAN<<ANIS...",
});
console.log("Eligible:", validation.data.eligible);`,
    pythonCode: `validation = client.visa.applications.validate(
    country_iso="JP",
    passport_mrz="P<BGDRAHMAN<<ANIS..."
)
print("Eligibility Check:", validation.data.eligible)`,
    mockResponse: {
      status: "success",
      data: {
        eligible: true,
        mrz_parsed: {
          passport_number: "A01234567",
          surname: "RAHMAN",
          given_names: "ANIS",
          nationality: "BGD",
          date_of_birth: "1985-01-01",
          sex: "M",
          expiry_date: "2029-01-01",
        },
        checks: {
          passport_validity_sufficient: true,
          months_remaining: 32,
          embassy_sanction_flag: false,
          mrz_checksum_valid: true,
        },
        advisory: "Passport is eligible for immediate e-Visa application filing.",
      },
    },
    latencyMs: 145,
  },
  {
    id: "visa-submit",
    name: "Submit Electronic Visa Application",
    method: "POST",
    path: "/visa/v1/applications",
    description: "Transmit applicant dossier to government consular portal and receive tracking ID",
    curlCode: `curl -X POST "https://sandbox.flightota.com/visa/v1/applications" \\
  -H "Authorization: Bearer YOUR_SANDBOX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "destination": "JP",
    "visa_type": "tourist_single",
    "applicant": {
      "first_name": "Anis",
      "last_name": "Rahman",
      "passport_no": "A01234567",
      "nationality": "BD"
    },
    "documents": [
      { "id": "doc_bio_page", "file_url": "https://storage.flightota.com/docs/mrz_scan.pdf" }
    ]
  }'`,
    nodeCode: `const app = await flightota.visa.applications.create({
  destination: "JP",
  visaType: "tourist_single",
  applicant: { firstName: "Anis", lastName: "Rahman", passportNo: "A01234567", nationality: "BD" },
});
console.log("Tracking ID:", app.data.tracking_id);`,
    pythonCode: `app = client.visa.applications.create(
    destination="JP",
    visa_type="tourist_single",
    applicant={"first_name": "Anis", "last_name": "Rahman", "passport_no": "A01234567"}
)
print("Application Submitted:", app.data.tracking_id)`,
    mockResponse: {
      status: "success",
      data: {
        application_id: "app_vsa_98234871",
        tracking_id: "JPN-EVSA-2026-8819",
        status: "under_consular_review",
        submission_timestamp: "2026-10-22T08:30:00Z",
        expected_decision_by: "2026-10-28T18:00:00Z",
        consular_portal_reference: "MOFA-EVISA-BD-771",
        webhook_registered: true,
      },
    },
    latencyMs: 230,
  },
  {
    id: "visa-status",
    name: "Poll Application Real-Time Status",
    method: "GET",
    path: "/visa/v1/applications/app_vsa_98234871/status",
    description: "Check consular review progress and download official PDF grant letter",
    curlCode: `curl -X GET "https://sandbox.flightota.com/visa/v1/applications/app_vsa_98234871/status" \\
  -H "Authorization: Bearer YOUR_SANDBOX_KEY"`,
    nodeCode: `const status = await flightota.visa.applications.getStatus("app_vsa_98234871");
console.log("Decision:", status.data.decision);`,
    pythonCode: `status = client.visa.applications.get_status("app_vsa_98234871")
print("Status:", status.data.status, "Download:", status.data.pdf_grant_url)`,
    mockResponse: {
      status: "success",
      data: {
        application_id: "app_vsa_98234871",
        tracking_id: "JPN-EVSA-2026-8819",
        status: "approved",
        decision: "ISSUED",
        granted_at: "2026-10-25T11:20:00Z",
        validity: {
          from: "2026-10-25",
          until: "2027-01-25",
          stay_duration_days: 90,
          entries: "SINGLE",
        },
        pdf_grant_url: "https://sandbox.flightota.com/v1/visa/grants/evisa_jpn_8819.pdf",
      },
    },
    latencyMs: 82,
  },
];

export function ApiPlayground({ product }: { product: ApiProduct }) {
  const slug = product.slug;
  const scenarios = useMemo(() => (slug === "visa-api" ? VISA_SCENARIOS : scenariosFromProduct(product)), [slug, product]);
  const [selectedScenario, setSelectedScenario] = useState<EndpointScenario>(scenarios[0]);
  const [lang, setLang] = useState<"curl" | "node" | "python">("curl");
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState<unknown>(
    scenarios[0].mockResponse
  );
  const [lastLatency, setLastLatency] = useState<number>(scenarios[0].latencyMs);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const swiperChipsRef = useRef<SwiperType | null>(null);
  const swiperCardsRef = useRef<SwiperType | null>(null);

  const handleScenarioChange = (scenario: EndpointScenario) => {
    setSelectedScenario(scenario);
    setResponse(scenario.mockResponse);
    setLastLatency(scenario.latencyMs);
  };

  const handleRunRequest = () => {
    setIsRunning(true);
    setResponse(null);
    setTimeout(() => {
      setIsRunning(false);
      setResponse(selectedScenario.mockResponse);
      setLastLatency(selectedScenario.latencyMs + Math.floor(Math.random() * 20 - 10));
      toast.success(`${selectedScenario.statusLabel ?? "200 OK"} • Example answer shown`);
    }, 450);
  };

  const currentCode =
    lang === "curl"
      ? selectedScenario.curlCode
      : lang === "node"
      ? selectedScenario.nodeCode
      : selectedScenario.pythonCode;

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    toast.success("Code snippet copied!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyResponseJson = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopiedResponse(true);
    toast.success("JSON response copied!");
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className=" space-y-5">
      {/* 1. Header with Scenario Counter & Swiper Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <Terminal className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                Interactive API Console &amp; Simulator
              </h3>
              {!product.access && (
                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Live Sandbox Ready
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {product.access ? selectedScenario.description : "Swipe or select any endpoint scenario below to simulate request and response payloads in real-time."}
            </p>
          </div>
        </div>

        {/* Swiper Arrow Navigation Buttons (No shadow) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          <span className="text-[11px] text-muted-foreground font-mono mr-1">
            {scenarios.length} Endpoints
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              swiperChipsRef.current?.slidePrev();
              swiperCardsRef.current?.slidePrev();
            }}
            className="size-7 rounded-md border border-border bg-card text-foreground hover:bg-muted cursor-pointer"
            aria-label="Previous endpoint"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              swiperChipsRef.current?.slideNext();
              swiperCardsRef.current?.slideNext();
            }}
            className="size-7 rounded-md border border-border bg-card text-foreground hover:bg-muted cursor-pointer"
            aria-label="Next endpoint"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Endpoint Scenario Selector Swiper Ribbon (No shadow) */}
      <div className="relative min-w-0 md:hidden">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperChipsRef.current = swiper;
          }}
          modules={[Navigation, FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode={{ enabled: true, sticky: false }}
        >
          {scenarios.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <SwiperSlide key={scenario.id} className="!w-auto">
                <button
                  type="button"
                  onClick={() => handleScenarioChange(scenario)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border-border/70"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold px-1 py-0.2 rounded ${
                      isSelected
                        ? "bg-black/20 text-white"
                        : scenario.method === "POST"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {scenario.method}
                  </span>
                  <span className="truncate max-w-[180px] sm:max-w-none">{scenario.name}</span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* 3. Endpoint Scenarios Showcase Swiper Cards (No shadow) */}
      <div className="relative hidden min-w-0 border-y border-border/60 py-3 md:block">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperCardsRef.current = swiper;
          }}
          modules={[Navigation, FreeMode]}
          spaceBetween={12}
          slidesPerView={1.15}
          freeMode={{ enabled: true, sticky: false }}
          breakpoints={{
            480: {
              slidesPerView: 1.8,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 14,
            },
          }}
        >
          {scenarios.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <SwiperSlide key={scenario.id} className="h-auto">
                <button
                  type="button"
                  onClick={() => handleScenarioChange(scenario)}
                  className={`w-full h-full text-left flex flex-col justify-between rounded-lg border p-3 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border/70 bg-card/80 hover:border-primary/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          scenario.method === "POST"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {scenario.method}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground truncate">
                        {scenario.statusLabel ?? "200 OK"}
                      </span>
                    </div>
                    <h4 className="font-heading text-xs font-bold text-foreground line-clamp-1">
                      {scenario.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                    <span className="font-mono text-muted-foreground truncate max-w-[130px]">
                      {scenario.path}
                    </span>
                    <span className={`font-semibold flex items-center gap-0.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                      <span>{isSelected ? "Active" : "Try"}</span>
                      <ArrowRight className="size-2.5" />
                    </span>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* 4. Main Playground Workstation (No shadow, pure clean flat borders) */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 [&>*]:min-w-0">
        {/* Left Column: Request & Code Builder */}
        <div className="flex flex-col rounded-xl border border-border/70 bg-card overflow-hidden">
          {/* Endpoint Bar with Method and Run Button */}
          <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/40 p-2.5 sm:p-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="rounded bg-primary/15 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                {selectedScenario.method}
              </span>
              <span className="font-mono text-xs text-foreground font-medium truncate">
                {selectedScenario.path}
              </span>
            </div>

            <Button
              size="sm"
              onClick={handleRunRequest}
              disabled={isRunning}
              className="h-7.5 gap-1.5 rounded-lg text-xs font-semibold px-3 shrink-0 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RotateCw className="size-3 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="size-3 fill-current" />
                  <span>Send Request</span>
                </>
              )}
            </Button>
          </div>

          {/* Code Language Switcher */}
          <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5 text-xs bg-muted/20">
            <div className="flex items-center gap-1">
              {(["curl", "node", "python"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors cursor-pointer ${
                    lang === l
                      ? "bg-background text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "curl" ? "cURL" : l === "node" ? "Node.js" : "Python"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {copiedCode ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              <span>{copiedCode ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          {/* Request Code Body Viewer */}
          <div className="relative flex-1 bg-navy-950 p-3 sm:p-4 text-xs font-mono text-slate-200 overflow-x-auto min-h-[220px] max-h-[340px]">
            <pre className="text-[11px] leading-relaxed">
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Live Simulated Response */}
        <div className="flex flex-col rounded-xl border border-border/70 bg-card overflow-hidden">
          {/* Response Status Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/40 p-2.5 sm:p-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>{selectedScenario.statusLabel ?? "200 OK"}</span>
              </span>
              {selectedScenario.timeLabel !== "" && (
                <>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Clock className="size-3" />
                    <span>{selectedScenario.timeLabel ?? `${lastLatency}ms`}</span>
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={copyResponseJson}
              disabled={!response}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {copiedResponse ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              <span>{copiedResponse ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>

          {/* JSON Response Body */}
          <div className="relative flex-1 bg-[#050b14] p-3 sm:p-4 text-xs font-mono text-emerald-400/90 overflow-x-auto min-h-[220px] max-h-[340px]">
            {isRunning ? (
              <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 text-muted-foreground">
                <RotateCw className="size-5 animate-spin text-primary" />
                <span className="text-xs">{product.access ? "Loading the example answer..." : "Dispatching through FlightOTA Gateway..."}</span>
              </div>
            ) : response ? (
              <pre className="text-[11px] leading-relaxed">
                <code>{JSON.stringify(response, null, 2)}</code>
              </pre>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom Sandbox Perks Banner (No shadow) */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="size-3.5 text-primary shrink-0" />
          <span>{product.access ? "Issue a sandbox key in the agent portal under API access." : "Includes 5,000 free sandbox calls / month. Zero credit card required."}</span>
        </div>
        <a
          href={`/register?api=${slug}`}
          className="font-semibold text-primary hover:underline text-xs"
        >
          {product.access ? "Get Sandbox Key →" : "Get Free Sandbox Key →"}
        </a>
      </div>
    </div>
  );
}
