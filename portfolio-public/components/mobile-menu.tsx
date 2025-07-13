"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  profile?: any
}

export function MobileMenu({ profile }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const personalInfo = profile?.personalInfo || {}

  // Helper to scroll to section and close menu
  const handleScroll = (id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleResumeDownload = () => {
    setIsOpen(false)
    if (personalInfo?.resume) {
      window.open(personalInfo.resume, '_blank')
    }
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2 relative overflow-hidden group">
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </div>
        <div className={`absolute inset-0 bg-gray-100 rounded-md transition-transform duration-300 ease-in-out ${isOpen ? 'scale-100' : 'scale-0'}`}></div>
      </Button>

      <div className={`absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <nav className="px-4 py-4 space-y-4">
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("home")}
            >
              Home
            </button>
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("projects")}
            >
              Projects
            </button>
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("blogs")}
            >
              Blogs
            </button>
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("skills")}
            >
              Skills
            </button>
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("experience")}
            >
              Experience
            </button>
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("showcase")}
            >
              Showcase
            </button>
            <button
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => handleScroll("contact")}
            >
              Contact
            </button>
            {personalInfo?.resume && (
              <button
                className="block w-full text-left text-black hover:text-gray-700 transition-colors font-medium"
                onClick={handleResumeDownload}
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                   Resume
                </div>
              </button>
            )}
          </nav>
      </div>
    </div>
  )
}
