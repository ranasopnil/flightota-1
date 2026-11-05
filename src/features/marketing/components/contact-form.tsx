"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3, Building, CircleCheck, Loader2, Mail, User } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  apiInterestOptions,
  contactSchema,
  contactTopicLabels,
  contactTopics,
  monthlyVolumeOptions,
  type ContactFormValues,
  type ContactTopic,
} from "@/lib/validations/leads";
import { useSubmitContactMutation } from "@/services/api/leads-api";
import type { NormalizedApiError } from "@/types/api";

export function ContactForm({ initialTopic = "sales" }: { initialTopic?: ContactTopic }) {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [reference, setReference] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: initialTopic, name: "", email: "", company: "", interests: [], message: "" },
  });
  const { register, control, handleSubmit, setError, reset, formState } = form;
  const topic = useWatch({ control, name: "topic" });
  const errors = formState.errors;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const receipt = await submitContact(values).unwrap();
      setReference(receipt.reference);
      reset({ ...values, message: "" });
    } catch (error) {
      const apiError = error as NormalizedApiError;
      if (apiError.fieldErrors) {
        Object.entries(apiError.fieldErrors).forEach(([field, messages]) =>
          setError(field as keyof ContactFormValues, { message: messages[0] }),
        );
      }
      toast.error("We couldn't send your message", { description: apiError.message });
    }
  });

  if (reference) {
    return (
      <div role="status" className="flex flex-col items-center rounded-lg border bg-card p-10 text-center">
        <CircleCheck className="size-10 text-sea-500" aria-hidden />
        <h2 className="mt-4 font-heading text-xl font-semibold">Thanks, we&apos;ve received your message</h2>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Your reference is <span className="font-mono font-medium text-foreground">{reference}</span>. Our team usually replies within one business day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setReference(null)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg border bg-card p-6 sm:p-8">
      <FieldGroup>
        <Controller
          control={control}
          name="topic"
          render={({ field }) => (
            <FieldSet>
              <FieldLegend variant="label">What can we help with?</FieldLegend>
              <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
                {contactTopics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={field.value === t}
                    onClick={() => field.onChange(t)}
                    className="rounded-lg border px-3 py-2.5 text-sm font-medium transition hover:bg-accent aria-checked:border-primary aria-checked:bg-primary/5 aria-checked:text-primary"
                  >
                    {contactTopicLabels[t]}
                  </button>
                ))}
              </div>
            </FieldSet>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="contact-name">Full name</FieldLabel>
            <Input
              id="contact-name"
              autoComplete="name"
              startIcon={<User className="size-4" />}
              clearable
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              startIcon={<Mail className="size-4" />}
              clearable
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.company)}>
            <FieldLabel htmlFor="contact-company">Company</FieldLabel>
            <Input
              id="contact-company"
              autoComplete="organization"
              startIcon={<Building className="size-4" />}
              clearable
              aria-invalid={Boolean(errors.company)}
              {...register("company")}
            />
            <FieldError errors={[errors.company]} />
          </Field>
          {topic === "sales" && (
            <Controller
              control={control}
              name="monthlyVolume"
              render={({ field }) => (
                <Field data-invalid={Boolean(errors.monthlyVolume)}>
                  <FieldLabel htmlFor="contact-volume">Expected monthly requests</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="contact-volume"
                      className="w-full"
                      startIcon={<BarChart3 className="size-4" />}
                      aria-invalid={Boolean(errors.monthlyVolume)}
                    >
                      <SelectValue placeholder="Select volume" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthlyVolumeOptions.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[errors.monthlyVolume]} />
                </Field>
              )}
            />
          )}
        </div>

        <Controller
          control={control}
          name="interests"
          render={({ field }) => (
            <FieldSet data-invalid={Boolean(errors.interests)}>
              <FieldLegend variant="label">APIs you&apos;re interested in {topic !== "sales" && <span className="font-normal text-muted-foreground">(optional)</span>}</FieldLegend>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {apiInterestOptions.map((option) => {
                  const checked = field.value.includes(option);
                  return (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(next) =>
                          field.onChange(next ? [...field.value, option] : field.value.filter((v) => v !== option))
                        }
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              <FieldError errors={[errors.interests]} />
            </FieldSet>
          )}
        />

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            showCount
            maxCharacters={1000}
            aria-invalid={Boolean(errors.message)}
            placeholder={topic === "support" ? "Include request IDs and the endpoint you're calling. Never include API keys." : "Tell us about your product and use case."}
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <Button type="submit" size="xl" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="animate-spin" data-icon="inline-start" />}
          Send message
        </Button>
      </FieldGroup>
    </form>
  );
}
