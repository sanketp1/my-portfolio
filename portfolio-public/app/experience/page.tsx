"use client"

import { useEffect, useState } from "react"
import apiClient from "@/lib/apiClient"

interface Experience {
  _id: string;
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<Experience[]>("/api/experience")
      .then(data => {
        setExperience(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8">Loading experience...</div>

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Experience</h1>
      <div className="grid gap-6">
        {experience.map(exp => (
          <div key={exp._id} className="border rounded-lg p-4 bg-white shadow">
            <h2 className="text-xl font-semibold">{exp.position} @ {exp.company}</h2>
            <span className="text-xs text-gray-400">
              {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
            </span>
            {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
} 