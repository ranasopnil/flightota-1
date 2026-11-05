import type { Metadata } from "next";
import { staticPageMetadata } from "@/config/share";
import { LegalDocument } from "@/components/common/legal-document";
import { legalLastUpdated, privacySections } from "@/mocks/content/legal";

export const metadata: Metadata = staticPageMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      path="/privacy"
      description="We collect only what we need to run the service, and we protect it carefully."
      updatedAt={legalLastUpdated}
      sections={privacySections}
    />
  );
}
