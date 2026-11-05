import { ArrowRight, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Eyebrow } from "@/components/common/section";
import { imageSrc } from "@/lib/image-src";
import type { HomePageContent } from "@/types/pages";

export function CorporateAndMidOffice({ content }: { content: HomePageContent["corporate"] }) {
  const corporateModules = content.modules;
  return (
    <section id="corporate-mid-office" className="relative py-16 sm:py-24 bg-card/60 border-t">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Eyebrow>{content.header.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {content.header.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {content.header.description}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="app-rail mt-4 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {corporateModules.map((module) => {
            return (
              <div
                key={module.id}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:border-primary/50 "
              >
                {/* Visual Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                  <Image
                    src={imageSrc(module.image)}
                    alt={module.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Top Badge & Metric */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <Badge className="bg-primary/90 text-white font-semibold text-xs ">
                      {module.tag}
                    </Badge> 
                  </div>

                  {/* Overlay Bottom Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <Icon name={module.icon} className="size-3.5 text-primary" />
                      <span>{module.subtitle}</span>
                    </div>
                    <h3 className="mt-1 font-heading text-lg font-bold text-white leading-snug">
                      {module.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>

                    {/* Feature highlights */}
                    <div className="mt-5 border-t pt-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5 mb-2.5">
                        <Sparkles className="size-3 text-primary" />
                        {content.capabilitiesLabel}
                      </div>
                      <ul className="space-y-2">
                        {module.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-foreground/85">
                            <Check className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-6 pt-4 border-t flex items-center justify-between">
                    <Button asChild variant="outline" size="sm" className="w-full rounded-lg gap-1.5 group/btn">
                      <Link href={module.cta.href}>
                        <span>{module.cta.label}</span>
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
