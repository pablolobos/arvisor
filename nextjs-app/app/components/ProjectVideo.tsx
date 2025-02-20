'use client'

import { useMemo } from 'react'

interface ProjectVideoProps {
    url: string
    title?: string
}

export default function ProjectVideo({ url, title }: ProjectVideoProps) {
    const videoId = useMemo(() => {
        const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(youtubeRegex)
        return match?.[2]
    }, [url])

    if (!videoId) return null

    return (
        <div className="w-full aspect-video">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title || 'YouTube video player'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
} 