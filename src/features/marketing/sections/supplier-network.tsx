import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Eyebrow } from "@/components/common/section";
import { imageSrc } from "@/lib/image-src";
import type { HomePageContent } from "@/types/pages";

export function SupplierNetwork({ content }: { content: HomePageContent["supplierNetwork"] }) {
  const { facts, tiers: supplierTiers, actions } = content;
  return (
    <section id="supplier-network" className="bg-navy-950 py-7 text-white sm:py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <Eyebrow tone="dark">{content.header.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance text-white sm:mt-3 sm:text-4xl">
              {content.header.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-200 sm:mt-4 sm:text-lg">
              {content.header.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:gap-3">
              {actions.map((action, i) => (
                <Button
                  key={action.href}
                  asChild
                  variant={i === 0 ? "default" : "outline"}
                  className={i === 0 ? "rounded-lg bg-primary text-white hover:bg-primary/90" : "rounded-lg border-white/20 bg-white/5 text-white hover:bg-white/10"}
                >
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-xl bg-navy-900">
            <Image src={imageSrc(content.image)} alt={content.imageAlt} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 border-y border-white/10 py-5 sm:mt-10 sm:py-6 md:grid-cols-3 md:gap-8">
          {facts.map((fact) => {
            return (
              <li key={fact.title} className="flex gap-3">
                <Icon name={fact.icon} className="mt-0.5 size-5 shrink-0 text-white" />
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold text-white sm:text-base">{fact.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-navy-300 sm:text-sm">{fact.text}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="app-rail mt-5 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {supplierTiers.map((tier) => (
            <article key={tier.category} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-900/50 transition-colors hover:border-white/25">
              <div className="relative aspect-[16/10] bg-navy-900">
                <Image src={imageSrc(tier.image)} alt={tier.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 300px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-semibold text-rose-300">{tier.count}</p>
                <h3 className="mt-1 font-heading text-base font-semibold text-white">{tier.category}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-300">{tier.description}</p>
                <ul className="mt-3 flex flex-col gap-1.5 border-t border-white/10 pt-3 text-xs">
                  {tier.partners.map((partner) => (
                    <li key={partner.name} className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-white">{partner.name}</span>
                      <span className="text-right text-[11px] text-navy-400">{partner.tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
