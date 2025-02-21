import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import type { Project } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery, homeQuery, settingsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import dynamic from 'next/dynamic'
import { urlForImage } from '@/sanity/lib/utils'
import type { ProjectQueryResult } from '@/sanity.types'
import PostHogClient from '@/lib/posthog'
import Loading from './loading'
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

    const settingsResponse = await sanityFetch({ query: settingsQuery })
    const settings = settingsResponse.data

    // Use first project image if no ogImage is set
    const imageSource = project?.ogImage || project?.images?.[0] || settings?.ogImage
    const finalImageUrl = imageSource?.asset ?
        builder
            .image(imageSource)
            .width(1200)
            .height(630)
            .fit('crop')
            .url()
        : null

    return {
        title: project.name || 'Proyecto',
        description: project.subtitle || undefined,
        openGraph: {
            title: project.name || 'Proyecto',
            description: project.subtitle || undefined,
            images: finalImageUrl ? [
                {
                    url: finalImageUrl,
                    width: 1200,
                    height: 630,
                    alt: project?.ogImage?.alt || project?.images?.[0]?.alt || project.name || 'Proyecto',
                }
            ] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: project.name || 'Proyecto',
            description: project.subtitle || undefined,
            images: finalImageUrl ? [finalImageUrl] : undefined,
        }
    }
}

const ProjectContentComponent = dynamic(() => import('@/app/components/ProjectContent'), {
    loading: undefined,
    ssr: true
})

async function ProjectPageContent({ params }: PageProps) {
    noStore()

    const { isEnabled: isDraftMode } = await draftMode()
    const resolvedParams = await params
    const posthog = PostHogClient()

    try {
        const [projectResponse, { data: home }] = await Promise.all([
            sanityFetch({
                query: projectQuery,
                params: resolvedParams,
                perspective: isDraftMode ? 'previewDrafts' : 'published',
                next: { tags: ['project', params.slug] }
            }),
            sanityFetch({
                query: homeQuery,
                stega: false,
                next: { tags: ['home'] }
            })
        ])

        const project = projectResponse.data as ProjectQueryResult
        if (!project) notFound()

        await posthog.capture({
            distinctId: 'server',
            event: 'project_view',
            properties: {
                project_id: project._id,
                project_name: project.name,
                project_type: project.projectType
            }
        })

        const processedProject = {
            ...project,
            images: project.images?.map(img => ({
                url: img.asset ? urlFor(img).url() : '',
                alt: img.alt || ''
            }))
        }

        return <ProjectContentComponent project={processedProject} whatsappNumber={home.whatsappNumber} />
    } finally {
        await posthog.shutdown()
    }
}

export default function ProjectPage({ params }: PageProps) {
    return (
        <div className="mx-auto px-4 py-8 container">
            <Suspense>
                <ProjectPageContent params={params} />
            </Suspense>
        </div>
    )
} 