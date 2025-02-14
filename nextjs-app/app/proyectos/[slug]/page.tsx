import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import type { Project } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery, homeQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import ProjectContent from '@/app/components/ProjectContent'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
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