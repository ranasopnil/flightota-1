import type { DocsOverviewContent } from "@/types/pages";

/** The /documentation overview page. Section text uses `code` and **bold** inline. */
export const docsOverview: DocsOverviewContent = {
  hero: {
    badge: "DEVELOPER DOCS",
    status: "REST v1 • OpenAPI 3.1",
    title: "Partner API",
    description: "Flights, hotels, eSIM and transfers: the same keys and conventions, paid from your FlightOTA deposit.",
    image: "/images/heroes/guides_planning.jpg",
    chips: ["X-Api-Key & X-Api-Secret", "BDT minor units", "Idempotency-Key"],
  },
  sections: [
    {
      id: "getting-started",
      title: "Getting started",
      blocks: [
        {
          type: "table",
          headers: ["Environment", "Base URL", "Key prefix"],
          rows: [
            ["Sandbox", "`https://sandbox.flightota.com/api/v1`", "`ak_test_`"],
            ["Production", "`https://api.flightota.com/api/v1`", "`ak_live_`"],
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Get a key in the agent portal under **API access**, enabled for the product. The secret is shown once.",
            "Whitelist your server's public IP on the key. Never call the API from a browser or app.",
            "Send the two headers on every request. No login call, no token.",
            "Call `GET /ping` first. It returns your agency code and the IP we saw.",
          ],
        },
        { type: "code", language: "http", title: "Headers", code: "X-Api-Key: ak_test_your_key_id\nX-Api-Secret: <your secret>\nAccept: application/json\nContent-Type: application/json" },
      ],
    },
    {
      id: "conventions",
      title: "Conventions",
      blocks: [
        {
          type: "list",
          items: [
            '**Money** is `{"amount": <integer minor units>, "currency": "BDT"}` in your billing currency. A key with **Amounts** switched on the API access page gets currency units instead (`15161.94`).',
            '**Errors** are `{"error": {"code": "…", "message": "…"}}`. Branch on `code`.',
            "**Ignore fields you do not know**; new ones are added without notice.",
            "**Send an `Idempotency-Key` header** when you book or order. The same request with the same key returns what was already made.",
          ],
        },
        { type: "paragraph", text: "Times and ids differ by product; each guide lists its own." },
      ],
    },
    { id: "api-overview", title: "API overview", blocks: [], widget: "api-overview" },
    {
      id: "errors",
      title: "Errors",
      blocks: [
        { type: "paragraph", text: "Access errors are the same across the products. Each guide lists its own codes." },
        {
          type: "table",
          headers: ["HTTP", "error.code", "Fix"],
          rows: [
            ["`401`", "`unauthenticated`", "Headers missing, or key or secret wrong."],
            ["`401`", "`credential_inactive`", "Key revoked or expired."],
            ["`403`", "`ip_whitelist_required, ip_not_whitelisted`", "Whitelist your server's IP on the key."],
            ["`403`", "`product_not_allowed`", "The key is not enabled for this product."],
            ["`403`", "`partner_inactive, subscription_*, environment_not_activated`", "Account or API plan not active; live keys work after certification."],
            ["`429`", "`rate_limited`", "Wait a minute."],
          ],
        },
      ],
    },
    {
      id: "retries",
      title: "Retries",
      blocks: [{ type: "paragraph", text: "`503`, `429` and timeouts are safe to retry. Retry booking only with the same `Idempotency-Key`." }],
    },
    {
      id: "updates",
      title: "Updates",
      blocks: [{ type: "paragraph", text: "There are no webhooks yet. Read the booking to follow it: `GET /flights/bookings/{booking_ref}`, `GET /hotels/bookings/{ref}`." }],
    },
    {
      id: "code-examples",
      title: "Code examples",
      blocks: [{ type: "paragraph", text: "Every endpoint has examples in cURL, JavaScript, TypeScript, Python and PHP. Here is an eSIM order:" }],
      widget: "code-example",
    },
  ],
  apiOverview: { othersLabel: "Other APIs, not part of the partner guides:" },
  codeExample: { productSlug: "esim-api", endpointId: "esim-order", title: "POST /esims/orders", linkLabel: "Read the eSIM guide", linkHref: "/documentation/esim-api" },
  productHeroImages: {
    "air-travel-api": "/images/categories/flight.jpg",
    "hotel-api": "/images/categories/hotel.jpg",
    "esim-api": "/images/categories/esim.jpg",
    "visa-api": "/images/categories/visa.jpg",
    "airport-transfer-api": "/images/categories/transfer.jpg",
    "car-rental-api": "/images/categories/car_rental.jpg",
    "travel-activities-api": "/images/categories/activities.jpg",
  },
  defaultProductHeroImage: "/images/hero/hero_flight.jpg",
  referenceHeading: "Endpoint reference",
  referenceDescriptionTemplate: "API reference for the {{name}}: endpoints, parameters, request and response examples, and errors.",
};
