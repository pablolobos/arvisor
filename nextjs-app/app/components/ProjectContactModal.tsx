'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ProjectContactForm from "./ProjectContactForm"

interface ProjectContactModalProps {
    projectName: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function ProjectContactModal({ projectName, open, onOpenChange }: ProjectContactModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Consultar sobre {projectName}</DialogTitle>
                </DialogHeader>
                <ProjectContactForm
                    projectName={projectName}
                    onSuccess={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    )
} 