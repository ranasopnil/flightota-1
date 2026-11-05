import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Eyebrow } from "@/components/common/section";
import { imageSrc } from "@/lib/image-src";
import { chipToneClasses } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { HomePageContent } from "@/types/pages";

export function DynamicPackaging({ content }: { content: HomePageContent["dynamicPackaging"] }) {
  const { header, highlights, actions, preview } = content;
  return (
    <section id="dynamic-packaging" className="relative py-16 sm:py-24 bg-background border-t">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Information & Selling Points */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Eyebrow>{header.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {header.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {header.description}
            </p>

            {/* Highlights */}
            <div className="mt-8 space-y-4 w-full">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5 p-3.5 rounded-lg border bg-card/60">
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", chipToneClasses[item.tone])}>
                    <Icon name={item.icon} className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {actions.map((action, i) => (
                <Button key={action.href} asChild size="lg" variant={i === 0 ? "default" : "outline"} className={i === 0 ? "rounded-lg gap-2" : "rounded-lg"}>
                  <Link href={action.href}>
                    <span>{action.label}</span>
                    {i === 0 && <ArrowRight className="size-4" />}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Interactive Package Preview */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-lg border bg-card ">
              {/* Header Visual Image */}
              <div className="relative h-48 sm:h-56 w-full">
                <Image
                  src={imageSrc(preview.image)}
                  alt={preview.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold ">
                    {preview.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{preview.eyebrow}</span>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                    {preview.title}
                  </h3>
                </div>
              </div>

              {/* Package Component Steps */}
              <div className="p-5 sm:p-6 space-y-3.5">
                {preview.items.map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-3 rounded-lg border bg-muted/40">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex size-9 items-center justify-center rounded-lg", chipToneClasses[item.tone])}>
                        <Icon name={item.icon} className="size-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{item.title}</div>
                        <div className="text-[11px] text-muted-foreground">{item.subtitle}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-foreground">{item.price}</span>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{item.note}</div>
                    </div>
                  </div>
                ))}

                {/* Pricing & Checkout summary */}
                <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground line-through">{preview.regularLabel}</div>
                    <div className="text-lg font-heading font-bold text-foreground">
                      {preview.bundleLabel} <span className="text-emerald-600 dark:text-emerald-400 font-mono">{preview.bundlePrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <CheckCircle2 className="size-3 text-emerald-500" /> {preview.footnote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
