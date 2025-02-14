'use client'

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MessageCircle } from "lucide-react"
import WhatsAppButton from './WhatsAppButton'

interface ProjectContactPopoverProps {
    projectName: string
    phoneNumber?: string
    onOpenDialog: () => void
}

export function ProjectContactPopover({
    projectName = '',
    phoneNumber,
    onOpenDialog
}: ProjectContactPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Contactar</Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
                <div className="gap-4 grid">
                    <div className="gap-2 grid">
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={onOpenDialog}
                        >
                            <MessageCircle className="mr-2 w-4 h-4" />
                            Formulario
                        </Button>
                        <WhatsAppButton
                            phoneNumber={phoneNumber}
                            message={`Hola, me interesa el proyecto ${projectName}`}
                            variant="outline"
                            className="justify-start"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
} 