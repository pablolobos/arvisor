"use client"

import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api'
import { useCallback, useRef } from 'react'

const libraries = ['places']

type Props = {
    onSelect: (address: string, lat: number, lng: number) => void
    defaultValue?: string
}

export default function AddressAutocomplete({ onSelect, defaultValue }: Props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries as any,
    })

    const searchBoxRef = useRef<google.maps.places.SearchBox>()

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

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search address..."
                defaultValue={defaultValue}
                className="px-4 py-2 border focus:border-transparent rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            />
        </StandaloneSearchBox>
    )
} 