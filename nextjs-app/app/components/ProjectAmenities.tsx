interface Amenities {
    pool?: boolean
    laundry?: boolean
    playground?: boolean
    parking?: boolean
    terrace?: boolean
    urbanizado?: boolean
    cerco?: boolean
    electricidad?: boolean
    aguaPotable?: boolean
}

const amenityLabels = {
    pool: 'Piscina',
    laundry: 'Lavandería',
    playground: 'Área de juegos',
    parking: 'Estacionamiento',
    terrace: 'Terraza',
    urbanizado: 'Urbanizado',
    cerco: 'Cerco',
    electricidad: 'Electricidad',
    aguaPotable: 'Agua potable'
}

export default function ProjectAmenities({ amenities }: { amenities: Amenities }) {
    // Filter only the true amenities
    const activeAmenities = Object.entries(amenities || {})
        .filter(([_, value]) => value === true)
        .map(([key]) => key as keyof Amenities)

    if (activeAmenities.length === 0) return null

    return (
        <div className="mt-6">
            <h3 className="mb-3 font-semibold text-lg">Amenities</h3>
            <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
                {activeAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                        <span>✓</span>
                        <span>{amenityLabels[amenity]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
} 