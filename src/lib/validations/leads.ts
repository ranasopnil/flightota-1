import { z } from "zod";

export const contactTopics = ["sales", "support", "partnerships"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const contactTopicLabels: Record<ContactTopic, string> = {
  sales: "Sales & pricing",
  support: "Technical support",
  partnerships: "Supplier partnerships",
};

export const monthlyVolumeOptions = ["< 100k", "100k – 1M", "1M – 10M", "10M+"] as const;

export const apiInterestOptions = ["Air", "Hotel", "eSIM", "Visa", "Transfer", "Car rental", "Activities"] as const;

/** Shared by the contact form and the API route that receives it. */
export const contactSchema = z
  .object({
    topic: z.enum(contactTopics),
    name: z.string().trim().min(2, "Enter your full name.").max(80),
    email: z.email("Enter a valid work email.").max(120),
    company: z.string().trim().min(2, "Enter your company name.").max(120),
    monthlyVolume: z.enum(monthlyVolumeOptions).optional(),
    interests: z.array(z.enum(apiInterestOptions)),
    message: z.string().trim().min(10, "Tell us a bit more (at least 10 characters).").max(2000, "Keep it under 2,000 characters."),
  })
  .superRefine((value, ctx) => {
    if (value.topic === "sales" && !value.monthlyVolume) {
      ctx.addIssue({ code: "custom", path: ["monthlyVolume"], message: "Select your expected volume." });
    }
    if (value.topic === "sales" && value.interests.length === 0) {
      ctx.addIssue({ code: "custom", path: ["interests"], message: "Select at least one API." });
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address.").max(120),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
