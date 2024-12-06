"use client"

import ExpertCard from './ExpertCard'
import { HomePayload } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlForImage } from "@/sanity/lib/utils";
import WhatsAppButton from './WhatsAppButton'
import { animate, inView } from "motion"
import { useEffect } from 'react'

interface HeroProps {
    home: HomePayload
}

export default function Hero({ home }: HeroProps) {
    if (!home) return null;

    useEffect(() => {
        const elements = {
            bg: document.querySelector('.hero-bg') as HTMLElement,
            title: document.querySelector('.hero-title') as HTMLElement,
            expert: document.querySelector('.hero-expert') as HTMLElement,
            heroImage: document.querySelector('.hero-image') as HTMLElement
        }

        if (elements.bg) animate(elements.bg, { opacity: '0.5' }, { duration: 1 })
        if (elements.title) animate(elements.title, { opacity: '1', transform: 'translateY(0px)' }, { duration: 0.6, delay: 0.2 })
        if (elements.expert) animate(elements.expert, { opacity: '1', transform: 'translateY(0px)' }, { duration: 0.6, delay: 0.4 })
        if (elements.heroImage) animate(elements.heroImage, { opacity: '1', transform: 'translateX(0px)' }, { duration: 0.8, delay: 0.6 })
    }, [])

    return (
        <div className="relative border-gray-10 border-t h-auto md:h-[70vh] lg:h-[70vh] overflow-hidden">
            {home.backgroundImage?.asset && (
                <div
                    className="z-0 absolute inset-0 bg-brand-grayLightest opacity-0 hero-bg"
                    style={{
                        backgroundImage: `url(${urlForImage(home.backgroundImage)?.url()})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                    }}
                />
            )}
            <div className="relative z-10 container">
                <div className="py-12 sm:py-20">
                    <div className="items-center grid md:grid-cols-2">
                        <div className="flex flex-col justify-start items-start gap-0 md:gap-8 max-w-3xl">
                            <div
                                className="opacity-0 mb-8 hero-title"
                                style={{ transform: 'translateY(20px)' }}
                            >
                                <h1 className="mb-4 font-heading font-regular text-3xl text-black/90 md:text-4xl lg:text-5xl">
                                    {home.title}
                                </h1>
                                {home.subtitle && (
                                    <p className="mb-6 text-black text-xl">{home.subtitle}</p>
                                )}
                            </div>
                            {home?.expertName && (
                                <div
                                    className="opacity-0 hero-expert"
                                    style={{ transform: 'translateY(20px)' }}
                                >
                                    <ExpertCard
                                        name={home.expertName || ''}
                                        role={home.expertRole || ''}
                                        image={home.expertImage}
                                        instagramUrl={home.expertInstagram || ''}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {home.heroImage?.asset && (
                <div
                    className="md:block -right-[150px] -bottom-[100px] absolute hidden opacity-0 w-4/6 max-w-[1000px] h-[120%] hero-image"
                    style={{ transform: 'translateX(100px)' }}
                >
                    <Image
                        src={urlForImage(home.heroImage)?.url() as string}
                        alt={home.heroImage.alt || ''}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}
        </div>
    )
} 