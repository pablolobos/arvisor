export const projectQuery = `*[_type == "project" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  images[]{
    "url": asset->url,
    "alt": asset->altText
  },
  location->{
    address,
    mapUrl
  }
}` 