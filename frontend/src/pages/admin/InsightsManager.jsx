// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AdminLayout from '../../components/admin/AdminLayout'
// import api from '../../config/api'
// import { getAdminAuth, getAdminRedirectPath } from '../../utils/adminAuth'
// import { useNotification } from '../../context/NotificationContext'

// function InsightsManager() {
//   const navigate = useNavigate()
//   const { showSuccess, showError } = useNotification()
//   const [insights, setInsights] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [isAddingInsight, setIsAddingInsight] = useState(false)
//   const [editingInsight, setEditingInsight] = useState(null)
//   const [submitting, setSubmitting] = useState(false)
//   const [uploadingImage, setUploadingImage] = useState(false)
  
//   const [newInsight, setNewInsight] = useState({
//     title: '',
//     description: '',
//     content: '',
//     category: '',
//     imageFile: null,
//     imageUrl: '',
//     imagePublicId: ''
//   })

//   const categories = [
//     'Business Strategy',
//     'Financial Planning',
//     'AI & Technology',
//     'Market Insights',
//     'Growth Tips',
//     'Case Studies',
//     'Industry News',
//     'Other'
//   ]

//   // Check authentication
//   useEffect(() => {
//     const { isAuth, token } = getAdminAuth()
    
//     if (!isAuth || !token) {
//       navigate(getAdminRedirectPath())
//       return
//     }

//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
//     fetchInsights()
//   }, [navigate])

//   const fetchInsights = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await api.get('/insights/admin')
      
//       if (response.data.success) {
//         setInsights(response.data.data)
//       }
//     } catch (err) {
//       console.error('Error fetching insights:', err)
//       setError(err.response?.data?.message || 'Failed to load insights')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageUpload = async (file) => {
//     if (!file) return null

//     setUploadingImage(true)

//     try {
//       const formData = new FormData()
//       formData.append('image', file)

//       const response = await api.post('/insights/upload-image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })

//       if (response.data.success) {
//         return {
//           imageUrl: response.data.data.imageUrl,
//           imagePublicId: response.data.data.imagePublicId
//         }
//       }
//     } catch (err) {
//       console.error('Error uploading image:', err)
//       showError(
//         'Image upload failed',
//         err.response?.data?.message || 'Please try again'
//       )
//       return null
//     } finally {
//       setUploadingImage(false)
//     }
//   }

//   const handleAddInsight = async () => {
//     if (!newInsight.title || !newInsight.description || !newInsight.content || !newInsight.category) {
//       showError(
//         'Missing Information',
//         'Please fill in all required fields'
//       )
//       return
//     }

//     setSubmitting(true)

//     try {
//       let imageUrl = newInsight.imageUrl
//       let imagePublicId = newInsight.imagePublicId

//       if (newInsight.imageFile) {
//         const uploadResult = await handleImageUpload(newInsight.imageFile)
//         if (!uploadResult) {
//           setSubmitting(false)
//           return
//         }
//         imageUrl = uploadResult.imageUrl
//         imagePublicId = uploadResult.imagePublicId
//       }

//       const response = await api.post('/insights', {
//         title: newInsight.title,
//         description: newInsight.description,
//         content: newInsight.content,
//         category: newInsight.category,
//         imageUrl,
//         imagePublicId
//       })

//       if (response.data.success) {
//         setInsights([response.data.data, ...insights])
//         setNewInsight({
//           title: '',
//           description: '',
//           content: '',
//           category: '',
//           imageFile: null,
//           imageUrl: '',
//           imagePublicId: ''
//         })
//         setIsAddingInsight(false)
        
