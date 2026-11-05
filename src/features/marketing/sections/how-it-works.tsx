import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { howItWorks } from "@/constants/marketing";

const STEP_IMAGES = [
  "/images/hero/hero_flight.jpg",
  "/images/airlines/slide3_cockpit.jpg",
  "/images/hero/hero_esim.jpg",
  "/images/airlines/slide4_takeoff.jpg",
];

export function HowItWorks() {
  return (
    <Section tone="muted" id="how-it-works">
      <SectionHeader
        eyebrow="How it works"
        title="From sign-up to first booking in four steps"
        description="The same endpoints and code work in the sandbox and in production. Only the key changes."
      />
      <div className="relative mt-8 sm:mt-14">
        <ol className="relative grid gap-4 sm:gap-6 md:grid-cols-4">
          {howItWorks.map((step, i) => (
            <li key={step.step} className="h-full">
              <Reveal
                delay={i * 0.06}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-border/80 bg-card p-3.5 sm:p-4 transition-all duration-300 hover:border-primary/40 ring-1 ring-border/30 h-full"
              >
                <div>
                  {/* Step Picture Thumbnail */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-lg mb-3 bg-navy-950">
                    <Image
                      src={STEP_IMAGES[i] || "/images/hero/hero_flight.jpg"}
                      alt={step.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="font-mono text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Phase {step.step}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Self-Serve</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
