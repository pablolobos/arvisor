"use client"

import { ProjectCard } from './ProjectCard'

export const AllProjects = ({ projects }: { projects: any[] }) => {
    if (!projects?.length) {
        return null
    }

    return (
        <div className="">
            <div className="mx-auto py-16 sm:py-24 max-w-2xl lg:max-w-7xl">
                <h2 className="font-extrabold text-2xl text-brand-purple md:text-3xl lg:text-4xl uppercase tracking-tight">
                    Oportunidades especiales
                </h2>
                <div className="gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-12">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
} 