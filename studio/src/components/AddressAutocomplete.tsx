"use client"

import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api'
import { useCallback, useRef } from 'react'

const libraries: ["places"] = ["places"]

type Props = {
    onSelect: (address: string, lat: number, lng: number) => void
    defaultValue?: string
}

export function AddressAutocomplete({ onSelect, defaultValue }: Props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY ?? '',
        libraries
    })

    const searchBoxRef = useRef<google.maps.places.SearchBox>()

    if (loadError) {
        console.error('Error loading Google Maps:', loadError)
        return <div>Error loading maps: {loadError.message}</div>
    }
    if (!isLoaded) return <div>Loading...</div>

    const onPlacesChanged = useCallback(() => {
        const places = searchBoxRef.current?.getPlaces()
        if (places && places.length > 0) {
            const place = places[0]
            const location = place.geometry?.location

            if (location) {
                onSelect(
                    place.formatted_address || '',
                    location.lat(),
                    location.lng()
                )
            }
        }
    }, [onSelect])

    return (
        <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search address..."
                defaultValue={defaultValue}
                className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </StandaloneSearchBox>
    )
} 