//         showSuccess(
//           'Insight uploaded successfully',
//           'Check insights page'
//         )
//       }
//     } catch (err) {
//       console.error('Error adding insight:', err)
//       showError(
//         'Insight upload was unsuccessful',
//         'Refresh and try again'
//       )
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleUpdateInsight = async () => {
//     if (!editingInsight.title || !editingInsight.description || !editingInsight.content || !editingInsight.category) {
//       showError(
//         'Missing Information',
//         'Please fill in all required fields'
//       )
//       return
//     }

//     setSubmitting(true)

//     try {
//       let imageUrl = editingInsight.image
//       let imagePublicId = editingInsight.imagePublicId

//       if (editingInsight.newImageFile) {
//         const uploadResult = await handleImageUpload(editingInsight.newImageFile)
//         if (!uploadResult) {
//           setSubmitting(false)
//           return
//         }
//         imageUrl = uploadResult.imageUrl
//         imagePublicId = uploadResult.imagePublicId
//       }

//       const response = await api.put(`/insights/${editingInsight.id}`, {
//         title: editingInsight.title,
//         description: editingInsight.description,
//         content: editingInsight.content,
//         category: editingInsight.category,
//         imageUrl,
//         imagePublicId,
//         isActive: editingInsight.isActive
//       })

//       if (response.data.success) {
//         setInsights(insights.map(insight =>
//           insight.id === editingInsight.id ? response.data.data : insight
//         ))
//         setEditingInsight(null)
        
//         showSuccess(
//           'Insight updated successfully',
//           'Changes have been saved'
//         )
//       }
//     } catch (err) {
//       console.error('Error updating insight:', err)
//       showError(
//         'Failed to update insight',
//         'Please refresh and try again'
//       )
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleDeleteInsight = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this insight?')) {
//       return
//     }

//     try {
//       const response = await api.delete(`/insights/${id}`)

//       if (response.data.success) {
//         setInsights(insights.filter(insight => insight.id !== id))
        
//         showSuccess(
//           'Insight deleted successfully',
//           'The insight has been removed'
//         )
//       }
//     } catch (err) {
//       console.error('Error deleting insight:', err)
//       showError(
//         'Failed to delete insight',
//         'Please refresh and try again'
//       )
//     }
//   }

//   const toggleInsightStatus = async (id) => {
//     try {
//       const response = await api.patch(`/insights/${id}/toggle`)

//       if (response.data.success) {
//         setInsights(insights.map(insight =>
//           insight.id === id ? response.data.data : insight
//         ))
        
//         showSuccess(
//           'Insight status updated',
//           response.data.message
//         )
//       }
//     } catch (err) {
//       console.error('Error toggling insight status:', err)
//       showError(
//         'Failed to toggle insight status',
//         'Please refresh and try again'
//       )
//     }
//   }

//   return (
//     <AdminLayout>
//       <div>
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Insights Manager</h1>
//             <p className="text-gray-600 mt-1">Create and manage blog posts and insights</p>
//           </div>
//           <button
//             onClick={() => setIsAddingInsight(true)}
//             className="bg-[#60a5fa] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors flex items-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//             Add New Insight
//           </button>
//         </div>

//         {loading && (
//           <div className="bg-white rounded-xl shadow-md p-8 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading insights...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//             <p className="text-red-600">{error}</p>
//             <button
//               onClick={fetchInsights}
//               className="mt-2 text-red-700 underline hover:text-red-800"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {!loading && !error && insights.length === 0 && (
//           <div className="bg-white rounded-xl shadow-md p-8 text-center">
//             <p className="text-gray-600 text-lg">No insights yet.</p>
//             <p className="text-gray-500 text-sm mt-2">Create your first insight to get started.</p>
//           </div>
//         )}
        
//         {!loading && !error && insights.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {insights.map((insight) => (
//               <div key={insight.id} className="bg-white rounded-xl shadow-md overflow-hidden">
//                 {insight.image && (
//                   <img
//                     src={insight.image}
//                     alt={insight.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}
//                 <div className="p-6">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                       {insight.category}
//                     </span>
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       insight.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {insight.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
//                     {insight.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {insight.description}
//                   </p>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setEditingInsight({ ...insight, newImageFile: null })}
//                       className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => toggleInsightStatus(insight.id)}
//                       className="flex-1 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
//                     >
//                       {insight.isActive ? 'Deactivate' : 'Activate'}
//                     </button>
//                     <button
//                       onClick={() => handleDeleteInsight(insight.id)}
//                       className="flex-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add Insight Modal */}
//         {isAddingInsight && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//             <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
//               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-800">Add New Insight</h2>
//                 <button
//                   onClick={() => {
//                     setIsAddingInsight(false)
//                     setNewInsight({
//                       title: '',
//                       description: '',
//                       content: '',
//                       category: '',
//                       imageFile: null,
//                       imageUrl: '',
//                       imagePublicId: ''
//                     })
//                   }}
//                   className="text-gray-400 hover:text-gray-600"
//                   disabled={submitting}
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
//                   <select
//                     value={newInsight.category}
//                     onChange={(e) => setNewInsight({ ...newInsight, category: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                     disabled={submitting}
//                   >
//                     <option value="">Select category</option>
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
//                   <input
//                     type="text"
//                     value={newInsight.title}
//                     onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                     placeholder="Enter insight title"
//                     disabled={submitting}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
//                   <textarea
//                     value={newInsight.description}
//                     onChange={(e) => setNewInsight({ ...newInsight, description: e.target.value })}
//                     rows="3"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
//                     placeholder="Brief summary (shown in cards)"
//                     disabled={submitting}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
//                   <textarea
//                     value={newInsight.content}
//                     onChange={(e) => setNewInsight({ ...newInsight, content: e.target.value })}
//                     rows="8"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
//                     placeholder="Full article content"
//                     disabled={submitting}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Featured Image (Optional)
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0]
//                       if (file) {
//                         setNewInsight({ ...newInsight, imageFile: file })
//                       }
//                     }}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                     disabled={submitting || uploadingImage}
//                   />
//                   {newInsight.imageFile && (
//                     <p className="text-sm text-green-600 mt-2">
//                       ✓ {newInsight.imageFile.name}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="p-6 border-t border-gray-200 flex gap-4">
//                 <button
//                   onClick={() => {
//                     setIsAddingInsight(false)
//                     setNewInsight({
//                       title: '',
//                       description: '',
//                       content: '',
//                       category: '',
//                       imageFile: null,
//                       imageUrl: '',
//                       imagePublicId: ''
//                     })
//                   }}
//                   className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddInsight}
//                   disabled={submitting || uploadingImage}
//                   className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {uploadingImage ? 'Uploading Image...' : submitting ? 'Adding...' : 'Add Insight'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Insight Modal */}
//         {editingInsight && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//             <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
//               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-800">Edit Insight</h2>
//                 <button
//                   onClick={() => setEditingInsight(null)}
//                   className="text-gray-400 hover:text-gray-600"
//                   disabled={submitting}
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
//                   <select
//                     value={editingInsight.category}
//                     onChange={(e) => setEditingInsight({ ...editingInsight, category: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                     disabled={submitting}
//                   >
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
//                   <input
//                     type="text"
//                     value={editingInsight.title}
//                     onChange={(e) => setEditingInsight({ ...editingInsight, title: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                     disabled={submitting}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
//                   <textarea
//                     value={editingInsight.description}
//                     onChange={(e) => setEditingInsight({ ...editingInsight, description: e.target.value })}
//                     rows="3"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
//                     disabled={submitting}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
//                   <textarea
//                     value={editingInsight.content}
//                     onChange={(e) => setEditingInsight({ ...editingInsight, content: e.target.value })}
//                     rows="8"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
//                     disabled={submitting}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
//                   {editingInsight.image && (
//                     <img
//                       src={editingInsight.image}
//                       alt="Current"
//                       className="w-32 h-32 object-cover rounded-lg mb-2"
//                     />
//                   )}
                  
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Replace Image (Optional)</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0]
//                       if (file) {
//                         setEditingInsight({ ...editingInsight, newImageFile: file })
//                       }
//                     }}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                     disabled={submitting || uploadingImage}
//                   />
//                   {editingInsight.newImageFile && (
//                     <p className="text-sm text-green-600 mt-2">
//                       ✓ New image: {editingInsight.newImageFile.name}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="p-6 border-t border-gray-200 flex gap-4">
//                 <button
//                   onClick={() => setEditingInsight(null)}
//                   className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateInsight}
//                   disabled={submitting || uploadingImage}
//                   className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {uploadingImage ? 'Uploading Image...' : submitting ? 'Updating...' : 'Update Insight'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   )
// }

