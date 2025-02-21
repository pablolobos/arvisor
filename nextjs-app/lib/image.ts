import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

export function getOGImageUrl(imageSource: any) {
    return imageSource?.asset ?
        builder
            .image(imageSource)
            .width(1200)
            .height(630)
            .fit('crop')
            .url()
        : null
} 