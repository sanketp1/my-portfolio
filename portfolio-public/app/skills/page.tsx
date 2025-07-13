"use client"

import { useEffect, useState } from "react"

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then(res => res.json())
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8">Loading skills...</div>

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Skills</h1>
      <div className="grid gap-6">
        {skills.map(skill => (
          <div key={skill._id} className="border rounded-lg p-4 bg-white shadow">
            <h2 className="text-xl font-semibold">{skill.name}</h2>
            <p className="text-gray-600 mb-2">Category: {skill.category}</p>
            <span className="text-xs text-gray-400">Level: {skill.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 