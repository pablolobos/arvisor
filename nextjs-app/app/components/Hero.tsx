import ExpertCard from './ExpertCard'
import { HomePayload } from '@/sanity/lib/queries'

interface HeroProps {
    home: HomePayload
}

export default function Hero({ home }: HeroProps) {
    if (!home) return null;

    return (
        <div className="border-gray-10 border-t">
            <div className="container">
                <div className="py-12 sm:py-20">
                    <div className="mb-12 max-w-3xl">
                        <h1 className="mb-4 font-bold font-heading text-4xl text-brand-purple">{home.title}</h1>
                        {home.subtitle && (
                            <p className="text-black text-xl">{home.subtitle}</p>
                        )}
                    </div>

                    {home?.expertName && (
                        <ExpertCard
                            name={home.expertName || ''}
                            role={home.expertRole || ''}
                            image={home.expertImage}
                            instagramUrl={home.expertInstagram || ''}
                        />
                    )}
                </div>
            </div>
        </div>
    )
} 