// export default InsightsManager




// import { useState, useEffect } from 'react'
// import ReactQuill from 'react-quill-new'
// import 'react-quill-new/dist/quill.snow.css'
// import api from '../../config/api'

// function InsightsManager() {
//   const [insights, setInsights] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showForm, setShowForm] = useState(false)
//   const [editingInsight, setEditingInsight] = useState(null)
//   const [formData, setFormData] = useState({
//     category: '',
//     title: '',
//     description: '',
//     content: ''
//   })
//   const [imageFile, setImageFile] = useState(null)
//   const [imagePreview, setImagePreview] = useState('')
//   const [uploadedImageData, setUploadedImageData] = useState(null)
//   const [submitting, setSubmitting] = useState(false)
//   const [uploadingImage, setUploadingImage] = useState(false)

//   // Categories for insights
//   const categories = [
//     'Business Strategy',
//     'Financial Planning',
//     'Leadership',
//     'Market Trends',
//     'Operations',
//     'Growth Tips',
//     'Case Studies',
//     'Industry News'
//   ]

//   // Quill editor configuration
//   const quillModules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       [{ 'font': [] }],
//       [{ 'size': ['small', false, 'large', 'huge'] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'script': 'sub' }, { 'script': 'super' }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       [{ 'indent': '-1' }, { 'indent': '+1' }],
//       [{ 'direction': 'rtl' }],
//       [{ 'align': [] }],
//       ['blockquote', 'code-block'],
//       ['link', 'image', 'video'],
//       ['clean']
//     ],
//     clipboard: {
//       matchVisual: false // This helps preserve formatting when pasting from Word
//     }
//   }

