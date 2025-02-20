import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import type { Project } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery, homeQuery, settingsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import ProjectContent from '@/app/components/ProjectContent'
import { urlForImage } from '@/sanity/lib/utils'
import type { ProjectQueryResult } from '@/sanity.types'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const projects = await client.fetch(projectSlugsQuery)
    return projects
        .filter((slug: string | null): slug is string => slug !== null)
        .map((slug: string) => ({
            slug,
        }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { isEnabled: isDraftMode } = await draftMode()
    const resolvedParams = await params

    const projectResponse = await sanityFetch({
        query: projectQuery,
        params: resolvedParams,
        perspective: isDraftMode ? 'previewDrafts' : 'published'
    })

    const project = projectResponse.data as ProjectQueryResult

    if (!project) return {}

    const settingsResponse = await sanityFetch({
        query: settingsQuery
    })

    const settings = settingsResponse.data

    // Use project ogImage if available, fallback to site default
    const ogImage = project?.ogImage?.asset ? urlForImage(project.ogImage) :
        settings?.ogImage?.asset ? urlForImage(settings.ogImage) : null

    return {
        title: project.name || 'Proyecto',
        description: project.subtitle || undefined,
        openGraph: {
            title: project.name || 'Proyecto',
            description: project.subtitle || undefined,
            images: ogImage ? [
                {
                    url: ogImage.width(1200).height(630).url(),
                    width: 1200,
                    height: 630,
                    alt: project?.ogImage?.alt || settings?.ogImage?.alt || project.name || 'Proyecto',
                }
            ] : undefined,
        },
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { isEnabled: isDraftMode } = await draftMode()
    const resolvedParams = await params

    const projectResponse = await sanityFetch({
        query: projectQuery,
        params: resolvedParams,
        perspective: isDraftMode ? 'previewDrafts' : 'published'
    })

    const project = projectResponse.data as ProjectQueryResult

    if (!project) notFound()

    // Process images on the server
    const processedProject = {
        ...project,
        images: project.images?.map(img => ({
            url: img.asset ? urlFor(img).url() : '',
            alt: img.alt || ''
        }))
    }

    const { data: home } = await sanityFetch({
        query: homeQuery,
        stega: false,
    })

    return (
        <div className="mx-auto px-4 py-8 container">
            <Suspense fallback={<div>Loading...</div>}>
                <ProjectContent
                    project={processedProject}
                    whatsappNumber={home.whatsappNumber}
                />
            </Suspense>
        </div>
    )
} 