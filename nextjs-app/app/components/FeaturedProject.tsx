"use client"

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency, formatUF } from '@/lib/utils'
import { MapPin, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import type { ProjectProps } from './ProjectCard'
import { urlForImage } from "@/sanity/lib/utils"

export function FeaturedProject({ project }: ProjectProps) {
    if (!project || !project.images?.[0]) return null;

    const mainImage = project.images[0]

    const renderTag = (tag: string) => {
        const tagLabels: Record<string, string> = {
            'discount': 'Descuento',
            'last-units': 'Últimas unidades',
            'promotion': 'Proyecto en Promoción',
            'bonus': 'Bono pie',
        }

        if (tag === 'discount' && project.discountPercentage) {
            return `${project.discountPercentage}% ${tagLabels[tag]}`
        }
        return tagLabels[tag] || tag
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative gap-6 grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden"
        >
            <h2 className="top-0 left-0 z-10 absolute bg-brand-purple px-4 py-2 rounded-br-xl font-bold text-white text-2xl">Proyecto Destacado</h2>
            <div className="relative bg-gray-100 aspect-[4/3] md:aspect-auto overflow-hidden">
                <Image
                    src={mainImage.url}
                    alt={mainImage.alt || project.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                />
                {project.tags && project.tags.length > 0 && (
                    <div className="top-4 left-4 absolute flex flex-col flex-wrap items-start gap-2">
                        {project.tags.map((tag: string) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center bg-brand-purpleHighlight px-3 py-1 rounded-full font-condensed font-medium text-brand-purpleLightest text-lg uppercase project-tag"
                            >
                                {renderTag(tag)}
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="space-y-4">
                    <div>
                        <p className="mb-2 text-black/90 text-lg leading-tight">{project.subtitle}</p>
                        <h2 className="font-bold text-black text-3xl lg:text-4xl leading-tight">
                            {project.name}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="font-light text-2xl">
                            Desde {formatUF(project.price)}
                        </p>
                        <p className="font-regular text-2xl">
                            Cuota mensual {formatCurrency(project.monthlyFee)}
                        </p>
                    </div>
                    {project.location?.address && (
                        <div className="flex items-center gap-2 text-gray-500 text-base">
                            <MapPin className="w-5 h-5" /> {project.location.address}
                        </div>
                    )}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 mt-4 text-brand-purple hover:text-brand-purpleDark transition-colors"
                    >
                        Ver detalles del proyecto
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
} 