import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  maxHeight?: number;
}

/** Dark code surface with a copy button. Server-renderable; only the copy button is client-side. */
export function CodeBlock({ code, language, title, className, maxHeight }: CodeBlockProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg bg-code text-code-foreground ring-1 ring-white/10", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1 pr-1 pl-4">
        <span className="truncate font-mono text-xs text-navy-300">{title ?? language}</span>
        <CopyButton value={code} label={`Copy ${title ?? language ?? "code"}`} />
      </div>
      <pre
        className="scrollbar-none overflow-auto p-4 font-mono text-[13px] leading-relaxed"
        style={maxHeight ? { maxHeight } : undefined}
        tabIndex={0}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
