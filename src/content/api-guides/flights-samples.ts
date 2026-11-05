import type { JsonValue } from "@/types/catalog";
import { bdt } from "@/mocks/content/partner-api";

/**
 * Request and response samples from the Partner API flights guide,
 * copied as published. They are the single source for the guide, the endpoint
 * reference and the API console.
 */

export const pingResponse: JsonValue = {
  ok: true,
  partner: "PTR-000020",
  key_id: "ak_test_your_key_id",
  environment: "test",
  from_ip: "203.0.113.10",
  server_time: "2026-09-22T13:25:02+00:00",
};

export const searchOneWayRequest: JsonValue = {
  slices: [{ origin: "DAC", destination: "DXB", departure_date: "2026-10-22" }],
  passengers: { adults: 1, children: 1, infants: 1 },
  cabin: "economy",
  fares: "standard",
  filters: { max_offers: 20 },
};

export const searchRoundTripRequest: JsonValue = {
  slices: [
    { origin: "DAC", destination: "DXB", departure_date: "2026-10-22" },
    { origin: "DXB", destination: "DAC", departure_date: "2026-10-29" },
  ],
  passengers: { adults: 2, children: 1, infants: 0 },
  cabin: "economy",
  fares: "branded",
};

export const searchMultiCityRequest: JsonValue = {
  slices: [
    { origin: "DAC", destination: "DXB", departure_date: "2026-10-22" },
    { origin: "DXB", destination: "DOH", departure_date: "2026-10-29" },
    { origin: "DOH", destination: "DAC", departure_date: "2026-11-02" },
  ],
  passengers: { adults: 1 },
  cabin: "economy",
};

export const searchResponse: JsonValue = {
  search_id: "srh_01m34mpemkpjehfke5rdpwrd8q",
  expires_at: "2026-09-22T13:40:45Z",
  currency: "BDT",
  fares: "standard",
  passengers: { adults: 1, children: 1, infants: 1 },
  offers: [
    {
      offer_id: "ofr_01m34mpempz46w64zzecwd3p6z",
      total: bdt(9440600),
      price: {
        base: bdt(6417600),
        taxes: bdt(3023000),
        fees: bdt(0),
        service_fee: bdt(0),
      },
      passenger_prices: [
        {
          type: "adult",
          code: "ADT",
          count: 1,
          base: bdt(3375700),
          taxes: bdt(1469200),
          fees: bdt(0),
          each: bdt(4844900),
          subtotal: bdt(4844900),
        },
        { type: "child", code: "CHD", count: 1, each: bdt(3804100), subtotal: bdt(3804100) },
        { type: "infant", code: "INF", count: 1, each: bdt(791600), subtotal: bdt(791600) },
      ],
      passengers: { adults: 1, children: 1, infants: 1 },
      brand: {
        code: "ECONOMY_CLASSIC",
        name: "ECONOMY CLASSIC",
        tier: null,
        attributes: [
          { classification: "CheckedBag", inclusion: "Included" },
          { classification: "Refund", inclusion: "Chargeable" },
        ],
      },
      baggage: {
        checked: { pieces: null, weight_kg: 25 },
        cabin: { pieces: 1, weight_kg: 7 },
      },
      baggage_by_passenger: {
        adult: { checked: { pieces: null, weight_kg: 25 }, cabin: { pieces: 1, weight_kg: 7 } },
        child: { checked: { pieces: null, weight_kg: 25 }, cabin: { pieces: 1, weight_kg: 7 } },
      },
      conditions: {
        refundable: true,
        changeable: true,
        refund_fee: bdt(1731100),
        change_fee: bdt(989200),
      },
      ticketing_deadline: null,
      instant_ticket: false,
      carrier: "QR",
      seats_available: 9,
      itinerary_key: "itn_4267f9d93e7870fb",
      slices: [
        {
          origin: "DAC",
          destination: "DXB",
          duration_minutes: 1095,
          baggage: { checked: { pieces: null, weight_kg: 25 }, cabin: { pieces: 1, weight_kg: 7 } },
          segments: [
            {
              origin: "DAC",
              destination: "DOH",
              origin_terminal: "1",
              destination_terminal: null,
              departs_at: "2026-10-22T11:10:00",
              departs_at_utc: "2026-10-22T05:10:00Z",
              arrives_at: "2026-10-22T13:50:00",
              arrives_at_utc: "2026-10-22T10:50:00Z",
              marketing_carrier: "QR",
              operating_carrier: "QR",
              flight_number: "641",
              aircraft: "77W",
              cabin: "economy",
              booking_class: "O",
              duration_minutes: 340,
              seats_available: 9,
            },
            {
              origin: "DOH",
              destination: "DXB",
              departs_at: "2026-10-23T01:05:00",
              arrives_at: "2026-10-23T03:25:00",
              marketing_carrier: "QR",
              operating_carrier: "QR",
              flight_number: "1002",
              aircraft: "77W",
              cabin: "economy",
              booking_class: "O",
              duration_minutes: 80,
            },
          ],
        },
      ],
    },
  ],
};

