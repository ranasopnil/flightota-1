import type { ApiCategory } from "@/types/catalog";

export const categories: ApiCategory[] = [
  {
    slug: "air",
    name: "Air Travel API",
    shortName: "Air",
    description: "One REST API sells every airline we carry: search, book, ticket, refund and reissue.",
    icon: "plane",
  },
  {
    slug: "hotel",
    name: "Hotel API",
    shortName: "Hotels",
    description: "Find, book and cancel hotel stays worldwide, paid from your deposit.",
    icon: "hotel",
  },
  {
    slug: "esim",
    name: "eSIM API",
    shortName: "eSIM",
    description: "Sell travel eSIMs for 200+ countries and regions, with the QR code in the same response.",
    icon: "sim",
  },
  {
    slug: "visa",
    name: "Visa API",
    shortName: "Visa",
    description: "Visa requirements, document checklists and application status for 190+ destinations.",
    icon: "stamp",
  },
  {
    slug: "transfer",
    name: "Airport Transfer API",
    shortName: "Transfers",
    description: "Airport and city transfers: private cars, vans and shuttles from hundreds of local providers.",
    icon: "car-front",
  },
  {
    slug: "car-rental",
    name: "Car Rental API",
    shortName: "Car rental",
    description: "Compare and reserve rental cars from local and international rental brands.",
    icon: "car",
  },
  {
    slug: "activities",
    name: "Travel Activities API",
    shortName: "Activities",
    description: "Tours, attractions and experiences with live availability and instant tickets.",
    icon: "ticket",
  },
];
