import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** The mark: an F whose bars sweep back like an aircraft tail, with a teal destination dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill="#dc0e18" />
      <path d="M8.5 7h17l-4 5.2h-7.7v3h6.2l-3.4 4.4h-2.8V25H8.5V7Z" fill="#fff" />
      <circle cx="22.6" cy="22.6" r="2.6" fill="#00a99d" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}

export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "light" }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 rounded-md", className)} aria-label={`${siteConfig.name} home`}>
      <LogoMark />
      <span className={cn("font-heading text-xl font-bold tracking-tight", tone === "light" ? "text-white" : "text-navy-900 dark:text-white")}>
        Flight<span className="text-primary">OTA</span>
      </span>
    </Link>
  );
}