export const offerResponse: JsonValue = {
  offer: { offer_id: "ofr_01m34mpempz46w64zzecwd3p6z", "…": "same shape as in search" },
};

export const priceConfirmedResponse: JsonValue = {
  status: "confirmed",
  offer: { offer_id: "ofr_01m34mpemkpjehfke5rdpwrd8r", total: bdt(6863200), "…": "the full offer" },
};

export const priceChangedResponse: JsonValue = {
  error: {
    code: "price_changed",
    message: "The airline has changed the price. The offer below carries the new price; book it to accept.",
  },
  offer: { offer_id: "ofr_…", total: bdt(6990000), "…": "…" },
};

export const rulesResponse: JsonValue = {
  rules: [
    { title: "Changes", text: "Before departure: not permitted.\nAfter departure: not permitted." },
    { title: "Refunds", text: "Before departure: not permitted.\nAfter departure: not permitted." },
    {
      title: "Fare family — Economy Basic",
      text: "Included: 05 Percent Miles Earned, Hand Bag, Food And Beverage.\nFor a fee: Standard Seat Selection, …",
    },
  ],
};

export const offerExtrasResponse: JsonValue = {
  offer_id: "ofr_01m34mpempz46w64zzecwd3p6z",
  travellers: [
    { position: 1, type: "adult" },
    { position: 2, type: "child" },
    { position: 3, type: "infant" },
  ],
  travel_dates: { first: "2026-10-22", last: "2026-10-23" },
  infant_min_days: 7,
  instant_ticket: false,
  passenger_requests: { frequent_flyer: false, wheelchair: true, wheelchair_price: null },
  extras: {
    baggage: [{ id: "anc_01m34…", label: "Extra bag 20 kg (DAC–DXB)", weight_kg: 20, price: bdt(450000) }],
    seats: [
      {
        origin: "DAC",
        destination: "DOH",
        carrier: "QR",
        flight_number: "641",
        all_or_none: false,
        columns: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
        rows: [
          {
            row: "10",
            seats: [
              {
                id: "anc_01m34n6ehrp4y2xd2b88xznwej",
                name: "10A",
                row: "10",
                column: "A",
                available: true,
                characteristics: ["chargeable", "bulkhead", "window"],
                price: bdt(0),
              },
            ],
          },
        ],
      },
    ],
    meals: [
      {
        origin: "DAC",
        destination: "DOH",
        carrier: "QR",
        flight_number: "all flights",
        options: [{ id: "anc_01m34mqcj8cxr9j4xv1drv4q9a", code: "BBML", label: "Baby meal", price: bdt(0) }],
      },
    ],
  },
};

