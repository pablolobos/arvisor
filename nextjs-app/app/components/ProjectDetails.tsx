type DetailsProps = {
    details: {
        bedrooms: number
        bathrooms: number
        squareMeters: number
    }
}

export default function ProjectDetails({ details }: DetailsProps) {
    return (
        <div className="mt-8">
            <h2 className="mb-4 font-bold text-2xl">Detalles de la Propiedad</h2>
            <div className="gap-4 grid grid-cols-3">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Dormitorios</p>
                    <p className="font-bold text-2xl">{details.bedrooms}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Baños</p>
                    <p className="font-bold text-2xl">{details.bathrooms}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Superficie</p>
                    <p className="font-bold text-2xl">{details.squareMeters}m²</p>
                </div>
            </div>
        </div>
    )
} 