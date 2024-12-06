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
    images: Array<{ url: string; alt: string }>
    amenities: string[]
    details: {
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

interface PageProps {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
    const projects = await client.fetch(projectSlugsQuery)
    return projects.map((slug: string) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { isEnabled: isDraftMode } = await draftMode()

    const { data: project } = await sanityFetch<{ data: Project }>({
        query: projectQuery,
        params,
        perspective: isDraftMode ? 'previewDrafts' : 'published'
    })

    if (!project) return {}

    return {
        title: project.name,
        description: project.subtitle,
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { isEnabled: isDraftMode } = await draftMode()

    const { data: project } = await sanityFetch<{ data: Project }>({
        query: projectQuery,
        params,
        perspective: isDraftMode ? 'previewDrafts' : 'published'
    })

    if (!project) notFound()

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="mb-8">
                <h1 className="font-bold text-4xl">{project.name}</h1>
                <p className="text-gray-600 text-xl">{project.subtitle}</p>
            </div>

            <ProjectGallery images={project.images} />

            <div className="gap-8 grid grid-cols-1 lg:grid-cols-3 mt-8">
                <div className="lg:col-span-2">
                    <div className="max-w-none prose">
                        <PortableText value={project.description} />
                    </div>

                    <ProjectAmenities amenities={project.amenities} />
                    <ProjectDetails details={project.details} />
                </div>

                <div className="lg:col-span-1">
                    <div className="top-8 sticky space-y-6 p-6 border rounded-lg">
                        <div>
                            <h3 className="font-medium text-lg">Precio</h3>
                            <p className="font-bold text-3xl">{formatUF(project.price)}</p>
                            <p className="text-gray-600">
                                {formatCurrency(project.monthlyFee)}/mes
                            </p>
                        </div>

                        <div className="w-full h-64">
                            <Suspense fallback={<div>Loading map...</div>}>
                                <ProjectMapWrapper mapUrl={project.location.mapUrl} />
                            </Suspense>
                        </div>

                        <div>
                            <h3 className="font-medium text-lg">Ubicación</h3>
                            <p className="text-gray-600">{project.location.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 