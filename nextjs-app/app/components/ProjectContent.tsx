'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Rotate3d, MapPin, MessageCircle } from 'lucide-react'
import { Project } from '@/sanity.types'
import ProjectGallery from './ProjectGallery'
import ProjectAmenities from './ProjectAmenities'
import ProjectDetails from './ProjectDetails'
import { PortableText } from '@portabletext/react'
import { FaWhatsapp } from "react-icons/fa";
import { Mail } from 'lucide-react'
import ProjectContactModal from './ProjectContactModal'
import PriceCard from './PriceCard'
import type { BlockContent } from '@/sanity.types'
import MapWrapper from './MapWrapper'
import ProjectVideo from './ProjectVideo'
import { trackEvent, AnalyticEvents } from '@/lib/analytics'
import NextImage from 'next/image'

type ProcessedProject = {
    _id: string;
    name?: string | null;
    subtitle?: string | null;
    location?: {
        address?: string | null;
        mapUrl?: string | null;
    } | null;
    projectType?: "terreno" | "departamento" | "casa" | null;
    price?: string | null;
    priceDetail?: string | null;
    downPayment?: string | null;
    downPaymentDetail?: string | null;
    balance?: string | null;
    balanceDetail?: string | null;
    monthlyFee?: number | null;
    tags?: Array<string> | null;
    discountPercentage?: number | null;
    images?: Array<{
        url: string;
        alt: string;
    }>;
    description?: BlockContent | null;
    amenities?: {
        cerco?: boolean;
        camino_interior?: boolean;
        urbanizado?: boolean;
        electricidad?: boolean;
        aguaPotable?: boolean;
        security?: boolean;
        playground?: boolean;
        parking?: boolean;
        pool?: boolean;
        laundry?: boolean;
        terrace?: boolean;
    } | null;
    details?: {
        bedrooms?: number;
        bathrooms?: number;
        squareMeters?: number;
    } | null;
    viewer3dUrl?: string | null;
    videos?: Array<{
        url: string | null;
        title?: string | null;
        description?: string | null;
    }> | null;
    ogImage?: {
        asset?: any;
        alt?: string | null;
    } | null;
}

interface ProjectContentProps {
    project: ProcessedProject
    whatsappNumber?: string
}

function extractGoogleMapsParams(url: string) {
    try {
        const mapsUrl = new URL(url)

        // Try to find coordinates in the URL using the !3d and !4d format first
        const coordMatches = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
        if (coordMatches) {
            return {
                lat: parseFloat(coordMatches[1]),
                lng: parseFloat(coordMatches[2]),
                zoom: 15
            }
        }

        // If that fails, try the @ format
        if (mapsUrl.pathname.includes('@')) {
            const atIndex = mapsUrl.pathname.indexOf('@')
            const coordsString = mapsUrl.pathname.slice(atIndex + 1)
            const coords = coordsString.split(',')
            if (coords.length >= 2) {
                return {
                    lat: parseFloat(coords[0]),
                    lng: parseFloat(coords[1]),
                    zoom: coords[2] ? parseInt(coords[2].replace(/[^\d.]/g, '')) : 15
                }
            }
        }

        // If still no coordinates found, try to extract from the pathname
        const placeCoords = mapsUrl.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
        if (placeCoords) {
            return {
                lat: parseFloat(placeCoords[1]),
                lng: parseFloat(placeCoords[2]),
                zoom: 15
            }
        }

        console.log('No coordinates found in URL')
        return null
    } catch (error) {
        console.error('Error parsing Google Maps URL:', error)
        return null
    }
}

interface PriceCardProps {
    price?: string | null;
    priceDetail?: string | null;
    downPayment?: string | null;
    downPaymentDetail?: string | null;
    balance?: string | null;
    balanceDetail?: string | null;
    monthlyFee?: number | null;
}

