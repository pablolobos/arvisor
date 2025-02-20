import { PostHog } from 'posthog-node'

export default function PostHogClient() {
    const posthogClient = new PostHog(
        process.env.NEXT_PUBLIC_POSTHOG_KEY!,
        {
            host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            flushAt: 1, // Number of events to queue before sending
            flushInterval: 0 // How often to flush the queue in ms (0 = immediately)
        }
    )
    return posthogClient
} 