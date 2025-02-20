import { defineLive } from "next-sanity";
import { client } from "./client";
import { token } from "./token";

/**
 * Use defineLive to enable automatic revalidation and refreshing of your fetched content
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used
  serverToken: token,
  // Required for stand-alone live previews
  browserToken: token,
});