export const bookingRequest: JsonValue = {
  offer_id: "ofr_01m34mpempz46w64zzecwd3p6z",
  travellers: [
    {
      type: "adult",
      title: "MR",
      given_name: "ARIF",
      family_name: "RAHMAN",
      gender: "M",
      date_of_birth: "1988-05-12",
      nationality: "BD",
      document: { type: "passport", number: "A01234567", issuing_country: "BD", expires_on: "2032-09-22" },
    },
    {
      type: "child",
      title: "MSTR",
      given_name: "AYAN",
      family_name: "RAHMAN",
      gender: "M",
      date_of_birth: "2018-09-22",
      nationality: "BD",
      document: { type: "passport", number: "A07654321", issuing_country: "BD", expires_on: "2032-09-22" },
    },
    {
      type: "infant",
      title: "MISS",
      given_name: "ANAYA",
      family_name: "RAHMAN",
      gender: "F",
      date_of_birth: "2025-10-22",
      nationality: "BD",
      document: { type: "passport", number: "A09876543", issuing_country: "BD", expires_on: "2032-09-22" },
    },
  ],
  contact: { email: "ops@agency.example", dial_code: "880", mobile: "1711000000" },
  client_reference: "DOCS-DEMO-003",
};

export const bookingResponse: JsonValue = {
  booking: {
    booking_ref: "TFL-Y678QNFB",
    state: "held",
    created_at: "2026-09-22T13:27:52Z",
    hold_expires_at: "2026-09-22T21:27:00Z",
    ticketed_at: null,
    client_reference: "DOCS-DEMO-003",
    airline_reference: "7EAQKO",
    gds_reference: "HN8TYB",
    validating_carrier: "QR",
    route: "DAC → DXB",
    total: bdt(9440600),
    price: { base: bdt(6417600), taxes: bdt(3023000), fees: bdt(0) },
    travellers: [
      {
        position: 1,
        type: "adult",
        title: "MR",
        given_name: "ARIF",
        family_name: "RAHMAN",
        date_of_birth: "1988-05-12",
        ticket_number: null,
        frequent_flyer: { number: "EK123456", carrier: "EK" },
        wheelchair: null,
      },
      {
        position: 2,
        type: "child",
        title: "MSTR",
        given_name: "AYAN",
        family_name: "RAHMAN",
        date_of_birth: "2018-09-22",
        ticket_number: null,
        frequent_flyer: null,
        wheelchair: { requested: true, remark: "Cannot climb stairs" },
      },
      {
        position: 3,
        type: "infant",
        title: "MISS",
        given_name: "ANAYA",
        family_name: "RAHMAN",
        date_of_birth: "2025-10-22",
        ticket_number: null,
        frequent_flyer: null,
        wheelchair: null,
      },
    ],
    extras: [
      { kind: "seat", label: "Seat 10A", traveller: 1, price: bdt(0), added_after_booking: false },
      { kind: "baggage", label: "Checked bag 20 kg · DAC–DXB", traveller: 1, price: bdt(450000), added_after_booking: false },
    ],
    tickets: [],
    slices: [{ origin: "DAC", destination: "DXB", duration_minutes: 1095, segments: ["… as in the offer …"] }],
    rejection_reason: null,
    after_sales: [],
  },
  warnings: [],
};

export const readBookingResponse: JsonValue = {
  booking: { booking_ref: "TFL-Y678QNFB", state: "held", "…": "the shape shown under Book" },
};

export const bookingExtrasResponse: JsonValue = {
  booking_ref: "TFL-Y678QNFB",
  available: true,
  travellers: [
    { position: 1, type: "adult" },
    { position: 2, type: "child" },
  ],
  extras: {
    baggage: [{ id: "anc_01m3…", label: "Checked bag 10 kg", weight_kg: 10, price: bdt(250000) }],
    seats: [],
    meals: [],
  },
};

export const addExtrasRequest: JsonValue = { extras: ["anc_01m3…:1"] };

