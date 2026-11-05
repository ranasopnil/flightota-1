import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Button } from "@/components/ui/button";
import { imageSrc } from "@/lib/image-src";
import { getSingleton } from "@/services/server/cms-repository";
import type { CtaContent } from "@/types/pages";

interface CtaBandProps {
  title?: string;
  description?: string;
  /** Page-level overrides of the site default band. */
  cta?: Partial<CtaContent>;
}

/** The closing call-to-action band. Defaults come from the site settings; pages may override any part. */
export async function CtaBand({ title, description, cta }: CtaBandProps) {
  const settings = await getSingleton("site-settings");
  const base = settings.defaultCta;
  const content: CtaContent = {
    ...base,
    ...cta,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    primary: { ...base.primary, ...cta?.primary },
    secondary: { ...base.secondary, ...cta?.secondary },
  };
  return (
    <section className="py-10 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-lg border border-border/80 bg-navy-950 px-5 py-10 text-center text-white sm:px-14 sm:py-16">
          {/* Atmospheric Photography Backdrop */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <Image
              src={imageSrc(content.image)}
              alt="Global Travel Gateway"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center opacity-25 brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md">
              {content.badge}
            </span>
            <h2 className="mt-4 font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-balance text-white">
              {content.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{content.description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl font-semibold gap-2">
                <Link href={content.primary.href}>
                  {content.primary.icon && <Icon name={content.primary.icon} className="size-4" />}
                  <span>{content.primary.label}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Link href={content.secondary.href}>{content.secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
