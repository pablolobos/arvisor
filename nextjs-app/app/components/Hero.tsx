import ExpertCard from './ExpertCard'
import { HomePayload } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlForImage } from "@/sanity/lib/utils";

interface HeroProps {
    home: HomePayload
}

export default function Hero({ home }: HeroProps) {
    if (!home) return null;

    return (
        <div className="relative border-gray-10 border-t">
            {home.backgroundImage?.asset && (
                <div
                    className="z-0 absolute inset-0 bg-brand-grayLightest"
                    style={{
                        backgroundImage: `url(${urlForImage(home.backgroundImage)?.url()})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.5
                    }}
                />
            )}
            <div className="relative z-10 container">
                <div className="py-12 sm:py-20">
                    <div className="items-center gap-8 grid md:grid-cols-2">
                        <div className="mb-12 max-w-3xl">
                            <h1 className="mb-4 font-bold font-heading text-4xl text-brand-purple">{home.title}</h1>
                            {home.subtitle && (
                                <p className="text-black text-xl">{home.subtitle}</p>
                            )}
                            {home?.expertName && (
                                <ExpertCard
                                    name={home.expertName || ''}
                                    role={home.expertRole || ''}
                                    image={home.expertImage}
                                    instagramUrl={home.expertInstagram || ''}
                                />
                            )}
                        </div>
                        {home.heroImage?.asset && (
                            <div className="relative -right-[100px] bottom-0 absolute aspect-square">
                                <Image
                                    src={urlForImage(home.heroImage)?.url() as string}
                                    alt={home.heroImage.alt || ''}
                                    fill
                                    className="rounded-lg object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 