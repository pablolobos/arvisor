'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        posthog.capture('$pageview')
    }, [pathname, searchParams])

    return null
} 