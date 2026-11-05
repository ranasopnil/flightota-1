import { ArrowRight, BadgeCheck, Check, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeader } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { PARTNER_PRODUCTION_URL, PARTNER_SANDBOX_URL } from "@/mocks/content/partner-api";

const steps = [
  { title: "Get a key", text: "In the agent portal under API access. The secret is shown once; store it server-side only." },
  { title: "Whitelist your server", text: "A key only works from the public IP addresses you add. Never call the API from a browser or mobile app." },
  { title: "Send two headers", text: "X-Api-Key and X-Api-Secret on every request. No login call, no token." },
  { title: "Call ping first", text: "It tells you which agency and key you are, and the IP we saw." },
];

const environments = [
  { name: "Sandbox", url: PARTNER_SANDBOX_URL, prefix: "ak_test_", use: "Build and certify" },
  { name: "Production", url: PARTNER_PRODUCTION_URL, prefix: "ak_live_", use: "Switched on after certification" },
];

const notes = [
  {
    title: "One deposit pays for everything",
    icon: Wallet,
    items: [
      "Tickets, instant fares, accepted reissue quotes and paid extras are taken from your deposit",
      "Refunds and voids are paid back into it",
      "An issue your deposit cannot cover charges nothing",
      "Prices come in your account's billing currency",
    ],
  },
  {
    title: "Go live after certification",
    icon: BadgeCheck,
    items: ["Certification is run on the sandbox", "Send us the booking references from the go-live checklist", "When they check out, we switch on your live key"],
  },
];

/** How to start and how money moves, from the partner guides. */
export function PartnerGetStarted() {
  return (
    <Section id="get-started">
      <SectionHeader eyebrow="Getting started" title="From a sandbox key to live bookings" description="Four steps to your first call, then certification on the sandbox." />

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-2 lg:gap-12">
        <Reveal className="min-w-0">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
            <Image src="/images/partner/get-started.jpg" alt="A laptop showing code on a bright, tidy desk" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
          </div>
          <dl className="mt-3 divide-y rounded-xl border bg-card">
            {environments.map((env) => (
              <div key={env.name} className="p-3 sm:p-4">
                <dt className="flex items-center justify-between gap-3 text-sm font-semibold text-foreground">
                  {env.name}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground">{env.prefix}</code>
                </dt>
                <dd className="mt-1 font-mono text-xs break-all text-muted-foreground">{env.url}</dd>
                <dd className="mt-0.5 text-xs text-muted-foreground">{env.use}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="min-w-0">
          <ol>
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0 sm:pb-8">
                {i < steps.length - 1 && <span aria-hidden className="absolute top-9 bottom-0 left-[1.0625rem] w-px bg-border" />}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">{i + 1}</span>
                <div className="min-w-0 pt-1">
                  <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-5 w-full rounded-lg sm:w-auto">
            <Link href="/documentation">
              Read the documentation <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-10 md:grid-cols-2 lg:gap-6">
        {notes.map((note) => {
          const Icon = note.icon;
          return (
            <Reveal key={note.title} className="min-w-0 rounded-xl border bg-card p-4 sm:p-6">
              <h3 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground sm:text-lg">
                <Icon className="size-5 text-primary" aria-hidden />
                {note.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                {note.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
