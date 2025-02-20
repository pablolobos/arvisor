import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Sofia_Sans, Sofia_Sans_Condensed, Inter } from "next/font/google";
import { draftMode, headers } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery, homeQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import WhatsAppButton from "./components/WhatsAppButton";
import { GoogleTagManager } from '@next/third-parties/google'
import ConditionalFooter from "@/app/components/ConditionalFooter"

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
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

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

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
  display: "swap",
});

const sofiaSansCondensed = Sofia_Sans_Condensed({
  variable: "--font-sofia-sans-condensed",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  const { data: home } = await sanityFetch({
    query: homeQuery,
    stega: false,
  });

  // Get the current path from headers
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isSuccessPage = pathname.includes('/success');

  return (
    <html lang="es" className={`${sofiaSans.variable} ${sofiaSansCondensed.variable} ${inter.className} bg-white text-gray-900`}>
      <head>
        <meta name="facebook-domain-verification" content="cxrzu5a5bjdoat9y6g73b023p6xpxb" />
      </head>
      <GoogleTagManager gtmId="GTM-P9TKRZ7D" />
      <body className="bg-white">
        <Header home={home} />
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        <div className="right-4 bottom-4 z-50 fixed">
          <WhatsAppButton phoneNumber={home.whatsappNumber} />
        </div>
        <main className="mx-auto container">{children}</main>
        <ConditionalFooter />
        <SpeedInsights />
      </body>
    </html>
  );
}
