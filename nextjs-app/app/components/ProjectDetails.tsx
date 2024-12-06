interface Details {
    bedrooms?: number
    bathrooms?: number
    squareMeters?: number
}

const detailLabels = {
    bedrooms: 'Dormitorios',
    bathrooms: 'Baños',
    squareMeters: 'Metros cuadrados'
}

export default function ProjectDetails({ details }: { details?: Details }) {
    if (!details) return null

    // Filter only the details that have values
    const activeDetails = Object.entries(details)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => ({
            key: key as keyof Details,
            value
        }))

    if (activeDetails.length === 0) return null

    return (
        <div className="mt-6">
            <h3 className="mb-3 font-semibold text-lg">Detalles</h3>
            <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
                {activeDetails.map(({ key, value }) => (
                    <div key={key} className="bg-white p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">{detailLabels[key]}</p>
                        <p className="font-bold text-2xl">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
} 