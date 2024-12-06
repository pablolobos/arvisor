"use client"

import ExpertCard from './ExpertCard'
import { HomePayload } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlForImage } from "@/sanity/lib/utils";
import WhatsAppButton from './WhatsAppButton'
import { motion } from "framer-motion"
import { useEffect } from 'react'

interface HeroProps {
    home: HomePayload
}

export default function Hero({ home }: HeroProps) {
    if (!home) return null;

    return (
        <div className="relative border-gray-10 border-t h-auto md:h-[70vh] lg:h-[70vh] overflow-hidden">
            {home.backgroundImage?.asset && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1.5 }}
                    className="z-0 absolute inset-0 bg-brand-grayLightest hero-bg"
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
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="mb-8 hero-title"
                            >
                                <h1 className="mb-4 font-heading font-regular text-3xl text-brand-purple md:text-4xl lg:text-5xl">{home.title}</h1>
                                {home.subtitle && (
                                    <p className="mb-6 text-black text-xl">{home.subtitle}</p>
                                )}
                            </motion.div>
                            {home?.expertName && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="hero-expert"
                                >
                                    <ExpertCard
                                        name={home.expertName || ''}
                                        role={home.expertRole || ''}
                                        image={home.expertImage}
                                        instagramUrl={home.expertInstagram || ''}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {home.heroImage?.asset && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.8, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    className="md:block -right-[150px] -bottom-[100px] absolute hidden w-4/6 max-w-[1000px] h-[120%] hero-image"
                >
                    <Image
                        src={urlForImage(home.heroImage)?.url() as string}
                        alt={home.heroImage.alt || ''}
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
            )}
        </div>
    )
} 