export const addExtrasResponse: JsonValue = {
  status: "added",
  charged: bdt(250000),
  added_to_total: bdt(250000),
  pay_at_issue: false,
  booking: { "…": "…" },
};

export const acceptFareChangeRequest: JsonValue = {
  accept_fare_change: true,
  expected_total: bdt(9512300),
};

export const issueResponse: JsonValue = {
  status: "ticketed",
  booking: {
    booking_ref: "TFL-Y678QNFB",
    state: "ticketed",
    ticketed_at: "2026-09-22T13:28:45Z",
    airline_reference: "7EAQKO",
    gds_reference: "HN8TYB",
    total: bdt(9440600),
    tickets: [
      { position: 1, number: "1572134359166", issued_at: "2026-09-22T13:28:45Z" },
      { position: 2, number: "1572134359165", issued_at: "2026-09-22T13:28:45Z" },
      { position: 3, number: "1572134359167", issued_at: "2026-09-22T13:28:45Z" },
    ],
    "…": "the rest of the booking, with ticket_number on each traveller",
  },
};

export const listBookingsResponse: JsonValue = {
  bookings: [{ booking_ref: "TFL-Y678QNFB", state: "held", "…": "…" }],
  page: 1,
  per_page: 5,
  total: 1,
  last_page: 1,
};

export const cancelRequest: JsonValue = { reason: "Customer changed plans" };

export const cancelResponse: JsonValue = {
  status: "cancelled",
  booking: { booking_ref: "TFL-…", state: "cancelled", "…": "…" },
};

export const afterSalesRequestObject: JsonValue = {
  request_id: "01a0c94e-618a-71c6-81bc-19d403d07a93",
  kind: "void",
  status: "requested",
  mode: "manual",
  created_at: "2026-09-22T13:29:12Z",
  quote: null,
  quote_note: null,
  quote_expires_at: null,
  settled: null,
};

export const refundQuoteResponse: JsonValue = {
  available: true,
  refund: bdt(2200000),
  penalties: bdt(800000),
  service_charge: bdt(100000),
  net: bdt(2100000),
  tickets: ["1572134359166"],
};

export const refundRequest: JsonValue = { mode: "auto", reason: "Trip cancelled" };

export const afterSalesAnswer: JsonValue = { request: { "…": "…" }, booking: { "…": "…" } };

export const voidResponse: JsonValue = {
  request: {
    request_id: "01a0c94e-618a-71c6-81bc-19d403d07a93",
    kind: "void",
    status: "requested",
    mode: "manual",
    "…": "…",
  },
  booking: {
    booking_ref: "TFL-Y678QNFB",
    state: "ticketed",
    after_sales: [{ kind: "void", status: "requested", "…": "…" }],
    "…": "…",
  },
};

export const reissueSearchRequest: JsonValue = { travellers: [1, 2, 3], dates: ["2026-10-29"] };

export const reissueSearchResponse: JsonValue = {
  exchanges: false,
  travellers: [1, 2, 3],
  dates: ["2026-10-29"],
  offers: [
    {
      offer_id: "ofr_01m34mwr1a0zywbzyex186g74n",
      carrier: "QR",
      total: bdt(9242700),
      slices: ["…"],
      "…": "offer shape as in search",
    },
  ],
};

export const reissueRequest: JsonValue = {
  offer_id: "ofr_01m34mwr1a0zywbzyex186g74n",
  mode: "auto",
  remark: "Passenger moves to 29 Oct",
};

export const quoteAcceptRequest: JsonValue = { accept: true };

export const balanceResponse: JsonValue = {
  partner_code: "PTR-000020",
  currency: "BDT",
  balance: bdt(20000000),
};

export const validationErrorResponse: JsonValue = {
  error: { code: "validation_failed", message: "The request is malformed; see errors for the fields." },
  errors: { "travellers.1.type": ["This traveller must be of the type the offer lists at this position."] },
};
