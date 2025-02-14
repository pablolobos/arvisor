import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { formatCurrency, formatUF } from '@/lib/utils'
import { draftMode } from 'next/headers'
import type { Project } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import ProjectGallery from '@/app/components/ProjectGallery'
import ProjectAmenities from '@/app/components/ProjectAmenities'
import ProjectDetails from '@/app/components/ProjectDetails'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import ProjectMapWrapper from '@/app/components/ProjectMapWrapper'
import { MapPin } from 'lucide-react'
import type { BlockContent } from '@/sanity.types'
import imageUrlBuilder from '@sanity/image-url'
import PriceCard from '@/app/components/PriceCard'
import { Rotate3d } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectContactForm from '@/app/components/ProjectContactForm'
const builder = imageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
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

    console.log('3D URL:', project.viewer3dUrl)

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="gap-12 grid grid-cols-1 md:grid-cols-12">
                <div className="flex flex-col gap-6 col-span-1 md:col-span-7 lg:col-span-5">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-heading font-regular text-3xl md:text-4xl lg:text-5xl">{project.name}</h1>
                        <p className="mb-2 text-black/80 text-2xl leading-tight">{project.subtitle}</p>
                    </div>
                    {project.description && (
                        <div className="max-w-none prose-lg">
                            <PortableText
                                value={project.description as unknown as BlockContent}
                            />
                        </div>
                    )}
                    <PriceCard
                        price={project.price}
                        priceDetail={project.priceDetail}
                        downPayment={project.downPayment}
                        downPaymentDetail={project.downPaymentDetail}
                        balance={project.balance}
                        balanceDetail={project.balanceDetail}
                        monthlyFee={project.monthlyFee}
                    />
                    {project.details && <ProjectDetails details={project.details} />}
                    {project.amenities && <ProjectAmenities amenities={project.amenities} />}

                </div>
                <div className="col-span-1 md:col-span-5 lg:col-span-7">
                    <div className="flex flex-col gap-8">
                        {project.images && project.images.length > 0 && (
                            <ProjectGallery
                                images={project.images.map(img => ({
                                    url: img.asset ? urlFor(img).url() : '',
                                    alt: img.alt || ''
                                }))}
                            />
                        )}
                        {project.viewer3dUrl && (
                            <div className="mb-8">
                                <Button
                                    asChild
                                    variant="secondary"
                                    size="lg"
                                    className="gap-2"
                                >
                                    <a
                                        href={project.viewer3dUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ver proyecto en 3D
                                        <Rotate3d className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        )}
                        {project.location && (
                            <>
                                <div>
                                    <h2 className="mb-4 font-bold text-2xl">Ubicación</h2>
                                    <div className="flex items-center gap-1 pt-2 text-lg">
                                        <MapPin /> {project.location.address}
                                    </div>
                                </div>
                                {project.location && project.location.mapUrl && (
                                    <div className="w-full aspect-[3/2]">
                                        <Suspense fallback={<div>Loading map...</div>}>
                                            <ProjectMapWrapper mapUrl={project.location.mapUrl || ''} />
                                        </Suspense>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="mb-8">
                            <h2 className="mb-4 font-bold text-2xl">Contacto</h2>
                            <ProjectContactForm projectName={project.name || ''} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 