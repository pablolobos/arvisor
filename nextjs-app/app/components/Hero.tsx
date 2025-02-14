"use client"

import ExpertCard from './ExpertCard'
import { HomePayload } from '@/sanity/lib/queries'
import { urlForImage } from "@/sanity/lib/utils"
import { motion } from "framer-motion"

interface HeroProps {
    home: HomePayload
}

export default function Hero({ home }: HeroProps) {
    if (!home) return null;

    const backgroundImageUrl = home.backgroundImage?.asset ? urlForImage(home.backgroundImage)?.url() : null;
    const heroImageUrl = home.heroImage?.asset ? urlForImage(home.heroImage)?.url() : null;

    return (
        <div className="relative border-gray-10 border-t overflow-hidden">
            {backgroundImageUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1.5 }}
                    className="z-0 absolute inset-0 bg-brand-grayLightest hero-bg"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                    }}
                />
            )}
            <div className="z-10 relative container">
                <div className="py-12 sm:py-20">
                    <div className="content-center gap-8 grid grid-cols-1 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="mb-4 font-heading font-regular text-3xl md:text-3xl lg:text-3xl">{home.title}</h1>
                            {home.subtitle && (
                                <p className="mb-6 text-secondary-foreground text-xl">{home.subtitle}</p>
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
    )
} 