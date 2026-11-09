import Link from "next/link";
import { Fragment } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Logo } from "@/components/common/logo";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common/social-icons";
import { NewsletterForm } from "@/features/marketing/components/newsletter-form";
import type { NavigationContent, SiteSettings } from "@/types/pages";

export function SiteFooter({
  footer,
  settings,
  contact,
}: {
  footer: NavigationContent["footer"];
  settings: SiteSettings;
  /** Address and phone of the office nearest the visitor, rendered on the server (RegionalAddress). */
  contact?: React.ReactNode;
}) {
  const socials = [
    { label: "GitHub", href: settings.social.github, Icon: GithubIcon },
    { label: "X", href: settings.social.x, Icon: XIcon },
    { label: "LinkedIn", href: settings.social.linkedin, Icon: LinkedinIcon },
  ];
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
              <span>{footer.statusLine}</span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
              {footer.newsletterTitle}
            </h2>
            <p className="mt-1 text-xs text-navy-300 leading-relaxed">
              {footer.newsletterText}
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <NewsletterForm tone="dark" className="w-full" />
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-navy-400">
              {footer.newsletterPerks.map((perk, i) => (
                <Fragment key={perk.text}>
                  {i > 0 && <span>&bull;</span>}
                  <span className="flex items-center gap-1">
                    <Icon name={perk.icon} className="size-3 text-emerald-500" /> {perk.text}
                  </span>
                </Fragment>
              ))}
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
                {footer.blurb}
              </p>

              {/* Compact Direct Contacts */}
              <div className="space-y-1.5 text-xs text-navy-300 pt-1">
                {contact}
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 shrink-0 text-primary" />
                  <a href={`mailto:${settings.supportEmail}`} className="hover:text-white transition-colors">
                    {settings.supportEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ label, href, Icon: SocialIcon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-7.5 items-center justify-center rounded-md bg-white/5 text-navy-300 border border-white/10 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <SocialIcon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* 4 Clean Navigation Columns (Col-span 4 across 4 columns) */}
          <div className="col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {footer.linkGroups.map((group) => (
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
            {footer.partnerLabel}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            {footer.trustBadges.map((badge) => (
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
            &copy; {settings.copyrightYear} {settings.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            {footer.legalLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && <span>&bull;</span>}
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
