'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RefreshCcw } from "lucide-react"
import { useRouter } from 'next/navigation'

interface ProjectContactFormProps {
    projectName: string
    onSuccess?: () => void
}

const PURCHASE_TIMEFRAMES = [
    { value: 'now', label: 'Ahora' },
    { value: 'less-than-3', label: 'En menos de 3 meses' },
    { value: '3-to-6', label: 'Entre 3 a 6 meses' },
    { value: 'future', label: 'En el futuro' },
]

export default function ProjectContactForm({ projectName, onSuccess }: ProjectContactFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        timeframe: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading'>('idle')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    projectName,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje')
            }

            // Redirect to success page
            router.push(`/success?type=project&name=${encodeURIComponent(formData.name)}`)
            onSuccess?.()
        } catch (error) {
            console.error('Error sending email:', error)
            alert('No se pudo enviar el mensaje. Por favor, intenta nuevamente.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Pienso comprar en</Label>
                    <Select
                        value={formData.timeframe}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, timeframe: value }))}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un plazo" />
                        </SelectTrigger>
                        <SelectContent>
                            {PURCHASE_TIMEFRAMES.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        <>
                            <RefreshCcw className="mr-2 w-4 h-4 animate-spin" />
                            Enviando...
                        </>
                    ) : 'Enviar contacto'}
                </Button>
            </div>
        </form>
    )
} 