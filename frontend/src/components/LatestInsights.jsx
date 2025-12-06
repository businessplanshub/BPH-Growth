import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ChevronRight, Lightbulb } from 'lucide-react'
import api from '../config/api'

function LatestInsights() {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    })
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      const response = await api.get('/insights')

      if (response.data.success) {
        const activeInsights = response.data.data
          .filter(insight => insight.isActive)
          .slice(0, 3)

        setInsights(activeInsights)
      }
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#005c9e] border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  if (insights.length === 0) {
    return (
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00273f] mb-4">
            Latest <span className="text-[#005c9e]">Insights</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Check back soon for expert insights and thought leadership
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-gradient-radial">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12" data-aos="fade-up">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00273f] mb-4">
              Latest <span className="text-[#005c9e]">Insights</span>
            </h2>
            <p className="text-lg text-gray-600">
              Expert perspectives on business growth, AI, and funding
            </p>
          </div>
          <Link to="/blogs" className="hidden sm:flex items-center text-[#005c9e] font-semibold hover:gap-3 gap-2 transition-all mt-4 sm:mt-0">
            View All Insights <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className="glass-card rounded-2xl overflow-hidden hover-lift group"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gradient-primary relative">
                {insight.image ? (
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lightbulb className="w-16 h-16 text-white opacity-80" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-[#e0f2f9] text-[#005c9e] text-xs font-semibold rounded-full mb-3">
                  {insight.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#00273f] mb-3 line-clamp-2 group-hover:text-[#005c9e] transition-colors">
                  {insight.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {insight.description}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blogs#${insight.id}`}
                  className="inline-flex items-center text-[#005c9e] font-semibold text-sm group-hover:gap-2 gap-1 transition-all"
                >
                  Read More
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-10 sm:hidden" data-aos="fade-up">
          <Link to="/blogs">
            <button className="bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg">
              View All Insights
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestInsights
