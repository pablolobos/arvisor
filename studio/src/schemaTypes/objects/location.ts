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
            description: 'Paste the Google Maps share URL',
            validation: (Rule) => Rule.required().custom((url) => {
                if (!url) return true
                if (url.includes('google.com/maps') || url.includes('maps.app.goo.gl')) {
                    return true
                }
                return 'Please enter a valid Google Maps URL'
            }),
        }),
    ],
}) 