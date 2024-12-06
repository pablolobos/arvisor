import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { formatCurrency, formatUF } from '@/lib/utils'
import { draftMode } from 'next/headers'

import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import ProjectGallery from '@/app/components/ProjectGallery'
import ProjectAmenities from '@/app/components/ProjectAmenities'
import ProjectDetails from '@/app/components/ProjectDetails'
import PortableText from '@/app/components/PortableText'
import ProjectMapWrapper from '@/app/components/ProjectMapWrapper'

type Project = {
    _id: string
    name: string
    subtitle: string
    description: any
    images?: Array<{ url: string; alt: string }>
    amenities?: {
        pool: boolean
        laundry: boolean
        playground: boolean
        parking: boolean
        terrace: boolean
    }
    details?: {
        bedrooms: number
        bathrooms: number
        squareMeters: number
    }
    price: number
    monthlyFee: number
    location: {
        address: string
        mapUrl: string
    }
}

type SanityResponse = {
    data: Project
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const projects = await client.fetch(projectSlugsQuery)
    return projects.map((slug: string) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { isEnabled: isDraftMode } = await draftMode()
    const resolvedParams = await params

    const response = await sanityFetch<string>({
        query: projectQuery,
        params: resolvedParams,
        perspective: isDraftMode ? 'previewDrafts' : 'published'
    })

    const project = response.data as Project

    if (!project) return {}

    return {
        title: project.name,
        description: project.subtitle,
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { isEnabled: isDraftMode } = await draftMode()
    const resolvedParams = await params

    const response = await sanityFetch<string>({
        query: projectQuery,
        params: resolvedParams,
        perspective: isDraftMode ? 'previewDrafts' : 'published'
    })

    const project = response.data as Project

    if (!project) notFound()

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                <div className="mb-8">
                    <p className="mb-2 text-black/90 text-xl leading-tight">{project.subtitle}</p>
                    <h1 className="mb-4 font-heading font-regular text-3xl text-brand-purple md:text-4xl lg:text-5xl">{project.name}</h1>
                    <div>
                        {project.price && (
                            <p className="font-light text-2xl">
                                Desde {formatUF(project.price)}
                            </p>
                        )}
                        {project.monthlyFee && (
                            <p className="font-regular text-2xl">
                                Cuota mensual {formatCurrency(project.monthlyFee)}
                            </p>

                        )}
                    </div>
                    <div className="flex flex-col gap-8">
                        {project.description && (
                            <div className="max-w-none prose prose-xl">
                                <PortableText value={project.description} />
                            </div>
                        )}

                        {project.details && <ProjectDetails details={project.details} />}
                        {project.amenities && <ProjectAmenities amenities={project.amenities} />}
                    </div>

                </div>
                <div className="cols-span-1">
                    {project.images && project.images.length > 0 && (
                        <ProjectGallery images={project.images} />
                    )}
                    {project.location && (
                        <>
                            <div className="w-full h-64">
                                <Suspense fallback={<div>Loading map...</div>}>
                                    <ProjectMapWrapper mapUrl={project.location.mapUrl} />
                                </Suspense>
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">Ubicación</h3>
                                <p className="text-gray-600">{project.location.address}</p>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
} 