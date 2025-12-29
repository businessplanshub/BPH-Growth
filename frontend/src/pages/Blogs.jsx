// import { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import api from '../config/api'

// function Blogs() {
//   const location = useLocation()
//   const [insights, setInsights] = useState([])
//   const [selectedInsight, setSelectedInsight] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedCategory, setSelectedCategory] = useState('All')

//   useEffect(() => {
//     fetchInsights()
//   }, [])

//   // Handle hash navigation (when clicking "Read More" from homepage)
//   useEffect(() => {
//     if (location.hash && insights.length > 0) {
//       const insightId = location.hash.replace('#', '')
//       const insight = insights.find(i => i.id === insightId)
//       if (insight) {
//         setSelectedInsight(insight)
//         // Scroll to top when opening insight
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     }
//   }, [location.hash, insights])

//   const fetchInsights = async () => {
//     try {
//       const response = await api.get('/insights')
      
//       if (response.data.success) {
//         // Get only active insights
//         const activeInsights = response.data.data.filter(insight => insight.isActive)
//         setInsights(activeInsights)
//       }
//     } catch (error) {
//       console.error('Error fetching insights:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Get unique categories
//   const categories = ['All', ...new Set(insights.map(insight => insight.category))]

//   // Filter insights by category
//   const filteredInsights = selectedCategory === 'All'
//     ? insights
//     : insights.filter(insight => insight.category === selectedCategory)

//   return (
//     <div className="bg-white min-h-screen">
//       <Header />

//       {/* Hero Section */}
//       <section className="bg-[#1a2332] px-8 py-16 lg:py-40 rounded-b-[40px]">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
//             Insights & Expertise
//           </h1>
//           <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
//             Expert insights, industry trends, and thought leadership to help you navigate 
//             business growth and achieve sustainable success
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-12 lg:py-20 px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading State */}
//           {loading && (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && insights.length === 0 && (
//             <div className="text-center py-20">
//               <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//               </svg>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">No Insights Yet</h3>
//               <p className="text-gray-600">Check back soon for expert insights and thought leadership</p>
//             </div>
//           )}

//           {/* Category Filter */}
//           {!loading && insights.length > 0 && !selectedInsight && (
//             <>
//               <div className="flex flex-wrap justify-center gap-3 mb-12">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-6 py-2 rounded-full font-semibold transition-all ${
//                       selectedCategory === category
//                         ? 'bg-[#1a2332] text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Insights Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredInsights.map((insight) => (
//                   <div
//                     key={insight.id}
//                     className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//                     onClick={() => setSelectedInsight(insight)}
//                   >
//                     {/* Image */}
//                     <div className="h-56 overflow-hidden bg-gray-200">
//                       <img
//                         src={insight.image}
//                         alt={insight.title}
//                         className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       {/* Category */}
//                       <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-3">
//                         {insight.category}
//                       </span>

//                       {/* Title */}
//                       <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#60a5fa] transition-colors">
//                         {insight.title}
//                       </h3>

//                       {/* Description */}
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                         {insight.description}
//                       </p>

//                       {/* Read More Link */}
//                       <div className="inline-flex items-center text-[#60a5fa] font-semibold text-sm hover:gap-2 transition-all">
//                         Read Full Article
//                         <svg
//                           className="w-4 h-4 ml-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* No Results for Category */}
//               {filteredInsights.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-600 text-lg">No insights found in this category</p>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Full Insight View */}
//           {selectedInsight && (
//             <div className="max-w-4xl mx-auto">
//               {/* Back Button */}
//               <button
//                 onClick={() => {
//                   setSelectedInsight(null)
//                   window.history.pushState({}, '', '/blogs')
//                 }}
//                 className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back to All Insights
//               </button>

