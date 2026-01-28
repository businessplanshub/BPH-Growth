import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../config/api'
import { getAdminAuth, getAdminRedirectPath } from '../../utils/adminAuth'
import { useNotification } from '../../context/NotificationContext'

function MasterclassManager() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useNotification()
  const [masterclasses, setMasterclasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddingMasterclass, setIsAddingMasterclass] = useState(false)
  const [editingMasterclass, setEditingMasterclass] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [newMasterclass, setNewMasterclass] = useState({
    title: '',
    description: '',
    category: '',
    facilitatorName: '',
    date: '',
    time: '',
    duration: '',
    googleFormUrl: '',
    imageFile: null,
    imageUrl: '',
    imagePublicId: ''
  })

  const categories = [
    'Business Strategy',
    'Leadership',
    'Financial Planning',
    'AI & Technology',
    'Marketing',
    'Sales',
    'Operations',
    'Personal Development',
    'Other'
  ]

  // Check authentication
  useEffect(() => {
    const { isAuth, token } = getAdminAuth()
    
    if (!isAuth || !token) {
      navigate(getAdminRedirectPath())
      return
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    fetchMasterclasses()
  }, [navigate])

  const fetchMasterclasses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/masterclasses/admin')
      
      if (response.data.success) {
        setMasterclasses(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching masterclasses:', err)
      setError(err.response?.data?.message || 'Failed to load masterclasses')
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

      const response = await api.post('/masterclasses/upload-image', formData, {
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

  const handleAddMasterclass = async () => {
    if (!newMasterclass.title || !newMasterclass.description || !newMasterclass.category || 
        !newMasterclass.facilitatorName || !newMasterclass.date || !newMasterclass.time || 
        !newMasterclass.duration || !newMasterclass.googleFormUrl) {
      showError(
        'Missing Information',
        'Please fill in all required fields'
      )
      return
    }

    // Validate Google Form URL
    if (!newMasterclass.googleFormUrl.startsWith('http')) {
      showError(
        'Invalid URL',
        'Please enter a valid Google Form URL starting with http:// or https://'
      )
      return
    }

    setSubmitting(true)

    try {
      let imageUrl = newMasterclass.imageUrl
      let imagePublicId = newMasterclass.imagePublicId

      if (newMasterclass.imageFile) {
        const uploadResult = await handleImageUpload(newMasterclass.imageFile)
        if (!uploadResult) {
          setSubmitting(false)
          return
        }
        imageUrl = uploadResult.imageUrl
        imagePublicId = uploadResult.imagePublicId
      }

      const response = await api.post('/masterclasses', {
        title: newMasterclass.title,
        description: newMasterclass.description,
        category: newMasterclass.category,
        facilitatorName: newMasterclass.facilitatorName,
        date: newMasterclass.date,
        time: newMasterclass.time,
        duration: newMasterclass.duration,
        googleFormUrl: newMasterclass.googleFormUrl,
        imageUrl,
        imagePublicId
      })

      if (response.data.success) {
        setMasterclasses([response.data.data, ...masterclasses])
        setNewMasterclass({
          title: '',
          description: '',
          category: '',
          facilitatorName: '',
          date: '',
          time: '',
          duration: '',
          googleFormUrl: '',
          imageFile: null,
          imageUrl: '',
          imagePublicId: ''
        })
        setIsAddingMasterclass(false)
        
        showSuccess(
          'Masterclass created successfully',
          'Check masterclasses page'
        )
      }
    } catch (err) {
      console.error('Error adding masterclass:', err)
      showError(
        'Masterclass creation was unsuccessful',
        'Refresh and try again'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateMasterclass = async () => {
    if (!editingMasterclass.title || !editingMasterclass.description || !editingMasterclass.category || 
        !editingMasterclass.facilitatorName || !editingMasterclass.date || !editingMasterclass.time || 
        !editingMasterclass.duration || !editingMasterclass.googleFormUrl) {
      showError(
        'Missing Information',
        'Please fill in all required fields'
      )
      return
    }

    setSubmitting(true)

    try {
      let imageUrl = editingMasterclass.image
      let imagePublicId = editingMasterclass.imagePublicId

      if (editingMasterclass.newImageFile) {
        const uploadResult = await handleImageUpload(editingMasterclass.newImageFile)
        if (!uploadResult) {
          setSubmitting(false)
          return
        }
        imageUrl = uploadResult.imageUrl
        imagePublicId = uploadResult.imagePublicId
      }

      const response = await api.put(`/masterclasses/${editingMasterclass.id}`, {
        title: editingMasterclass.title,
        description: editingMasterclass.description,
        category: editingMasterclass.category,
        facilitatorName: editingMasterclass.facilitatorName,
        date: editingMasterclass.date,
        time: editingMasterclass.time,
        duration: editingMasterclass.duration,
        googleFormUrl: editingMasterclass.googleFormUrl,
        imageUrl,
        imagePublicId,
        isActive: editingMasterclass.isActive
      })

      if (response.data.success) {
        setMasterclasses(masterclasses.map(m =>
          m.id === editingMasterclass.id ? response.data.data : m
        ))
        setEditingMasterclass(null)
        
        showSuccess(
          'Masterclass updated successfully',
          'Changes have been saved'
        )
      }
    } catch (err) {
      console.error('Error updating masterclass:', err)
      showError(
        'Failed to update masterclass',
        'Please refresh and try again'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteMasterclass = async (id) => {
    if (!window.confirm('Are you sure you want to delete this masterclass?')) {
      return
    }

    try {
      const response = await api.delete(`/masterclasses/${id}`)

      if (response.data.success) {
        setMasterclasses(masterclasses.filter(m => m.id !== id))
        
        showSuccess(
          'Masterclass deleted successfully',
          'The masterclass has been removed'
        )
      }
    } catch (err) {
      console.error('Error deleting masterclass:', err)
      showError(
        'Failed to delete masterclass',
        'Please refresh and try again'
      )
    }
  }

  const toggleMasterclassStatus = async (id) => {
    try {
      const response = await api.patch(`/masterclasses/${id}/toggle`)

      if (response.data.success) {
        setMasterclasses(masterclasses.map(m =>
          m.id === id ? response.data.data : m
        ))
        
        showSuccess(
          'Masterclass status updated',
          response.data.message
        )
      }
    } catch (err) {
      console.error('Error toggling masterclass status:', err)
      showError(
        'Failed to toggle masterclass status',
        'Please refresh and try again'
      )
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date()
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Masterclass Manager</h1>
            <p className="text-gray-600 mt-1">Create and manage masterclasses and seminars</p>
          </div>
          <button
            onClick={() => setIsAddingMasterclass(true)}
            className="bg-[#60a5fa] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Masterclass
          </button>
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading masterclasses...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchMasterclasses}
              className="mt-2 text-red-700 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && masterclasses.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 text-lg">No masterclasses yet.</p>
            <p className="text-gray-500 text-sm mt-2">Create your first masterclass to get started.</p>
          </div>
        )}
        
        {!loading && !error && masterclasses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterclasses.map((masterclass) => (
              <div key={masterclass.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {masterclass.image ? (
                  <img
                    src={masterclass.image}
                    alt={masterclass.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#1a2332] to-[#2a3f52] flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {masterclass.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      masterclass.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {masterclass.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      isUpcoming(masterclass.date) ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {isUpcoming(masterclass.date) ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {masterclass.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Facilitator:</span> {masterclass.facilitatorName}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Date:</span> {formatDate(masterclass.date)} at {masterclass.time}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingMasterclass({ 
                        ...masterclass, 
                        date: formatDateForInput(masterclass.date),
                        newImageFile: null 
                      })}
                      className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleMasterclassStatus(masterclass.id)}
                      className="flex-1 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                    >
                      {masterclass.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteMasterclass(masterclass.id)}
                      className="flex-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Masterclass Modal */}
        {isAddingMasterclass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Add New Masterclass</h2>
                <button
                  onClick={() => {
                    setIsAddingMasterclass(false)
                    setNewMasterclass({
                      title: '',
                      description: '',
                      category: '',
                      facilitatorName: '',
                      date: '',
                      time: '',
                      duration: '',
                      googleFormUrl: '',
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                      value={newMasterclass.category}
                      onChange={(e) => setNewMasterclass({ ...newMasterclass, category: e.target.value })}
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Facilitator Name *</label>
                    <input
                      type="text"
                      value={newMasterclass.facilitatorName}
                      onChange={(e) => setNewMasterclass({ ...newMasterclass, facilitatorName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      placeholder="Enter facilitator name"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newMasterclass.title}
                    onChange={(e) => setNewMasterclass({ ...newMasterclass, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    placeholder="Enter masterclass title"
                    disabled={submitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={newMasterclass.date}
                      onChange={(e) => setNewMasterclass({ ...newMasterclass, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                    <input
                      type="text"
                      value={newMasterclass.time}
                      onChange={(e) => setNewMasterclass({ ...newMasterclass, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      placeholder="e.g., 10:00 AM WAT"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                    <input
                      type="text"
                      value={newMasterclass.duration}
                      onChange={(e) => setNewMasterclass({ ...newMasterclass, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      placeholder="e.g., 2 hours"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Google Form URL *</label>
                  <input
                    type="url"
                    value={newMasterclass.googleFormUrl}
                    onChange={(e) => setNewMasterclass({ ...newMasterclass, googleFormUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    placeholder="https://forms.google.com/..."
                    disabled={submitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste the full Google Form URL for registration</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newMasterclass.description}
                    onChange={(e) => setNewMasterclass({ ...newMasterclass, description: e.target.value })}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
                    placeholder="Detailed description of the masterclass..."
                    disabled={submitting}
                  />
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
                        setNewMasterclass({ ...newMasterclass, imageFile: file })
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting || uploadingImage}
                  />
                  {newMasterclass.imageFile && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {newMasterclass.imageFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => {
                    setIsAddingMasterclass(false)
                    setNewMasterclass({
                      title: '',
                      description: '',
                      category: '',
                      facilitatorName: '',
                      date: '',
                      time: '',
                      duration: '',
                      googleFormUrl: '',
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
                  onClick={handleAddMasterclass}
                  disabled={submitting || uploadingImage}
                  className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading Image...' : submitting ? 'Adding...' : 'Add Masterclass'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Masterclass Modal */}
        {editingMasterclass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Edit Masterclass</h2>
                <button
                  onClick={() => setEditingMasterclass(null)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={submitting}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                      value={editingMasterclass.category}
                      onChange={(e) => setEditingMasterclass({ ...editingMasterclass, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      disabled={submitting}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Facilitator Name *</label>
                    <input
                      type="text"
                      value={editingMasterclass.facilitatorName}
                      onChange={(e) => setEditingMasterclass({ ...editingMasterclass, facilitatorName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={editingMasterclass.title}
                    onChange={(e) => setEditingMasterclass({ ...editingMasterclass, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={editingMasterclass.date}
                      onChange={(e) => setEditingMasterclass({ ...editingMasterclass, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                    <input
                      type="text"
                      value={editingMasterclass.time}
                      onChange={(e) => setEditingMasterclass({ ...editingMasterclass, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      placeholder="e.g., 10:00 AM WAT"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                    <input
                      type="text"
                      value={editingMasterclass.duration}
                      onChange={(e) => setEditingMasterclass({ ...editingMasterclass, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                      placeholder="e.g., 2 hours"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Google Form URL *</label>
                  <input
                    type="url"
                    value={editingMasterclass.googleFormUrl}
                    onChange={(e) => setEditingMasterclass({ ...editingMasterclass, googleFormUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    placeholder="https://forms.google.com/..."
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={editingMasterclass.description}
                    onChange={(e) => setEditingMasterclass({ ...editingMasterclass, description: e.target.value })}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
                  {editingMasterclass.image ? (
                    <img
                      src={editingMasterclass.image}
                      alt="Current"
                      className="w-32 h-32 object-cover rounded-lg mb-2"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm mb-2">No image uploaded</p>
                  )}
                  
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Replace Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        setEditingMasterclass({ ...editingMasterclass, newImageFile: file })
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                    disabled={submitting || uploadingImage}
                  />
                  {editingMasterclass.newImageFile && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ New image: {editingMasterclass.newImageFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={() => setEditingMasterclass(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMasterclass}
                  disabled={submitting || uploadingImage}
                  className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading Image...' : submitting ? 'Updating...' : 'Update Masterclass'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default MasterclassManager