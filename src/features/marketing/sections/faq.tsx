import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import { FaqJsonLd, FaqList } from "@/components/marketing/faq-list";
import type { HomePageContent } from "@/types/pages";

export function Faq({ content }: { content: HomePageContent["faq"] }) {
  const faqs = content.items;
  return (
    <Section tone="muted" id="faq">
      <div className="grid gap-6 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          align="left"
          eyebrow={content.header.eyebrow}
          title={content.header.title}
          description={
            <>
              {content.header.description}{" "}
              <Link href={content.linkHref} className="font-medium text-primary underline-offset-4 hover:underline">
                {content.linkLabel}
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
