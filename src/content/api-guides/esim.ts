import type { JsonValue } from "@/types/catalog";
import type { ApiGuide } from "@/types/content";
import { bdt, checklist, h, http, json, ol, p, PARTNER_PRODUCTION_URL, PARTNER_SANDBOX_URL, table } from "@/mocks/content/partner-api";

/** Samples from the Partner API eSIM guide, as published. */
export const placesResponse: JsonValue = {
  currency: "BDT",
  places: [{ code: "AE", name: "United Arab Emirates", kind: "country", image: "https://…/places/ae.png", plans: 12, from: bdt(38500) }],
};

export const placeResponse: JsonValue = {
  place: {
    code: "AE",
    name: "United Arab Emirates",
    kind: "country",
    image: "https://…/places/ae.png",
    plans: [
      {
        id: "burj-mobile-7days-1gb",
        title: "1 GB - 7 days",
        data: "1 GB",
        amount_mb: 1024,
        days: 7,
        unlimited: false,
        voice: null,
        text: null,
        operator: "Burj Mobile",
        operator_image: "https://…/operators/burj-mobile.png",
        plan_type: "data",
        activation: "first-usage",
        kyc: false,
        rechargeable: true,
        info: ["5G data-only eSIM.", "Rechargeable online with no expiry.", "Operates on the Etisalat network in the United Arab Emirates."],
        coverage: ["AE"],
        price: bdt(38500),
      },
    ],
  },
};

export const orderRequest: JsonValue = {
  place_code: "AE",
  plan_id: "burj-mobile-7days-1gb",
  quantity: 1,
  email: "guest@example.com",
  name: "Arif Rahman",
  client_reference: "SIM-7731",
};

export const orderResponse: JsonValue = {
  status: "issued",
  order: {
    order_ref: "TFS-4K7PQ2MX",
    state: "issued",
    created_at: "2026-09-22T14:40:03Z",
    issued_at: "2026-09-22T14:40:05Z",
    client_reference: "SIM-7731",
    total: bdt(38500),
    place: { code: "AE", name: "United Arab Emirates", kind: "country" },
    plan: { id: "burj-mobile-7days-1gb", title: "1 GB - 7 days", data: "1 GB", days: 7, activation: "first-usage", "…": "…" },
    quantity: 1,
    validity_days: 7,
    email: "guest@example.com",
    sims: [
      {
        iccid: "8910300000000012341",
        lpa: "LPA:1$smdp.example.com$ABC-123-XYZ",
        smdp_address: "smdp.example.com",
        activation_code: "ABC-123-XYZ",
        confirmation_code: null,
        qr_url: "https://…/qr/ABC-123-XYZ.png",
        apple_install_url: "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$smdp.example.com$ABC-123-XYZ",
        apn: { type: "automatic", value: "internet" },
        roaming: true,
      },
    ],
    installation: { qr: "1. Go to Settings > Mobile Data…", manual: "1. Go to Settings > Mobile Data > Add eSIM > Enter details manually…" },
  },
};

export const pendingOrderResponse: JsonValue = { status: "pending", order: { order_ref: "TFS-…", state: "ticketing", sims: [], "…": "…" } };

export const readOrderResponse: JsonValue = { order: { order_ref: "TFS-4K7PQ2MX", state: "issued", "…": "the shape above, with the SIM codes" } };

export const listOrdersResponse: JsonValue = {
  orders: [{ order_ref: "TFS-4K7PQ2MX", state: "issued", "…": "…" }],
  page: 1,
  per_page: 25,
  total: 1,
  last_page: 1,
};

