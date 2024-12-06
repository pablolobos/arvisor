import "./globals.css";
import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Sofia_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
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


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="es" className={` ${sofiaSans.variable} bg-white text-brand-purple`}>
      <body className="bg-brand-grayLightest">
        <section className="pt-24 min-h-screen">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
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