//               {/* Featured Image */}
//               <div className="h-96 overflow-hidden rounded-3xl mb-8 shadow-xl">
//                 <img
//                   src={selectedInsight.image}
//                   alt={selectedInsight.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Article Content */}
//               <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
//                 {/* Category Badge */}
//                 <span className="inline-block px-4 py-2 bg-[#60a5fa] text-white text-sm font-semibold rounded-full mb-6">
//                   {selectedInsight.category}
//                 </span>

//                 {/* Title */}
//                 <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
//                   {selectedInsight.title}
//                 </h1>

//                 {/* Description */}
//                 <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                   {selectedInsight.description}
//                 </p>

//                 {/* Date */}
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     {new Date(selectedInsight.createdAt).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </div>
//                 </div>

//                 {/* Full Content */}
//                 <div className="prose prose-lg max-w-none">
//                   <div className="text-gray-700 leading-relaxed whitespace-pre-line">
//                     {selectedInsight.content}
//                   </div>
//                 </div>

                
//               </article>

//               {/* Related Insights */}
//               {insights.length > 1 && (
//                 <div className="mt-16">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-8">More Insights</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {insights
//                       .filter(i => i.id !== selectedInsight.id)
//                       .slice(0, 2)
//                       .map((insight) => (
//                         <div
//                           key={insight.id}
//                           className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
//                           onClick={() => {
//                             setSelectedInsight(insight)
//                             window.scrollTo({ top: 0, behavior: 'smooth' })
//                           }}
//                         >
//                           <div className="h-48 overflow-hidden bg-gray-200">
//                             <img
//                               src={insight.image}
//                               alt={insight.title}
//                               className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                             />
//                           </div>
//                           <div className="p-6">
//                             <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-2">
//                               {insight.category}
//                             </span>
//                             <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
//                               {insight.title}
//                             </h4>
//                             <p className="text-gray-600 text-sm line-clamp-2">
//                               {insight.description}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }

// export default Blogs



// import { useState, useEffect } from 'react'
// import { useLocation, useParams, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import api from '../config/api'

// function Blogs() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { id: urlId } = useParams() // Get blog ID from URL params
//   const [insights, setInsights] = useState([])
//   const [selectedInsight, setSelectedInsight] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [copied, setCopied] = useState(false)

//   useEffect(() => {
//     fetchInsights()
//   }, [])

//   // Handle URL parameter navigation (direct link to blog)
//   useEffect(() => {
//     if (urlId && insights.length > 0) {
//       const insight = insights.find(i => i.id === urlId)
//       if (insight) {
//         setSelectedInsight(insight)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     }
//   }, [urlId, insights])

//   // Handle hash navigation (when clicking "Read More" from homepage)
//   useEffect(() => {
//     if (location.hash && insights.length > 0 && !urlId) {
//       const insightId = location.hash.replace('#', '')
//       const insight = insights.find(i => i.id === insightId)
//       if (insight) {
//         setSelectedInsight(insight)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     }
//   }, [location.hash, insights, urlId])

//   const fetchInsights = async () => {
//     try {
//       const response = await api.get('/insights')
      
//       if (response.data.success) {
//         const activeInsights = response.data.data.filter(insight => insight.isActive)
//         setInsights(activeInsights)
//       }
//     } catch (error) {
//       console.error('Error fetching insights:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Get unique categories
//   const categories = ['All', ...new Set(insights.map(insight => insight.category))]

//   // Filter insights by category
//   const filteredInsights = selectedCategory === 'All'
//     ? insights
//     : insights.filter(insight => insight.category === selectedCategory)

//   // Handle selecting an insight
//   const handleSelectInsight = (insight) => {
//     setSelectedInsight(insight)
//     // Update URL to include blog ID for sharing
//     navigate(`/blogs/${insight.id}`)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   // Handle going back to all insights
//   const handleBackToInsights = () => {
//     setSelectedInsight(null)
//     navigate('/blogs')
//   }

//   // Share/Copy URL function
//   const handleShare = async () => {
//     const shareUrl = `${window.location.origin}/blogs/${selectedInsight.id}`
    
//     try {
//       await navigator.clipboard.writeText(shareUrl)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     } catch (error) {
//       // Fallback for older browsers
//       const textArea = document.createElement('textarea')
//       textArea.value = shareUrl
//       document.body.appendChild(textArea)
//       textArea.select()
//       document.execCommand('copy')
//       document.body.removeChild(textArea)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     }
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Header />

//       {/* Hero Section */}
//       <section className="bg-[#1a2332] px-8 py-16 lg:py-40 rounded-b-[40px]">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
//             Insights & Expertise
//           </h1>
//           <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
//             Expert insights, industry trends, and thought leadership to help you navigate 
//             business growth and achieve sustainable success
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-12 lg:py-20 px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading State */}
//           {loading && (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && insights.length === 0 && (
//             <div className="text-center py-20">
//               <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//               </svg>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">No Insights Yet</h3>
//               <p className="text-gray-600">Check back soon for expert insights and thought leadership</p>
//             </div>
//           )}