//   const quillFormats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'script',
//     'list', 'bullet', 'indent',
//     'direction', 'align',
//     'blockquote', 'code-block',
//     'link', 'image', 'video'
//   ]

//   useEffect(() => {
//     fetchInsights()
//   }, [])

//   const fetchInsights = async () => {
//     try {
//       const token = localStorage.getItem('adminToken')
//       const response = await api.get('/insights/admin', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       if (response.data.success) {
//         setInsights(response.data.data)
//       }
//     } catch (error) {
//       console.error('Error fetching insights:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       setImagePreview(URL.createObjectURL(file))
//       setUploadedImageData(null)
//     }
//   }

//   const uploadImage = async () => {
//     if (!imageFile) return null

//     setUploadingImage(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', imageFile)

//       const token = localStorage.getItem('adminToken')
//       const response = await api.post('/insights/upload-image', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       })

//       if (response.data.success) {
//         setUploadedImageData(response.data.data)
//         return response.data.data
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error)
//       alert('Failed to upload image')
//     } finally {
//       setUploadingImage(false)
//     }
//     return null
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setSubmitting(true)

//     try {
//       let imageData = uploadedImageData

//       if (imageFile && !uploadedImageData) {
//         imageData = await uploadImage()
//         if (!imageData && !editingInsight) {
//           setSubmitting(false)
//           return
//         }
//       }

//       const token = localStorage.getItem('adminToken')
//       const insightData = {
//         ...formData,
//         imageUrl: imageData?.imageUrl || editingInsight?.image || '',
//         imagePublicId: imageData?.imagePublicId || editingInsight?.imagePublicId || ''
//       }

//       let response
//       if (editingInsight) {
//         response = await api.put(`/insights/${editingInsight.id}`, insightData, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       } else {
//         response = await api.post('/insights', insightData, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       }

//       if (response.data.success) {
//         alert(editingInsight ? 'Insight updated successfully!' : 'Insight created successfully!')
//         resetForm()
//         fetchInsights()
//       }
//     } catch (error) {
//       console.error('Error saving insight:', error)
//       alert('Failed to save insight')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleEdit = (insight) => {
//     setEditingInsight(insight)
//     setFormData({
//       category: insight.category,
//       title: insight.title,
//       description: insight.description,
//       content: insight.content
//     })
//     setImagePreview(insight.image)
//     setShowForm(true)
//   }

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this insight?')) return

//     try {
//       const token = localStorage.getItem('adminToken')
//       const response = await api.delete(`/insights/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })

//       if (response.data.success) {
//         alert('Insight deleted successfully!')
//         fetchInsights()
//       }
//     } catch (error) {
//       console.error('Error deleting insight:', error)
//       alert('Failed to delete insight')
//     }
//   }

//   const handleToggleStatus = async (id) => {
//     try {
//       const token = localStorage.getItem('adminToken')
//       const response = await api.patch(`/insights/${id}/toggle`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       })

//       if (response.data.success) {
//         fetchInsights()
//       }
//     } catch (error) {
//       console.error('Error toggling status:', error)
//     }
//   }

//   const resetForm = () => {
//     setFormData({ category: '', title: '', description: '', content: '' })
//     setImageFile(null)
//     setImagePreview('')
//     setUploadedImageData(null)
//     setEditingInsight(null)
//     setShowForm(false)
//   }

