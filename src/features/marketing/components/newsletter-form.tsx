"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations/leads";
import { useSubscribeNewsletterMutation } from "@/services/api/leads-api";

export function NewsletterForm({ tone = "default", className }: { tone?: "default" | "dark"; className?: string }) {
  const [subscribe, { isLoading }] = useSubscribeNewsletterMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await subscribe(values).unwrap();
      toast.success("You're subscribed", { description: "We'll send product updates and API changelogs to your inbox." });
      reset();
    } catch (error) {
      const message = (error as { message?: string }).message ?? "Please try again.";
      toast.error("Subscription failed", { description: message });
    }
  });

  const errorId = "newsletter-email-error";

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          startIcon={<Mail className="size-4" />}
          size="lg"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId : undefined}
          className={cn(
            "text-sm sm:text-[15px]",
            tone === "dark" && "border-white/15 bg-white/5 text-white placeholder:text-navy-300 dark:bg-white/5",
          )}
          {...register("email")}
        />
        <Button type="submit" size="xl" disabled={isLoading} className="shrink-0">
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          Subscribe
          {!isLoading && <ArrowRight data-icon="inline-end" />}
        </Button>
      </div>
      {errors.email && (
        <p id={errorId} className={cn("text-sm", tone === "dark" ? "text-brand-300" : "text-destructive")}>
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
