import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    icon: HomeIcon,
    groups: [
        {
            name: 'general',
            title: 'General',
        },
        {
            name: 'location',
            title: 'Location',
        },
        {
            name: 'details',
            title: 'Details',
        },
        {
            name: 'price',
            title: 'Price',
        },
        {
            name: 'images',
            title: 'Images',
        },
        {
            name: 'videos',
            title: 'Videos',
        },
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Project Name',
            type: 'string',
            group: 'general',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'general',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            group: 'general',
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
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'object',
            group: 'location',
            fields: [
                {
                    name: 'address',
                    title: 'Address',
                    type: 'string',
                    validation: Rule => Rule.required()
                },
                {
                    name: 'mapUrl',
                    title: 'Google Maps URL',
                    type: 'url',
                }
            ]
        }),
        defineField({
            name: 'price',
            title: 'Precio (UF)',
            type: 'string',
            group: 'price',
        }),
        defineField({
            name: 'priceDetail',
            title: 'Detalle del precio',
            type: 'string',
            group: 'price',
            description: 'Información adicional sobre el precio',
        }),
        defineField({
            name: 'downPayment',
            title: 'Pie',
            type: 'string',
            description: 'Monto del pie (opcional)',
        }),
        defineField({
            name: 'downPaymentDetail',
            title: 'Detalle del pie',
            type: 'string',
            group: 'price',
            description: 'Información adicional sobre el pie',
        }),
        defineField({
            name: 'balance',
            title: 'Saldo',
            type: 'string',
            group: 'price',
            description: 'Saldo restante (opcional)',
        }),
        defineField({
            name: 'balanceDetail',
            title: 'Detalle del saldo',
            type: 'string',
            group: 'price',
            description: 'Información adicional sobre el saldo',
        }),
        defineField({
            name: 'monthlyFee',
            title: 'Cuota Mensual (CLP)',
            type: 'number',
            group: 'price',
        }),
        defineField({
            name: 'tags',
            title: 'Etiquetas',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'details',
            options: {
                list: [
                    { title: 'Descuento', value: 'discount' },
                    { title: 'Últimas unidades', value: 'last-units' },
                    { title: 'Proyecto en Promoción', value: 'promotion' },
                    { title: 'Bono pie', value: 'bonus' },
                    { title: 'USA', value: 'en-usa' },
                ],
            },
        }),
        defineField({
            name: 'discountPercentage',
            title: 'Porcentaje de Descuento',
            type: 'number',
            group: 'price',
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
            group: 'images',
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
                            initialValue: 'Image',
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
            group: 'general',
        }),
        defineField({
            name: 'amenities',
            title: 'Amenities',
            type: 'object',
            group: 'details',
            fields: [
                { name: 'cerco', title: 'Cerco', type: 'boolean' },
                { name: 'camino_interior', title: 'Camino interior', type: 'boolean' },
                { name: 'urbanizado', title: 'Urbanizado', type: 'boolean' },
                { name: 'electricidad', title: 'Electricidad', type: 'boolean' },
                { name: 'aguaPotable', title: 'Agua potable', type: 'boolean' },
                { name: 'security', title: 'Seguridad', type: 'boolean' },
                { name: 'playground', title: 'Playground', type: 'boolean' },
                { name: 'parking', title: 'Parking', type: 'boolean' },
                { name: 'pool', title: 'Pool', type: 'boolean' },
                { name: 'laundry', title: 'Laundry Room', type: 'boolean' },
                { name: 'terrace', title: 'Terrace', type: 'boolean' },
            ],
        }),
        defineField({
            name: 'details',
            title: 'Property Details',
            type: 'object',
            group: 'details',
            fields: [
                { name: 'bedrooms', title: 'Number of Bedrooms', type: 'number' },
                { name: 'bathrooms', title: 'Number of Bathrooms', type: 'number' },
                { name: 'squareMeters', title: 'Square Meters', type: 'number' },
            ],
        }),
        defineField({
            name: 'viewer3dUrl',
            title: 'URL del Visor 3D',
            type: 'string',
            group: 'details',
            description: 'URL para el visor 3D interactivo'
        }),
        defineField({
            name: 'videos',
            title: 'Videos',
            type: 'array',
            group: 'videos',
            of: [{ type: 'video' }],
            options: {
                layout: 'grid'
            }
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            group: 'images',
            description: 'Custom social sharing image. If not set, will use the site default.',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text'
                })
            ]
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'projectType',
            media: 'images.0',
        },
    },
}) 