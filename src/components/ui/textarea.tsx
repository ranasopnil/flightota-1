"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  showCount?: boolean;
  maxCharacters?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      showCount = false,
      maxCharacters,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(() => {
      const initial = value ?? defaultValue ?? "";
      return String(initial).length;
    });

    const limit = maxCharacters ?? maxLength;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    const isNearLimit = limit ? charCount >= limit * 0.9 : false;
    const isAtLimit = limit ? charCount >= limit : false;

    const textareaNode = (
      <textarea
        ref={ref}
        data-slot="textarea"
        maxLength={limit}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(
          "flex min-h-24 w-full rounded-lg border px-3.5 py-2.5 text-base sm:text-sm transition-all duration-150 outline-none",
          // Smart modern surface: frosted card with subtle and border
          "bg-card/70 hover:bg-card focus-visible:bg-card",
          "border-input/85 hover:border-input focus-visible:border-primary",
          "text-foreground placeholder:text-muted-foreground/75",
          // Focus ring
          "focus-visible:ring-3 focus-visible:ring-primary/15 ",
          // Accessible invalid & disabled states
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "disabled:cursor-not-allowed disabled:bg-muted/60 disabled:opacity-50",
          "dark:bg-card/40 dark:hover:bg-card/70 dark:focus-visible:ring-primary/25",
          showCount && "pb-7",
          className
        )}
        {...props}
      />
    );

    if (!showCount && !limit) {
      return textareaNode;
    }

    return (
      <div className="relative w-full">
        {textareaNode}
        <div
          aria-live="polite"
          className={cn(
            "absolute bottom-2 right-3 pointer-events-none text-[11px] font-mono transition-colors",
            isAtLimit
              ? "text-destructive font-semibold"
              : isNearLimit
              ? "text-amber-500 font-medium"
              : "text-muted-foreground/70"
          )}
        >
          {charCount}
          {limit ? ` / ${limit}` : ""}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
