type AmenitiesProps = {
    amenities: {
        pool: boolean
        laundry: boolean
        playground: boolean
        parking: boolean
        terrace: boolean
    }
}

export default function ProjectAmenities({ amenities }: AmenitiesProps) {
    const amenityList = [
        { key: 'pool', label: 'Piscina' },
        { key: 'laundry', label: 'Lavandería' },
        { key: 'playground', label: 'Área de Juegos' },
        { key: 'parking', label: 'Estacionamiento' },
        { key: 'terrace', label: 'Terraza' },
    ] as const

    return (
        <div className="mt-8">
            <h2 className="mb-4 font-bold text-2xl">Comodidades</h2>
            <div className="gap-4 grid grid-cols-2">
                {amenityList.map(({ key, label }) => (
                    <div
                        key={key}
                        className={`flex items-center gap-2 ${amenities[key] ? 'text-gray-900' : 'text-gray-400'
                            }`}
                    >
                        <svg
                            className={`w-5 h-5 ${amenities[key] ? 'text-green-500' : 'text-gray-400'
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {amenities[key] ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            )}
                        </svg>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
} 