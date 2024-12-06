"use client"

type Props = {
    mapUrl: string
}

export default function ProjectMap({ mapUrl }: Props) {
    const getEmbedUrl = (url: string) => {
        // If it's already an embed URL, return as is
        if (url.includes('/maps/embed/')) return url

        // Try to extract coordinates from the URL
        const coordsMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
        if (coordsMatch) {
            const [, lat, lng] = coordsMatch
            // Use place endpoint with coordinates as both center and query
            return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&center=${lat},${lng}&zoom=16`
        }

        // Try to extract place name
        const placeMatch = url.match(/place\/([^/]+)\//)
        if (placeMatch) {
            const [, place] = placeMatch
            const decodedPlace = decodeURIComponent(place.replace(/\+/g, ' '))
            return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(decodedPlace)}&zoom=16`
        }

        // Fallback
        return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(url)}&zoom=16`
    }

    const embedUrl = getEmbedUrl(mapUrl)

    return (
        <div className="relative w-full h-full">
            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    )
} 