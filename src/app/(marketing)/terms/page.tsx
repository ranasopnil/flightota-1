import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import { LegalDocument } from "@/components/common/legal-document";
import { legalLastUpdated, termsSections } from "@/mocks/content/legal";

export const metadata: Metadata = staticPageMetadata("/terms");

export default function TermsPage() {
  return (
    <LegalDocument
      path="/terms"
      title="Terms & Conditions"
      description="Please read these terms carefully before using the platform or the APIs."
      updatedAt={legalLastUpdated}
      sections={termsSections}
    />
  );
}
