import { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../config/api'

function Masterclasses() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id: urlId } = useParams()
  const [masterclasses, setMasterclasses] = useState([])
  const [selectedMasterclass, setSelectedMasterclass] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchMasterclasses()
  }, [])

  // Handle URL parameter navigation (direct link to masterclass)
  useEffect(() => {
    if (urlId && masterclasses.length > 0) {
      const masterclass = masterclasses.find(m => m.id === urlId)
      if (masterclass) {
        setSelectedMasterclass(masterclass)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [urlId, masterclasses])

  // Handle hash navigation
  useEffect(() => {
    if (location.hash && masterclasses.length > 0 && !urlId) {
      const masterclassId = location.hash.replace('#', '')
      const masterclass = masterclasses.find(m => m.id === masterclassId)
      if (masterclass) {
        setSelectedMasterclass(masterclass)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [location.hash, masterclasses, urlId])

  const fetchMasterclasses = async () => {
    try {
      const response = await api.get('/masterclasses')
      
      if (response.data.success) {
        const activeMasterclasses = response.data.data.filter(m => m.isActive)
        setMasterclasses(activeMasterclasses)
      }
    } catch (error) {
      console.error('Error fetching masterclasses:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categories = ['All', ...new Set(masterclasses.map(m => m.category))]

  // Filter masterclasses by category
  const filteredMasterclasses = selectedCategory === 'All'
    ? masterclasses
    : masterclasses.filter(m => m.category === selectedCategory)

  // Handle selecting a masterclass
  const handleSelectMasterclass = (masterclass) => {
    setSelectedMasterclass(masterclass)
    navigate(`/masterclasses/${masterclass.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle going back to list
  const handleBackToList = () => {
    setSelectedMasterclass(null)
    navigate('/masterclasses')
  }

  // Handle share
  const handleShare = () => {
    const url = `${window.location.origin}/masterclasses/${selectedMasterclass.id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Check if masterclass is upcoming
  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date()
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2332] px-8 py-16 lg:py-40 rounded-b-[40px]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Masterclasses & Seminars
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Join our expert-led virtual masterclasses designed to help you develop critical 
            business skills and accelerate your growth journey
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && masterclasses.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Masterclasses Available</h3>
              <p className="text-gray-600">Check back soon for upcoming masterclasses and seminars</p>
            </div>
          )}

          {/* Category Filter */}
          {!loading && masterclasses.length > 0 && !selectedMasterclass && (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-[#1a2332] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Masterclasses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMasterclasses.map((masterclass) => (
                  <div
                    key={masterclass.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleSelectMasterclass(masterclass)}
                  >
                    {/* Image */}
                    <div className="h-56 overflow-hidden bg-gray-200 relative">
                      {masterclass.image ? (
                        <img
                          src={masterclass.image}
                          alt={masterclass.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a2332] to-[#2a3f52]">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          isUpcoming(masterclass.date) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {isUpcoming(masterclass.date) ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-3">
                        {masterclass.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#60a5fa] transition-colors">
                        {masterclass.title}
                      </h3>

                      {/* Facilitator */}
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{masterclass.facilitatorName}</span>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(masterclass.date)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{masterclass.time} • {masterclass.duration}</span>
                      </div>

                      {/* View Details Link */}
                      <div className="inline-flex items-center text-[#60a5fa] font-semibold text-sm hover:gap-2 transition-all">
                        View Details
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results for Category */}
              {filteredMasterclasses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No masterclasses found in this category</p>
                </div>
              )}
            </>
          )}

          {/* Full Masterclass View */}
          {selectedMasterclass && (
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={handleBackToList}
                className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Masterclasses
              </button>

              {/* Featured Image */}
              <div className="rounded-3xl mb-8 shadow-xl overflow-hidden bg-gray-100">
                {selectedMasterclass.image ? (
                  <img
                    src={selectedMasterclass.image}
                    alt={selectedMasterclass.title}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="w-full h-72 flex items-center justify-center bg-gradient-to-br from-[#1a2332] to-[#2a3f52]">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Masterclass Content */}
              <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg overflow-hidden">
                {/* Category Badge & Share Button */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-block px-4 py-2 bg-[#60a5fa] text-white text-sm font-semibold rounded-full">
                      {selectedMasterclass.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      isUpcoming(selectedMasterclass.date) 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isUpcoming(selectedMasterclass.date) ? 'Upcoming' : 'Past Event'}
                    </span>
                  </div>
                  
                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    title="Copy link to share"
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="text-sm font-medium">Share</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {selectedMasterclass.title}
                </h1>

                {/* Facilitator Info */}
                <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                  <div className="w-14 h-14 bg-[#60a5fa] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedMasterclass.facilitatorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Facilitated by</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedMasterclass.facilitatorName}</p>
                  </div>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-[#1a2332] rounded-2xl text-white">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Date</p>
                    <p className="font-semibold">{formatDate(selectedMasterclass.date)}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Time</p>
                    <p className="font-semibold">{selectedMasterclass.time}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Duration</p>
                    <p className="font-semibold">{selectedMasterclass.duration}</p>
                  </div>
                </div>

                {/* Virtual Event Badge */}
                <div className="flex items-center gap-2 mb-8 text-[#60a5fa]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Virtual Event - Join from anywhere</span>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Masterclass</h2>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedMasterclass.description}
                  </div>
                </div>

                {/* Registration CTA */}
                {isUpcoming(selectedMasterclass.date) && (
                  <div className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">Ready to Join?</h3>
                    <p className="mb-6 text-white/90">Register now to secure your spot in this masterclass</p>
                    <a
                      href={selectedMasterclass.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#3b82f6] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                    >
                      Register Now
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}

                {!isUpcoming(selectedMasterclass.date) && (
                  <div className="bg-gray-100 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">This Event Has Passed</h3>
                    <p className="text-gray-600">Check out our upcoming masterclasses for more learning opportunities</p>
                  </div>
                )}
              </article>

              {/* Related Masterclasses */}
              {masterclasses.length > 1 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">More Masterclasses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {masterclasses
                      .filter(m => m.id !== selectedMasterclass.id)
                      .slice(0, 2)
                      .map((masterclass) => (
                        <div
                          key={masterclass.id}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => handleSelectMasterclass(masterclass)}
                        >
                          <div className="h-48 overflow-hidden bg-gray-200">
                            {masterclass.image ? (
                              <img
                                src={masterclass.image}
                                alt={masterclass.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a2332] to-[#2a3f52]">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-2">
                              {masterclass.category}
                            </span>
                            <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {masterclass.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {formatDate(masterclass.date)} • {masterclass.time}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Masterclasses