//           {/* Category Filter */}
//           {!loading && insights.length > 0 && !selectedInsight && (
//             <>
//               <div className="flex flex-wrap justify-center gap-3 mb-12">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-6 py-2 rounded-full font-semibold transition-all ${
//                       selectedCategory === category
//                         ? 'bg-[#1a2332] text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Insights Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredInsights.map((insight) => (
//                   <div
//                     key={insight.id}
//                     className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//                     onClick={() => handleSelectInsight(insight)}
//                   >
//                     {/* Image */}
//                     <div className="h-56 overflow-hidden bg-gray-200">
//                       <img
//                         src={insight.image}
//                         alt={insight.title}
//                         className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       {/* Category */}
//                       <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-3">
//                         {insight.category}
//                       </span>

//                       {/* Title */}
//                       <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#60a5fa] transition-colors">
//                         {insight.title}
//                       </h3>

//                       {/* Description */}
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                         {insight.description}
//                       </p>

//                       {/* Read More Link */}
//                       <div className="inline-flex items-center text-[#60a5fa] font-semibold text-sm hover:gap-2 transition-all">
//                         Read Full Article
//                         <svg
//                           className="w-4 h-4 ml-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* No Results for Category */}
//               {filteredInsights.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-600 text-lg">No insights found in this category</p>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Full Insight View */}
//           {selectedInsight && (
//             <div className="max-w-4xl mx-auto">
//               {/* Back Button */}
//               <button
//                 onClick={handleBackToInsights}
//                 className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back to All Insights
//               </button>

//               {/* Featured Image */}
//               <div className="h-96 overflow-hidden rounded-3xl mb-8 shadow-xl">
//                 <img
//                   src={selectedInsight.image}
//                   alt={selectedInsight.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Article Content */}
//               <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
//                 {/* Category Badge & Share Button */}
//                 <div className="flex items-center justify-between mb-6">
//                   <span className="inline-block px-4 py-2 bg-[#60a5fa] text-white text-sm font-semibold rounded-full">
//                     {selectedInsight.category}
//                   </span>
                  
//                   {/* Share Button */}
//                   <button
//                     onClick={handleShare}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
//                     title="Copy link to share"
//                   >
//                     {copied ? (
//                       <>
//                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-sm font-medium text-green-600">Copied!</span>
//                       </>
//                     ) : (
//                       <>
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                         </svg>
//                         <span className="text-sm font-medium">Share</span>
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
//                   {selectedInsight.title}
//                 </h1>

//                 {/* Description */}
//                 <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                   {selectedInsight.description}
//                 </p>

