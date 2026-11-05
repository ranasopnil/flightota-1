import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ShareProvider } from "@/components/common/share-context";
import { getSingleton } from "@/services/server/cms-repository";

async function Header() {
  const [navigation, settings] = await Promise.all([getSingleton("navigation"), getSingleton("site-settings")]);
  return (
    <SiteHeader
      header={navigation.header}
      topBar={navigation.topBar}
      mobileTabs={navigation.mobileTabs}
      settings={{ supportEmail: settings.supportEmail, phone: settings.phone, phoneHref: settings.phoneHref, social: settings.social }}
    />
  );
}

async function Footer() {
  const [navigation, settings] = await Promise.all([getSingleton("navigation"), getSingleton("site-settings")]);
  return <SiteFooter footer={navigation.footer} settings={settings} />;
}

async function ShareDefaults({ children }: { children: React.ReactNode }) {
  const [settings, seo] = await Promise.all([getSingleton("site-settings"), getSingleton("seo")]);
  return <ShareProvider value={{ siteName: settings.name, defaultImage: seo.defaultImage, catalogImages: seo.catalogImages }}>{children}</ShareProvider>;
}

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <ShareDefaults>
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
    </ShareDefaults>
  );
}
