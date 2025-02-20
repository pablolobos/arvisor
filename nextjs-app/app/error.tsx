'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { HomeIcon } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex items-center min-h-[60vh]">
            <div className="mx-auto px-4 py-16 max-w-lg container">
                <div className="space-y-6 text-center">
                    <h1 className="font-bold text-4xl">
                        ¡Ups! Algo salió mal
                    </h1>
                    <p className="text-gray-600 text-xl">
                        ¿Por qué no exploras nuestros proyectos disponibles?
                    </p>
                    <div className="space-x-4 pt-8">
                        <Button onClick={reset} className="mr-4">
                            Intentar nuevamente
                        </Button>
                        <Link href="/">
                            <Button>
                                <HomeIcon className="mr-2 w-4 h-4" />
                                Ver proyectos
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 