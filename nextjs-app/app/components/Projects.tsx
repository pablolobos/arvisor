"use client"

import { ProjectCard } from './ProjectCard'
import { animate, inView, stagger } from "motion"
import { useEffect } from 'react'

export const AllProjects = ({ projects }: { projects: any[] }) => {
    if (!projects?.length) {
        return null
    }

    useEffect(() => {
        const title = document.querySelector('.projects-title') as HTMLElement
        const container = document.querySelector('.projects-container') as HTMLElement
        const cards = document.querySelectorAll('.project-card') as NodeListOf<HTMLElement>

        if (title) {
            animate(title, { opacity: '1', transform: 'translateY(0px)' }, { duration: 0.6 })
        }

        if (container) {
            cards.forEach((card, i) => {
                animate(card, { opacity: '1', transform: 'translateY(0px)' }, {
                    duration: 0.6,
                    delay: i * 0.2
                })
            })
        }
    }, [])

    return (
        <div className="">
            <div className="mx-auto py-8 sm:py-24 max-w-2xl lg:max-w-7xl">
                <h2 className="opacity-0 font-extrabold text-2xl text-brand-purple md:text-3xl lg:text-4xl uppercase tracking-tight projects-title">
                    Oportunidades especiales
                </h2>
                <div className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-12 projects-container">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
} 