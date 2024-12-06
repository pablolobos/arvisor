"use client"

type Props = {
    mapUrl: string
}

export default function ProjectMap({ mapUrl }: Props) {
    // Extract coordinates and place ID from the URL
    const getEmbedUrl = (url: string) => {
        // If it's already an embed URL, return as is
        if (url.includes('/maps/embed/')) return url

        // Handle shortened URLs (maps.app.goo.gl)
        if (url.includes('maps.app.goo.gl')) {
            // For shortened URLs, we'll use the URL as the search query instead
            return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(url)}`
        }

        // Try to extract coordinates or place ID
        const placeMatch = url.match(/place\/([^\/]+)\/@([-\d.]+),([-\d.]+)/)
        if (placeMatch) {
            const [, place, lat, lng] = placeMatch
            return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(place)}&center=${lat},${lng}`
        }

        // If no matches, create a simple search embed
        const searchQuery = url.split('/place/')[1]?.split('/@')[0] || url
        return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(searchQuery)}`
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