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
    if (!images?.length) return null

    // Only show first 4 images initially
    const visibleImages = images.slice(0, 4)

    return (
        <div className="gap-4 grid">
            {visibleImages.map((image, index) => (
                <div key={image.url} className="relative rounded-lg aspect-[16/9] overflow-hidden">
                    <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        className="object-cover"
                        priority={priority && index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        quality={75}
                        blurDataURL={`${image.url}?w=50&q=10`}
                        placeholder="blur"
                    />
                </div>
            ))}
        </div>
    )
} 