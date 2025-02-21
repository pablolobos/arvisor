import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";
import { Suspense } from 'react'

import Header from "@/app/components/Header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery, homeQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import WhatsAppButton from "./components/WhatsAppButton";
import { GoogleTagManager } from '@next/third-parties/google'
import ConditionalFooter from "@/app/components/ConditionalFooter"
import { PostHogProvider } from './providers'
import { NavigationEvents } from './components/NavigationEvents'
import DraftModeToast from './components/DraftModeToast'
import PostHogPageView from './PostHogPageView'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title;
  const description = settings?.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let home = null;
  let isDraftMode = false;

  try {
    const { isEnabled } = await draftMode();
    isDraftMode = isEnabled;
    const { data } = await sanityFetch({
      query: homeQuery,
      stega: false,
    });
    home = data;
  } catch (error) {
    home = {
      whatsappNumber: process.env.DEFAULT_WHATSAPP || '',
    };
  }

  return (
    <html lang="es" className={`${inter.variable} bg-white text-gray-900`}>
      <head>
        <meta name="facebook-domain-verification" content="cxrzu5a5bjdoat9y6g73b023p6xpxb" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="bg-white">
        <PostHogProvider>
          <Header home={home} />
          <Suspense fallback={null}>
            <Toaster />
          </Suspense>
          {isDraftMode && (
            <Suspense fallback={null}>
              <DraftModeToast />
              <VisualEditing />
            </Suspense>
          )}
          <SanityLive onError={handleError} />
          <Suspense fallback={null}>
            <div className="right-4 bottom-4 z-50 fixed">
              <WhatsAppButton phoneNumber={home.whatsappNumber} />
            </div>
          </Suspense>
          <main className="mx-auto container">{children}</main>
          <ConditionalFooter />
          <Suspense fallback={null}>
            <SpeedInsights />
            <PostHogPageView />
            <NavigationEvents />
          </Suspense>
        </PostHogProvider>
        <Suspense fallback={null}>
          <GoogleTagManager gtmId="GTM-P9TKRZ7D" />
        </Suspense>
      </body>
    </html>
  );
}
