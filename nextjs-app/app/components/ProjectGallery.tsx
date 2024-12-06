"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Image = {
    url: string
    alt: string
}

type Props = {
    images: Image[]
}

export default function ProjectGallery({ images }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, i) => (
                        <div key={i} className="relative flex-[0_0_100%]">
                            <div className="w-full aspect-[16/9]">
                                <Image
                                    src={image.url}
                                    alt={image.alt}
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