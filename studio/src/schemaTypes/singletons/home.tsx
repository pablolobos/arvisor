import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    icon: HomeIcon,
    groups: [
        {
            name: 'general',
            title: 'General',
        },
        {
            name: 'expert',
            title: 'Expert Profile',
        },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Hero Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'general',
        }),
        defineField({
            name: 'subtitle',
            title: 'Hero Subtitle',
            type: 'text',
            group: 'general',
        }),
        // Moving expert fields from settings
        defineField({
            name: 'expertName',
            title: 'Expert Name',
            type: 'string',
            group: 'expert',
        }),
        defineField({
            name: 'expertRole',
            title: 'Expert Role',
            type: 'string',
            group: 'expert',
        }),
        defineField({
            name: 'expertImage',
            title: 'Expert Image',
            type: 'image',
            group: 'expert',
        }),
        defineField({
            name: 'expertInstagram',
            title: 'Expert Instagram URL',
            type: 'url',
            group: 'expert',
        }),
    ],
}) 