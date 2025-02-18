'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCcw } from "lucide-react"
import { toast } from "sonner"

export default function Newsletter() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading'>('idle')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validate fields
        if (!formData.name.trim() || !formData.email.trim()) {
            toast.error('Por favor completa todos los campos')
            return
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast.error('Por favor ingresa un email válido')
            return
        }

        setStatus('loading')

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al suscribirse')
            }

            toast.success('¡Gracias por suscribirte!')
            setFormData({ name: '', email: '' })
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                    <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Tu nombre"
                        className="flex-1 bg-white border-brand-purple placeholder:text-zinc-500"
                    />
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Tu correo electrónico"
                        className="flex-1 bg-white border-brand-purple placeholder:text-zinc-500"
                    />
                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full"
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