import { GuideBlocks } from "@/components/documentation/guide-blocks";
import type { ApiGuide } from "@/types/content";

/** A partner API guide in full, one anchored section per guide chapter. */
export function ApiGuideView({ guide }: { guide: ApiGuide }) {
  return (
    <div className="mt-4 sm:mt-6">
      <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight">{guide.title}</h2>
      <p className="mt-3 text-sm sm:text-[15.5px] leading-relaxed text-secondary-foreground">{guide.intro}</p>
      {guide.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-20 border-b py-6 sm:py-10">
          <h2 id={`${section.id}-title`} className="font-heading text-xl font-semibold tracking-tight">
            {section.title}
          </h2>
          <div className="mt-4 flex flex-col gap-4 text-sm sm:text-[15px] leading-relaxed text-secondary-foreground">
            <GuideBlocks blocks={section.blocks} />
          </div>
        </section>
      ))}
    </div>
  );
}
