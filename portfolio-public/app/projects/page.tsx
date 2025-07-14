"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import apiClient from "@/lib/apiClient"
import Link from "next/link"

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  images: string[];
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnailUrl: string;
  category: string;
  status: string;
  isFeatured: boolean;
  order: number;
  views: number;
  createdAt: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project._id}`} className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
      <div className="relative w-full aspect-[16/9] bg-gray-100">
        <Image
          src={project.thumbnailUrl || project.images[0] || "/placeholder.jpg"}
          alt={project.title}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">Featured</span>
        )}
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{project.status}</span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-bold text-purple-700 line-clamp-2 flex-1">{project.title}</h2>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded capitalize">{project.category}</span>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-3">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech) => (
            <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">{tech}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-gray-500">Views: {project.views}</span>
          <span className="text-xs text-gray-500">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <details>
          <summary className="cursor-pointer text-sm text-blue-600 hover:underline">Full Description & Features</summary>
          <div className="mt-2">
            <p className="text-gray-700 mb-2 whitespace-pre-line">{project.description}</p>
            {project.features && project.features.length > 0 && (
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-2">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}
            {project.images && project.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.images.map((img, idx) => (
                  <Image key={idx} src={img} alt={`Screenshot ${idx + 1}`} width={80} height={60} className="rounded border object-cover" />
                ))}
              </div>
            )}
          </div>
        </details>
        <div className="flex gap-2 mt-auto">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 text-xs font-medium transition">GitHub</a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium transition">Live</a>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<Project[]>("/api/projects")
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
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 