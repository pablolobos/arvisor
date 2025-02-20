// app/providers.jsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, type ReactNode } from 'react'
import PostHogPageView from "./PostHogPageView"

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
                person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
                capture_pageview: false // Disable automatic pageview capture, as we capture manually
            })
        }
    }, [])

    return (
        <PHProvider client={posthog}>
            <PostHogPageView />
            {children}
        </PHProvider>
    )
}