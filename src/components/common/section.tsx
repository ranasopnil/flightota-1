import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends ComponentProps<"section"> {
  tone?: "default" | "muted" | "dark";
  containerClassName?: string;
}

export function Section({ tone = "default", className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-7 sm:py-14 md:py-20 lg:py-24",
        tone === "muted" && "bg-muted",
        tone === "dark" && "dark-section bg-navy-950 text-white",
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "dark";
  className?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  className,
  action,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 sm:gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl",
        action && align === "left" && "max-w-none sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-2 sm:gap-3", align === "center" && "items-center")}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Heading
          className={cn(
            "font-heading text-2xl font-semibold tracking-tight text-balance sm:text-4xl",
            tone === "dark" ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className={cn("text-base text-pretty sm:text-lg", tone === "dark" ? "text-navy-200" : "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Eyebrow({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase",
        tone === "dark" ? "text-brand-300" : "text-primary",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-5", tone === "dark" ? "bg-brand-300" : "bg-primary")} />
      {children}
    </span>
  );
}