export default function ProjectContent({ project, whatsappNumber }: ProjectContentProps) {
    const [contactModalOpen, setContactModalOpen] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const formattedWhatsAppNumber = whatsappNumber?.replace(/\D/g, '')

    const mapParams = useMemo(() => {
        if (project.location?.mapUrl) {
            const params = extractGoogleMapsParams(project.location.mapUrl)
            return params
        }
        return null
    }, [project.location?.mapUrl])

    useEffect(() => {
        if (project.images) {
            Promise.all(
                project.images.map(img => {
                    return new Promise((resolve) => {
                        const image = new window.Image()
                        image.src = img.url
                        image.onload = resolve
                    })
                })
            ).then(() => setImagesLoaded(true))
        }
    }, [project.images])

    const handleWhatsAppClick = () => {
        trackEvent(AnalyticEvents.PROJECT_WHATSAPP_CLICK, {
            project_name: project.name,
            project_id: project._id,
            project_type: project.projectType
        })
        const message = `Hola, me interesa el proyecto ${project.name}`;
        window.open(`https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }

    return (
        <div className="gap-6 lg:gap-16 grid grid-cols-1 md:grid-cols-12">
            <div className="flex flex-col gap-8 col-span-1 md:col-span-7 lg:col-span-6">
                <div className="flex flex-col gap-2">
                    <h1 className="font-heading font-regular text-3xl md:text-4xl lg:text-5xl">{project.name}</h1>
                    <p className="mb-2 text-black/80 text-2xl leading-tight">{project.subtitle}</p>
                </div>
                {project.description && (
                    <div className="prose-li:mt-0 prose-li:mb-0 prose-ul:pl-2 max-w-none prose-h5:font-bold prose-h5:text-2xl prose-ul:list-disc prose-lg">
                        <PortableText
                            value={project.description as unknown as BlockContent}
                        />
                    </div>
                )}
                {project.details && <ProjectDetails details={project.details} />}

            </div>
            <div className="@container flex flex-col gap-8 col-span-1 md:col-span-5 lg:col-span-6">
                <div className="flex lg:flex-row flex-col justify-start gap-2">
                    <Button
                        className="w-auto"
                        variant="default"
                        onClick={handleWhatsAppClick}
                    >
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                    </Button>
                    <Button
                        className="w-auto"
                        variant="secondary"
                        onClick={() => setContactModalOpen(true)}
                    >
                        <Mail /> Consultar sobre proyecto
                    </Button>
                </div>


                <ProjectContactModal
                    projectName={project.name || ''}
                    open={contactModalOpen}
                    onOpenChange={setContactModalOpen}
                />
                <div className="relative flex flex-col gap-8">
                    <PriceCard
                        price={project.price ?? undefined}
                        priceDetail={project.priceDetail ?? undefined}
                        downPayment={project.downPayment ?? undefined}
                        downPaymentDetail={project.downPaymentDetail ?? undefined}
                        balance={project.balance ?? undefined}
                        balanceDetail={project.balanceDetail ?? undefined}
                        monthlyFee={project.monthlyFee ?? undefined}
                    />

                    <div className="relative">
                        {project.images && project.images.length > 0 && (
                            <ProjectGallery
                                images={project.images}
                                priority={true}
                            />
                        )}
                        {project.viewer3dUrl && (
                            <Button
                                asChild
                                variant="secondary"
                                className="top-4 right-4 z-10 absolute gap-2"
                            >
                                <a
                                    href={project.viewer3dUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver proyecto en 3D
                                    <Rotate3d className="w-4 h-4" />
                                </a>
                            </Button>
                        )}
                    </div>

                    {project.videos && project.videos.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-xl">Videos</h3>
                            <div className="gap-4 grid">
                                {project.videos.map((video, index) => (
                                    video.url && (
                                        <ProjectVideo
                                            key={index}
                                            url={video.url}
                                            title={video.title ?? undefined}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {project.location && (
                        <div className="flex flex-col gap-4 location-section">
                            <div className="flex items-start gap-2">
                                <MapPin className="flex-shrink-0 mt-1 w-5 h-5" />
                                <div>
                                    <p className="text-lg">{project.location.address}</p>
                                    {project.location.mapUrl && (
                                        <a
                                            href={project.location.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-primary hover:underline"
                                        >
                                            Ver en Google Maps
                                            <MapPin className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {mapParams && (
                                <MapWrapper
                                    lat={mapParams.lat}
                                    lng={mapParams.lng}
                                    zoom={mapParams.zoom}
                                />
                            )}
                        </div>
                    )}
                </div>
                {project.amenities && <ProjectAmenities amenities={project.amenities} />}
            </div>
        </div>
    )
} 