import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { formatCurrency } from '@/lib/utils'
import { draftMode } from 'next/headers'
import type { Project } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import ProjectGallery from '@/app/components/ProjectGallery'
import ProjectAmenities from '@/app/components/ProjectAmenities'
import ProjectDetails from '@/app/components/ProjectDetails'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import ProjectMapWrapper from '@/app/components/ProjectMapWrapper'
import { MapPin } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/utils'

type SanityResponse = {
    data: Project
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = await client.fetch(projectSlugsQuery)
    return slugs
        .filter((slug: string | null): slug is string => slug !== null)
        .map((slug: string) => ({
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
    console.log('Project data:', project)

    if (!project) notFound()

    // Transform the Sanity image data into the format ProjectGallery expects
    const galleryImages = project.images?.map(image => ({
        url: urlForImage(image)?.url() || '',
        alt: image.alt || ''
    })) || []

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="gap-12 grid grid-cols-1 md:grid-cols-12">
                <div className="flex flex-col gap-8 col-span-1 md:col-span-7 lg:col-span-5">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-heading font-regular text-3xl md:text-4xl lg:text-5xl">{project.name}</h1>
                        <p className="mb-2 text-black/90 text-xl leading-tight">{project.subtitle}</p>
                    </div>
                    <div className="flex flex-col gap-4 px-4 py-6 border border-gray-200 rounded-lg">
                        <div className="flex flex-col">
                            <p className="font-light text-2xl md:text-3xl">
                                <span className="font-semibold">{project.price}</span>
                                {project.priceDetail && (
                                    <span className="ml-2 text-base">{project.priceDetail}</span>

                                )}
                            </p>

                        </div>

                        {project.downPayment && (
                            <div className="flex flex-col">
                                <p className="font-medium text-xl">
                                    Pie: {project.downPayment}
                                </p>
                                {project.downPaymentDetail && (
                                    <p className="text-gray-600 text-sm">
                                        {project.downPaymentDetail}
                                    </p>
                                )}
                            </div>
                        )}

                        {project.balance && (
                            <div className="flex flex-col">
                                <p className="font-medium text-xl">
                                    Saldo: {project.balance}
                                </p>
                                {project.balanceDetail && (
                                    <p className="text-gray-600 text-sm">
                                        {project.balanceDetail}
                                    </p>
                                )}
                            </div>
                        )}

                        {project.monthlyFee && project.monthlyFee > 0 && (
                            <p className="font-regular text-xl">
                                Cuota mensual {formatCurrency(project.monthlyFee)}
                            </p>
                        )}
                    </div>
                    {project.details && <ProjectDetails details={project.details} />}
                    {project.amenities && <ProjectAmenities amenities={project.amenities} />}
                    {project.description && (
                        <div className="max-w-none prose prose-xl">
                            <PortableText value={project.description as PortableTextBlock[]} />
                        </div>
                    )}

                </div>
                <div className="col-span-1 md:col-span-5 lg:col-span-7">
                    <div className="flex flex-col gap-8">
                        {galleryImages.length > 0 && (
                            <ProjectGallery images={galleryImages} />
                        )}
                        {project.location && (
                            <>
                                <div>
                                    <h2 className="mb-4 font-bold text-2xl">Ubicación</h2>
                                    <div className="flex items-center gap-1 pt-2 text-lg">
                                        <MapPin /> {project.location.address}
                                    </div>
                                </div>
                                <div className="w-full aspect-[3/2]">
                                    <Suspense fallback={<div>Loading map...</div>}>
                                        {project.location.mapUrl && (
                                            <ProjectMapWrapper mapUrl={project.location.mapUrl} />
                                        )}
                                    </Suspense>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
} 