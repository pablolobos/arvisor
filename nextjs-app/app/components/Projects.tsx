"use client"

import { ProjectCard } from './ProjectCard'
import { motion } from "framer-motion"

export const AllProjects = ({ projects }: { projects: any[] }) => {
    if (!projects?.length) {
        return null
    }

    return (
        <div>
            <div className="mx-auto py-8 sm:py-16 max-w-2xl lg:max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-sans font-medium text-2xl md:text-2xl lg:text-3xl uppercase tracking-tight projects-title"
                >
                    Proyectos seguros y rentables
                </motion.h2>
                <div className="content-stretch gap-x-6 gap-y-10 xl:gap-x-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-12 projects-container">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="content-stretch grid"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
} 