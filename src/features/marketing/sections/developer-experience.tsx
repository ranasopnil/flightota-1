import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import { CodeTabs } from "@/components/documentation/code-tabs";
import { Button } from "@/components/ui/button";
import { developerExperience } from "@/constants/marketing";
import { codeLanguages, generateCodeSample } from "@/lib/code-samples";
import type { ApiAccess, ApiEndpoint } from "@/types/catalog";

export function DeveloperExperience({ endpoint, baseUrl, access }: { endpoint: ApiEndpoint; baseUrl: string; access?: ApiAccess }) {
  const samples = codeLanguages.map((lang) => ({ id: lang.id, label: lang.label, code: generateCodeSample(endpoint, lang.id, baseUrl, access) }));

  return (
    <Section id="developers">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div className="min-w-0">
          <SectionHeader
            align="left"
            eyebrow="Developer experience"
            title="One REST API, the same keys and conventions"
            description="Flights, hotels, eSIM and transfers work the same way. Every call below is in the guides, with a real sandbox example."
          />
          <ul className="mt-5 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
            {developerExperience.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sea-50 text-sea-600 dark:bg-sea-900/40 dark:text-sea-300">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
            <Button asChild size="xl">
              <Link href="/documentation">
                Read the docs <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/guides">Integration guides</Link>
            </Button>
          </div>
        </div>
        <CodeTabs samples={samples} title={`${endpoint.method} ${endpoint.path}`} maxHeight={460} className="min-w-0 " />
      </div>
    </Section>
  );
}