export const esimGuide: ApiGuide = {
  title: "Partner API — eSIM",
  intro:
    "Sell travel eSIMs for 200+ countries and regions: list the plans, buy one, and hand your customer the QR code and activation code from the same response. Orders are paid from your FlightOTA deposit and issued at once.",
  sections: [
    {
      id: "guide-getting-started",
      title: "Getting started",
      blocks: [
        table(
          ["Environment", "Base URL", "Key prefix"],
          ["Sandbox", `\`${PARTNER_SANDBOX_URL}\``, "`ak_test_`"],
          ["Production", `\`${PARTNER_PRODUCTION_URL}\``, "`ak_live_`"],
        ),
        ol(
          "Issue a key in the agent portal under **API access**, enabled for **eSIM** (included in the Business and Enterprise API plans).",
          "Whitelist your server's public IP on the key.",
          "Send `X-Api-Key` and `X-Api-Secret` on every request, with `Accept: application/json` and `Content-Type: application/json`.",
          "Call `GET /ping` first; it returns your agency code and the IP we saw.",
        ),
        p('**Conventions.** Money is `{"amount": <integer minor units>, "currency": "BDT"}` in your billing currency. A key with **Amounts** switched on the API access page gets currency units instead (`15161.94`). Times are UTC, RFC 3339. Order references look like `TFS-XXXXXXXX` (orders made before 28 Sep 2026 keep their `ES-` reference). Errors are `{"error": {"code": "…", "message": "…"}}`; branch on `code`. Ignore fields you do not know.'),
        p("**Sandbox.** The sandbox has no eSIM plans yet, so eSIM certification is arranged with your account manager. Plans, prices and orders below are shown from production data."),
      ],
    },
    {
      id: "guide-order-flow",
      title: "Order flow",
      blocks: [
        p("Three calls: choose a place, choose a plan, buy it. The order answer already carries everything the traveller needs to install the eSIM; we also e-mail it to the address you give."),
        table(
          ["Call", "Purpose"],
          ["`GET /esims/places`", "Every country and region with plans"],
          ["`GET /esims/places/{code}`", "One place's plans and prices"],
          ["`POST /esims/orders`", "Buy 1–5 eSIMs of one plan"],
          ["`GET /esims/orders`, `GET /esims/orders/{order_ref}`", "Read orders back"],
        ),
      ],
    },
    {
      id: "guide-places-plans",
      title: "Places and plans",
      blocks: [
        h("All places"),
        p("`GET /esims/places`. Countries first, then regions (Europe, Asia, Global…). `from` is the cheapest plan at your price."),
        json(placesResponse),
        p("`kind` is `country` or `region`. A country's `code` is its ISO code; a region has its own code, as listed."),
        h("One place's plans"),
        http("GET /esims/places/AE"),
        json(placeResponse),
        p("(Plan details are production data for the UAE; the price is illustrative, yours depends on your agreement.)"),
        table(
          ["Field", "Meaning"],
          ["`id`", "The plan to order"],
          ["`data`, `amount_mb`, `unlimited`", "Data allowance"],
          ["`days`", "Validity from activation"],
          ["`voice`, `text`", "Minutes and SMS when included, else `null` (data-only)"],
          ["`activation`", "`first-usage`: the validity starts when the eSIM first connects at the destination. Otherwise it starts on installation"],
          ["`kyc`", "`true` when the operator requires identity verification before use"],
          ["`rechargeable`", "Can be topped up later"],
          ["`coverage`", "Countries the plan works in"],
          ["`price`", "What your deposit pays per eSIM"],
        ),
        p("A place with no plans answers `404 place_not_found`."),
      ],
    },
    {
      id: "guide-order",
      title: "Order an eSIM",
      blocks: [
        p("`POST /esims/orders`: the deposit pays and the eSIM is issued in the same call. **Send an `Idempotency-Key` header**; repeating the same request with the same key returns the order already made and buys nothing more."),
        table(
          ["Field", "Required", "Notes"],
          ["`place_code`", "Yes", "From places, e.g. `AE`"],
          ["`plan_id`", "Yes", "A plan's `id`"],
          ["`quantity`", "No", "1–5, default 1. One SIM per traveller; all on the same plan"],
          ["`email`", "Yes", "The traveller's e-mail; the eSIM and install guide are sent there"],
          ["`name`", "No", "The traveller's name, for the e-mail"],
          ["`client_reference`", "No", "Your own reference, up to 64 characters"],
        ),
        http("POST /api/v1/esims/orders\nIdempotency-Key: sim-7731"),
        json(orderRequest),
        h("Response `201 Created`"),
        json(orderResponse),
        p("(Codes are illustrative; the shape is exactly what the API returns.)"),
        h("Response `202 Accepted`"),
        p('Rarely, the eSIM provider does not answer the order in time and it may still have been placed. The order is charged and comes back as `"status": "pending"` with `"state": "ticketing"` and no `sims` yet. Do not order it again: our team confirms it with the provider, then the SIM codes appear on `GET /esims/orders/{order_ref}`, or the charge is returned to your deposit.'),
        h("Giving the eSIM to the traveller"),
        table(
          ["Field", "Use it for"],
          ["`qr_url`", "A picture of the QR code to show or print. The traveller scans it in phone settings"],
          ["`lpa`", "The QR content as text, if you draw the QR yourself"],
          ["`smdp_address` + `activation_code`", 'Manual installation ("Enter details manually")'],
          ["`apple_install_url`", "One-tap install on iPhone (iOS 17.4 or later)"],
          ["`apn`", "Set by the phone when `automatic`; otherwise enter `value` as the APN"],
          ["`roaming`", "Turn data roaming on for this eSIM"],
          ["`installation.qr`, `installation.manual`", "Step-by-step text to show"],
        ),
        p("An eSIM can be installed only once: tell the traveller to install it before the trip, on Wi-Fi, and not to delete it."),
        table(
          ["HTTP", "error.code", "Meaning"],
          ["400", "`idempotency_key_required`", "Add the header"],
          ["422", "`validation_failed`", "See `errors`"],
          ["402", "`insufficient_funds`", "Deposit too low; nothing charged"],
          ["409", "`supplier_refused`", "The plan was not issued; nothing charged; choose another"],
          ["410", "`plan_unavailable`", "The plan is no longer sold; load the place again"],
          ["409", "`duplicate_request`, `request_in_progress`", "Key reused with another body, or still running"],
          ["503", "`supplier_unavailable`", "Nothing charged; retry"],
        ),
      ],
    },
    {
      id: "guide-read-list",
      title: "Read and list orders",
      blocks: [
        p('`GET /esims/orders/{order_ref}` returns `{"order": {…}}` in the shape above, with the SIM codes, any time. Another agency\'s reference answers `404 order_not_found`.'),
        p("`GET /esims/orders`, newest first, 25 a page:"),
        table(
          ["Query parameter", "Notes"],
          ["`client_reference`", "Your own reference"],
          ["`created_from`, `created_to`", "`YYYY-MM-DD`"],
          ["`page`, `per_page`", "`per_page` up to 100"],
        ),
        json(listOrdersResponse),
        p("An issued eSIM is final: it cannot be cancelled or refunded through the API. Top-ups and usage checks are not in the API yet."),
      ],
    },
    {
      id: "guide-errors",
      title: "Errors and go-live",
      blocks: [
        h("Access errors"),
        table(
          ["HTTP", "error.code", "Fix"],
          ["401", "`unauthenticated`, `credential_inactive`", "Check the key and secret; issue a new key if revoked"],
          ["403", "`ip_whitelist_required`, `ip_not_whitelisted`", "Whitelist your server's IP"],
          ["403", "`product_not_allowed`", "The key is not enabled for eSIM; your API plan must include it"],
          ["403", "`partner_inactive`, `subscription_*`, `environment_not_activated`", "Account or plan not active; live keys work after certification"],
          ["429", "`rate_limited`", "Wait a minute"],
          ["503", "`supplier_unavailable`", "Retry; nothing was charged"],
        ),
        h("Go-live checklist"),
        checklist(
          "`GET /ping` from your whitelisted server",
          "Places list with search by name, countries and regions",
          "A place's plans shown with data, days, activation and KYC flag",
          "An order placed with an `Idempotency-Key`; the repeat returns the same order",
          "QR picture, manual codes and the iPhone install link shown to the traveller",
          "`402 insufficient_funds` and `410 plan_unavailable` shown in plain words",
          "Orders read back by `order_ref` and by `client_reference`",
        ),
        p("Questions and certification: your account manager, or support from the agent portal."),
      ],
    },
  ],
};
