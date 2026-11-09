import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavigationLoader } from "@/components/layout/navigation-loader";
import { siteConfig } from "@/config/site";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/seo";
import { getSingleton } from "@/services/server/cms-repository";
import { StoreProvider } from "@/redux/store-provider";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const [settings, seo] = await Promise.all([getSingleton("site-settings"), getSingleton("seo")]);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${settings.name} — Travel APIs for flights, hotels, eSIM, visa & transfers`,
      template: `%s · ${settings.name}`,
    },
    description: settings.description,
    applicationName: settings.name,
    keywords: settings.keywords,
    openGraph: {
      type: "website",
      siteName: settings.name,
      title: `${settings.name} — ${settings.tagline}`,
      description: settings.description,
      url: siteConfig.url,
      images: [{ url: seo.defaultImage, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: settings.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.name,
      description: settings.description,
      images: [seo.defaultImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1326" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <StoreProvider>
            <TooltipProvider delayDuration={150}>
              <NavigationLoader />
              {children}
              <Toaster position="top-right" richColors closeButton />
            </TooltipProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
