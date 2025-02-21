// app/providers.jsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, type ReactNode } from 'react'

interface PostHogProviderProps {
    children: ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
        const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

        if (key && host) {
            posthog.init(key, {
                api_host: host,
                loaded: (posthog) => {
                    if (process.env.NODE_ENV === 'development') posthog.debug()
                },
                autocapture: false, // Disable automatic event capture
                capture_pageview: false, // We handle this manually
                persistence: 'localStorage',
                bootstrap: {
                    distinctID: 'anonymous',
                    isIdentifiedID: false,
                }
            })
        }
    }, [])

    return <PHProvider client={posthog}>{children}</PHProvider>
}