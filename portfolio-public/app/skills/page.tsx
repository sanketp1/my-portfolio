"use client"

import { useEffect, useState } from "react"
import apiClient from "@/lib/apiClient"
import Image from "next/image"

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  order?: number;
  isActive?: boolean;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<Skill[]>("/api/skills")
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8">Loading skills...</div>

  // Filter and group skills by category
  const activeSkills = skills.filter(skill => skill.isActive)
  const skillsByCategory: Record<string, Skill[]> = {}
  for (const skill of activeSkills) {
    if (!skillsByCategory[skill.category]) skillsByCategory[skill.category] = []
    skillsByCategory[skill.category].push(skill)
  }
  // Sort categories alphabetically
  const sortedCategories = Object.keys(skillsByCategory).sort()

  // Debug: List all unique categories
  const allCategories = Array.from(new Set(skills.map(s => s.category))).sort()

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Skills</h1>
      <div className="mb-6 text-sm text-gray-500">Categories: {allCategories.join(', ')}</div>
      <div className="space-y-12">
        {sortedCategories.map(category => (
          <div key={category}>
            <h2 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center gap-2">
              {category}
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full ml-2">{skillsByCategory[category].length} skills</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {skillsByCategory[category]
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name))
                .map(skill => (
                  <div key={skill._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg transition animate-fadeIn border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      {skill.icon && (
                        <Image src={skill.icon} alt={skill.name} width={32} height={32} className="w-8 h-8 object-contain" />
                      )}
                      <span className="text-lg font-semibold text-gray-900">{skill.name}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mb-2 ${
                      skill.level === 'Beginner' ? 'bg-gray-200 text-gray-700' :
                      skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                      skill.level === 'Advanced' ? 'bg-green-100 text-green-700' :
                      skill.level === 'Expert' ? 'bg-yellow-100 text-yellow-700' : ''
                    }`}>
                      {skill.level}
                    </span>
                    {typeof skill.yearsOfExperience === 'number' && (
                      <span className="text-xs text-gray-500 mb-2">{skill.yearsOfExperience} yrs exp</span>
                    )}
                    {skill.description && <p className="text-gray-600 mt-2 text-sm">{skill.description}</p>}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 