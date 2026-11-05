import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-3 sm:px-4 py-24 text-center">
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col items-center">
        <Logo />
        <span className="mt-10 inline-flex size-14 items-center justify-center rounded-lg bg-brand-50 text-primary dark:bg-brand-950/40">
          <Compass className="size-7" aria-hidden />
        </span>
        <p className="mt-6 font-mono text-sm font-semibold text-primary">404 · not_found</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">This page took a different route</h1>
        <p className="mt-3 max-w-md text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl">
            <Link href="/">
              <ArrowLeft data-icon="inline-start" /> Back to home
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/apis">Browse APIs</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
