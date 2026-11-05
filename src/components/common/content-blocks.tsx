import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/types/content";
import { CodeBlock } from "./code-block";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Renders CMS-style content blocks with consistent typography. Text is rendered as plain text (no HTML injection). */
export function ContentBlocks({ blocks, className }: { blocks: ContentBlock[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-5 text-sm sm:text-[16.5px] leading-[1.75] text-secondary-foreground", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} id={block.id ?? slugify(block.text)} className="mt-6 font-heading text-2xl font-semibold tracking-tight text-foreground">
                {block.text}
              </h2>
            );
          case "paragraph":
            return <p key={i}>{block.text}</p>;
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={i} className={cn("flex flex-col gap-2 pl-6", block.ordered ? "list-decimal" : "list-disc marker:text-primary")}>
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </List>
            );
          }
          case "code":
            return <CodeBlock key={i} code={block.code} language={block.language} title={block.title} className="my-1" />;
          case "callout": {
            const Icon = block.tone === "warning" ? TriangleAlert : Info;
            return (
              <div
                key={i}
                className={cn(
                  "flex gap-3 rounded-lg border p-4 text-sm sm:text-[15px]",
                  block.tone === "warning"
                    ? "border-amber-500/30 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
                    : "border-navy-200 bg-navy-50 text-navy-800 dark:border-navy-700 dark:bg-navy-900/40 dark:text-navy-100",
                )}
              >
                <Icon className="mt-1 size-4 shrink-0" aria-hidden />
                <p>{block.text}</p>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export function headingsOf(blocks: ContentBlock[]) {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: b.id ?? slugify(b.text), text: b.text }));
}
