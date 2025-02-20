import type { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";
import { PageOnboarding } from "@/app/components/Onboarding";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  try {
    const params = await props.params;
    const [{ data: page }] = await Promise.all([
      sanityFetch({ query: getPageQuery, params }),
    ]);

    // If no page is found, return notFound() without logging
    if (!page?._id) {
      return notFound();
    }

    return (
      <div className="my-12 lg:my-24">
        <Head>
          <title>{page.heading}</title>
        </Head>
        <div className="">
          <div className="container">
            <div className="pb-6 border-gray-100 border-b">
              <div className="max-w-3xl">
                <h2 className="font-bold text-gray-900 text-4xl sm:text-5xl lg:text-7xl tracking-tight">
                  {page.heading}
                </h2>
                <p className="mt-4 font-light text-gray-600 text-base lg:text-lg uppercase leading-relaxed">
                  {page.subheading}
                </p>
              </div>
            </div>
          </div>
        </div>
        <PageBuilderPage page={page as PageType} />
      </div>
    );
  } catch (error) {
    // Only log actual errors, not 404s
    if (!(error instanceof Error && error.message.includes('404'))) {
      console.error('Failed to fetch page:', error);
    }
    return notFound();
  }
}
