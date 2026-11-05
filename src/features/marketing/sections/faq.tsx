import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import { FaqJsonLd, FaqList } from "@/components/marketing/faq-list";
import { faqs } from "@/constants/marketing";

export function Faq() {
  return (
    <Section tone="muted" id="faq">
      <div className="grid gap-6 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          description={
            <>
              Can&apos;t find what you need?{" "}
              <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
                Talk to our team
              </Link>
              .
            </>
          }
        />
        <FaqList items={faqs} />
      </div>
      <FaqJsonLd items={faqs} />
    </Section>
  );
}
