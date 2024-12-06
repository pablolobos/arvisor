import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Hero Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),
        // Moving expert fields from settings
        defineField({
            name: 'expertName',
            title: 'Expert Name',
            type: 'string',
        }),
        defineField({
            name: 'expertRole',
            title: 'Expert Role',
            type: 'string',
        }),
        defineField({
            name: 'expertImage',
            title: 'Expert Image',
            type: 'image',
        }),
        defineField({
            name: 'expertInstagram',
            title: 'Expert Instagram URL',
            type: 'url',
        }),
    ],
}) 