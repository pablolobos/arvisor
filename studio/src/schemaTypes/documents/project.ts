import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Project Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'location',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'projectType',
            title: 'Project Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Terreno', value: 'terreno' },
                    { title: 'Departamento', value: 'departamento' },
                    { title: 'Casa', value: 'casa' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Precio (UF)',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'monthlyFee',
            title: 'Cuota Mensual (CLP)',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Etiquetas',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Descuento', value: 'discount' },
                    { title: 'Últimas unidades', value: 'last-units' },
                    { title: 'Proyecto en Promoción', value: 'promotion' },
                    { title: 'Bono pie', value: 'bonus' },
                ],
            },
        }),
        defineField({
            name: 'discountPercentage',
            title: 'Porcentaje de Descuento',
            type: 'number',
            validation: (rule) => rule.min(0).max(100),
            hidden: ({ document }) => {
                const tags = document?.tags as string[] | undefined
                return !tags?.includes('discount')
            },
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                },
            ],
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'amenities',
            title: 'Amenities',
            type: 'object',
            fields: [
                { name: 'pool', title: 'Pool', type: 'boolean' },
                { name: 'laundry', title: 'Laundry Room', type: 'boolean' },
                { name: 'playground', title: 'Playground', type: 'boolean' },
                { name: 'parking', title: 'Parking', type: 'boolean' },
                { name: 'terrace', title: 'Terrace', type: 'boolean' },
                { name: 'urbanizado', title: 'Urbanizado', type: 'boolean' },
                { name: 'cerco', title: 'Cerco', type: 'boolean' },
                { name: 'electricidad', title: 'Electricidad', type: 'boolean' },
                { name: 'aguaPotable', title: 'Agua potable', type: 'boolean' },
            ],
        }),
        defineField({
            name: 'details',
            title: 'Property Details',
            type: 'object',
            fields: [
                { name: 'bedrooms', title: 'Number of Bedrooms', type: 'number' },
                { name: 'bathrooms', title: 'Number of Bathrooms', type: 'number' },
                { name: 'squareMeters', title: 'Square Meters', type: 'number' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'projectType',
            media: 'images.0',
        },
    },
}) 