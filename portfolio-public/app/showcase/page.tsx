"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import apiClient from "@/lib/apiClient"

interface ShowcaseItem {
  _id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  type?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  createdAt?: string;
  isActive?: boolean;
  order?: number;
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
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {showcase
          .filter((item: any) => item.isActive !== false)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0) || new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
          .map((item: any) => {
            const isGif = item.thumbnailUrl && item.thumbnailUrl.endsWith('.gif');
            return (
              <div key={item._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-orange-100">
                <div className="relative w-full aspect-[16/9] bg-orange-50">
                  {isGif ? (
                    <img src={item.thumbnailUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Image src={item.thumbnailUrl || item.mediaUrl || "/placeholder.jpg"} alt={item.title} fill className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded capitalize">{item.category}</span>
                    <span className="text-xs text-gray-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                  <h2 className="text-lg font-bold text-orange-900 mb-1 line-clamp-2">{item.title}</h2>
                  <p className="text-gray-700 mb-3 text-sm line-clamp-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags?.map((tag: string) => (
                      <span key={tag} className="bg-orange-50 border border-orange-200 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={{
                        pathname: `/showcase/${item._id}`,
                        query: { showcase: encodeURIComponent(JSON.stringify(item)) }
                      }}
                      className="px-3 py-1 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-orange-700 hover:to-pink-700 transition-all duration-200 text-xs flex items-center gap-1"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
} 