//                 {/* Date */}
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     {new Date(selectedInsight.createdAt).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </div>
//                 </div>

//                 {/* Full Content - Rendered as HTML */}
//                 <div 
//                   className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 overflow-hidden break-words [&>*]:max-w-full [&_img]:max-w-full [&_table]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto"
//                   style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
//                   dangerouslySetInnerHTML={{ __html: selectedInsight.content }}
//                 />
//               </article>

//               {/* Related Insights */}
//               {insights.length > 1 && (
//                 <div className="mt-16">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-8">More Insights</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {insights
//                       .filter(i => i.id !== selectedInsight.id)
//                       .slice(0, 2)
//                       .map((insight) => (
//                         <div
//                           key={insight.id}
//                           className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
//                           onClick={() => handleSelectInsight(insight)}
//                         >
//                           <div className="h-48 overflow-hidden bg-gray-200">
//                             <img
//                               src={insight.image}
//                               alt={insight.title}
//                               className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                             />
//                           </div>
//                           <div className="p-6">
//                             <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-2">
//                               {insight.category}
//                             </span>
//                             <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
//                               {insight.title}
//                             </h4>
//                             <p className="text-gray-600 text-sm line-clamp-2">
//                               {insight.description}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }

// export default Blogs



// import { useState, useEffect } from 'react'
// import { useLocation, useParams, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import api from '../config/api'

// // Function to clean HTML content from Word paste artifacts
// const cleanWordContent = (html) => {
//   if (!html) return ''
  
//   return html
//     // Remove Word-specific tags
//     .replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '')
//     .replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '')
//     .replace(/<m:[^>]*>[\s\S]*?<\/m:[^>]*>/gi, '')
//     // Remove XML namespaces
//     .replace(/<\/?[a-z]+:[^>]*>/gi, '')
//     // Remove class attributes with mso- prefix
//     .replace(/class="[^"]*mso[^"]*"/gi, '')
//     .replace(/class='[^']*mso[^']*'/gi, '')
//     // Remove style attributes with mso- properties
//     .replace(/style="[^"]*mso-[^"]*"/gi, '')
//     .replace(/style='[^']*mso-[^']*'/gi, '')
//     // Replace non-breaking spaces with regular spaces
//     .replace(/&nbsp;/gi, ' ')
//     .replace(/\u00A0/g, ' ')
//     // Replace multiple spaces with single space
//     .replace(/  +/g, ' ')
//     // Remove empty paragraphs
//     .replace(/<p[^>]*>\s*<\/p>/gi, '')
//     // Remove empty spans
//     .replace(/<span[^>]*>\s*<\/span>/gi, '')
//     // Clean up line breaks
//     .replace(/\r\n/g, '\n')
//     .replace(/\r/g, '\n')
//     // Remove zero-width spaces and other invisible characters
//     .replace(/[\u200B-\u200D\uFEFF]/g, '')
//     .trim()
// }

// function Blogs() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { id: urlId } = useParams() // Get blog ID from URL params
//   const [insights, setInsights] = useState([])
//   const [selectedInsight, setSelectedInsight] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [copied, setCopied] = useState(false)

//   useEffect(() => {
//     fetchInsights()
//   }, [])

//   // Handle URL parameter navigation (direct link to blog)
//   useEffect(() => {
//     if (urlId && insights.length > 0) {
//       const insight = insights.find(i => i.id === urlId)
//       if (insight) {
//         setSelectedInsight(insight)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     }
//   }, [urlId, insights])

//   // Handle hash navigation (when clicking "Read More" from homepage)
//   useEffect(() => {
//     if (location.hash && insights.length > 0 && !urlId) {
//       const insightId = location.hash.replace('#', '')
//       const insight = insights.find(i => i.id === insightId)
//       if (insight) {
//         setSelectedInsight(insight)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     }
//   }, [location.hash, insights, urlId])

//   const fetchInsights = async () => {
//     try {
//       const response = await api.get('/insights')
      
//       if (response.data.success) {
//         const activeInsights = response.data.data.filter(insight => insight.isActive)
//         setInsights(activeInsights)
//       }
//     } catch (error) {
//       console.error('Error fetching insights:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Get unique categories
//   const categories = ['All', ...new Set(insights.map(insight => insight.category))]

//   // Filter insights by category
//   const filteredInsights = selectedCategory === 'All'
//     ? insights
//     : insights.filter(insight => insight.category === selectedCategory)

//   // Handle selecting an insight
//   const handleSelectInsight = (insight) => {
//     setSelectedInsight(insight)
//     // Update URL to include blog ID for sharing
//     navigate(`/blogs/${insight.id}`)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   // Handle going back to all insights
//   const handleBackToInsights = () => {
//     setSelectedInsight(null)
//     navigate('/blogs')
//   }

//   // Share/Copy URL function
//   const handleShare = async () => {
//     const shareUrl = `${window.location.origin}/blogs/${selectedInsight.id}`
    
//     try {
//       await navigator.clipboard.writeText(shareUrl)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     } catch (error) {
//       // Fallback for older browsers
//       const textArea = document.createElement('textarea')
//       textArea.value = shareUrl
//       document.body.appendChild(textArea)
//       textArea.select()
//       document.execCommand('copy')
//       document.body.removeChild(textArea)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     }
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Header />

//       {/* Hero Section */}
//       <section className="bg-[#1a2332] px-8 py-16 lg:py-40 rounded-b-[40px]">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
//             Insights & Expertise
//           </h1>
//           <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
//             Expert insights, industry trends, and thought leadership to help you navigate 
//             business growth and achieve sustainable success
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-12 lg:py-20 px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading State */}
//           {loading && (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && insights.length === 0 && (
//             <div className="text-center py-20">
//               <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//               </svg>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">No Insights Yet</h3>
//               <p className="text-gray-600">Check back soon for expert insights and thought leadership</p>
//             </div>
//           )}