//   const handleContentChange = (value) => {
//     setFormData({ ...formData, content: value })
//   }

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Insights Manager</h1>
//           <p className="text-gray-600 mt-1">Create and manage blog insights</p>
//         </div>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#1a2332] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2a3442] transition-colors flex items-center gap-2"
//         >
//           {showForm ? (
//             <>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//               Cancel
//             </>
//           ) : (
//             <>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               New Insight
//             </>
//           )}
//         </button>
//       </div>

//       {/* Create/Edit Form */}
//       {showForm && (
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             {editingInsight ? 'Edit Insight' : 'Create New Insight'}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Category */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 required
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Title */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Title *
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 required
//                 placeholder="Enter insight title"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Short Description *
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 required
//                 placeholder="Brief description for preview cards"
//                 rows={3}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
//               />
//             </div>

//             {/* Rich Text Content Editor */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Full Content *
//               </label>
//               <p className="text-sm text-gray-500 mb-3">
//                 You can paste formatted text from MS Word and the formatting will be preserved.
//               </p>
//               <div className="border border-gray-300 rounded-xl overflow-hidden">
//                 <ReactQuill
//                   theme="snow"
//                   value={formData.content}
//                   onChange={handleContentChange}
//                   modules={quillModules}
//                   formats={quillFormats}
//                   placeholder="Write your full article content here... You can paste from MS Word!"
//                   style={{ minHeight: '300px' }}
//                 />
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Featured Image {!editingInsight && '*'}
//               </label>
//               <div className="flex items-start gap-6">
//                 <div className="flex-1">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
//                   />
//                   <p className="text-sm text-gray-500 mt-2">
//                     Recommended size: 1200x630 pixels
//                   </p>
//                 </div>
//                 {imagePreview && (
//                   <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-100">
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={submitting || uploadingImage}
//                 className="flex-1 bg-[#1a2332] text-white py-4 rounded-xl font-semibold hover:bg-[#2a3442] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {submitting || uploadingImage ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     {uploadingImage ? 'Uploading Image...' : 'Saving...'}
//                   </span>
//                 ) : (
//                   editingInsight ? 'Update Insight' : 'Create Insight'
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-8 py-4 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Insights List */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">All Insights ({insights.length})</h2>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2332]"></div>
//           </div>
//         ) : insights.length === 0 ? (
//           <div className="text-center py-20">
//             <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//             </svg>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">No Insights Yet</h3>
//             <p className="text-gray-600">Create your first insight to get started</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {insights.map((insight) => (
//                   <tr key={insight.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-200">
//                         <img
//                           src={insight.image}
//                           alt={insight.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-gray-900 line-clamp-1">{insight.title}</p>
//                       <p className="text-sm text-gray-500 line-clamp-1">{insight.description}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-[#60a5fa]/20 text-[#2563eb] text-sm font-medium rounded-full">
//                         {insight.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleToggleStatus(insight.id)}
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           insight.isActive
//                             ? 'bg-green-100 text-green-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {insight.isActive ? 'Active' : 'Inactive'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {new Date(insight.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(insight)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => handleDelete(insight.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Custom styles for Quill editor */}
//       <style>{`
//         .ql-container {
//           min-height: 250px;
//           font-size: 16px;
//         }
//         .ql-editor {
//           min-height: 250px;
//         }
//         .ql-toolbar {
//           border-top-left-radius: 0.75rem;
//           border-top-right-radius: 0.75rem;
//           background: #f9fafb;
//         }
//         .ql-container {
//           border-bottom-left-radius: 0.75rem;
//           border-bottom-right-radius: 0.75rem;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default InsightsManager



import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../config/api'
import { getAdminAuth, getAdminRedirectPath } from '../../utils/adminAuth'
import { useNotification } from '../../context/NotificationContext'

