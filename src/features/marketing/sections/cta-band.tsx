import { ArrowRight, Key } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title = "Start building with free sandbox access",
  description = "Create an account, generate a test key and make your first request in minutes. No credit card required.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-10 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-lg border border-border/80 bg-navy-950 px-5 py-10 text-center text-white sm:px-14 sm:py-16">
          {/* Atmospheric Photography Backdrop */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <Image
              src="/images/categories/flight.jpg"
              alt="Global Travel Gateway"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center opacity-25 brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md">
              Instant Sandbox Provisioning
            </span>
            <h2 className="mt-4 font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-balance text-white">
              {title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl font-semibold gap-2">
                <Link href="/register">
                  <Key className="size-4" />
                  <span>Get Sandbox Key</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Link href="/contact?topic=sales">Talk to Solutions Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
