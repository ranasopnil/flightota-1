import type { JsonValue } from "@/types/catalog";
import type { ApiGuide } from "@/types/content";
import { bdt, checklist, h, http, json, ol, p, PARTNER_PRODUCTION_URL, PARTNER_SANDBOX_URL, table, ul } from "./partner-api";

/** Samples from the Partner API hotels guide, as published. */
export const pingResponse: JsonValue = {
  ok: true,
  partner: "PTR-000020",
  key_id: "ak_test_your_key_id",
  environment: "test",
  from_ip: "203.0.113.10",
  server_time: "2026-09-22T13:25:02+00:00",
};

export const destinationsResponse: JsonValue = {
  term: "Dubai",
  destinations: [
    { id: "loc_01m34q6gd14nc2ea9q39tbq8z0", name: "Dubai", full_name: "Dubai, Dubai, United Arab Emirates", type: "city", country: "AE" },
    { id: "loc_01m34q6gd14nc2ea9q39tbq8z1", name: "Dubai (and vicinity)", full_name: "Dubai (and vicinity), Dubai, United Arab Emirates", type: "multiCity", country: "AE" },
    { id: "loc_01m34q6gd14nc2ea9q39tbq8z2", name: "Dubai (DXB-Dubai Intl.)", full_name: "Dubai, United Arab Emirates (DXB-Dubai Intl.)", type: "airport", country: "AE" },
  ],
};

export const searchRequest: JsonValue = {
  location_id: "loc_01m34q6gd14nc2ea9q39tbq8z0",
  check_in: "2026-10-27",
  check_out: "2026-10-29",
  rooms: [{ adults: 2, children: 1, child_ages: [7] }],
  nationality: "BD",
  filters: { max_offers: 20 },
};

export const searchResponse: JsonValue = {
  search_id: "srh_01m34q7w1fmxw6tgp917fwnqrt",
  expires_at: "2026-09-22T14:25:13Z",
  currency: "BDT",
  offers: [
    {
      offer_id: "ofr_01m34q7w1fmxw6tgp917fwnqrv",
      hotel_key: "htl_3e344d6c950e8809",
      hotel_country: "AE",
      total: bdt(900792),
      price: { base: bdt(900792), taxes: bdt(0), fees: bdt(0), per_night: bdt(450396) },
      hotel: {
        name: "Royal Tulip Hotel",
        star_rating: 3,
        address: "Opposite Delhi Resturant, Al Murar area Deira 116957 Dubai United Arab Emirates",
        city: "Dubai",
        country_code: "AE",
        coordinates: { lat: 25.276138, long: 55.31023 },
        thumbnail: "https://…/hotelImage.aspx?id=88054978",
        images: ["https://…", "…"],
        description: "With a stay at Royal Tulip Hotel in Dubai (Deira), you'll be convenient to Naif Souq and Gold Souk…",
        check_in_time: null,
        check_out_time: null,
        property_type: "Hotel",
        amenities: ["…"],
        review: { "…": "…" },
      },
      refundable: true,
      free_cancellation: true,
      free_breakfast: false,
      pay_at_hotel: false,
      more_rates: true,
      sold_out: false,
    },
  ],
};

export const roomsResponse: JsonValue = {
  rooms_id: "srh_01m34q8qy2jd0tvbw50j887d1k",
  expires_at: "2026-09-22T14:25:42Z",
  currency: "BDT",
  rates: [
    {
      offer_id: "ofr_01m34qg0zz8d40ew1ab159b48f",
      hotel_country: "AE",
      total: bdt(1900946),
      price: { base: bdt(1900946), per_night: bdt(950473), taxes: bdt(0), fees: bdt(0) },
      room: { name: "Standard Room", image: "https://…/3e7bcff9_b.jpg", beds: ["1 Double or 1 Twin"], max_adults: null },
      board_basis: "Room Only",
      includes: [],
      notes: ["Upon your arrival please provide valid government-issued ID to the hotel front desk…"],
      occupancy: { adults: 2, children: 1 },
      refundable: true,
      free_cancellation: false,
      pay_at_hotel: false,
      deposit_required: false,
      cancellation: [
        { from: "2026-09-22T00:00:00Z", until: "2026-10-24T19:59:00Z", amount: bdt(0), percent: null },
        { from: "2026-10-24T20:00:00Z", until: "2026-10-29T00:00:00Z", amount: bdt(1900946), percent: null },
      ],
      booking_modes: ["hold", "confirm"],
      hold_deadline: null,
    },
  ],
};

