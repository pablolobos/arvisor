import { trackEvent, AnalyticEvents } from '@/lib/analytics'

// In your form submission handler:
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
        // Your existing newsletter submission logic

        trackEvent(AnalyticEvents.NEWSLETTER_SUBSCRIBE, {
            source: 'website',
            // Add any other relevant properties
        })

        // Success handling
    } catch (error) {
        // Error handling
    }
} 