import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { HomeIcon } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex items-center min-h-[60vh]">
            <div className="mx-auto px-4 py-16 max-w-lg container">
                <div className="space-y-6 text-center">
                    <h1 className="font-bold text-4xl">
                        ¡Ups! Esta página no existe
                    </h1>
                    <p className="text-gray-600 text-xl">
                        ¿Por qué no exploras nuestros proyectos disponibles?
                    </p>
                    <div className="space-x-4 pt-8">
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