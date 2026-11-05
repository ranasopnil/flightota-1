"use client";

import { useState, useEffect, useSyncExternalStore, useMemo } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Globe,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import type { NavigationContent, TopBarSettings } from "@/types/pages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function TopHeader({ content, settings }: { content: NavigationContent["topBar"]; settings: TopBarSettings }) {
  const { announcements, currencies, quickLinks } = content;
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Synchronize currency with localStorage using useSyncExternalStore to avoid React 19 effect warnings
  const currencyCode = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("storage", callback);
      window.addEventListener("currency-change", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("currency-change", callback);
      };
    },
    () => {
      try {
        return localStorage.getItem("flightota_preferred_currency") || "USD";
      } catch {
        return "USD";
      }
    },
    () => "USD"
  );

  const selectedCurrency = useMemo(() => {
    return currencies.find((c) => c.code === currencyCode) ?? currencies[0];
  }, [currencyCode, currencies]);

  // Announcement rotator timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % Math.max(1, announcements.length));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  const handleCurrencyChange = (curr: (typeof currencies)[number]) => {
    try {
      localStorage.setItem("flightota_preferred_currency", curr.code);
      window.dispatchEvent(new Event("currency-change"));
    } catch {
      // ignore
    }
    toast.success(`Currency set to ${curr.code} (${curr.symbol})`);
  };

  const currentAnnouncement = announcements[currentAnnouncementIndex % Math.max(1, announcements.length)];

  return (
    <div className="relative z-50 hidden border-b border-border/60 bg-[#091326] md:block dark:bg-[#050a14] py-1 text-[11px] sm:text-xs text-slate-300 transition-colors ">
      {/* Top micro-gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />

      <Container className="flex items-center justify-between gap-3">
        {/* Left: Contact Info, Global Desk & Direct Lines */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Support Email */}
          <a
            href={`mailto:${settings.supportEmail}`}
            className="inline-flex items-center gap-1.5 font-medium text-slate-200 hover:text-white transition-colors group"
            aria-label="Email support"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
              <Mail className="size-2.5" />
            </span>
            <span className="truncate max-w-[125px] sm:max-w-none">{settings.supportEmail}</span>
          </a>

          <span className="text-white/20 hidden sm:inline">•</span>

          {/* Hotline / Telephone */}
          <a
            href={settings.phoneHref}
            className="hidden sm:inline-flex items-center gap-1.5 font-medium text-slate-200 hover:text-white transition-colors group"
            aria-label="Direct support line"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
              <Phone className="size-2.5" />
            </span>
            <span>{settings.phone}</span>
          </a>
        </div>

        {/* Center: Live Dynamic Announcement Ticker (Desktop) */}
        <div
          className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-2 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentAnnouncement && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <Link
                href={currentAnnouncement.href}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 px-3 py-0.5 text-[11px] font-medium text-slate-200 transition-all "
              >
                <span className="rounded bg-primary/25 px-1.5 py-0.2 font-mono text-[9px] font-bold tracking-wider text-primary uppercase">
                  {currentAnnouncement.badge}
                </span>
                <span className="truncate max-w-[280px]">{currentAnnouncement.text}</span>
                <ArrowRight className="size-3 text-primary transition-transform group-hover:translate-x-0.5 shrink-0" />
              </Link>
            </motion.div>
          </AnimatePresence>
          )}
        </div>

        {/* Right: Operational Status, Currency Selector, Utilities & Socials */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        
          {quickLinks.map((link) =>
            link.icon ? (
              <Link key={link.href} href={link.href} className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors font-medium text-[11px]">
                <Icon name={link.icon} className="size-3 text-primary" />
                <span>{link.label}</span>
              </Link>
            ) : (
              <Link key={link.href} href={link.href} className="hidden md:inline text-slate-300 hover:text-white transition-colors font-medium text-[11px]">
                {link.label}
              </Link>
            ),
          )}

          <span className="text-white/20 hidden sm:inline">•</span>

          {/* Interactive Currency & Region Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-200 transition-all cursor-pointer active:scale-95"
                aria-label="Change currency"
              >
                <Globe className="size-2.5 text-primary" />
                <span>
                  {selectedCurrency.code} ({selectedCurrency.symbol})
                </span>
                <ChevronDown className="size-2.5 opacity-60 ml-0.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-lg border border-border/80 bg-card/98 p-1 text-xs backdrop-blur-xl "
            >
              <DropdownMenuLabel className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Display Currency
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 border-border/50" />
              {currencies.map((curr) => (
                <DropdownMenuItem
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr)}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 cursor-pointer hover:bg-accent text-xs"
                >
                  <span className="flex items-center gap-2">
                    <span>{curr.flag}</span>
                    <span className="font-semibold text-foreground">{curr.code}</span>
                    <span className="text-muted-foreground text-[11px]">({curr.symbol})</span>
                  </span>
                  {selectedCurrency.code === curr.code && (
                    <Check className="size-3.5 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Social Icons (GitHub, X, LinkedIn) */}
          <div className="hidden sm:flex items-center gap-1.5 pl-0.5">
            <a
              href={settings.social.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="GitHub repository"
            >
              <svg className="size-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href={settings.social.x}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="X (Twitter)"
            >
              <svg className="size-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={settings.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <svg className="size-3 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
