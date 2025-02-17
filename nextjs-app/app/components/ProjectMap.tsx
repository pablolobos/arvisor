"use client"

interface ProjectMapProps {
    lat: number
    lng: number
    zoom: number
}

export default function ProjectMap({ lat, lng, zoom }: ProjectMapProps) {
    return (
        <div className="rounded-lg w-full h-[300px] overflow-hidden">
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}`}
            />
        </div>
    )
} 