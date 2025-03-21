'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

interface SuccessContentProps {
    name: string
    type: string
}

export default function SuccessContent({ name, type }: SuccessContentProps) {
    const messages = {
        newsletter: {
            title: '¡Gracias por suscribirte!',
            description: 'Te mantendremos informado sobre nuestros nuevos proyectos.',
        },
        project: {
            title: '¡Gracias por tu interés!',
            description: 'Nos pondremos en contacto contigo a la brevedad.',
        }
    }

    const message = type === 'newsletter' ? messages.newsletter : messages.project

    return (
        <div className="mx-auto px-4 py-16 max-w-lg container">
            <div className="space-y-6 text-center">
                <CheckCircle className="mx-auto w-16 h-16 text-green-500" />
                <h1 className="font-bold text-4xl">
                    {message.title}
                </h1>
                <p className="text-gray-600 text-xl">
                    {name}, {message.description.toLowerCase()}
                </p>
                <div className="pt-8">
                    <Link href="/">
                        <Button>
                            Volver al inicio
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
} 