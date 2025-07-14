"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { format } from 'date-fns'
import apiClient from "@/lib/apiClient"
import { Star, Eye, Heart, ExternalLink } from "lucide-react"
import { BlogCard } from "@/components/HomePage";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  redirectUrl?: string;
  tags: string[];
  category: string;
  readingTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  publishedAt?: string;
  createdAt: string;
  slug?: string;
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
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 