import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Section, SectionHeader } from "@/components/common/section";
import { staticPageMetadata } from "@/config/share";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { imageSrc } from "@/lib/image-src";
import { eyebrowToneClasses } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { getSingleton } from "@/services/server/cms-repository";

export const metadata: Metadata = staticPageMetadata("/about");

export default async function AboutPage() {
  const page = await getSingleton("about");
  const { paradigm, values, edge, milestones, team, ecosystem, security, careers } = page;
  return (
    <>
      {/* 1. Hero Section with Developer Stats Banner */}
      <CmsPageHero hero={page.hero} path="/about" />

      {/* 2. The Legacy Problem vs The FlightOTA Standard */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={paradigm.header.eyebrow} title={paradigm.header.title} description={paradigm.header.description} />

        <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-2">
          {/* The Legacy Nightmare */}
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-destructive font-semibold text-xs uppercase tracking-wider">
              <Clock className="size-4" />
              {paradigm.legacy.label}
            </div>
            <h3 className="mt-3 font-heading text-lg sm:text-xl font-bold text-foreground">{paradigm.legacy.title}</h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              {paradigm.legacy.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The FlightOTA Modern Standard */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="size-4" />
              {paradigm.modern.label}
            </div>
            <h3 className="mt-3 font-heading text-lg sm:text-xl font-bold text-foreground">{paradigm.modern.title}</h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-foreground">
              {paradigm.modern.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. Core Values */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={values.header.eyebrow} title={values.header.title} description={values.header.description} />

        <div className="app-rail mt-4 sm:mt-12 grid gap-4 sm:grid-cols-2">
          {values.items.map(({ icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 "
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={icon} className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-base sm:text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Global Edge Footprint */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={edge.header.eyebrow} title={edge.header.title} description={edge.header.description} />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {edge.nodes.map((node) => (
            <div
              key={node.city}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/70 p-4 backdrop-blur-xs transition-all hover:border-primary/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{node.flag}</span>
                    <span className="font-heading font-bold text-sm sm:text-base text-foreground">{node.city}</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {node.latency}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground font-medium">{node.region}</div>
                <p className="mt-2.5 text-xs text-secondary-foreground leading-relaxed">{node.role}</p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {edge.onlineLabel}
                </span>
                <span>{edge.routingLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Company Milestones Timeline */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={milestones.header.eyebrow} title={milestones.header.title} description={milestones.header.description} />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.items.map((m) => (
            <div key={m.year} className="relative rounded-xl border border-border/80 bg-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-black text-primary">{m.year}</span>
                  <Badge variant="outline" className="text-[10px] font-semibold border-primary/20 bg-primary/5 text-primary">
                    {m.tag}
                  </Badge>
                </div>
                <h4 className="mt-3 font-heading text-sm sm:text-base font-bold text-foreground">{m.title}</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="size-3" />
                <span>{milestones.shippedLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Leadership & Engineering Team */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={team.header.eyebrow} title={team.header.title} description={team.header.description} />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.members.map((person) => (
            <div
              key={person.name}
              className="rounded-xl border border-border/80 bg-card p-5 transition-all hover:border-primary/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-heading font-black text-base border border-primary/20">
                  {person.avatar}
                </div>
                <h4 className="mt-4 font-heading text-base font-bold text-foreground">{person.name}</h4>
                <div className="text-xs font-semibold text-primary mt-0.5">{person.role}</div>
                <div className="mt-1 text-[11px] text-muted-foreground font-mono">{person.background}</div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{person.bio}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-500" />
                <span>{team.verifiedLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6b. Travel Technology & GDS Aggregation Ecosystem */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={ecosystem.header.eyebrow} title={ecosystem.header.title} description={ecosystem.header.description} />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ecosystem.cards.map((card) => (
            <div key={card.title} className="overflow-hidden rounded-lg border bg-card group">
              <div className="relative h-56 w-full">
                <Image
                  src={imageSrc(card.image)}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className={cn("text-xs font-bold uppercase tracking-wider", eyebrowToneClasses[card.eyebrowTone])}>{card.eyebrow}</span>
                  <h3 className="font-heading text-xl font-bold">{card.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Enterprise Security & Compliance */}
      <Section className="border-b border-border/60">
        <SectionHeader eyebrow={security.header.eyebrow} title={security.header.title} description={security.header.description} />

        <div className="app-rail mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {security.items.map((cert) => (
            <div key={cert.title} className="rounded-xl border border-border/80 bg-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Icon name={cert.icon} className="size-5" />
                </div>
                <h4 className="mt-4 font-heading text-sm sm:text-base font-bold text-foreground">{cert.title}</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{cert.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="size-3" />
                <span>{security.auditedLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Careers & Hiring Callout */}
      <Container className="py-12 sm:py-16">
        <div className="rounded-lg border border-border/80 bg-card p-6 sm:p-10 relative overflow-hidden ring-1 ring-border/30">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-xs font-semibold">
                {careers.badge}
              </Badge>
              <h3 className="mt-2 font-heading text-xl sm:text-3xl font-extrabold text-foreground">{careers.title}</h3>
              <p className="mt-2 text-xs sm:text-base text-muted-foreground leading-relaxed">{careers.text}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                {careers.roles.map((role) => (
                  <span key={role} className="rounded-lg border border-border/70 bg-card px-2.5 py-1 font-medium text-foreground">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button asChild size="lg" className="rounded-xl font-semibold ">
                <Link href={careers.cta.href}>
                  {careers.cta.label} <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* 9. Final CTA */}
      <CtaBand cta={page.cta} />
    </>
  );
}
