import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RegionalAddress, RegionalAddressFallback, RegionalPhone, RegionalPhoneFallback } from "@/components/layout/regional-contact";
import { ShareProvider } from "@/components/common/share-context";
import { SiteStructuredData } from "@/components/common/site-structured-data";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { getSingleton } from "@/services/server/cms-repository";

/*
 * The header and footer are cached reads and part of the static shell. The
 * office details (phone, address, WhatsApp number) depend on the visitor's
 * country, so each sits in its own <Suspense> and streams in per request.
 */

async function Header() {
  const [navigation, settings] = await Promise.all([getSingleton("navigation"), getSingleton("site-settings")]);
  return (
    <SiteHeader
      header={navigation.header}
      topBar={navigation.topBar}
      mobileTabs={navigation.mobileTabs}
      settings={{ supportEmail: settings.supportEmail, social: settings.social }}
      phone={
        <Suspense fallback={<RegionalPhoneFallback />}>
          <RegionalPhone />
        </Suspense>
      }
    />
  );
}

async function Footer() {
  const [navigation, settings] = await Promise.all([getSingleton("navigation"), getSingleton("site-settings")]);
  return (
    <SiteFooter
      footer={navigation.footer}
      settings={settings}
      contact={
        <Suspense fallback={<RegionalAddressFallback />}>
          <RegionalAddress />
        </Suspense>
      }
    />
  );
}

async function ShareDefaults({ children }: { children: React.ReactNode }) {
  const [settings, seo] = await Promise.all([getSingleton("site-settings"), getSingleton("seo")]);
  return <ShareProvider value={{ siteName: settings.name, defaultImage: seo.defaultImage, catalogImages: seo.catalogImages }}>{children}</ShareProvider>;
}

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <ShareDefaults>
      <SiteStructuredData />
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Suspense fallback={<div className="h-16 border-b" />}>
        <Header />
      </Suspense>
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </ShareDefaults>
  );
}
