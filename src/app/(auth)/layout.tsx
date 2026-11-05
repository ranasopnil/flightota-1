import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import { getSingleton } from "@/services/server/cms-repository";

export const metadata: Metadata = {
  title: {
    template: `%s · ${siteConfig.name}`,
    default: `Authentication · ${siteConfig.name}`,
  },
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSingleton("site-settings");
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background selection:bg-primary/20 selection:text-primary">
      {/* Ambient background glow & grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 dark:opacity-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/15"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <Link
            href="/"
            className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <ArrowLeft className="size-3.5" />
            Back to website
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/documentation"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hidden sm:block"
          >
            Docs
          </Link>
          <Link
            href="/apis"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hidden sm:block"
          >
            API Catalog
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-3 py-8 sm:px-6 lg:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-3 sm:flex-row sm:px-6">
          <p>© {settings.copyrightYear} {settings.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
