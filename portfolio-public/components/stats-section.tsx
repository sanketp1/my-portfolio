import { Users, Youtube, BookOpen, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Youtube,
      value: "2M+",
      label: "YouTube Subscribers",
      description: "Educational content watched by millions",
    },
    {
      icon: Users,
      value: "100K+",
      label: "Community Members",
      description: "Active developers in WeMakeDevs",
    },
    {
      icon: BookOpen,
      value: "50+",
      label: "Courses Created",
      description: "Comprehensive programming tutorials",
    },
    {
      icon: Award,
      value: "25+",
      label: "Speaking Events",
      description: "International conferences and meetups",
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact by the numbers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building a global community of developers and helping businesses scale through education and mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