function InsightsManager() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useNotification()
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddingInsight, setIsAddingInsight] = useState(false)
  const [editingInsight, setEditingInsight] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [newInsight, setNewInsight] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    imageFile: null,
    imageUrl: '',
    imagePublicId: ''
  })

  const categories = [
    'Business Strategy',
    'Financial Planning',
    'AI & Technology',
    'Market Insights',
    'Growth Tips',
    'Case Studies',
    'Industry News',
    'Other'
  ]

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link'
  ]

  // Check authentication
  useEffect(() => {
    const { isAuth, token } = getAdminAuth()
    
    if (!isAuth || !token) {
      navigate(getAdminRedirectPath())
      return
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    fetchInsights()
  }, [navigate])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/insights/admin')
      
      if (response.data.success) {
        setInsights(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching insights:', err)
      setError(err.response?.data?.message || 'Failed to load insights')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) return null

    setUploadingImage(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post('/insights/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        return {
          imageUrl: response.data.data.imageUrl,
          imagePublicId: response.data.data.imagePublicId
        }
      }
    } catch (err) {
      console.error('Error uploading image:', err)
      showError(
        'Image upload failed',
        err.response?.data?.message || 'Please try again'
      )
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleAddInsight = async () => {
    if (!newInsight.title || !newInsight.description || !newInsight.content || !newInsight.category) {
      showError(
        'Missing Information',
        'Please fill in all required fields'
      )
      return
    }

    setSubmitting(true)

    try {
      let imageUrl = newInsight.imageUrl
      let imagePublicId = newInsight.imagePublicId

      if (newInsight.imageFile) {
        const uploadResult = await handleImageUpload(newInsight.imageFile)
        if (!uploadResult) {
          setSubmitting(false)
          return
        }
        imageUrl = uploadResult.imageUrl
        imagePublicId = uploadResult.imagePublicId
      }

      const response = await api.post('/insights', {
        title: newInsight.title,
        description: newInsight.description,
        content: newInsight.content,
        category: newInsight.category,
        imageUrl,
        imagePublicId
      })

      if (response.data.success) {
        setInsights([response.data.data, ...insights])
        setNewInsight({
          title: '',
          description: '',
          content: '',
          category: '',
          imageFile: null,
          imageUrl: '',
          imagePublicId: ''
        })
        setIsAddingInsight(false)
        
        showSuccess(
          'Insight uploaded successfully',
          'Check insights page'
        )
      }
    } catch (err) {
      console.error('Error adding insight:', err)
      showError(
        'Insight upload was unsuccessful',
        'Refresh and try again'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateInsight = async () => {
    if (!editingInsight.title || !editingInsight.description || !editingInsight.content || !editingInsight.category) {
      showError(
        'Missing Information',
        'Please fill in all required fields'
      )
      return
    }

    setSubmitting(true)

    try {
      let imageUrl = editingInsight.image
      let imagePublicId = editingInsight.imagePublicId

      if (editingInsight.newImageFile) {
        const uploadResult = await handleImageUpload(editingInsight.newImageFile)
        if (!uploadResult) {
          setSubmitting(false)
          return
        }
        imageUrl = uploadResult.imageUrl
        imagePublicId = uploadResult.imagePublicId
      }

      const response = await api.put(`/insights/${editingInsight.id}`, {
        title: editingInsight.title,
        description: editingInsight.description,
        content: editingInsight.content,
        category: editingInsight.category,
        imageUrl,
        imagePublicId,
        isActive: editingInsight.isActive
      })

      if (response.data.success) {
        setInsights(insights.map(insight =>
          insight.id === editingInsight.id ? response.data.data : insight
        ))
        setEditingInsight(null)
        
        showSuccess(
          'Insight updated successfully',
          'Changes have been saved'
        )
      }
    } catch (err) {
      console.error('Error updating insight:', err)
      showError(
        'Failed to update insight',
        'Please refresh and try again'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteInsight = async (insightId) => {
    if (!window.confirm('Are you sure you want to delete this insight?')) {
      return
    }

    try {
      const response = await api.delete(`/insights/${insightId}`)
      
      if (response.data.success) {
        setInsights(insights.filter(insight => insight.id !== insightId))
        
        showSuccess(
          'Insight deleted',
          'The insight has been removed'
        )
      }
    } catch (err) {
      console.error('Error deleting insight:', err)
      showError(
        'Failed to delete insight',
        'Please try again'
      )
    }
  }

  const handleToggleStatus = async (insightId) => {
    try {
      const response = await api.patch(`/insights/${insightId}/toggle`)
      
      if (response.data.success) {
        setInsights(insights.map(insight =>
          insight.id === insightId ? response.data.data : insight
        ))
      }
    } catch (err) {
      console.error('Error toggling status:', err)
      showError(
        'Failed to update status',
        'Please try again'
      )
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Insights Manager</h1>
            <p className="text-gray-600 mt-1">Manage your blog insights and articles</p>
          </div>
          <button
            onClick={() => setIsAddingInsight(true)}
            className="bg-[#60a5fa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3b82f6] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Insight
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#60a5fa]"></div>
          </div>
        ) : insights.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Insights Yet</h3>
            <p className="text-gray-600 mb-6">Create your first insight to get started</p>
            <button
              onClick={() => setIsAddingInsight(true)}
              className="bg-[#60a5fa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3b82f6] transition-colors"
            >
              Add Your First Insight
            </button>
          </div>
        ) : (
          /* Insights Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Image */}
                {insight.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#60a5fa]/20 text-[#3b82f6] text-xs font-semibold rounded-full">
                      {insight.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      insight.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {insight.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {insight.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {insight.description}
                  </p>
                  
                  <div className="text-xs text-gray-400 mb-4">
                    {new Date(insight.createdAt).toLocaleDateString()}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(insight.id)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        insight.isActive
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {insight.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => setEditingInsight(insight)}
                      className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInsight(insight.id)}
                      className="px-4 bg-red-100 text-red-700 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Insight Modal */}
        {isAddingInsight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-8">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Add New Insight</h2>
                <button
                  onClick={() => {
                    setIsAddingInsight(false)
                    setNewInsight({
                      title: '',
                      description: '',
                      content: '',
                      category: '',
                      imageFile: null,
                      imageUrl: '',
                      imagePublicId: ''
                    })
                  }}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={submitting}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={newInsight.category}
                    onChange={(e) => setNewInsight({ ...newInsight, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newInsight.title}
                    onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    placeholder="Enter insight title"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newInsight.description}
                    onChange={(e) => setNewInsight({ ...newInsight, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
                    placeholder="Brief summary (shown in cards)"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                  <p className="text-sm text-gray-500 mb-2">
                    You can paste formatted text from MS Word and the formatting will be preserved.
                  </p>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={newInsight.content}
                      onChange={(value) => setNewInsight({ ...newInsight, content: value })}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your full article content here..."
                      style={{ minHeight: '250px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Featured Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        setNewInsight({ ...newInsight, imageFile: file })
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting || uploadingImage}
                  />
                  {newInsight.imageFile && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {newInsight.imageFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => {
                    setIsAddingInsight(false)
                    setNewInsight({
                      title: '',
                      description: '',
                      content: '',
                      category: '',
                      imageFile: null,
                      imageUrl: '',
                      imagePublicId: ''
                    })
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInsight}
                  disabled={submitting || uploadingImage}
                  className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading Image...' : submitting ? 'Adding...' : 'Add Insight'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Insight Modal */}
        {editingInsight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-8">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Edit Insight</h2>
                <button
                  onClick={() => setEditingInsight(null)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={submitting}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={editingInsight.category}
                    onChange={(e) => setEditingInsight({ ...editingInsight, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={editingInsight.title}
                    onChange={(e) => setEditingInsight({ ...editingInsight, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={editingInsight.description}
                    onChange={(e) => setEditingInsight({ ...editingInsight, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                  <p className="text-sm text-gray-500 mb-2">
                    You can paste formatted text from MS Word and the formatting will be preserved.
                  </p>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={editingInsight.content}
                      onChange={(value) => setEditingInsight({ ...editingInsight, content: value })}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your full article content here..."
                      style={{ minHeight: '250px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
                  {editingInsight.image && (
                    <img
                      src={editingInsight.image}
                      alt="Current"
                      className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Replace Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        setEditingInsight({ ...editingInsight, newImageFile: file })
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting || uploadingImage}
                  />
                  {editingInsight.newImageFile && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ New image: {editingInsight.newImageFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => setEditingInsight(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateInsight}
                  disabled={submitting || uploadingImage}
                  className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading Image...' : submitting ? 'Updating...' : 'Update Insight'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom styles for Quill editor */}
      <style>{`
        .ql-container {
          min-height: 200px;
          font-size: 16px;
        }
        .ql-editor {
          min-height: 200px;
        }
        .ql-toolbar {
          background: #f9fafb;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      `}</style>
    </AdminLayout>
  )
}

export default InsightsManager