import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/common/legal-document";
import { getEntry } from "@/services/server/cms-repository";
import { cmsPageMetadata } from "@/services/server/seo";

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("/terms");
}

export default async function TermsPage() {
  const doc = await getEntry("legal", "terms");
  if (!doc) notFound();
  return <LegalDocument doc={doc} path="/terms" />;
}
