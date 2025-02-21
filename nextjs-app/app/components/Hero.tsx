"use client"

import ExpertCard from './ExpertCard'
import { HomePayload } from '@/sanity/lib/queries'
import { motion } from "framer-motion"

interface HeroProps {
    home: HomePayload
}

export default function Hero({ home }: HeroProps) {
    if (!home) return null;


    return (
        <div className="relative border-gray-10 border-t overflow-hidden">
            <div className="z-10 relative container">
                <div className="py-12 sm:py-20">
                    <div className="content-center gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2">
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