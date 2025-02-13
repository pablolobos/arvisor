"use client"

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency, formatUF } from '@/lib/utils'
import { MapPin } from 'lucide-react'
import { motion } from "framer-motion"

export type ProjectProps = {
    project: {
        images: Array<{ url: string; alt: string }>
        name: string
        subtitle: string
        slug: string
        price: number
        monthlyFee: number
        location: {
            address: string
        }
        tags?: string[]
        discountPercentage?: number
    }
}

const tagLabels: Record<string, string> = {
    'discount': 'Descuento',
    'last-units': 'Últimas unidades',
    'promotion': 'Proyecto en Promoción',
    'bonus': 'Bono pie',
}

export function ProjectCard({ project }: ProjectProps) {
    const mainImage = project.images[0]

    const renderTag = (tag: string) => {
        if (tag === 'discount' && project.discountPercentage) {
            return `${project.discountPercentage}% ${tagLabels[tag]}`
        }
        return tagLabels[tag] || tag
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden project-card"
        >
            <div className="bg-gray-100 aspect-[4/3] overflow-hidden">
                <Image
                    src={mainImage.url}
                    alt={mainImage.alt}
                    width={300}
                    height={300}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                    <p className="text-black/90 text-sm leading-tight">{project.subtitle}</p>
                    <h3 className="font-bold text-black lg:text-2xl leading-tight">
                        <Link href={`/projects/${project.slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {project.name}
                        </Link>
                    </h3>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <p className="font-light text-xl">
                        Desde {formatUF(project.price)}
                    </p>
                    <p className="font-regular text-xl">
                        Cuota mensual {formatCurrency(project.monthlyFee)}
                    </p>
                </div>
                <div className="flex items-center gap-1 pt-2 text-gray-500 text-sm">
                    <MapPin /> {project.location.address}
                </div>
            </div>
        </motion.div>
    )
} 