import "./globals.css";
import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Sofia_Sans, Sofia_Sans_Condensed } from "next/font/google";
import { draftMode } from "next/headers";
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

  return (
    <html lang="es" className={` ${sofiaSans.variable} ${sofiaSansCondensed.variable} bg-white text-brand-purple`}>
      <body className="bg-brand-purpleLightest">
        <section className="pt-24 min-h-screen">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <Header home={home} />
          <main className="">{children}</main>
          <Footer />
        </section>
        <SpeedInsights />

        <Script id="chat-widget-config" strategy="afterInteractive">
          {`
            window.embeddedWebchatConfig = {
              clientId: "5f8dd5f1-a55e-4ba2-86ba-a480b4f6b63d",
              channelId: "40ae7660-4ed0-4f13-af52-4d9d44e3a2e4",
              agentName: "Tomás Barlow",
              askForPhoneNumber: false,
              chatWithUsText: "¿Tienes alguna pregunta?",
              suggestedQuestions: ["Requisitos para comprar", "¿Tienen mas proyectos?"],
            };
          `}
        </Script>
        <Script
          src="https://vambeai.com/webchat.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
