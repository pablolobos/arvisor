import posthog from 'posthog-js'

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    try {
        posthog.capture(eventName, properties)
    } catch (error) {
        console.error('PostHog event tracking error:', error)
    }
}

export const AnalyticEvents = {
    NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
    PROJECT_FORM_SUBMIT: 'project_form_submit',
    WHATSAPP_CLICK: 'whatsapp_click',
    PROJECT_WHATSAPP_CLICK: 'project_whatsapp_click'
} as const 