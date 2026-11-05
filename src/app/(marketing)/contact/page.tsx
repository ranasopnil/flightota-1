import type { Metadata } from "next";
import { Suspense } from "react";
import { CmsPageHero } from "@/components/common/cms-hero";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactForm } from "@/features/marketing/components/contact-form";
import { contactTopics, type ContactTopic } from "@/lib/validations/leads";
import { getSingleton } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/contact");
}

async function Form({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { topic } = await searchParams;
  const initial = (contactTopics as readonly string[]).includes(String(topic)) ? (topic as ContactTopic) : "sales";
  return <ContactForm key={initial} initialTopic={initial} />;
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const page = await getSingleton("contact");
  return (
    <>
      <CmsPageHero hero={page.hero} path="/contact" />
      <Container className="grid gap-6 sm:gap-10 py-8 sm:py-14 lg:grid-cols-[1fr_1.6fr]">
        <ul className="flex flex-col gap-4">
          {page.channels.map(({ icon, title, body, href }) => (
            <li key={title} className="flex gap-4 rounded-lg border bg-card p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-primary dark:bg-brand-950/40">
                <Icon name={icon} className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                {href ? (
                  <a href={href} className="text-sm text-primary hover:underline">
                    {body}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{body}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Suspense fallback={<Skeleton className="h-[620px] w-full rounded-lg" />}>
          <Form searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
