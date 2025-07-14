"use client"

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ShowcaseDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  let showcase = null;
  const showcaseParam = searchParams.get("showcase");
  if (showcaseParam) {
    try {
      showcase = JSON.parse(decodeURIComponent(showcaseParam));
    } catch {
      showcase = null;
    }
  }

  if (!showcase) {
    return <div className="max-w-2xl mx-auto py-20 px-4 text-center text-gray-500 text-lg">Showcase not found or data not passed. Please return to the homepage and try again.</div>;
  }

  const isGif = showcase.thumbnailUrl && showcase.thumbnailUrl.endsWith('.gif');

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-orange-700 hover:text-orange-900 text-sm font-medium mb-6 px-2 py-1 rounded hover:bg-orange-50 transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-900 mb-2 flex items-center gap-2">{showcase.title}</h1>
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded capitalize">{showcase.category}</span>
          <span className="text-xs text-gray-400">{showcase.createdAt ? new Date(showcase.createdAt).toLocaleDateString() : ''}</span>
        </div>
      </div>
      <div className="relative w-full aspect-[16/9] bg-orange-50 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
        {isGif ? (
          <img src={showcase.thumbnailUrl} alt={showcase.title} className="w-full h-full object-cover" />
        ) : (
          <Image src={showcase.thumbnailUrl || showcase.mediaUrl || "/placeholder.jpg"} alt={showcase.title} fill className="object-cover" />
        )}
      </div>
      <p className="text-gray-700 mb-6 whitespace-pre-line text-lg leading-relaxed">{showcase.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {showcase.tags?.map((tag: string) => (
          <span key={tag} className="bg-orange-50 border border-orange-200 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">#{tag}</span>
        ))}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
} 