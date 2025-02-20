'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ProjectContactForm from "./ProjectContactForm"
import { trackEvent, AnalyticEvents } from '@/lib/analytics'

interface ProjectContactModalProps {
    projectName: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface ProjectFormData {
    name: string
    email: string
    phone: string
    message: string
}

export default function ProjectContactModal({ projectName, open, onOpenChange }: ProjectContactModalProps) {
    const handleSubmit = () => {
        try {
            trackEvent(AnalyticEvents.PROJECT_FORM_SUBMIT, {
                project_name: projectName,
                form_type: 'contact',
            })

            onOpenChange(false)
        } catch (error) {
            console.error('Error tracking form submission:', error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Consultar sobre {projectName}</DialogTitle>
                </DialogHeader>
                <ProjectContactForm
                    projectName={projectName}
                    onSuccess={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    )
} 