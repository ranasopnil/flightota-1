import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/common/legal-document";
import { staticPageMetadata } from "@/config/share";
import { getEntry } from "@/services/server/cms-repository";

export const metadata: Metadata = staticPageMetadata("/terms");

export default async function TermsPage() {
  const doc = await getEntry("legal", "terms");
  if (!doc) notFound();
  return <LegalDocument doc={doc} path="/terms" />;
}