export const rateCheckResponse: JsonValue = {
  status: "confirmed",
  quoted: bdt(1900946),
  rate: { offer_id: "ofr_01m34qg0zz8d40ew1ab159b48f", total: bdt(1900946), "…": "the full rate" },
  hold: { available: true, deadline: "2026-10-23T14:29:00Z" },
  requirements: { passport_required: false, pan_required: false, pan_for_all_guests: false },
};

export const bookingRequest: JsonValue = {
  hotel_offer_id: "ofr_01m34q7w1fmxw6tgp917fwnqrv",
  rate_id: "ofr_01m34q8qy88vwza13395cqh6bn",
  hold: true,
  rooms: [
    {
      guests: [
        { type: "adult", title: "MR", first_name: "Arif", last_name: "Rahman", nationality: "BD", passport_number: "A01234567" },
        { type: "adult", title: "MRS", first_name: "Nusrat", last_name: "Rahman", nationality: "BD" },
        { type: "child", title: "MSTR", first_name: "Ayan", last_name: "Rahman", nationality: "BD", date_of_birth: "2019-09-22" },
      ],
    },
  ],
  contact: { email: "ops@agency.example", dial_code: "880", mobile: "1711000000" },
  special_requests: "Late arrival, around 23:00",
  client_reference: "DOCS-HOTEL-001",
};

export const bookingResponse: JsonValue = {
  status: "held",
  booking: {
    booking_ref: "TFH-WD5BD2P4",
    state: "held",
    created_at: "2026-09-22T14:11:36Z",
    confirmed_at: null,
    hold_expires_at: "2026-10-23T14:29:00Z",
    client_reference: "DOCS-HOTEL-001",
    hotel_confirmation: null,
    needs_attention: false,
    total: bdt(1900946),
    price: { room_rate: bdt(1900946), taxes: bdt(0) },
    hotel: {
      name: "Royal Tulip Hotel",
      star_rating: 3,
      address: "Opposite Delhi Resturant, Al Murar area Deira 116957 Dubai United Arab Emirates",
      city: "Dubai",
      country_code: "AE",
      phone: null,
      check_in_time: null,
      check_out_time: null,
    },
    stay: {
      check_in: "2026-10-27",
      check_out: "2026-10-29",
      nights: 2,
      rooms: [{ adults: 2, children: 1, child_ages: [7] }],
      nationality: "BD",
    },
    room: {
      name: "Standard Room",
      board_basis: "Room Only",
      refundable: true,
      cancellation: ["Free cancellation until 24 Oct 2026", "From 24 Oct 2026 to 29 Oct 2026: 19,009.46 BDT charge"],
    },
    guests: [
      { position: 1, type: "adult", title: "MR", first_name: "ARIF", last_name: "RAHMAN" },
      { position: 2, type: "adult", title: "MRS", first_name: "NUSRAT", last_name: "RAHMAN" },
      { position: 3, type: "child", title: "MSTR", first_name: "AYAN", last_name: "RAHMAN" },
    ],
    special_requests: "Late arrival, around 23:00",
    cancellation: null,
  },
};

export const readBookingResponse: JsonValue = { booking: { booking_ref: "TFH-WD5BD2P4", state: "held", "…": "the shape shown under Book" } };

export const listResponse: JsonValue = {
  bookings: [{ booking_ref: "TFH-WD5BD2P4", state: "cancelled", "…": "…" }],
  page: 1,
  per_page: 25,
  total: 1,
  last_page: 1,
};

export const payResponse: JsonValue = {
  status: "confirmed",
  booking: {
    booking_ref: "TFH-WD5BD2P4",
    state: "confirmed",
    confirmed_at: "2026-09-22T14:12:57Z",
    hotel_confirmation: "TestBooking",
    "…": "…",
  },
};

