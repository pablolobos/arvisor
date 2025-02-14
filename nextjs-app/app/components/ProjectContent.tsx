'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Rotate3d, MapPin, MessageCircle } from 'lucide-react'
import { Project } from '@/sanity.types'
import ProjectGallery from './ProjectGallery'
import ProjectAmenities from './ProjectAmenities'
import ProjectDetails from './ProjectDetails'
import { PortableText } from '@portabletext/react'
import ProjectMapWrapper from './ProjectMapWrapper'
import PriceCard from './PriceCard'
import ProjectContactModal from './ProjectContactModal'
import type { BlockContent } from '@/sanity.types'
import { Mail } from 'lucide-react'
import { FaWhatsapp } from "react-icons/fa";


type ProcessedProject = Omit<Project, 'images'> & {
    images?: Array<{
        url: string;
        alt: string;
    }>;
}

interface ProjectContentProps {
    project: ProcessedProject
    whatsappNumber?: string
}

function extractGoogleMapsParams(url: string) {
    console.log('extractGoogleMapsParams called with URL:', url)
    try {
        const mapsUrl = new URL(url)
        console.log('Successfully created URL object:', mapsUrl)

        // Try to find coordinates in the URL using the !3d and !4d format first
        const coordMatches = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
        if (coordMatches) {
            console.log('Found coordinates in !3d format:', coordMatches[1], coordMatches[2])
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
                console.log('Found coordinates in @ format:', coords[0], coords[1])
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
            console.log('Found coordinates in pathname:', placeCoords[1], placeCoords[2])
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

export default function ProjectContent({ project, whatsappNumber }: ProjectContentProps) {
    const [contactModalOpen, setContactModalOpen] = useState(false)

    console.log('ProjectContent rendering with location:', project.location)

    const mapParams = useMemo(() => {
        console.log('mapParams useMemo running')
        if (project.location?.mapUrl) {
            console.log('Found mapUrl:', project.location.mapUrl)
            const params = extractGoogleMapsParams(project.location.mapUrl)
            console.log('Extracted map params:', params)
            return params
        }
        console.log('No mapUrl found in location')
        return null
    }, [project.location?.mapUrl])

    console.log('Final mapParams:', mapParams)

    return (
        <div className="gap-6 lg:gap-16 grid grid-cols-1 md:grid-cols-12">
            <div className="flex flex-col gap-8 col-span-1 md:col-span-7 lg:col-span-7">
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
            <div className="flex flex-col gap-8 col-span-1 md:col-span-5 lg:col-span-5">
                <div className="flex justify-start gap-2">
                    <Button
                        className="w-auto"
                        variant="default"
                        onClick={() => {
                            const message = `Hola, me interesa el proyecto ${project.name}`
                            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
                        }}
                    >
                        <FaWhatsapp /> Hablemos ahora
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
                        price={project.price}
                        priceDetail={project.priceDetail}
                        downPayment={project.downPayment}
                        downPaymentDetail={project.downPaymentDetail}
                        balance={project.balance}
                        balanceDetail={project.balanceDetail}
                        monthlyFee={project.monthlyFee}
                    />

                    <div className="relative">
                        {project.images && project.images.length > 0 && (
                            <ProjectGallery
                                images={project.images}
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

                    {project.location && (
                        <div className="flex flex-col gap-4 location-section">
                            <div className="flex items-start gap-2">
                                <MapPin className="flex-shrink-0 mt-1 w-5 h-5" />
                                <div>
                                    <p className="text-lg">{project.location.address}</p>

                                </div>
                            </div>

                            {mapParams && (
                                <div className="rounded-lg w-full h-[300px] overflow-hidden">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${mapParams.lat},${mapParams.lng}&zoom=${mapParams.zoom}`}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {project.amenities && <ProjectAmenities amenities={project.amenities} />}
            </div>
        </div>
    )
} 