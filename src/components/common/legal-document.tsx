import type { LegalDocumentEntry } from "@/types/content";
import { formatIsoDate } from "@/utils/format";
import { Container } from "./container";
import { ContentBlocks } from "./content-blocks";
import { PageHero } from "./page-hero";
import { ShareButton } from "./share-button";

export function LegalDocument({ doc, path }: { doc: LegalDocumentEntry; path: string }) {
  const { title, description, updatedAt, sections } = doc;
  return (
    <>
      <PageHero
        eyebrow="COMPLIANCE & LEGAL"
        badge="Binding Agreement"
        title={title}
        description={description}
        image={doc.heroImage ?? "/images/heroes/about_architecture.jpg"}
        actions={
          <ShareButton
            path={path}
            size="sm"
            variant="outline"
            className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
          />
        }
        metrics={
          <>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              Updated <time dateTime={updatedAt}>{formatIsoDate(updatedAt)}</time>
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 font-mono font-semibold text-emerald-400 backdrop-blur-md">
              GDPR &bull; SOC2 Type II
            </span>
            <span className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-slate-200 backdrop-blur-md">
              IATA Compliant
            </span>
          </>
        }
      />
      <Container className="grid max-w-6xl gap-12 py-14 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="sticky top-24 flex flex-col gap-2 border-l text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex max-w-3xl flex-col gap-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`} className="font-heading text-xl font-semibold">
                {s.title}
              </h2>
              <ContentBlocks blocks={s.body} className="mt-3 text-sm sm:text-[15.5px]" />
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
