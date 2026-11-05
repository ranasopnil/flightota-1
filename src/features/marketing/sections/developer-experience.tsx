import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/common/section";
import { CodeTabs } from "@/components/documentation/code-tabs";
import { Button } from "@/components/ui/button";
import { codeLanguages, generateCodeSample } from "@/lib/code-samples";
import type { ApiAccess, ApiEndpoint } from "@/types/catalog";
import type { HomePageContent } from "@/types/pages";

export function DeveloperExperience({ endpoint, baseUrl, access, content }: { endpoint: ApiEndpoint; baseUrl: string; access?: ApiAccess; content: HomePageContent["developerExperience"] }) {
  const samples = codeLanguages.map((lang) => ({ id: lang.id, label: lang.label, code: generateCodeSample(endpoint, lang.id, baseUrl, access) }));

  return (
    <Section id="developers">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div className="min-w-0">
          <SectionHeader align="left" eyebrow={content.header.eyebrow} title={content.header.title} description={content.header.description} />
          <ul className="mt-5 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
            {content.items.map((item) => (
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
            {content.actions.map((action, i) => (
              <Button key={action.href} asChild size="xl" variant={i === 0 ? "default" : "outline"}>
                <Link href={action.href}>
                  {action.label}
                  {i === 0 && <ArrowRight data-icon="inline-end" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <CodeTabs samples={samples} title={`${endpoint.method} ${endpoint.path}`} maxHeight={460} className="min-w-0 " />
      </div>
    </Section>
  );
}
