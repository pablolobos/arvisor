"use client"

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency, formatUF } from '@/lib/utils'
import { MapPin } from 'lucide-react'
import { animate } from "motion"
import { useEffect } from 'react'

export type ProjectProps = {
    project: any
}

const tagLabels: Record<string, string> = {
    'discount': 'Descuento',
    'last-units': 'Últimas unidades',
    'promotion': 'Proyecto en Promoción',
    'bonus': 'Bono pie',
}

export const ProjectCard = ({ project }: ProjectProps) => {
    const mainImage = project.images[0]

    useEffect(() => {
        const tags = document.querySelectorAll('.project-tag') as NodeListOf<HTMLElement>
        tags.forEach(tag => {
            animate(tag, { opacity: '1', transform: 'translateX(0px)' }, { duration: 0.3 })
        })
    }, [])

    const renderTag = (tag: string) => {
        if (tag === 'discount' && project.discountPercentage) {
            return `${project.discountPercentage}% ${tagLabels[tag]}`
        }
        return tagLabels[tag] || tag
    }

    return (
        <div
            className="relative flex flex-col bg-white opacity-0 border rounded-xl overflow-hidden group project-card"
            onMouseEnter={(e) => {
                animate(e.currentTarget, { y: -5 }, { duration: 0.2 })
            }}
            onMouseLeave={(e) => {
                animate(e.currentTarget, { y: 0 }, { duration: 0.2 })
            }}
        >
            <div className="bg-gray-100 overflow-hidden aspect-[4/3]">
                <Image
                    src={mainImage.url}
                    alt={mainImage.alt}
                    width={300}
                    height={300}
                    className="group-hover:scale-105 w-full h-full transition-transform duration-300 object-center object-cover"
                />
                <div className="top-2 left-2 absolute flex flex-col flex-wrap items-start gap-1">
                    {project.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="inline-flex items-center bg-brand-purpleHighlight opacity-0 px-2.5 py-0.5 rounded-full font-condensed font-medium text-base text-brand-purpleLightest uppercase project-tag"
                        >
                            {renderTag(tag)}
                        </span>
                    ))}
                </div>
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
                <div className="flex items-center gap-1 pt-2 text-gray-500 text-sm"><MapPin /> {project.location.address}</div>
            </div>
        </div>
    )
} 