"use client"

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'

interface ProjectGalleryProps {
    images: Array<{
        url: string
        alt: string
    }>
    priority?: boolean
}

export default function ProjectGallery({ images, priority }: ProjectGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    if (!images?.length) return null

    return (
        <div className="relative bg-gray-100">
            <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                <div className="flex touch-pan-y select-none">
                    {images.map((image, index) => (
                        <div key={image.url} className="relative flex-[0_0_100%] min-w-0 aspect-[16/9]">
                            <Image
                                src={image.url}
                                alt={image.alt || ''}
                                fill
                                className="object-cover pointer-events-none"
                                priority={priority && index === 0}
                                quality={75}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <div className="absolute inset-0 flex justify-between items-center p-4 pointer-events-none">
                    <button
                        onClick={scrollPrev}
                        className="bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transition-colors pointer-events-auto"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transition-colors pointer-events-auto"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
} 