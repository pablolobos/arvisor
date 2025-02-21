"use client"

import Image from 'next/image'

interface ProjectGalleryProps {
    images: Array<{
        url: string
        alt: string
    }>
    priority?: boolean
}

export default function ProjectGallery({ images, priority }: ProjectGalleryProps) {
    return (
        <div className="gap-4 grid">
            {images.map((image, index) => (
                <div key={image.url} className="relative rounded-lg aspect-[16/9] overflow-hidden">
                    <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={priority && index === 0}
                        loading={priority && index === 0 ? 'eager' : 'lazy'}
                        quality={90}
                    />
                </div>
            ))}
        </div>
    )
} 