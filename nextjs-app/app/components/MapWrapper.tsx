'use client'

import { useEffect, useState } from 'react'
import ProjectMap from './ProjectMap'

interface MapWrapperProps {
    lat: number
    lng: number
    zoom: number
}

export default function MapWrapper({ lat, lng, zoom }: MapWrapperProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="bg-gray-100 rounded-lg w-full h-[300px] animate-pulse" />
    }

    return (
        <ProjectMap
            lat={lat}
            lng={lng}
            zoom={zoom}
        />
    )
} 