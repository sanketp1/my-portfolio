"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8">Loading projects...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {project.images && project.images[0] && (
                <div className="relative w-full aspect-[16/9] bg-gray-100">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col p-6">
                <h2 className="text-xl font-bold mb-2 text-purple-700 line-clamp-2">{project.title}</h2>
                <p className="text-gray-600 mb-3 line-clamp-3">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">{tech}</span>
                  ))}
                </div>
                {/* Add GitHub/Live Preview if available */}
                <div className="flex gap-2 mt-auto">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 text-xs font-medium transition">GitHub</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium transition">Live Preview</a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 