import { defineQuery, groq } from "next-sanity";

export const settingsQuery = /* groq */ `
  *[_type == "settings"][0]{
    title,
    description,
    ogImage,
  }
`;

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkFields = /* groq */ `
  link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
        }
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        ${linkFields},
      }
    },
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkFields}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

const projectFields = `
  _id,
  name,
  "slug": slug.current,
  subtitle,
  location {
    address,
    mapUrl
  },
  projectType,
  price,
  monthlyFee,
  tags,
  images[] {
    "url": asset->url,
    alt
  },
  description,
  amenities,
  details
`

export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
    ${projectFields}
  }
`)

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`)

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)][].slug.current
`)

export const homeQuery = /* groq */ `*[_type == "home"][0]{
  title,
  subtitle,
  expertName,
  expertRole,
  expertImage,
  expertInstagram,
  backgroundImage,
  heroImage
}`

export type HomePayload = {
  title: string
  subtitle?: string
  expertName?: string
  expertRole?: string
  expertImage?: any
  expertInstagram?: string
  backgroundImage?: {
    alt?: string
    asset: any
  }
  heroImage?: {
    alt?: string
    asset: any
  }
}
