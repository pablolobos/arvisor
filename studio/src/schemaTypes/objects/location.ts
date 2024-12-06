import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'location',
    title: 'Location',
    type: 'object',
    fields: [
        defineField({
            name: 'address',
            type: 'string',
            title: 'Address',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mapUrl',
            type: 'url',
            title: 'Google Maps URL',
            description: 'Open Google Maps, find your location, click Share > Copy Link, and paste the full URL here (not the shortened maps.app.goo.gl URL)',
            validation: (Rule) => Rule.required().custom((url) => {
                if (!url) return true
                if (url.includes('google.com/maps')) {
                    return true
                }
                return 'Please use the full Google Maps URL (not the shortened maps.app.goo.gl URL). Click Share > Copy Link in Google Maps.'
            }),
        }),
    ],
}) 