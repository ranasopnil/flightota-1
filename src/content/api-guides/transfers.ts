import type { JsonValue } from "@/types/catalog";
import type { ApiGuide } from "@/types/content";
import { bdt, checklist, h, http, json, ol, p, PARTNER_PRODUCTION_URL, PARTNER_SANDBOX_URL, table, ul } from "@/mocks/content/partner-api";

/** Samples from the Partner API transfers guide, as published. */
export const searchRequest: JsonValue = {
  mode: "one_way",
  start: { iata: "DXB" },
  end: { address: "Atlantis The Palm, Dubai" },
  pickup_at: "2026-11-01 10:00",
  passengers: 2,
  flight_type: "international",
};

export const quote: JsonValue = {
  quote_id: "trq_991e55f4e7381325158b81ca",
  mode: "one_way",
  provider: { name: "DidaGo", logo: "https://…", rating: 5, rating_count: 1 },
  vehicle: { type: "Sedan", class: "Standard", make: "Toyota", model: "Corolla", image: "https://…", max_passengers: 3, max_bags: 3, num_vehicles: 1 },
  pickup_at: "2026-11-01T10:00:00+04:00",
  arrival_at: "2026-11-01T10:42:46+04:00",
  duration_minutes: 45,
  return: null,
  cancellation: { online: true, policy: [{ notice_hours: 24, refund_percent: 100 }] },
  cancellation_deadline: "2026-10-31T10:00:00+04:00",
  amenities: [
    { key: "meet_and_greet", name: "Meet & Greet", included: false },
    { key: "provider_driver_information", name: "Early driver details", included: true },
  ],
  flight_info_required: true,
  extra_pax_required: false,
  wait_minutes: 33,
  tolls_included: true,
  gratuity_included: false,
  notes: ["You can make changes or cancel your ride at any time up to 24 hours before your scheduled pickup"],
  supports: { tracking: false, driver_details: true },
  price: bdt(565658),
};

export const searchResponse: JsonValue = {
  search_id: "trs_8vhdop9ilzvvjdpabo8r",
  expires_at: "2026-09-22T14:56:53+00:00",
  more_coming: false,
  start: { name: "Dubai International Airport", iata: "DXB", city: "Dubai", lat: 25.2528, lng: 55.364399, timezone: "Asia/Dubai" },
  end: { name: "Atlantis The Palm, Dubai", address: "44J8+5V - Crescent Rd - The Palm Jumeirah - Dubai - United Arab Emirates", iata: null, city: "Dubai", lat: 25.130438, lng: 55.117188, timezone: "Asia/Dubai" },
  quotes: [quote],
};

export const bookRequest: JsonValue = {
  passenger: { first_name: "Arif", last_name: "Rahman", email: "ops@agency.example", phone: "+8801711000000", country: "BD" },
  flight: { airline: "EK", number: "585" },
  instructions: "Two bags, one child seat not needed",
  client_reference: "DOCS-RIDE-001",
};

export const bookResponse: JsonValue = {
  status: "confirmed",
  booking: {
    booking_ref: "TFT-Y54HH32L",
    state: "confirmed",
    created_at: "2026-09-22T14:37:23Z",
    client_reference: "DOCS-RIDE-001",
    confirmation: "MOZ6f26aec",
    total: bdt(565658),
    trip: {
      mode: "one_way",
      start: { name: "Dubai International Airport", iata: "DXB", "…": "…" },
      end: { name: "Atlantis The Palm, Dubai", "…": "…" },
      pickup_at: "2026-11-01T10:00:00+04:00",
      return_pickup_at: null,
      hours: null,
      passengers: 2,
    },
    ride: {
      provider: { name: "DidaGo", logo: "https://…", rating: 5, rating_count: 1 },
      vehicle: { type: "Sedan", make: "Toyota", model: "Corolla", max_passengers: 3, max_bags: 3, "…": "…" },
      pickup_at: "2026-11-01T10:00:00+04:00",
      arrival_at: "2026-11-01T10:42:46+04:00",
      duration_minutes: 45,
      return: null,
      amenities: [{ key: "provider_driver_information", name: "Early driver details", included: true }],
    },
    passenger: { first_name: "Arif", last_name: "Rahman", email: "ops@agency.example", phone: "+8801711000000", country: "BD" },
    extra_passengers: [],
    flight: { airline: "EK", number: "585" },
    return_flight: null,
    instructions: "Two bags, one child seat not needed",
    pickup_instructions: "If you haven't paid for the Meet&Greet service, your driver will contact you via text message to confirm the meeting point…",
    driver_contact: { name: "…", phone: "…", email: "…" },
    cancellation: {
      online: true,
      policy: [{ notice_hours: 24, refund_percent: 100 }],
      free_until: "2026-10-31T06:00:00Z",
      cancelled_at: null,
    },
  },
};

export const readBookingResponse: JsonValue = { booking: { booking_ref: "TFT-Y54HH32L", state: "confirmed", "…": "as above" } };