//           {/* Category Filter */}
//           {!loading && insights.length > 0 && !selectedInsight && (
//             <>
//               <div className="flex flex-wrap justify-center gap-3 mb-12">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-6 py-2 rounded-full font-semibold transition-all ${
//                       selectedCategory === category
//                         ? 'bg-[#1a2332] text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Insights Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredInsights.map((insight) => (
//                   <div
//                     key={insight.id}
//                     className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//                     onClick={() => handleSelectInsight(insight)}
//                   >
//                     {/* Image */}
//                     <div className="h-56 overflow-hidden bg-gray-200">
//                       <img
//                         src={insight.image}
//                         alt={insight.title}
//                         className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       {/* Category */}
//                       <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-3">
//                         {insight.category}
//                       </span>

//                       {/* Title */}
//                       <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#60a5fa] transition-colors">
//                         {insight.title}
//                       </h3>

//                       {/* Description */}
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                         {insight.description}
//                       </p>

//                       {/* Read More Link */}
//                       <div className="inline-flex items-center text-[#60a5fa] font-semibold text-sm hover:gap-2 transition-all">
//                         Read Full Article
//                         <svg
//                           className="w-4 h-4 ml-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* No Results for Category */}
//               {filteredInsights.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-600 text-lg">No insights found in this category</p>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Full Insight View */}
//           {selectedInsight && (
//             <div className="max-w-4xl mx-auto">
//               {/* Back Button */}
//               <button
//                 onClick={handleBackToInsights}
//                 className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back to All Insights
//               </button>

//               {/* Featured Image */}
//               <div className="h-96 overflow-hidden rounded-3xl mb-8 shadow-xl">
//                 <img
//                   src={selectedInsight.image}
//                   alt={selectedInsight.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Article Content */}
//               <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg overflow-hidden">
//                 {/* Category Badge & Share Button */}
//                 <div className="flex items-center justify-between mb-6">
//                   <span className="inline-block px-4 py-2 bg-[#60a5fa] text-white text-sm font-semibold rounded-full">
//                     {selectedInsight.category}
//                   </span>
                  
