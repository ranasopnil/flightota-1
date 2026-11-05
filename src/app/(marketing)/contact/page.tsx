import { Clock, LifeBuoy, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/marketing/components/contact-form";
import { contactTopics, type ContactTopic } from "@/lib/validations/leads";

export const metadata: Metadata = staticPageMetadata("/contact");

async function Form({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { topic } = await searchParams;
  const initial = (contactTopics as readonly string[]).includes(String(topic)) ? (topic as ContactTopic) : "sales";
  return <ContactForm key={initial} initialTopic={initial} />;
}

const channels = [
  { icon: Mail, title: "Sales", body: siteConfig.salesEmail, href: `mailto:${siteConfig.salesEmail}` },
  { icon: LifeBuoy, title: "Support", body: siteConfig.supportEmail, href: `mailto:${siteConfig.supportEmail}` },
  { icon: Clock, title: "Response time", body: "Within one business day. Faster on Growth and Enterprise plans." },
  { icon: MapPin, title: "Office", body: siteConfig.address },
];

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        badge="Average Response < 4 Hours"
        title="Let's talk about your integration"
        description="Questions about pricing, technical architecture, or enterprise connectivity? Our solutions team is here to assist."
        image="/images/heroes/contact_concierge.jpg"
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Direct Solutions Engineers
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              Same-Day Onboarding
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              24/7 Severity-1 Coverage
            </span>
          </>
        }
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <Link href="/documentation">Docs &rarr;</Link>
            </Button>
            <ShareEmbedModal
              path="/contact"
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />
      <Container className="grid gap-6 sm:gap-10 py-8 sm:py-14 lg:grid-cols-[1fr_1.6fr]">
        <ul className="flex flex-col gap-4">
          {channels.map(({ icon: Icon, title, body, href }) => (
            <li key={title} className="flex gap-4 rounded-lg border bg-card p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-primary dark:bg-brand-950/40">
                <Icon className="size-5" aria-hidden />
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
