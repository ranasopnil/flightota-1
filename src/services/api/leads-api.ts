import type { ApiSuccess } from "@/types/api";
import type { ContactReceipt, ContactRequest, NewsletterRequest } from "@/types/leads";
import { baseApi } from "./base-api";

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitContact: build.mutation<ContactReceipt, ContactRequest>({
      query: (body) => ({ url: "/contact", method: "POST", body }),
      transformResponse: (res: ApiSuccess<ContactReceipt>) => res.data,
    }),
    subscribeNewsletter: build.mutation<{ subscribed: boolean }, NewsletterRequest>({
      query: (body) => ({ url: "/newsletter", method: "POST", body }),
      transformResponse: (res: ApiSuccess<{ subscribed: boolean }>) => res.data,
    }),
  }),
});

export const { useSubmitContactMutation, useSubscribeNewsletterMutation } = leadsApi;
