'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProjectContactForm from "./ProjectContactForm"
import { useState } from "react"

interface ProjectContactModalProps {
    projectName: string
}

export default function ProjectContactModal({ projectName }: ProjectContactModalProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg">Consultar proyecto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Consultar sobre {projectName}</DialogTitle>
                </DialogHeader>
                <ProjectContactForm
                    projectName={projectName}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
} 