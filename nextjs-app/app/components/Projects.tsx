"use client"

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency, formatUF } from '@/lib/utils'

type ProjectProps = {
    project: any // We'll define a proper type later
}

const tagLabels: Record<string, string> = {
    'discount': 'Descuento',
    'last-units': 'Últimas unidades',
    'promotion': 'Proyecto en Promoción',
    'bonus': 'Bono pie',
}

const ProjectCard = ({ project }: ProjectProps) => {
    const mainImage = project.images[0]

    const renderTag = (tag: string) => {
        if (tag === 'discount' && project.discountPercentage) {
            return `${tagLabels[tag]} ${project.discountPercentage}%`
        }
        return tagLabels[tag] || tag
    }

    return (
        <div className="relative flex flex-col border rounded-lg overflow-hidden group">
            <div className="bg-gray-100 overflow-hidden aspect-square">
                <Image
                    src={mainImage.url}
                    alt={mainImage.alt}
                    width={300}
                    height={300}
                    className="group-hover:scale-105 w-full h-full transition-transform duration-300 object-center object-cover"
                />
            </div>
            <div className="flex flex-col flex-1 space-y-2 p-4">
                <h3 className="font-medium text-gray-900 text-sm">
                    <Link href={`/projects/${project.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {project.name}
                    </Link>
                </h3>
                <p className="text-gray-500 text-sm">{project.subtitle}</p>
                <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="inline-flex items-center bg-gray-100 px-2.5 py-0.5 rounded-full font-medium text-gray-800 text-xs"
                        >
                            {renderTag(tag)}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <p className="font-medium text-base text-gray-900">
                        {formatUF(project.price)}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {formatCurrency(project.monthlyFee)}/mes
                    </p>
                </div>
                <p className="text-gray-500 text-sm">{project.location.address}</p>
            </div>
        </div>
    )
}

export const AllProjects = ({ projects }: { projects: any[] }) => {
    if (!projects?.length) {
        return null
    }

    return (
        <div className="">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-2xl lg:max-w-7xl">
                <h2 className="font-extrabold text-4xl text-brand-purple uppercase tracking-tight">
                    Oportunidades especiales
                </h2>
                <div className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
} 