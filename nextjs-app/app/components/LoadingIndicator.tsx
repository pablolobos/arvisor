'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function LoadingIndicator() {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setIsLoading(true)
        const timeout = setTimeout(() => setIsLoading(false), 100)
        return () => clearTimeout(timeout)
    }, [pathname, searchParams])

    if (!isLoading) return null

    return (
        <div className="top-0 right-0 left-0 fixed bg-primary/20 h-1">
            <div className="bg-primary w-1/3 h-full animate-[loading_1s_ease-in-out_infinite]" />
        </div>
    )
} 