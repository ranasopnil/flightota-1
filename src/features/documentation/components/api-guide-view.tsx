import { Check } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { CodeBlock } from "@/components/common/code-block";
import type { ApiGuide, ApiGuideBlock } from "@/types/content";

/** Renders `code` and **bold** inside guide text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*(?:[^*`]|`[^`]*`)+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              <Inline text={part.slice(2, -2)} />
            </strong>
          );
        }
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.86em] break-words text-foreground">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Block({ block }: { block: ApiGuideBlock }): ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "subheading":
      return (
        <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
          <Inline text={block.text} />
        </h3>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5`}>
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "checklist":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="app-table w-full min-w-[560px] text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-2.5 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {block.rows.map((row, r) => (
                <tr key={r} className="align-top">
                  {row.map((cell, c) => (
                    <td key={c} data-label={block.headers[c]} className="px-4 py-2.5">
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return <CodeBlock code={block.code} title={block.title} language={block.language} maxHeight={560} />;
  }
}

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
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