//                   {/* Share Button */}
//                   <button
//                     onClick={handleShare}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
//                     title="Copy link to share"
//                   >
//                     {copied ? (
//                       <>
//                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-sm font-medium text-green-600">Copied!</span>
//                       </>
//                     ) : (
//                       <>
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                         </svg>
//                         <span className="text-sm font-medium">Share</span>
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
//                   {selectedInsight.title}
//                 </h1>

//                 {/* Description */}
//                 <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                   {selectedInsight.description}
//                 </p>

//                 {/* Date */}
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     {new Date(selectedInsight.createdAt).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </div>
//                 </div>

//                 {/* Full Content - Rendered as HTML */}
//                 <div 
//                   className="prose prose-lg max-w-none 
//                     prose-headings:text-gray-900 
//                     prose-p:text-gray-700 
//                     prose-strong:text-gray-900 
//                     prose-ul:text-gray-700 
//                     prose-ol:text-gray-700 
//                     prose-li:text-gray-700
//                     prose-p:leading-relaxed
//                     prose-li:leading-relaxed
//                     [&_img]:max-w-full 
//                     [&_table]:w-full
//                     [&_table]:overflow-x-auto 
//                     [&_pre]:overflow-x-auto
//                     **:max-w-full"
//                   dangerouslySetInnerHTML={{ __html: cleanWordContent(selectedInsight.content) }}
//                 />
//               </article>

//               {/* Related Insights */}
//               {insights.length > 1 && (
//                 <div className="mt-16">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-8">More Insights</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {insights
//                       .filter(i => i.id !== selectedInsight.id)
//                       .slice(0, 2)
//                       .map((insight) => (
//                         <div
//                           key={insight.id}
//                           className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
//                           onClick={() => handleSelectInsight(insight)}
//                         >
//                           <div className="h-48 overflow-hidden bg-gray-200">
//                             <img
//                               src={insight.image}
//                               alt={insight.title}
//                               className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                             />
//                           </div>
//                           <div className="p-6">
//                             <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-2">
//                               {insight.category}
//                             </span>
//                             <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
//                               {insight.title}
//                             </h4>
//                             <p className="text-gray-600 text-sm line-clamp-2">
//                               {insight.description}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }

// export default Blogs




import { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../config/api'

// Function to clean HTML content from Word paste artifacts
const cleanWordContent = (html) => {
  if (!html) return ''
  
  return html
    // Remove Word-specific tags
    .replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '')
    .replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '')
    .replace(/<m:[^>]*>[\s\S]*?<\/m:[^>]*>/gi, '')
    // Remove XML namespaces
    .replace(/<\/?[a-z]+:[^>]*>/gi, '')
    // Remove class attributes with mso- prefix
    .replace(/class="[^"]*mso[^"]*"/gi, '')
    .replace(/class='[^']*mso[^']*'/gi, '')
    // Remove style attributes with mso- properties
    .replace(/style="[^"]*mso-[^"]*"/gi, '')
    .replace(/style='[^']*mso-[^']*'/gi, '')
    // Replace non-breaking spaces with regular spaces
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00A0/g, ' ')
    // Replace multiple spaces with single space
    .replace(/  +/g, ' ')
    // Remove empty paragraphs
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    // Remove empty spans
    .replace(/<span[^>]*>\s*<\/span>/gi, '')
    // Clean up line breaks
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove zero-width spaces and other invisible characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
}