export const cancellationResponse: JsonValue = {
  cancellable: true,
  reason: null,
  refundable: true,
  rules: ["Free cancellation until 24 Oct 2026", "From 24 Oct 2026 to 29 Oct 2026: 19,009.46 BDT charge"],
  free_until: "2026-10-24T19:59:00+00:00",
  total: bdt(1900946),
  charge: bdt(0),
  service_charge: bdt(0),
  refund: bdt(1900946),
};

export const cancelRequest: JsonValue = { reason: "Guest cancelled the trip" };

export const cancelResponse: JsonValue = {
  status: "cancelled",
  refund: bdt(1900946),
  booking: {
    booking_ref: "TFH-WD5BD2P4",
    state: "cancelled",
    cancellation: { cancelled_at: "2026-09-22T14:13:17+00:00", charge: bdt(0), refund: bdt(1900946) },
    "…": "…",
  },
};

const validationError: JsonValue = {
  error: { code: "validation_failed", message: "The request is malformed; see errors for the fields." },
  errors: { "rooms.0.guests.0.pan_number": ["An Indian lead guest needs to give a PAN card number."] },
};

export const hotelsGuide: ApiGuide = {
  title: "Partner API — Hotels",
  intro:
    "One REST API finds, books and cancels hotel stays worldwide, paid from your FlightOTA deposit. Every example below is a real call made on the sandbox on 22 Sep 2026. The flights API uses the same keys and conventions.",
  sections: [
    {
      id: "guide-getting-started",
      title: "Getting started",
      blocks: [
        table(
          ["Environment", "Base URL", "Key prefix", "Use"],
          ["Sandbox", `\`${PARTNER_SANDBOX_URL}\``, "`ak_test_`", "Build and certify. Hotel test systems, test deposit"],
          ["Production", `\`${PARTNER_PRODUCTION_URL}\``, "`ak_live_`", "Real stays, real money. Switched on after certification"],
        ),
        ol(
          "**Get a key** in the agent portal under **API access**, enabled for **hotels**. The secret is shown once.",
          "**Whitelist your server's public IP** on the key. Never call the API from a browser or app.",
          "**Send the two headers** on every request:",
        ),
        http("X-Api-Key: ak_test_your_key_id\nX-Api-Secret: <your secret>\nAccept: application/json\nContent-Type: application/json"),
        p("4. **Call `GET /ping` first.** It returns your agency code and the IP we saw."),
        h("Conventions"),
        ul(
          '**Money** is `{"amount": <integer minor units>, "currency": "BDT"}`: `1900946` is 19,009.46 BDT. Always your billing currency. A key can take them in currency units instead (`15161.94`): switch **Amounts** on the key on the API access page; prices you send back (`expected_total`, `accept_total`) are then read in currency units too.',
          "**Dates** are `YYYY-MM-DD`; check-in and check-out are hotel-local days. Other times (`expires_at`, `hold_expires_at`, cancellation windows) are UTC, RFC 3339.",
          "**IDs are ours:** `loc_…` destination, `srh_…` search, `ofr_…` hotel offer or room rate, `TFH-XXXXXXXX` booking (stays booked before 28 Sep 2026 keep their `HT-` reference). The hotel's own confirmation number is `hotel_confirmation`.",
          "**Unknown is `null`.** `refundable: null` means the hotel did not say.",
          "**Ignore fields you do not know**; new ones are added without notice.",
          '**Errors** are `{"error": {"code": "…", "message": "…"}}`. Branch on `code`.',
        ),
      ],
    },
    {
      id: "guide-booking-flow",
      title: "Booking flow",
      blocks: [
        p("A stay takes five calls: find the destination, search hotels, list one hotel's rooms, re-check the chosen rate, book. A booking is either **paid now** (confirmed with the hotel at once) or **held** where the rate allows it, then paid before its deadline."),
        table(
          ["Step", "Call", "Required"],
          ["1", "`GET /hotels/destinations?term=`", "Recommended (or search by name)"],
          ["2", "`POST /hotels/search`", "Yes"],
          ["3", "`GET /hotels/offers/{offer_id}/rooms`", "Yes"],
          ["4", "`GET /hotels/rates/{rate_id}/price`", "Recommended: tells you if the room can be held and what the guests must give"],
          ["5", "`POST /hotels/bookings`", "Yes"],
          ["6", "`POST /hotels/bookings/{ref}/pay`", "For a hold, before `hold_expires_at`"],
          ["After", "`GET …/cancellation`, `POST …/cancel`", "When needed"],
        ),
        h("Stay states"),
        table(
          ["state", "Meaning", "What you can do"],
          ["`held`", "Room held, not paid; `hold_expires_at` set", "Pay, or cancel (free)"],
          ["`pending`", "Paid; the hotel has not confirmed yet", "Read it again"],
          ["`confirmed`", "The hotel confirmed; `hotel_confirmation` set", "Cancel under the hotel's rules"],
          ["`cancelled`", "Cancelled; `cancellation` shows charge and refund", "Nothing"],
          ["`expired`", "A hold that was not paid in time", "Book again"],
          ["`rejected`", "The hotel declined", "Book again"],
        ),
        p("If a paid booking is not confirmed by the hotel straight away, the answer is `requested` and `needs_attention: true`: the money stays with us and our team confirms the stay or finds an alternative. It is never refunded automatically. There are no webhooks yet; read `GET /hotels/bookings/{ref}` to follow a stay."),
      ],
    },
    {
      id: "guide-destinations-search",
      title: "Destinations and search",
      blocks: [
        h("Find a destination"),
        p("`GET /hotels/destinations?term=Dubai` (at least 2 characters). Use the `id` in the search; ids are valid for about an hour, so look them up as the user types."),
        json(destinationsResponse),
        h("Search hotels"),
        p("`POST /hotels/search` asks every hotel source at once, 10–40 seconds. Results stay bookable for 15 minutes."),
        table(
          ["Field", "Required", "Notes"],
          ["`location_id`", "One of these two", "A `loc_…` id from destinations"],
          ["`destination`", "One of these two", "A place name, when you have no id"],
          ["`check_in`, `check_out`", "Yes", "`YYYY-MM-DD`; check-out after check-in"],
          ["`rooms[]`", "Yes, 1–6", "One entry per room"],
          ["`rooms[].adults`", "Yes", "1–8"],
          ["`rooms[].children`", "No", "0–6"],
          ["`rooms[].child_ages[]`", "With children", "Age of each child on check-in, 0–17"],
          ["`nationality`", "Recommended", "Lead guest's nationality, ISO code. Prices and PAN rules depend on it"],
          ["`residence`", "No", "Defaults to `nationality`"],
          ["`filters.max_offers`", "No", "1–100, default 50"],
        ),
        p("Request (2 adults and a 7-year-old, one room, 2 nights):"),
        json(searchRequest),
        p('Two rooms: `"rooms": [ { "adults": 2 }, { "adults": 1, "children": 1, "child_ages": [4] } ]`.'),
        p("Response (sandbox: 20 hotels in 34 s; one shown, long fields cut):"),
        json(searchResponse),
        ul(
          "`total` is the cheapest stay at this hotel for the whole search (all rooms, all nights), in your currency, and is what your deposit pays. `per_night` is a guide.",
          "`refundable`, `free_cancellation` and `free_breakfast` describe the cheapest rate; other rates may differ. `more_rates: true` means the rooms list has more options.",
          "`hotel_key` is the same for the same property across searches and sources. Use it to de-duplicate or cache hotel content.",
          "`GET /hotels/search/{search_id}` returns the same results again while valid; an expired one answers `410 offer_expired`.",
        ),
      ],
    },
    {
      id: "guide-rooms-rate-check",
      title: "Rooms and rate check",
      blocks: [
        h("Rooms and rates of one hotel"),
        p("`GET /hotels/offers/{offer_id}/rooms`. Each rate has its own `offer_id`: that is the `rate_id` you book. Sandbox: 171 rates for Royal Tulip in 10 s."),
        json(roomsResponse),
        ul(
          "`board_basis`: Room Only, Bed & Breakfast, Half Board, Full Board, All Inclusive.",
          "`cancellation` lists what cancelling costs in each window: `amount` (or `percent`) charged if you cancel between `from` and `until`. An amount of 0 is free cancellation.",
          "`booking_modes`: `confirm` means pay now and confirm; `hold` means the room may be held and paid later. Whether a hold is really possible is decided by the rate check below.",
          "`notes` are the hotel's own conditions (tourism fees paid at the hotel, ID at check-in). Show them before booking.",
        ),
        h("Re-check a rate"),
        p("`GET /hotels/rates/{rate_id}/price` asks the hotel again. Call it before collecting guest details."),
        json(rateCheckResponse),
        ul(
          "`status: price_changed` means `rate.total` is the new price and `quoted` the old one. Book with `accept_total` set to the new total to accept it.",
          "`hold.available: true` means you may book with `hold: true` and pay by `hold.deadline`.",
          "`requirements.passport_required`: the lead guest's passport number is needed. `pan_required`: an Indian lead guest must give a PAN; `pan_for_all_guests`: every Indian guest must.",
          "`410 offer_expired` means search again; `409 unavailable` means the room is gone.",
        ),
      ],
    },
    {
      id: "guide-book",
      title: "Book a stay",
      blocks: [
        p('`POST /hotels/bookings` books one rate. The rate is priced again first; your request never names a price. Without `hold`, the stay is paid from your deposit and confirmed with the hotel in the same call (up to about a minute). With `"hold": true` (only where the rate check said `hold.available`), nothing is charged until you pay.'),
        p("**Send an `Idempotency-Key` header**, unique per booking attempt. Repeating the request with the same key returns the booking already made. A rate can be booked only once: to book a second room of the same kind, fetch the rooms again for fresh rate ids."),
        h("Request fields"),
        table(
          ["Field", "Required", "Notes"],
          ["`hotel_offer_id`", "Yes", "The hotel's `offer_id` from search"],
          ["`rate_id`", "Yes", "The rate's `offer_id` from rooms"],
          ["`hold`", "No", "`true` to hold and pay later, where allowed"],
          ["`rooms[]`", "Yes", "One entry per searched room, in the same order"],
          ["`rooms[].guests[]`", "Yes", "Every guest of that room: exactly the adults and children it was searched for"],
          ["`guests[].type`", "Yes", "`adult` (12 or over on check-in) or `child`; as many of each as the room was searched for"],
          ["`guests[].title`", "Yes", "`MR`, `MRS`, `MS`, `MISS`, `MSTR`"],
          ["`guests[].first_name`, `last_name`", "Yes", "Letters, spaces, hyphens, apostrophes"],
          ["`guests[].nationality`", "No", "ISO code; defaults to the search nationality"],
          ["`guests[].date_of_birth`", "No", "`YYYY-MM-DD`; must fit adult or child on check-in. A child's must fit the age it was searched at: the room's first child is its first `child_ages`, and so on"],
          ["`guests[].passport_number`", "Lead guest, when `requirements.passport_required`", ""],
          ["`guests[].passport_expiry`", "No", "Must be after check-out"],
          ["`guests[].pan_number`", "Indian lead guest when `pan_required`; every Indian guest when `pan_for_all_guests`", "Format `ABCDE1234F`. Never needed for other nationalities"],
          ["`contact.email`, `dial_code`, `mobile`", "Yes", "For the hotel and the voucher. `mobile` digits only"],
          ["`contact.name`", "No", "Defaults to the lead guest"],
          ["`special_requests`", "No", "Up to 500 characters; passed to the hotel, not guaranteed"],
          ["`arrival_time`", "No", "e.g. `23:00`"],
          ["`accept_total`", "No", "Integer minor units (currency units on a key with **Amounts** switched): accept a changed price up to this total"],
          ["`client_reference`", "No", "Your own reference, up to 64 characters"],
        ),
        h("Request"),
        p("The sandbox call that made TFH-WD5BD2P4 (a hold):"),
        http("POST /api/v1/hotels/bookings\nIdempotency-Key: docs-hotel-001"),
        json(bookingRequest),
        h("Response `201 Created`"),
        p("Every stay call below returns this booking shape."),
        json(bookingResponse),
        table(
          ["HTTP", "status", "Meaning"],
          ["201", "`confirmed`", "Paid and confirmed by the hotel; `hotel_confirmation` set"],
          ["201", "`pending`", "Paid; confirmation is on its way. Read the booking"],
          ["201", "`held`", "Held, nothing charged; pay before `hold_expires_at`"],
          ["202", "`requested`", "Paid, but the hotel did not confirm at once. Our team is on it (`needs_attention: true`)"],
          ["200", "(no status)", "The same request repeated with the same key"],
        ),
        h("When booking is refused"),
        p("Nothing is charged in any of these."),
        table(
          ["HTTP", "error.code", "What to do"],
          ["400", "`idempotency_key_required`", "Add the header"],
          ["422", "`validation_failed`", "See `errors`; for example `rooms.0.guests.0.pan_number`"],
          ["410", "`offer_expired`", "Search again"],
          ["409", "`price_changed`", "`total` is the new price; send `accept_total` with it to accept"],
          ["409", "`room_unavailable`", "Sold out; choose another rate"],
          ["409", "`hold_unavailable`", "This rate cannot be held; book without `hold`"],
          ["409", "`hold_refused`", "The hotel would not hold it now; book without `hold` or retry"],
          ["402", "`insufficient_funds`", "Top up your deposit"],
          ["409", "`rate_already_booked`", "This rate id was already booked (as `booking_ref`); fetch rooms again"],
          ["409", "`duplicate_request`", "The key was used with a different body"],
          ["409", "`offer_unavailable`", "The room cannot be booked now; choose another"],
        ),
      ],
    },
    {
      id: "guide-read-pay-cancel",
      title: "Read, pay, cancel",
      blocks: [
        h("Read one stay"),
        p('`GET /hotels/bookings/{booking_ref}` returns `{"booking": {…}}` in the shape shown under Book. Another agency\'s reference answers `404 booking_not_found`.'),
        h("List stays"),
        p("`GET /hotels/bookings`, newest first, 25 a page."),
        table(
          ["Query parameter", "Notes"],
          ["`state`", "`held`, `pending`, `confirmed`, `cancelled`, `expired`, `rejected`"],
          ["`client_reference`", "Your own reference"],
          ["`created_from`, `created_to`", "`YYYY-MM-DD`"],
          ["`page`, `per_page`", "`per_page` up to 100"],
        ),
        json(listResponse),
        h("Pay a held stay"),
        p("`POST /hotels/bookings/{booking_ref}/pay`, no body, before `hold_expires_at`. The deposit pays and the hotel confirms. The sandbox payment of TFH-WD5BD2P4 (60 s):"),
        json(payResponse, "200 OK"),
        p("(`TestBooking` is the hotel test system's confirmation; live stays carry the hotel's real number.)"),
        table(
          ["HTTP", "Answer", "Meaning"],
          ["200", "`confirmed` or `pending`", "Paid"],
          ["202", "`requested`", "Paid; our team is confirming with the hotel"],
          ["409", "`hold_expired`", "Too late; search again"],
          ["402", "`insufficient_funds`", "Top up; nothing charged"],
          ["409", "`invalid_state`", "Not a held stay"],
        ),
        h("What cancelling would cost"),
        p("`GET /hotels/bookings/{booking_ref}/cancellation` changes nothing. For TFH-WD5BD2P4 after payment:"),
        json(cancellationResponse),
        p("`charge` is what the hotel keeps if you cancel now, `service_charge` our cancellation fee, and `refund` what returns to your deposit. `cancellable: false` comes with a `reason`."),
        h("Cancel"),
        p('`POST /hotels/bookings/{booking_ref}/cancel`, body optional `{"reason": "Guest cancelled the trip"}`.'),
        ul(
          "A **held** stay is released; nothing was charged, `refund` is 0.",
          "A **confirmed** stay is cancelled with the hotel under its rules, and `refund` is paid back to your deposit at once.",
        ),
        p("The sandbox cancellation of TFH-WD5BD2P4:"),
        json(cancelResponse, "200 OK"),
        p("`409 not_cancellable` carries the reason (for example, a non-refundable rate the hotel will not cancel). `503 supplier_unavailable` means the hotel did not confirm the cancellation; the stay is unchanged, so retry."),
      ],
    },
    {
      id: "guide-errors",
      title: "Errors",
      blocks: [
        p("Every error has the same envelope; validation errors add `errors` by field."),
        json(validationError),
        h("Access"),
        table(
          ["HTTP", "error.code", "Fix"],
          ["401", "`unauthenticated`", "Headers missing, or key or secret wrong"],
          ["401", "`credential_inactive`", "Key revoked or expired"],
          ["403", "`ip_whitelist_required`, `ip_not_whitelisted`", "Whitelist your server's IP on the key"],
          ["403", "`product_not_allowed`", "The key is not enabled for hotels"],
          ["403", "`partner_inactive`, `subscription_*`, `environment_not_activated`", "Account or API plan not active; live keys work after certification"],
          ["429", "`rate_limited`", "Wait a minute"],
        ),
        h("Hotel codes"),
        table(
          ["HTTP", "error.code", "Where", "Meaning"],
          ["422", "`validation_failed`", "any", "See `errors`"],
          ["410", "`offer_expired`", "rooms, price, book", "Search again"],
          ["409", "`offer_unavailable`", "rooms, book", "Hotel or room not bookable now"],
          ["409", "`unavailable`", "price", "Rate gone"],
          ["409", "`price_changed`", "book", "New `total` attached; send `accept_total`"],
          ["409", "`room_unavailable`", "book", "Sold out"],
          ["409", "`hold_unavailable`, `hold_refused`", "book", "Book without `hold`"],
          ["409", "`rate_already_booked`", "book", "Fetch rooms again for fresh rate ids"],
          ["400", "`idempotency_key_required`", "book", "Add the header"],
          ["409", "`duplicate_request`, `request_in_progress`", "book, pay", "Key reused, or still running"],
          ["402", "`insufficient_funds`", "book, pay", "Deposit too low; nothing charged"],
          ["404", "`booking_not_found`", "bookings", "Unknown, or not your agency's"],
          ["409", "`hold_expired`", "pay", "Hold lapsed"],
          ["409", "`invalid_state`, `not_cancellable`", "pay, cancel", "Not allowed in the current state; see `message`"],
          ["503", "`supplier_unavailable`, `pricing_unavailable`", "any", "Nothing changed; retry"],
        ),
        p("**Retries.** `503`, `429` and timeouts are safe to retry. Retry booking only with the same `Idempotency-Key`."),
      ],
    },
    {
      id: "guide-go-live",
      title: "Go-live checklist",
      blocks: [
        p("Run these on the sandbox and send us the `booking_ref`s; we then switch on your live key."),
        checklist(
          "`GET /ping` from your whitelisted server",
          "Destination lookup while the user types, and a search by `location_id`",
          "Search with two rooms, one of them with a child and its age",
          "Rooms list shown with board basis, cancellation windows and hotel notes",
          "Rate re-checked before the guest form; `price_changed` handled with `accept_total`",
          "Guest form follows `requirements` (passport, PAN only for Indian guests)",
          "A stay booked and paid now, with an `Idempotency-Key`; the repeat returns the same booking",
          "A stay held (where offered), then paid with `/pay`",
          "A held stay cancelled",
          "A confirmed stay's cancellation previewed, then cancelled, and the refund shown",
          "`402 insufficient_funds`, `410 offer_expired` and `409 room_unavailable` shown in plain words",
          '`requested` / `needs_attention` shown to your user as "being confirmed by FlightOTA"',
          "Money shown from minor units with the right decimals",
        ),
        p("**Sandbox notes.** Sandbox stays go to hotel test systems: confirmations such as `TestBooking` are not real, the deposit is test money, and test systems are slower (paying a hold took about a minute). Unpaid sandbox holds lapse on their own."),
        p("Questions and certification: your account manager, or support from the agent portal."),
      ],
    },
  ],
};
