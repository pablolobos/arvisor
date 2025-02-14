'use client'

import { useState } from 'react'
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

export default function ProjectContent({ project, whatsappNumber }: ProjectContentProps) {
    const [contactModalOpen, setContactModalOpen] = useState(false)

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
                        <>
                            <div>
                                <h2 className="mb-4 font-bold text-2xl">Ubicación</h2>
                                <div className="flex items-center gap-1 pt-2 text-lg">
                                    <MapPin /> {project.location.address}
                                </div>
                            </div>
                            {project.location.mapUrl && (
                                <div className="w-full aspect-[3/2]">
                                    <ProjectMapWrapper mapUrl={project.location.mapUrl} />
                                </div>
                            )}
                        </>
                    )}
                </div>
                {project.amenities && <ProjectAmenities amenities={project.amenities} />}
            </div>
        </div>
    )
} 