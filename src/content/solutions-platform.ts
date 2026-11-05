import type { TravelSolution } from "@/types/solutions";

/** Platform licences (hosted products), after the portal development solutions. */
export const platformSolutions: TravelSolution[] = [

  {
    slug: "b2b-travel-portal",
    seo: { image: "/images/og/b2b_portal.jpg" },
    group: "platform",
    title: "B2B Travel Agent Portal & Sub-Agent Distribution",
    tagline: "Multi-Tier B2B Travel Distribution Platform",
    eyebrow: "B2B TRAVEL PLATFORM",
    badge: "Sub-Agent Network & Wallets",
    badgeTone: "sky",
    description:
      "Empower your travel agency network with a dedicated B2B distribution system. Onboard hundreds of child agencies, assign custom markups by airline or route, manage agent credit limits, and issue instant PNR tickets with automated deposit wallet balances.",
    heroImage: "/images/solutions/b2b_portal.jpg",
    metrics: [
      { label: "Sub-Agent Capacity", value: "Unlimited" },
      { label: "Markup Precision", value: "Airline & Route" },
      { label: "Settlement Speed", value: "Instant Wallet" },
      { label: "Ticket Issuance", value: "Automated PNR" },
    ],
    keyBenefits: [
      {
        title: "Multi-Tier Agent Hierarchy",
        desc: "Create Master Consolidator, Main Agent, and Sub-Agent hierarchies with individual staff logins, department permissions, and branch control.",
        icon: "Users",
      },
      {
        title: "Dynamic Markup Management",
        desc: "Apply flat fees or percentage markups dynamically across flights (GDS vs LCC), hotel bed banks, and packages without disclosing net costs.",
        icon: "Percent",
      },
      {
        title: "B2B Deposit Wallet & Credit Limits",
        desc: "Real-time ledger verifying wallet funds before ticketing. Includes automated bank deposit slips, top-up receipts, and credit line alerts.",
        icon: "Wallet",
      },
      {
        title: "White-Label Agent Vouchers",
        desc: "Sub-agents download e-tickets and hotel confirmation vouchers formatted exclusively with their own company logo and contact details.",
        icon: "FileCheck",
      },
    ],
    coreCapabilities: [
      "Role-based staff logins with audit logs and IP restrictions",
      "Instant PNR void and cancellation within 24-hour window",
      "Comprehensive commission ledger and automated sales invoices",
      "Pre-integrated 700+ GDS & NDC airlines, 1.2M+ global hotel rooms",
      "Direct GDS queue monitoring and schedule change sync alerts",
      "Exportable financial reports in CSV, PDF, and accounting formats",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Agent Registration & Verification",
        desc: "Consolidator approves trade license, agency documents, and sets initial credit threshold or prepaid deposit balance.",
      },
      {
        step: "02",
        title: "Rule-Based Markup Configuration",
        desc: "Define distinct markup profiles based on agent volume tier, cabin class, route corridors, or preferred supplier contracts.",
      },
      {
        step: "03",
        title: "Search, Book & Instant Ticketing",
        desc: "Sub-agent searches inventory across GDS and bed banks; upon checkout, the system deducts net fare from wallet and issues ticket.",
      },
      {
        step: "04",
        title: "Automated Reconciliation & Reports",
        desc: "Consolidator mid-office generates monthly transaction statements, commission payout receipts, and tax invoices.",
      },
    ],
    faqs: [
      {
        question: "Can sub-agents have different markups for different airlines?",
        answer:
          "Yes. Our markup engine allows you to define granular rules by airline carrier (e.g. Biman vs Emirates), origin/destination country, cabin class, and supplier type.",
      },
      {
        question: "How does the agent deposit wallet work?",
        answer:
          "Sub-agents can top up their wallet via bank transfer, payment gateway, or corporate credit line. The balance is locked and decremented in real time during ticketing.",
      },
      {
        question: "Do sub-agents need their own IATA accreditation?",
        answer:
          "No. All bookings are processed through the master consolidator's credentials, while the sub-agent receives branded vouchers and invoices for their clients.",
      },
    ],
  },
  {
    slug: "b2c-booking-engine",
    seo: { image: "/images/og/b2c_booking.jpg" },
    group: "platform",
    title: "Consumer Internet Booking Engine (B2C IBE)",
    tagline: "High-Conversion Web & Mobile Travel Reservation System",
    eyebrow: "B2C ONLINE TRAVEL AGENCY",
    badge: "Sub-85ms Search Speed",
    badgeTone: "rose",
    description:
      "A fast, modern consumer booking engine designed to maximize conversion rates. Includes dynamic fare calendars, interactive seat maps, localized payment gateways (SSLCommerz, bKash, Nagad, Stripe), and automated SMS/WhatsApp voucher confirmations.",
    heroImage: "/images/solutions/b2c_booking.jpg",
    metrics: [
      { label: "Search Latency", value: "<85ms" },
      { label: "Payment Gateways", value: "Local & Global" },
      { label: "Mobile Optimization", value: "100% Responsive" },
      { label: "Voucher Delivery", value: "WhatsApp / SMS" },
    ],
    keyBenefits: [
      {
        title: "Instant Fare Calendar & Filters",
        desc: "Lowest-fare month view, matrix filtering by airline, departure time, and stops, powered by dynamic edge browse caching.",
        icon: "Calendar",
      },
      {
        title: "Interactive 3D Aircraft Seat Maps",
        desc: "Passengers select preferred seats, add extra checked baggage, and pre-order in-flight meals directly during checkout.",
        icon: "Sparkles",
      },
      {
        title: "Localized Payment Processing",
        desc: "Full checkout support for cards, mobile wallets (bKash, Nagad), and international currencies with 3D Secure fraud shielding.",
        icon: "CreditCard",
      },
      {
        title: "Self-Service Traveller Portal",
        desc: "Customers manage their bookings, request flight date changes, select seats, or trigger automated cancellations easily.",
        icon: "Smartphone",
      },
    ],
    coreCapabilities: [
      "Dynamic browse-cache engine ensuring zero supplier rate-limit throttling",
      "Instant automated PNR generation and WhatsApp & email PDF delivery",
      "Multi-currency conversion with real-time central bank exchange rates",
      "Google Tag Manager, Meta Pixel, and conversion analytics integration",
      "Promo codes, coupon discounts, and referral loyalty reward engine",
      "Cross-sell upsells for hotels, airport transfers, and eSIM cards",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Parallel Search Aggregation",
        desc: "Queries GDS, NDC, and LCC suppliers simultaneously, deduplicating itineraries and calculating real-time lowest available fares.",
      },
      {
        step: "02",
        title: "Fare Lock & Ancillary Selection",
        desc: "User selects seats and meals; system locks the fare with the supplier while preserving pricing against momentary fluctuations.",
      },
      {
        step: "03",
        title: "Secure Payment Capture",
        desc: "Integrates with SSLCommerz, bKash, or Stripe; holds funds with 100% idempotent transaction guarantees.",
      },
      {
        step: "04",
        title: "Instant Ticketing & Messaging",
        desc: "Supplier issues e-ticket PNR; system dispatches branded PDF receipt via email, SMS, and WhatsApp bot instantly.",
      },
    ],
    faqs: [
      {
        question: "Can we customize the UI colors and brand typography?",
        answer:
          "Yes. The B2C booking engine is built with Tailwind CSS and Next.js, allowing full customization of colors, fonts, logo, and header/footer components.",
      },
      {
        question: "Which payment gateways are pre-integrated?",
        answer:
          "We support SSLCommerz, bKash, Nagad, Stripe, PayPal, Amex, Visa, and Mastercard with automated webhook payment verification.",
      },
      {
        question: "Does it support flight + hotel dynamic packaging?",
        answer:
          "Yes. Customers can book flights and hotels together in a single flow, enjoying bundled opaque package discounts.",
      },
    ],
  },
  {
    slug: "corporate-booking-tool",
    seo: { image: "/images/og/corporate_booking.jpg" },
    group: "platform",
    title: "Corporate Self-Booking Tool (CSBT) for TMCs",
    tagline: "Automated Travel Policy, Approvals & Expense Tracking",
    eyebrow: "BUSINESS TRAVEL & TMC",
    badge: "99.4% Policy Compliance",
    badgeTone: "indigo",
    description:
      "Enterprise corporate travel management platform built for Travel Management Companies (TMCs) and large corporations. Enforce travel policies, automate manager approval chains, track department cost centers, and streamline monthly billing.",
    heroImage: "/images/solutions/corporate_booking.jpg",
    metrics: [
      { label: "Policy Compliance", value: "99.4%" },
      { label: "Approval Response", value: "<15 Mins" },
      { label: "Cost Center Rules", value: "Unlimited" },
      { label: "Duty of Care", value: "Real-Time Tracking" },
    ],
    keyBenefits: [
      {
        title: "Custom Travel Policy Rules",
        desc: "Configure grade-based flight cabin caps, advance purchase window requirements, and maximum nightly hotel budgets by city tier.",
        icon: "ShieldAlert",
      },
      {
        title: "Multi-Level Manager Approvals",
        desc: "Automated L1 / L2 manager notifications with one-click approval links via email and SMS before PNR ticketing occurs.",
        icon: "CheckCircle",
      },
      {
        title: "Cost Center & Project Accounting",
        desc: "Tag each booking with employee ID, department code, and client project billing number for seamless monthly expense reconciliation.",
        icon: "FileSpreadsheet",
      },
      {
        title: "Duty of Care & Traveler Tracker",
        desc: "Interactive world map displaying current and upcoming employee itineraries with emergency broadcast alerts during disruptions.",
        icon: "MapPin",
      },
    ],
    coreCapabilities: [
      "Corporate negotiated airline fares and corporate hotel program rates",
      "Centralized corporate ghost cards and prepaid company billing accounts",
      "SSO login via SAML 2.0, Microsoft Azure AD, Okta, and Google Workspace",
      "CO2 carbon footprint calculation and green travel initiative reporting",
      "Automated out-of-policy exception logging and reason code capture",
      "Comprehensive monthly travel spend audit reports and tax statements",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Corporate Policy Setup",
        desc: "HR and travel managers define cabin class eligibility, city budget caps, and multi-tier approval hierarchies.",
      },
      {
        step: "02",
        title: "Employee Search & Compliance Check",
        desc: "Employee searches flights or hotels; out-of-policy options are either hidden or marked with required justification.",
      },
      {
        step: "03",
        title: "Automated Approval Dispatch",
        desc: "System holds the PNR without ticketing and sends an instant email/SMS approval prompt to the designated supervisor.",
      },
      {
        step: "04",
        title: "Centralized Billing & Settlement",
        desc: "Upon manager approval, ticket issues automatically and expense is billed against the corporate cost center account.",
      },
    ],
    faqs: [
      {
        question: "What happens if a manager fails to approve before ticketing time limit?",
        answer:
          "The system sends automated escalation reminders to secondary managers and releases the reservation before supplier cancellation penalties apply.",
      },
      {
        question: "Can employees use corporate negotiated flight rates?",
        answer:
          "Yes. Corporate Account Codes and GDS private fare agreements can be loaded directly into the corporate profile.",
      },
      {
        question: "Does it support Single Sign-On (SSO)?",
        answer:
          "Yes. We support SAML 2.0, Okta, Azure Active Directory, and Google Workspace for secure one-click employee access.",
      },
    ],
  },
  {
    slug: "dynamic-packaging-engine",
    seo: { image: "/images/og/dynamic_packaging.jpg" },
    group: "platform",
    title: "Dynamic Packaging Engine (Flight + Hotel + Transfer)",
    tagline: "Real-Time Vacation Bundle Creation with Opaque Net Rates",
    eyebrow: "TOUR PACKAGING & MARGINS",
    badge: "Opaque Fares & 18% Savings",
    badgeTone: "amber",
    description:
      "Combine wholesale flight seats, direct hotel contracts, and airport ground transfers into a single opaque-price booking. Allows suppliers to offer heavy discounts without violating public rate parity agreements.",
    heroImage: "/images/solutions/dynamic_packaging.jpg",
    metrics: [
      { label: "Margin Improvement", value: "+18% Avg" },
      { label: "Checkout Flow", value: "Single Consolidated" },
      { label: "Rate Parity", value: "100% Protected" },
      { label: "Voucher Issuance", value: "Atomic Multi-Supplier" },
    ],
    keyBenefits: [
      {
        title: "Opaque Fare Protection",
        desc: "Bundle flights and accommodations into one total price, hiding individual component costs to satisfy airline and hotel rate parity rules.",
        icon: "Tag",
      },
      {
        title: "Dynamic Bundle Discounts",
        desc: "Encourage higher basket values by applying automated discounts when customers combine flights with 3+ nights stay.",
        icon: "Sparkles",
      },
      {
        title: "Atomic Single Checkout",
        desc: "One credit card charge issues the flight PNR, hotel confirmation number, and transfer driver schedule simultaneously.",
        icon: "CreditCard",
      },
      {
        title: "Day-by-Day Vacation Customizer",
        desc: "Travelers can swap hotels, adjust room categories, and add optional sightseeing tours dynamically within the package flow.",
        icon: "Sparkles",
      },
    ],
    coreCapabilities: [
      "Real-time offer re-pricing verifying flight seats and room availability",
      "Automatic supplier failover if any single sub-component becomes unavailable",
      "Unified booking confirmation voucher featuring all itinerary segments",
      "Sub-agent package markup tools with flat and percentage commission options",
      "Pre-configured popular vacation templates (Cox's Bazar, Sajek, Sylhet)",
      "Zero orphan booking guarantee with distributed two-phase commit rollback",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Destination & Date Selection",
        desc: "Customer selects travel corridor; engine fetches compatible flight schedules and matching resort allotments concurrently.",
      },
      {
        step: "02",
        title: "Dynamic Bundle Assembly",
        desc: "Pairs lowest net flight fare with discounted hotel room and calculates combined opaque package rate with target markup.",
      },
      {
        step: "03",
        title: "Atomic Multi-Supplier Reservation",
        desc: "Coordinates simultaneous API calls across GDS NDC and hotel bed banks under a single transaction lock.",
      },
      {
        step: "04",
        title: "Consolidated Itinerary Delivery",
        desc: "Outputs an integrated master travel voucher with flight PNR, hotel voucher, and private transfer pickup details.",
      },
    ],
    faqs: [
      {
        question: "Why is dynamic packaging more profitable than selling standalone components?",
        answer:
          "Because opaque pricing hides individual rates, suppliers grant deeper net discounts that would otherwise break public retail parity, allowing higher operator markups.",
      },
      {
        question: "What happens if a hotel booking fails after a flight has been ticketed?",
        answer:
          "Our atomic orchestration engine automatically rolls back the transaction or routes to an equivalent backup property within the 24-hour void window.",
      },
      {
        question: "Can travel agents modify the components within a package?",
        answer:
          "Yes. Agents can customize room categories, add transfers, or swap flights before finalizing the booking.",
      },
    ],
  },
  {
    slug: "hotel-extranet-crs",
    seo: { image: "/images/og/hotel_extranet.jpg" },
    group: "platform",
    title: "Hotel Extranet & Central Reservation System (CRS)",
    tagline: "Direct Hotel Inventory, Rates & Room Allotment Management",
    eyebrow: "HOTEL INVENTORY HUB",
    badge: "Direct Contracting & CRS",
    badgeTone: "emerald",
    description:
      "A dedicated supplier extranet enabling independent hotels, boutique stays, and resort chains to manage direct inventory. Upload seasonal room rates, allocate room allotments, configure blackout dates, and generate instant confirmation vouchers.",
    heroImage: "/images/solutions/hotel_extranet.jpg",
    metrics: [
      { label: "Direct Margin", value: "Up to 24%" },
      { label: "Property Extranet", value: "Multi-Hotel Login" },
      { label: "Allotment Sync", value: "Real-Time Calendar" },
      { label: "Payout System", value: "Automated Ledgers" },
    ],
    keyBenefits: [
      {
        title: "Dedicated Hotelier Extranet",
        desc: "Hotels log into a self-service dashboard to manage room types, bed configurations, maximum occupancy, and property photo galleries.",
        icon: "Hotel",
      },
      {
        title: "Dynamic Rate & Allotment Calendar",
        desc: "Easily adjust daily room rates, set minimum stay rules, close rooms for maintenance, or trigger instant stop-sell flags.",
        icon: "CalendarCheck",
      },
      {
        title: "Meal Plans & Extra Supplements",
        desc: "Define European Plan (EP), Bed & Breakfast (CP), Half Board (MAP), and Full Board (AP) along with extra bed and child surcharges.",
        icon: "Utensils",
      },
      {
        title: "Instant Voucher & Check-In Codes",
        desc: "Guests receive instant check-in vouchers while the front desk receives automated reservation notifications via email and SMS.",
        icon: "QrCode",
      },
    ],
    coreCapabilities: [
      "Multi-property chain management under a single group extranet account",
      "Flexible cancellation policy matrices (free cancel deadlines and non-refundable rates)",
      "Automated bi-weekly supplier payout statements and withholding tax ledgers",
      "Channel manager integration support for real-time external inventory sync",
      "Occupancy yield analytics and seasonal booking pace reports",
      "Direct contract price comparison against external wholesale bed banks",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Property Onboarding & Room Setup",
        desc: "Hotelier enters property details, amenities, room categories, photos, and standard policies.",
      },
      {
        step: "02",
        title: "Allotment & Rate Plan Loading",
        desc: "Configures room inventory allotments, seasonal high/low rates, meal plans, and blackout holiday dates.",
      },
      {
        step: "03",
        title: "Instant Distribution on Portals",
        desc: "Direct inventory becomes immediately searchable and bookable across B2B, B2C, and dynamic packaging channels.",
      },
      {
        step: "04",
        title: "Check-in Validation & Payout",
        desc: "Front desk validates reservation codes upon guest arrival; mid-office releases supplier payout per credit terms.",
      },
    ],
    faqs: [
      {
        question: "Can hoteliers connect their existing Channel Manager?",
        answer:
          "Yes. Our extranet supports standard OTA XML / 2-way API channel manager connections to sync rates and availability automatically.",
      },
      {
        question: "How do cancellations and refunds work for direct contracted hotels?",
        answer:
          "The system strictly follows the hotel's configured cancellation deadline; cancellations before the deadline trigger automatic client refunds.",
      },
      {
        question: "Is there a limit to how many properties a group can manage?",
        answer:
          "No. Multi-property chains can manage unlimited hotels, room categories, and seasonal rate plans from a single dashboard.",
      },
    ],
  },
  {
    slug: "travel-erp-backoffice",
    seo: { image: "/images/og/travel_erp.jpg" },
    group: "platform",
    title: "Travel ERP & Mid/Back-Office Automation",
    tagline: "End-to-End Accounting, PNR Queue Management & Reconciliation",
    eyebrow: "TRAVEL ERP & MID-OFFICE",
    badge: "Automated PNR Queues & Ledgers",
    badgeTone: "emerald",
    description:
      "A comprehensive travel ERP system that bridges sales channels with suppliers. Automate airline PNR queue servicing, manage multi-currency agent ledgers, reconcile credit card settlements, and generate compliant financial tax statements.",
    heroImage: "/images/solutions/travel_erp.jpg",
    metrics: [
      { label: "Operational Gain", value: "Up to 65%" },
      { label: "GDS PNR Queues", value: "Automated Sync" },
      { label: "Supported Currencies", value: "120+ Live" },
      { label: "Reconciliation", value: "100% Automated" },
    ],
    keyBenefits: [
      {
        title: "Automated GDS PNR Queue Servicing",
        desc: "Auto-fetch PNRs from Amadeus, Sabre, and Travelport queues; monitor ticketing time limits (TTL) and dispatch alert emails before expiration.",
        icon: "Cpu",
      },
      {
        title: "Multi-Currency Financial Accounting",
        desc: "Comprehensive accounting ledger supporting multi-currency transactions, daily exchange rate sync, and automated bank reconciliation.",
        icon: "Banknote",
      },
      {
        title: "Supplier Payable & Receivable Ledger",
        desc: "Track net amounts owed to airlines and bed banks against customer payments, guaranteeing complete audit transparency.",
        icon: "FileSpreadsheet",
      },
      {
        title: "Sales Agent Performance Analytics",
        desc: "Real-time business intelligence dashboards displaying revenue by airline, top-performing sub-agents, and gross booking margins.",
        icon: "TrendingUp",
      },
    ],
    coreCapabilities: [
      "Automated tax invoice generation with local VAT / GST compliance rules",
      "Split-ticketing and schedule change notification handling",
      "Refund and void management with automated supplier credit note tracking",
      "Integrated payment gateway chargeback dispute logs and fraud flags",
      "Exportable ledgers compatible with QuickBooks, Xero, SAP, and Tally",
      "Role-based mid-office staff permissions with detailed change logs",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "Booking Ingestion",
        desc: "Captures bookings across B2B, B2C, and corporate channels in real time, normalizing them into central ERP records.",
      },
      {
        step: "02",
        title: "Queue & TTL Monitoring",
        desc: "Monitors airline ticketing deadlines; triggers automated issuance or client reminder before PNR cancellation.",
      },
      {
        step: "03",
        title: "Financial Ledger Entry",
        desc: "Automatically records client receivable, supplier payable, agency commission, and applicable taxes into the accounting ledger.",
      },
      {
        step: "04",
        title: "Audit & Settlement",
        desc: "Generates monthly financial balance sheets, supplier payout statements, and agent commission disbursements.",
      },
    ],
    faqs: [
      {
        question: "Can our accounting team export reports to QuickBooks or Xero?",
        answer:
          "Yes. All ledger entries, invoices, and supplier settlement records can be exported directly to CSV, Excel, or integrated via accounting APIs.",
      },
      {
        question: "How does the system prevent PNR expiration?",
        answer:
          "The queue monitor checks ticketing time limits (TTL) continuously and sends urgent notifications via email and SMS before deadlines pass.",
      },
      {
        question: "Does it support local VAT/GST tax calculation for Bangladesh?",
        answer:
          "Yes. Custom tax rates and invoices formatted according to local statutory requirements are fully supported.",
      },
    ],
  },
];
