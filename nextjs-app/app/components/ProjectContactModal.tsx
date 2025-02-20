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

export default function ProjectContactModal({ projectName, open, onOpenChange }: ProjectContactModalProps) {
    const handleSubmit = async (formData: ProjectFormData) => {
        try {
            // Your existing form submission logic

            trackEvent(AnalyticEvents.PROJECT_FORM_SUBMIT, {
                project_name: projectName,
                project_id: project._id,
                project_type: project.projectType,
                form_type: 'contact'
            })

            // Success handling
            onOpenChange(false)
        } catch (error) {
            // Error handling
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