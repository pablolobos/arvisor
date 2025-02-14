import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

export function getSanityImageUrl(image: any) {
    if (!image?.asset) return ''
    return builder.image(image).url()
} 