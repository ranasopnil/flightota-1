import type { NavigationContent } from "@/types/pages";

/** Header mega-menu, top bar, mobile tabs and footer. */
export const navigation: NavigationContent = {
  header: {
    menus: [
      {
        id: "apis",
        label: "APIs",
        href: "/apis",
        matches: ["/apis"],
        groups: [
          {
            title: "Partner APIs",
            items: [
              { title: "Flights API", subtitle: "Search, book, ticket, refund and reissue, paid from your deposit", href: "/apis/air-travel-api", icon: "Plane", tag: "5–30 s search" },
              { title: "Hotels API", subtitle: "Find, book and cancel hotel stays worldwide", href: "/apis/hotel-api", icon: "Hotel", tag: "10–40 s search" },
              { title: "eSIM API", subtitle: "Travel eSIMs for 200+ countries and regions", href: "/apis/esim-api", icon: "Globe", tag: "Issued at once" },
              { title: "Transfers API", subtitle: "Private cars, vans and shuttles from hundreds of local providers", href: "/apis/airport-transfer-api", icon: "Compass", tag: "Confirmed in seconds" },
            ],
          },
          {
            title: "More APIs",
            items: [
              { title: "Visa API", subtitle: "Visa requirements, documents and applications", href: "/apis/visa-api", icon: "ShieldCheck" },
              { title: "Car Rental API", subtitle: "Compare and reserve rental cars", href: "/apis/car-rental-api", icon: "Laptop" },
              { title: "Activities API", subtitle: "Tours and activities", href: "/apis/travel-activities-api", icon: "Sparkles" },
            ],
          },
        ],
        footer: { text: "Same keys and conventions across the partner APIs.", label: "Browse all APIs", href: "/apis" },
      },
      {
        id: "solutions",
        label: "Solutions",
        href: "/solutions",
        matches: ["/solutions"],
        groups: [
          {
            title: "Portal development",
            items: [
              { title: "B2B Travel Development Portal", subtitle: "A portal for your agents, under your brand", href: "/solutions/b2b-travel-development-portal", icon: "Users" },
              { title: "B2C Travel Development Portal", subtitle: "A booking website for your own customers", href: "/solutions/b2c-travel-development-portal", icon: "Globe" },
              { title: "Flight Booking Portal", subtitle: "Search, book, ticket, refund and reissue", href: "/solutions/flight-booking-portal", icon: "Plane" },
              { title: "Hotel Booking Portal", subtitle: "Find, book and cancel hotel stays", href: "/solutions/hotel-booking-portal", icon: "Hotel" },
              { title: "eSIM Selling Portal", subtitle: "Travel eSIMs for 200+ countries and regions", href: "/solutions/esim-portal", icon: "Smartphone" },
              { title: "Airport Transfer Portal", subtitle: "From the airport to the hotel door", href: "/solutions/transfer-booking-portal", icon: "Compass" },
              { title: "Online Travel Agency Development", subtitle: "Start or rebuild an OTA on one travel API", href: "/solutions/online-travel-agency-development", icon: "Building2" },
              { title: "Travel API Aggregation", subtitle: "Many suppliers, one REST API", href: "/solutions/travel-api-aggregation", icon: "Layers" },
            ],
          },
          {
            title: "Sell travel",
            items: [
              { title: "B2B Travel Agent Portal", subtitle: "Sub-agent distribution, deposit wallets and custom markups", href: "/solutions/b2b-travel-portal", icon: "Users" },
              { title: "Consumer Booking Engine", subtitle: "Responsive booking engine for your own customers", href: "/solutions/b2c-booking-engine", icon: "Globe" },
              { title: "Dynamic Packaging Engine", subtitle: "Flight, hotel and transfer bundles", href: "/solutions/dynamic-packaging-engine", icon: "Sparkles" },
              { title: "White-Label Travel Portal", subtitle: "A hosted travel portal under your own brand", href: "/solutions/white-label-travel-portal", icon: "Tag" },
            ],
          },
          {
            title: "Run operations",
            items: [
              { title: "Corporate Self-Booking Tool", subtitle: "Employee travel policies and manager approvals", href: "/solutions/corporate-booking-tool", icon: "Briefcase" },
              { title: "Hotel Extranet & CRS", subtitle: "Direct hotel inventory and room allotment calendar", href: "/solutions/hotel-extranet-crs", icon: "Hotel" },
              { title: "Travel ERP & Back-Office", subtitle: "PNR queues, multi-currency ledger and tax accounting", href: "/solutions/travel-erp-backoffice", icon: "Workflow" },
            ],
          },
        ],
        footer: { text: "Need a white-label deployment?", label: "Compare platform licenses", href: "/pricing#portal-solutions" },
      },
      {
        id: "integrations",
        label: "Integrations",
        href: "/integrations",
        matches: ["/integrations"],
        groups: [
          {
            title: "Distribution channels",
            items: [
              { title: "GDS API Integration", subtitle: "Amadeus, Sabre and Travelport content through one flight API", href: "/integrations/gds-api-integration", icon: "Globe" },
              { title: "NDC API Integration", subtitle: "Airline direct connects: fare families, extras and order references", href: "/integrations/ndc-api-integration", icon: "Plane" },
              { title: "LCC API Integration", subtitle: "Low-cost carriers with their bags, seats and meals, ticketed at once", href: "/integrations/lcc-api-integration", icon: "Zap" },
            ],
          },
          {
            title: "GDS providers",
            items: [
              { title: "Amadeus API Integration", subtitle: "MasterPricer and Amadeus NDC content", href: "/integrations/amadeus-api-integration", icon: "Layers" },
              { title: "Sabre API Integration", subtitle: "Bargain Finder Max in your search results", href: "/integrations/sabre-api-integration", icon: "Search" },
              { title: "Travelport API Integration", subtitle: "Galileo content as JSON instead of XML", href: "/integrations/travelport-api-integration", icon: "Compass" },
            ],
          },
        ],
        footer: { text: "Every connection is sold through the same Flights API.", label: "All integrations", href: "/integrations" },
      },
      {
        id: "developers",
        label: "Developers",
        href: "/documentation",
        matches: ["/documentation", "/guides", "/blog", "/about", "/contact"],
        groups: [
          {
            title: "Build",
            items: [
              { title: "Documentation", subtitle: "Getting started, conventions, errors and every endpoint", href: "/documentation", icon: "BookOpen" },
              { title: "Integration Guides", subtitle: "Step-by-step walkthroughs from sandbox to production", href: "/guides", icon: "FileCode" },
              { title: "Blog", subtitle: "Release notes and engineering articles", href: "/blog", icon: "Newspaper" },
            ],
          },
          {
            title: "Company",
            items: [
              { title: "About", subtitle: "Who we are and what we build", href: "/about", icon: "Building2" },
              { title: "Contact", subtitle: "Speak with our team", href: "/contact", icon: "PhoneCall" },
            ],
          },
        ],
        footer: { text: "Sandbox keys are issued under API access.", label: "Get API access", href: "/register" },
      },
    ],
    directLinks: [
      { label: "Airlines", href: "/airlines" },
      { label: "Pricing", href: "/pricing" },
    ],
    signIn: { label: "Sign in", href: "/login" },
    cta: { label: "Get API access", href: "/register" },
  },
  topBar: {
    announcements: [
      { id: "flights", badge: "Flights API", text: "Search, book, ticket, refund and reissue from your deposit", href: "/apis/air-travel-api" },
      { id: "esim", badge: "eSIM API", text: "Travel eSIMs for 200+ countries and regions, issued at once", href: "/apis/esim-api" },
      { id: "transfers", badge: "Transfers API", text: "Private cars, vans and shuttles, confirmed in seconds", href: "/apis/airport-transfer-api" },
    ],
    currencies: [
      { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
      { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", flag: "🇧🇩" },
      { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
      { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
      { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
      { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
    ],
    quickLinks: [
      { label: "Airlines", href: "/airlines", icon: "Plane" },
      { label: "Docs", href: "/documentation" },
    ],
  },
  mobileTabs: [
    { label: "Home", href: "/", icon: "Home", exact: true },
    { label: "APIs", href: "/apis", icon: "Layers" },
    { label: "Docs", href: "/documentation", icon: "BookOpen", prefixes: ["/guides"] },
    { label: "Airlines", href: "/airlines", icon: "Plane" },
  ],
  footer: {
    statusLine: "All 7 Gateways Operational • 99.99% Uptime",
    newsletterTitle: "Stay ahead in travel technology",
    newsletterText: "Monthly developer changelogs, new airline NDC direct pipes, and supplier releases. No spam.",
    newsletterPerks: [
      { icon: "CheckCircle", text: "Free Sandbox Keys" },
      { icon: "ShieldCheck", text: "GDPR & PCI-DSS Ready" },
    ],
    blurb: "Unified travel technology infrastructure powering OTAs, TMCs, and travel consolidators across 200+ airlines, 1.2M+ accommodations, and ground transport.",
    linkGroups: [
      {
        title: "Platforms & Solutions",
        items: [
          { label: "B2B Travel Development Portal", href: "/solutions/b2b-travel-development-portal" },
          { label: "B2C Travel Development Portal", href: "/solutions/b2c-travel-development-portal" },
          { label: "Flight Booking Portal", href: "/solutions/flight-booking-portal" },
          { label: "Hotel Booking Portal", href: "/solutions/hotel-booking-portal" },
          { label: "eSIM Selling Portal", href: "/solutions/esim-portal" },
          { label: "Airport Transfer Portal", href: "/solutions/transfer-booking-portal" },
          { label: "B2B Travel Agent Portal", href: "/solutions/b2b-travel-portal" },
          { label: "B2C Consumer Booking Engine", href: "/solutions/b2c-booking-engine" },
          { label: "Corporate Self-Booking Tool", href: "/solutions/corporate-booking-tool" },
          { label: "Hotel Extranet & CRS", href: "/solutions/hotel-extranet-crs" },
          { label: "Travel ERP & Back-Office", href: "/solutions/travel-erp-backoffice" },
          { label: "Online Travel Agency Development", href: "/solutions/online-travel-agency-development" },
          { label: "White-Label Travel Portal", href: "/solutions/white-label-travel-portal" },
          { label: "Travel API Aggregation", href: "/solutions/travel-api-aggregation" },
          { label: "All Enterprise Solutions →", href: "/solutions" },
        ],
      },
      {
        title: "Core Travel APIs",
        items: [
          { label: "Flight API (NDC & GDS)", href: "/apis/air-travel-api" },
          { label: "Hotel & Stays API", href: "/apis/hotel-api" },
          { label: "Global eSIM Roaming API", href: "/apis/esim-api" },
          { label: "Consular Visa API", href: "/apis/visa-api" },
          { label: "Airport Transfers API", href: "/apis/airport-transfer-api" },
          { label: "GDS API Integration", href: "/integrations/gds-api-integration" },
          { label: "NDC API Integration", href: "/integrations/ndc-api-integration" },
          { label: "LCC API Integration", href: "/integrations/lcc-api-integration" },
          { label: "All Integrations →", href: "/integrations" },
          { label: "Explore All APIs →", href: "/apis" },
        ],
      },
      {
        title: "Developers & Specs",
        items: [
          { label: "API Documentation", href: "/documentation" },
          { label: "Implementation Guides", href: "/guides" },
          { label: "Airlines Directory (200+)", href: "/airlines" },
          { label: "API Telemetry & Compare", href: "/apis/compare" },
          { label: "Sandbox Key Console", href: "/register" },
          { label: "Subscription Pricing", href: "/pricing" },
        ],
      },
      {
        title: "Company & Trust",
        items: [
          { label: "About FlightOTA", href: "/about" },
          { label: "Engineering Blog", href: "/blog" },
          { label: "Contact Sales", href: "/contact?topic=sales" },
          { label: "Support Desk", href: "/contact?topic=support" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
    ],
    partnerLabel: "Certified Partner Network:",
    trustBadges: ["IATA NDC Level 4", "Amadeus GDS", "Sabre Global", "Travelport", "PCI-DSS Level 1", "SSLCommerz", "bKash Merchant"],
    legalLinks: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Support", href: "/contact?topic=support" },
    ],
  },
};
