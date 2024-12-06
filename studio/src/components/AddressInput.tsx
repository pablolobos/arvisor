import { useCallback } from 'react'
import { set, unset } from 'sanity'
import { AddressAutocomplete } from './AddressAutocomplete'
import { ObjectInputProps } from 'sanity'

type LocationValue = {
    _type: 'location'
    address: string
    lat: number
    lng: number
}

export function AddressInput(props: ObjectInputProps<LocationValue>) {
    const { onChange, value } = props

    const handleSelect = useCallback(
        (address: string, lat: number, lng: number) => {
            onChange(
                set({
                    _type: 'location',
                    address,
                    lat,
                    lng,
                })
            )
        },
        [onChange]
    )

    const handleClear = useCallback(() => {
        onChange(unset())
    }, [onChange])

    return (
        <div className="space-y-2">
            <AddressAutocomplete
                onSelect={handleSelect}
                defaultValue={value?.address}
            />
            {value && (
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">
                        Lat: {value.lat}, Lng: {value.lng}
                    </span>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-red-500 text-sm"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    )
} 