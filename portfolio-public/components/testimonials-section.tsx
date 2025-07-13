import Image from "next/image"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "/placeholder.svg?height=60&width=60",
      content:
        "Kunal's teaching style is exceptional. His DSA course helped me land my dream job at Google. The way he explains complex concepts is truly remarkable.",
      rating: 5,
    },
    {
      name: "Raj Patel",
      role: "Full Stack Developer",
      image: "/placeholder.svg?height=60&width=60",
      content:
        "The WeMakeDevs community has been instrumental in my growth. Kunal's mentorship and the supportive community helped me transition into tech.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "DevOps Engineer",
      image: "/placeholder.svg?height=60&width=60",
      content:
        "Kunal's cloud and DevOps content is top-notch. His practical approach and real-world examples make learning complex topics much easier.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What the community says</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from developers who have transformed their careers through our educational content and community
            support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
