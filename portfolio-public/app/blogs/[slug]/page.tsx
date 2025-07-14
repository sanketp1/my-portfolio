import { notFound } from "next/navigation";
import Image from "next/image";
import apiClient from "@/lib/apiClient";
import { format } from "date-fns";
import { ExternalLink, Eye, Heart, Star } from "lucide-react";

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
  isFeatured: boolean;
  views: number;
  likes: number;
  publishedAt?: string;
  createdAt: string;
  slug?: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await apiClient.get(`/api/blogs/${slug}`);
    // API returns an array, find the first match
  //  console.log(res);
    return res as Blog | null;
  
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          {blog.title}
          {blog.isFeatured && <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow flex items-center gap-1"><Star className="w-3 h-3 mr-1" /> Featured</span>}
        </h1>
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded capitalize">{blog.category}</span>
          {blog.publishedAt ? (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Published</span>
          ) : (
            <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded">Draft</span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-2">
          <span><Eye className="inline w-4 h-4 mr-1" /> {blog.views} views</span>
          <span><Heart className="inline w-4 h-4 mr-1" /> {blog.likes} likes</span>
          <span>Created: {format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
          {blog.publishedAt && <span>Published: {format(new Date(blog.publishedAt), "MMM dd, yyyy")}</span>}
          <span>{blog.readingTime} min read</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags?.map((tag) => (
            <span key={tag} className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">#{tag}</span>
          ))}
        </div>
      </div>
      {blog.featuredImage && (
        <div className="relative w-full aspect-[16/9] bg-blue-100 rounded-lg overflow-hidden mb-6">
          <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover" />
        </div>
      )}
      <p className="text-gray-700 mb-6 whitespace-pre-line text-lg leading-relaxed">{blog.content}</p>
      <div className="flex gap-3 mt-6">
        {blog.slug && (
          <a href={`/blogs/${blog.slug}`} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm flex items-center gap-1">
            Read More
          </a>
        )}
        {blog.redirectUrl && (
          <a href={blog.redirectUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-100 text-blue-700 rounded font-semibold shadow hover:bg-blue-200 transition-all duration-200 text-sm flex items-center gap-1">
            <ExternalLink className="w-4 h-4" /> External Link
          </a>
        )}
      </div>
    </div>
  );
} 