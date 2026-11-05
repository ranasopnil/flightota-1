"use client";

import { useState } from "react";
import { CopyButton } from "@/components/common/copy-button";
import { cn } from "@/lib/utils";

export interface CodeSample {
  id: string;
  label: string;
  code: string;
}

interface CodeTabsProps {
  samples: CodeSample[];
  title?: string;
  className?: string;
  maxHeight?: number;
}

/** Language-switchable code panel. Samples are generated on the server and passed in as strings. */
export function CodeTabs({ samples, title, className, maxHeight = 420 }: CodeTabsProps) {
  const [active, setActive] = useState(samples[0]?.id);
  const current = samples.find((s) => s.id === active) ?? samples[0];
  if (!current) return null;

  return (
    <div className={cn("overflow-hidden rounded-lg bg-code text-code-foreground ring-1 ring-white/10", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pr-1">
        <div role="tablist" aria-label={title ?? "Code language"} className="scrollbar-none flex overflow-x-auto">
          {title && <span className="hidden self-center px-4 font-mono text-xs text-navy-400 sm:inline">{title}</span>}
          {samples.map((sample) => (
            <button
              key={sample.id}
              role="tab"
              type="button"
              aria-selected={sample.id === current.id}
              onClick={() => setActive(sample.id)}
              className={cn(
                "relative shrink-0 px-3.5 py-2.5 text-xs font-medium transition",
                sample.id === current.id
                  ? "text-white after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-navy-300 hover:text-white",
              )}
            >
              {sample.label}
            </button>
          ))}
        </div>
        <CopyButton value={current.code} label={`Copy ${current.label} example`} />
      </div>
      <pre role="tabpanel" tabIndex={0} className="scrollbar-none overflow-auto p-4 font-mono text-[13px] leading-relaxed" style={{ maxHeight }}>
        <code>{current.code}</code>
      </pre>
    </div>
  );
}
