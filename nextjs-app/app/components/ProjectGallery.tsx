"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectGalleryProps {
    images: Array<{ url: string; alt: string }>
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start'
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    if (!images?.length) return null

    console.log('Gallery images:', images)

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, i) => (
                        <div key={i} className="relative flex-[0_0_100%]">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src={image.url}
                                    alt={image.alt || `Project image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="top-1/2 left-4 absolute bg-white/80 shadow-md p-2 rounded-full -translate-y-1/2"
                onClick={scrollPrev}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                className="top-1/2 right-4 absolute bg-white/80 shadow-md p-2 rounded-full -translate-y-1/2"
                onClick={scrollNext}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    )
} 