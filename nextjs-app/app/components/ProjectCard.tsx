"use client"

import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency, formatUF } from '@/lib/utils'
import { MapPin } from 'lucide-react'
import { motion } from "framer-motion"
import { getSanityImageUrl } from '@/lib/image'
import { ArrowRight } from 'lucide-react'

export interface ProjectCardProps {
    project: {
        name: string
        slug: string
        subtitle?: string
        images?: Array<{
            asset?: any
            alt?: string
        }>
        price: number | string
        priceDetail?: string
        downPayment?: number | string
        downPaymentDetail?: string
        monthlyFee: number | null
        location?: {
            address: string
        }
        tags?: string[]
        discountPercentage?: number | null
    }
}

const tagLabels: Record<string, string> = {
    'discount': 'Descuento',
    'last-units': 'Últimas unidades',
    'promotion': 'Proyecto en Promoción',
    'bonus': 'Bono pie',
    'en-usa': 'USA',
}

export function ProjectCard({ project }: ProjectCardProps) {
    console.log('Project data:', project)
    const imageUrl = project.images?.[0]?.asset ? getSanityImageUrl(project.images[0]) : ''

    const renderTag = (tag: string) => {
        if (tag === 'discount' && project.discountPercentage) {
            return `${project.discountPercentage}% ${tagLabels[tag]}`
        }
        return tagLabels[tag] || tag
    }

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden project-card"
        >
            <div className="bg-gray-100 aspect-[5/3] overflow-hidden">
                {imageUrl !== '' && (
                    <Image
                        src={imageUrl}
                        alt={project.images?.[0]?.alt || project.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}
                {project.tags && project.tags.length > 0 && (
                    <div className="top-2 left-2 absolute flex flex-col flex-wrap items-start gap-1">
                        {project.tags.map((tag: string) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center bg-brand-purpleHighlight px-2.5 py-0.5 rounded-full font-condensed font-medium text-brand-purpleLightest text-base uppercase project-tag"
                            >
                                {renderTag(tag)}
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-1 space-y-2 p-4">
                <div className="flex flex-col">
                    <h3 className="font-bold text-black lg:text-2xl leading-tight">
                        <Link href={`/proyectos/${project.slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {project.name}
                        </Link>
                    </h3>
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="flex flex-col">
                        <p className="font-light text-2xl">
                            {project.price}
                            {project.priceDetail && (
                                <span className="ml-1 text-gray-600 text-base">{project.priceDetail}</span>
                            )}
                        </p>
                    </div>
                    {project.downPaymentDetail && (
                        <p className="text-gray-600 text-sm">{project.downPaymentDetail}</p>
                    )}
                    {project.monthlyFee && (
                        <p className="font-regular text-xl">
                            Cuota mensual {formatCurrency(project.monthlyFee)}
                        </p>
                    )}
                </div>
                {project.location?.address && (
                    <div className="flex items-center gap-1 pt-2 text-gray-500 text-sm">
                        <MapPin /> {project.location.address}
                    </div>
                )}
                <div className="pt-4">
                    <Link
                        href={`/proyectos/${project.slug}`}
                        className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purpleDark transition-colors"
                    >
                        Detalles del proyecto
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                    </Link>
                </div>

            </div>
        </motion.div>
    )
} 