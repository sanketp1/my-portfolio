"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { format } from 'date-fns'
import apiClient from "@/lib/apiClient"

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: string; // Added for featured image
  slug?: string; // Added for slug
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get<Blog[]>("/api/blogs")
      .then(data => {
        setBlogs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8">Loading blogs...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-blue-50 rounded-2xl shadow overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg animate-fadeInUp"
            >
              {blog.featuredImage && (
                <div className="relative w-full aspect-[16/9] bg-blue-100">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col p-6 relative">
                <h2 className="text-lg font-bold mb-1 text-blue-700 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-3">{blog.excerpt}</p>
                <span className="text-xs text-gray-400 mb-4">{format(new Date(blog.publishedAt), 'MM/dd/yyyy')}</span>
                {blog.slug && (
                  <a
                    href={`/blogs/${blog.slug}`}
                    className="absolute right-5 bottom-5 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-xl hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-xs group"
                    style={{ minWidth: 'auto' }}
                  >
                    <span className="sr-only sm:not-sr-only">Read</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 