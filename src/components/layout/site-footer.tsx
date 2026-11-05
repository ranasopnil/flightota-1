import Link from "next/link";
import {
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common/social-icons";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/features/marketing/components/newsletter-form";

const socials = [
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  { label: "X", href: siteConfig.social.x, Icon: XIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
];

const compactFooterLinks = [
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
];

const trustBadges = [
  "IATA NDC Level 4",
  "Amadeus GDS",
  "Sabre Global",
  "Travelport",
  "PCI-DSS Level 1",
  "SSLCommerz",
  "bKash Merchant",
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200 border-t border-white/10">
      {/* Background Subtle Mesh (No shadow) */}
      <div
        aria-hidden
        className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0 opacity-30"
      />

      <Container className="relative">
        {/* 1. Compact Newsletter & Status Strip */}
        <div className="flex flex-col gap-5 border-b border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 mb-2">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 7 Gateways Operational &bull; 99.99% Uptime</span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
              Stay ahead in travel technology
            </h2>
            <p className="mt-1 text-xs text-navy-300 leading-relaxed">
              Monthly developer changelogs, new airline NDC direct pipes, and supplier releases. No spam.
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <NewsletterForm tone="dark" className="w-full" />
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-navy-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-500" /> Free Sandbox Keys
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-emerald-500" /> GDPR &amp; PCI-DSS Ready
              </span>
            </div>
          </div>
        </div>

        {/* 2. Main Footer Navigation Grid (Clean, balanced 5-col on desktop, 2-col on mobile) */}
        <div className="grid grid-cols-2 gap-8 py-8 sm:py-12 lg:grid-cols-6 lg:gap-10">
          {/* Brand & Contact Column (Col-span 2 on desktop) */}
          <div className="col-span-2 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <Logo tone="light" />
              <p className="text-xs text-navy-300 leading-relaxed max-w-sm">
                Unified travel technology infrastructure powering OTAs, TMCs, and travel consolidators across 200+ airlines, 1.2M+ accommodations, and ground transport.
              </p>

              {/* Compact Direct Contacts */}
              <div className="space-y-1.5 text-xs text-navy-300 pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0 text-primary" />
                  <span>Gulshan-2, Dhaka 1212 &bull; Singapore Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 shrink-0 text-primary" />
                  <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-white transition-colors">
                    {siteConfig.supportEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-7.5 items-center justify-center rounded-md bg-white/5 text-navy-300 border border-white/10 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* 4 Clean Navigation Columns (Col-span 4 across 4 columns) */}
          <div className="col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {compactFooterLinks.map((group) => (
              <nav key={group.title} aria-label={group.title} className="space-y-3">
                <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
                <ul className="space-y-2 text-xs">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-navy-300 transition-colors hover:text-white block truncate"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* 3. Compact Certified Ecosystem & GDS Partners Ribbon */}
        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-navy-400">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-navy-300 shrink-0">
            Certified Partner Network:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-navy-300"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Bottom Copyright & Legal Links Bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-navy-400">
          <div>
            &copy; {siteConfig.copyrightYear} {siteConfig.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/contact?topic=support" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
