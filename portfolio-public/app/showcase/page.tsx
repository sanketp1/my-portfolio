"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import apiClient from "@/lib/apiClient"

interface ShowcaseItem {
  _id: string;
  title: string;
  description: string;
  type: string;
  mediaUrl: string;
}

export default function ShowcasePage() {
  const [showcase, setShowcase] = useState<ShowcaseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<ShowcaseItem[]>("/api/showcase")
      .then(data => {
        setShowcase(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8">Loading showcase...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Showcase</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {showcase.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-pink-50 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp relative"
            >
              {item.type === "image" && item.mediaUrl ? (
                <div className="relative w-full aspect-[16/9] bg-pink-100">
                  <Image
                    src={item.mediaUrl}
                    alt={item.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="flex-1 flex flex-col p-6 pb-14 relative">
                <h2 className="text-lg font-bold mb-1 text-pink-700 line-clamp-2">{item.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-3">{item.description}</p>
                {item.mediaUrl && (
                  <div className="absolute bottom-5 right-5">
                    <a
                      href={item.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-xl hover:-translate-y-0.5 hover:from-pink-700 hover:to-purple-700 transition-all duration-200 text-xs group"
                      style={{ minWidth: 'auto' }}
                    >
                      <span className="sr-only sm:not-sr-only">View</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 