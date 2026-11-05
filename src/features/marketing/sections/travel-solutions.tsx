import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Eyebrow } from "@/components/common/section";
import { imageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import type { HomePageContent } from "@/types/pages";

export function TravelSolutions({ content }: { content: HomePageContent["travelSolutions"] }) {
  const solutions = content.items;
  return (
    <section id="travel-solutions" className="border-t py-7 sm:py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>{content.header.eyebrow}</Eyebrow>
          <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance text-foreground sm:mt-3 sm:text-4xl">
            {content.header.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            {content.header.description}
          </p>
        </div>

        <div className="app-rail mt-5 flex flex-col gap-10 sm:mt-14 lg:gap-16">
          {solutions.map((sol, i) => {
            return (
              <article key={sol.id} className="grid min-w-0 grid-cols-1 items-center overflow-hidden rounded-xl border bg-card sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent md:grid-cols-2 md:gap-10 lg:gap-16">
                <div className={cn("relative aspect-[3/2] overflow-hidden bg-muted sm:rounded-xl", i % 2 === 1 && "md:order-last")}>
                  <Image src={imageSrc(sol.image)} alt={sol.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 768px) 100vw, 600px" className="object-cover" />
                </div>

                <div className="min-w-0 p-4 sm:px-0 sm:pt-5 md:py-0">
                  <p className="flex items-center gap-2 text-xs font-semibold text-primary sm:text-sm">
                    <Icon name={sol.icon} className="size-4 shrink-0" />
                    {sol.badge}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-foreground sm:text-2xl lg:text-3xl">{sol.title}</h3>
                  <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{sol.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sol.description}</p>

                  <ul className="mt-4 flex flex-col gap-2">
                    {sol.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-[13px] text-foreground/85 sm:text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link href={sol.cta.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline sm:mt-5">
                    {sol.cta.label}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
