'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCcw } from "lucide-react"
import { toast } from "sonner"

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading'>('idle')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al suscribirse')
            }

            toast.success('¡Gracias por suscribirte!')
            setEmail('')
        } catch (error) {
            console.error('Error subscribing:', error)
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'No se pudo procesar tu suscripción. Por favor, intenta nuevamente.'
            )
        } finally {
            setStatus('idle')
        }
    }

    return (
        <div className="relative bg-brand-purpleLightest p-8 rounded-xl overflow-hidden">
            <div className="z-10 relative">
                <h2 className="mb-4 font-bold text-2xl">
                    Recibe primero nuestros proyectos
                </h2>
                <p className="mb-6 text-zinc-800">
                    Suscríbete para enterarte de nuestros nuevos proyectos.
                </p>

                <form onSubmit={handleSubmit} className="flex gap-4 max-w-md">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tu correo electrónico"
                        required
                        className="flex-1 bg-white border-brand-purple placeholder:text-zinc-500"
                    />
                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className=""
                    >
                        {status === 'loading' ? (
                            <>
                                <RefreshCcw className="mr-2 w-4 h-4 animate-spin" />
                                Enviando...
                            </>
                        ) : 'Suscribirse'}
                    </Button>
                </form>
            </div>

            {/* Background gradient effect */}
            <div className="-top-48 -right-64 absolute pointer-events-none">
                <div className="bg-gradient-to-br from-white/20 to-transparent blur-3xl rounded-full w-96 h-96" />
            </div>
        </div>
    )
} 