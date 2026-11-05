import { Gauge, Headset, Layers, Plug, ShieldCheck, Wallet, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { whyChooseUs } from "@/constants/marketing";

const icons: Record<(typeof whyChooseUs)[number]["icon"], LucideIcon> = {
  layers: Layers,
  shield: ShieldCheck,
  gauge: Gauge,
  plug: Plug,
  wallet: Wallet,
  headset: Headset,
};

export function WhyChooseUs() {
  return (
    <Section id="why-us">
      <SectionHeader
        eyebrow="Why choose us"
        title="Infrastructure you don't have to babysit"
        description="We handle supplier quirks, retries and normalisation, so your team can focus on the traveller experience."
      />
      <div className="mt-6 sm:mt-14 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Reveal key={item.title} delay={i * 0.04} className="bg-card p-4 sm:p-7">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-primary dark:bg-brand-950/50">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