export const listBookingsResponse: JsonValue = {
  bookings: [{ booking_ref: "TFT-Y54HH32L", state: "confirmed", "…": "…" }],
  page: 1,
  per_page: 25,
  total: 1,
  last_page: 1,
};

export const cancelResponse: JsonValue = {
  status: "cancelled",
  refund: bdt(565658),
  booking: {
    booking_ref: "TFT-Y54HH32L",
    state: "cancelled",
    cancellation: {
      online: true,
      policy: [{ notice_hours: 24, refund_percent: 100 }],
      free_until: "2026-10-31T06:00:00Z",
      cancelled_at: "2026-09-22T14:37:40+00:00",
    },
    "…": "…",
  },
};

export const transfersGuide: ApiGuide = {
  title: "Partner API — Transfers",
  intro:
    "Book airport and city transfers worldwide: private cars, vans and shuttles from hundreds of local providers, paid from your FlightOTA deposit and confirmed in seconds. Every example below is a real sandbox call made on 22 Sep 2026.",
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
          "Issue a key in the agent portal under **API access**, enabled for **transfers** (ask your account manager to add transfers to your API plan).",
          "Whitelist your server's public IP on the key.",
          "Send `X-Api-Key` and `X-Api-Secret` on every request, with `Accept: application/json` and `Content-Type: application/json`.",
          "Call `GET /ping` first.",
        ),
        p('**Conventions.** Money is `{"amount": <integer minor units>, "currency": "BDT"}` in your billing currency. A key with **Amounts** switched on the API access page gets currency units instead (`15161.94`). Pickup times are local to the pickup place with their offset (`2026-11-01T10:00:00+04:00`); other times are UTC. Search ids look like `trs_…`, quote ids `trq_…`, bookings `TFT-XXXXXXXX` (rides booked before 28 Sep 2026 keep their `TR-` reference). Errors are `{"error": {"code": "…", "message": "…"}}`.'),
      ],
    },
    {
      id: "guide-booking-flow",
      title: "Booking flow",
      blocks: [
        p("Search, pick a quote, book. Quotes arrive over a few seconds: the search answers with the first ones, and `more_coming: true` means reading the search again brings more."),
        table(
          ["state", "Meaning"],
          ["`confirmed`", "The provider confirmed; `confirmation` and pickup instructions set"],
          ["`pending`", "Paid; the provider is confirming. Read it again; a ride the provider refuses is refunded. One it has not answered within an hour stays `pending` while our team confirms it with the provider, then it is confirmed or refunded"],
          ["`cancelled`", "Cancelled; what the cancellation policy gives back (`refund`) is in your deposit"],
          ["`rejected`", "The provider refused; nothing charged"],
        ),
      ],
    },
    {
      id: "guide-search",
      title: "Search rides",
      blocks: [
        http("POST /transfers/search"),
        table(
          ["Field", "Required", "Notes"],
          ["`mode`", "Yes", "`one_way`, `round_trip` or `hourly`"],
          ["`start`", "Yes", '`{ "iata": "DXB" }` for an airport, `{ "address": "…" }`, or `{ "lat": …, "lng": … }`'],
          ["`end`", "Unless hourly", "Same forms as `start`"],
          ["`pickup_at`", "Yes", "Local time at the pickup, `YYYY-MM-DD HH:MM`"],
          ["`return_pickup_at`", "For `round_trip`", "Local time of the return pickup"],
          ["`hours`", "For `hourly`", "1–24, a car at your disposal"],
          ["`passengers`", "Yes", "1–50"],
          ["`flight_type`", "No", "`domestic` or `international`, for airport pickups"],
        ),
        json(searchRequest),
        p('Return: `"mode": "round_trip", "return_pickup_at": "2026-11-05 18:00"`. By the hour: `"mode": "hourly", "hours": 6` and no `end`.'),
        p("Response (sandbox: 33 quotes in 11 s; one shown):"),
        json(searchResponse),
        ul(
          "`price` is the whole ride for all passengers, what your deposit pays.",
          "`max_passengers` and `max_bags` are per vehicle; `num_vehicles` is how many the quote includes.",
          "`cancellation_deadline` is the last moment to cancel for the refund in `policy`. `online: false` rides cannot be cancelled through the API.",
          "`flight_info_required: true`: the booking must carry the flight number. `extra_pax_required: true`: it must name every passenger.",
          "`wait_minutes` is the free waiting time at pickup.",
          "Quotes are valid until `expires_at`. `GET /transfers/search/{search_id}` returns all quotes so far (call it while `more_coming` is true); an expired search answers `410 search_expired`. `GET /transfers/search/{search_id}/quotes/{quote_id}` returns one quote.",
        ),
      ],
    },
    {
      id: "guide-book",
      title: "Book a ride",
      blocks: [
        p("`POST /transfers/search/{search_id}/quotes/{quote_id}/book` pays from your deposit and books with the provider at once. **Send an `Idempotency-Key` header**; the same request with the same key returns the ride already booked."),
        table(
          ["Field", "Required", "Notes"],
          ["`passenger.first_name`, `last_name`", "Yes", "Lead passenger"],
          ["`passenger.email`", "Yes", "Confirmation and driver details go here"],
          ["`passenger.phone`", "Yes", "With country code, e.g. `+8801711000000`; the driver calls or texts it"],
          ["`passenger.country`", "Yes", "ISO code"],
          ["`extra_passengers[]`", "When `extra_pax_required`", '`{ "first_name", "last_name" }` for each other passenger'],
          ["`flight.airline`, `flight.number`", "When `flight_info_required`", "e.g. `EK` and `585`; the driver tracks the flight"],
          ["`return_flight`", "Round trip with `flight_info_required`", "Same shape"],
          ["`instructions`", "No", "Up to 300 characters for the driver"],
          ["`client_reference`", "No", "Your own reference"],
        ),
        http("POST /api/v1/transfers/search/trs_8vhdop9ilzvvjdpabo8r/quotes/trq_991e55f4e7381325158b81ca/book\nIdempotency-Key: docs-ride-001"),
        json(bookRequest),
        h("Response `201 Created` (3.6 s)"),
        json(bookResponse),
        p("Show the traveller `confirmation`, `pickup_instructions` (may contain simple HTML) and `driver_contact`."),
        table(
          ["HTTP", "error.code", "Meaning"],
          ["202", "(`status: pending`)", "Paid; the provider is confirming. Read the booking"],
          ["400", "`idempotency_key_required`", "Add the header"],
          ["422", "`validation_failed`", "See `errors` (flight number, extra passengers…)"],
          ["410", "`quote_expired`", "Search again"],
          ["402", "`insufficient_funds`", "Deposit too low; nothing charged"],
          ["409", "`supplier_refused`", "The provider declined; nothing charged; pick another quote"],
          ["409", "`duplicate_request`, `request_in_progress`", "Key reused, or still running"],
          ["503", "`supplier_unavailable`", "Nothing charged; retry"],
        ),
      ],
    },
    {
      id: "guide-read-list-cancel",
      title: "Read, list and cancel",
      blocks: [
        p('`GET /transfers/bookings/{booking_ref}` returns `{"booking": {…}}` as above. Another agency\'s reference answers `404 booking_not_found`.'),
        p("`GET /transfers/bookings`, newest first, 25 a page. Filters: `state` (`pending`, `confirmed`, `cancelled`, `rejected`), `client_reference`, `created_from`, `created_to` (`YYYY-MM-DD`), `page`, `per_page` (up to 100)."),
        h("Cancel"),
        p("`POST /transfers/bookings/{booking_ref}/cancel`, no body. The provider releases the ride and the share of the charge its `policy` gives at that notice returns to your deposit: all of it before `cancellation.free_until`, the tier's `refund_percent` after. `refund` says how much came back; it is zero when the provider reports it refunded nothing, and our team then follows it up. The sandbox cancellation of TFT-Y54HH32L (2 s):"),
        json(cancelResponse, "200 OK"),
        table(
          ["HTTP", "error.code", "Meaning"],
          ["409", "`too_late`", "No tier of the policy gives money back any more"],
          ["409", "`not_cancellable`", "This ride cannot be cancelled online (`cancellation.online: false`)"],
          ["503", "`supplier_unavailable`", "The provider did not confirm; the ride is unchanged; retry"],
        ),
      ],
    },
    {
      id: "guide-errors",
      title: "Errors and go-live",
      blocks: [
        h("Access errors"),
        table(
          ["HTTP", "error.code", "Fix"],
          ["401", "`unauthenticated`, `credential_inactive`", "Check the key and secret"],
          ["403", "`ip_whitelist_required`, `ip_not_whitelisted`", "Whitelist your server's IP"],
          ["403", "`product_not_allowed`", "The key is not enabled for transfers"],
          ["403", "`product_not_available`", "Transfers are not switched on for your agency"],
          ["403", "`partner_inactive`, `subscription_*`, `environment_not_activated`", "Account or plan not active; live keys work after certification"],
          ["429", "`rate_limited`", "Wait a minute"],
        ),
        p("**Retries.** `503`, `429` and timeouts are safe to retry. Retry booking only with the same `Idempotency-Key`."),
        h("Go-live checklist"),
        checklist(
          "`GET /ping` from your whitelisted server",
          "One-way search from an airport, a return search and an hourly search",
          "Quotes read again while `more_coming` is true",
          "Quotes shown with vehicle, capacity, waiting time and cancellation deadline",
          "Booking form asks for the flight number and extra passengers only when the quote requires them",
          "A ride booked with an `Idempotency-Key`; the repeat returns the same booking",
          "Confirmation, pickup instructions and driver contact shown to the traveller",
          "A ride cancelled before `free_until`, and the refund shown",
          "`402 insufficient_funds`, `410 quote_expired` and `409 too_late` shown in plain words",
        ),
        p("**Sandbox notes.** Sandbox rides go to the provider network's test system; confirmations are not real rides. Cancel sandbox rides you do not need."),
        p("Questions and certification: your account manager, or support from the agent portal."),
      ],
    },
  ],
};
