'use client'

import dynamic from 'next/dynamic'

const ProjectMap = dynamic(() => import('@/app/components/ProjectMap'), {
    ssr: false,
})

type Props = {
    mapUrl: string
}

export default function ProjectMapWrapper({ mapUrl }: Props) {
    return <ProjectMap mapUrl={mapUrl} />
} 