import { Quote } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { testimonials } from "@/constants/marketing";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader eyebrow="Customers" title="Travel companies ship faster with FlightOTA" />
      <div className="app-rail mt-4 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06} className="h-full">
            <figure className="flex h-full flex-col rounded-lg border bg-card p-5 sm:p-7 ">
              <Quote className="size-7 text-brand-200 dark:text-brand-800" aria-hidden />
              <blockquote className="mt-4 flex-1 text-sm sm:text-[15px] leading-relaxed text-secondary-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