function Blogs() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id: urlId } = useParams() // Get blog ID from URL params
  const [insights, setInsights] = useState([])
  const [selectedInsight, setSelectedInsight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchInsights()
  }, [])

  // Handle URL parameter navigation (direct link to blog)
  useEffect(() => {
    if (urlId && insights.length > 0) {
      const insight = insights.find(i => i.id === urlId)
      if (insight) {
        setSelectedInsight(insight)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [urlId, insights])

  // Handle hash navigation (when clicking "Read More" from homepage)
  useEffect(() => {
    if (location.hash && insights.length > 0 && !urlId) {
      const insightId = location.hash.replace('#', '')
      const insight = insights.find(i => i.id === insightId)
      if (insight) {
        setSelectedInsight(insight)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [location.hash, insights, urlId])

  const fetchInsights = async () => {
    try {
      const response = await api.get('/insights')
      
      if (response.data.success) {
        const activeInsights = response.data.data.filter(insight => insight.isActive)
        setInsights(activeInsights)
      }
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categories = ['All', ...new Set(insights.map(insight => insight.category))]

  // Filter insights by category
  const filteredInsights = selectedCategory === 'All'
    ? insights
    : insights.filter(insight => insight.category === selectedCategory)

  // Handle selecting an insight
  const handleSelectInsight = (insight) => {
    setSelectedInsight(insight)
    // Update URL to include blog ID for sharing
    navigate(`/blogs/${insight.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle going back to all insights
  const handleBackToInsights = () => {
    setSelectedInsight(null)
    navigate('/blogs')
  }

  // Share/Copy URL function
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/blogs/${selectedInsight.id}`
    
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a2332] px-8 py-16 lg:py-40 rounded-b-[40px]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Insights & Expertise
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Expert insights, industry trends, and thought leadership to help you navigate 
            business growth and achieve sustainable success
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
          {!loading && insights.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Insights Yet</h3>
              <p className="text-gray-600">Check back soon for expert insights and thought leadership</p>
            </div>
          )}

          {/* Category Filter */}
          {!loading && insights.length > 0 && !selectedInsight && (
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

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleSelectInsight(insight)}
                  >
                    {/* Image */}
                    <div className="h-56 overflow-hidden bg-gray-200">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-3">
                        {insight.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#60a5fa] transition-colors">
                        {insight.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {insight.description}
                      </p>

                      {/* Read More Link */}
                      <div className="inline-flex items-center text-[#60a5fa] font-semibold text-sm hover:gap-2 transition-all">
                        Read Full Article
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
              {filteredInsights.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No insights found in this category</p>
                </div>
              )}
            </>
          )}

          {/* Full Insight View */}
          {selectedInsight && (
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={handleBackToInsights}
                className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Insights
              </button>

              {/* Featured Image */}
              <div className="rounded-3xl mb-8 shadow-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedInsight.image}
                  alt={selectedInsight.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Article Content */}
              <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg overflow-hidden">
                {/* Category Badge & Share Button */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block px-4 py-2 bg-[#60a5fa] text-white text-sm font-semibold rounded-full">
                    {selectedInsight.category}
                  </span>
                  
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
                  {selectedInsight.title}
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {selectedInsight.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(selectedInsight.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Full Content - Rendered as HTML */}
                <div 
                  className="prose prose-lg max-w-none 
                    prose-headings:text-gray-900 
                    prose-p:text-gray-700 
                    prose-strong:text-gray-900 
                    prose-ul:text-gray-700 
                    prose-ol:text-gray-700 
                    prose-li:text-gray-700
                    prose-p:leading-relaxed
                    prose-li:leading-relaxed
                    [&_img]:max-w-full 
                    [&_table]:w-full
                    [&_table]:overflow-x-auto 
                    [&_pre]:overflow-x-auto
                    **:max-w-full"
                  dangerouslySetInnerHTML={{ __html: cleanWordContent(selectedInsight.content) }}
                />
              </article>

              {/* Related Insights */}
              {insights.length > 1 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">More Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {insights
                      .filter(i => i.id !== selectedInsight.id)
                      .slice(0, 2)
                      .map((insight) => (
                        <div
                          key={insight.id}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => handleSelectInsight(insight)}
                        >
                          <div className="h-48 overflow-hidden bg-gray-200">
                            <img
                              src={insight.image}
                              alt={insight.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6">
                            <span className="inline-block px-3 py-1 bg-[#60a5fa] text-white text-xs font-semibold rounded-full mb-2">
                              {insight.category}
                            </span>
                            <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {insight.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {insight.description}
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

export default Blogs