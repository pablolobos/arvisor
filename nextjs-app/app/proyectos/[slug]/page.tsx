import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { sanityFetch } from '@/sanity/lib/live'
import { projectQuery, projectSlugsQuery, homeQuery, settingsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import dynamic from 'next/dynamic'
import type { ProjectQueryResult } from '@/sanity.types'
import { urlFor, getOGImageUrl } from '@/lib/image'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const projects = await client.fetch(projectSlugsQuery)
    return projects
        .filter((slug: string | null): slug is string => slug !== null)
        .map((slug: string) => ({ slug }))
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

    const imageSource = project?.ogImage || project?.images?.[0] || settings?.ogImage
    const finalImageUrl = getOGImageUrl(imageSource)

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
    const { isEnabled: isDraftMode } = await draftMode()
    const resolvedParams = await params

    const [projectResponse, { data: home }] = await Promise.all([
        sanityFetch({
            query: projectQuery,
            params: resolvedParams,
            perspective: isDraftMode ? 'previewDrafts' : 'published',
            stega: true
        }),
        sanityFetch({
            query: homeQuery,
            stega: false
        })
    ])

    const project = projectResponse.data as ProjectQueryResult
    if (!project) notFound()

    const processedProject = {
        ...project,
        images: project.images?.map(img => ({
            url: img.asset ? urlFor(img).url() : '',
            alt: img.alt || ''
        }))
    }

    return <ProjectContentComponent
        project={processedProject}
        whatsappNumber={home.whatsappNumber}
    />
}

export default function ProjectPage({ params }: PageProps) {
    return (
        <div className="mx-auto px-4 py-8 container">
            <ProjectPageContent params={params} />

        </div>
    )
} 