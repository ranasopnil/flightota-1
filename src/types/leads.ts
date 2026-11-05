export type { ContactFormValues as ContactRequest, NewsletterFormValues as NewsletterRequest } from "@/lib/validations/leads";

export interface ContactReceipt {
  id: string;
  /** Ticket or lead reference shown to the user. */
  reference: string;
}
