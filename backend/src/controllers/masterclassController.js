import { prisma } from '../config/database.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js'

// Create new masterclass
export const createMasterclass = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      facilitatorName, 
      date, 
      time, 
      duration, 
      googleFormUrl,
      imageUrl, 
      imagePublicId 
    } = req.body

    // Validate required fields
    if (!title || !description || !category || !facilitatorName || !date || !time || !duration || !googleFormUrl) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      })
    }

    // Create masterclass in database
    const masterclass = await prisma.masterclass.create({
      data: {
        title,
        description,
        category,
        facilitatorName,
        date: new Date(date),
        time,
        duration,
        googleFormUrl,
        image: imageUrl || '',
        imagePublicId: imagePublicId || '',
        isActive: true
      }
    })

    res.status(201).json({
      success: true,
      message: 'Masterclass created successfully',
      data: masterclass
    })
  } catch (error) {
    console.error('Error creating masterclass:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create masterclass',
      error: error.message
    })
  }
}

// Get all masterclasses (public - only active)
export const getAllMasterclasses = async (req, res) => {
  try {
    const masterclasses = await prisma.masterclass.findMany({
      where: { isActive: true },
      orderBy: { date: 'asc' } // Show upcoming classes first
    })

    res.status(200).json({
      success: true,
      data: masterclasses
    })
  } catch (error) {
    console.error('Error fetching masterclasses:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch masterclasses',
      error: error.message
    })
  }
}

// Get all masterclasses for admin (including inactive)
export const getAllMasterclassesAdmin = async (req, res) => {
  try {
    const masterclasses = await prisma.masterclass.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({
      success: true,
      data: masterclasses
    })
  } catch (error) {
    console.error('Error fetching masterclasses:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch masterclasses',
      error: error.message
    })
  }
}

// Get single masterclass by ID
export const getMasterclassById = async (req, res) => {
  try {
    const { id } = req.params

    const masterclass = await prisma.masterclass.findUnique({
      where: { id }
    })

    if (!masterclass) {
      return res.status(404).json({
        success: false,
        message: 'Masterclass not found'
      })
    }

    res.status(200).json({
      success: true,
      data: masterclass
    })
  } catch (error) {
    console.error('Error fetching masterclass:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch masterclass',
      error: error.message
    })
  }
}

// Upload image to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      })
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file, 'masterclasses')

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id
      }
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    })
  }
}

// Update masterclass
export const updateMasterclass = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      title, 
      description, 
      category, 
      facilitatorName, 
      date, 
      time, 
      duration, 
      googleFormUrl,
      imageUrl, 
      imagePublicId, 
      isActive 
    } = req.body

    // Check if masterclass exists
    const existingMasterclass = await prisma.masterclass.findUnique({
      where: { id }
    })

    if (!existingMasterclass) {
      return res.status(404).json({
        success: false,
        message: 'Masterclass not found'
      })
    }

    // Update masterclass
    const masterclass = await prisma.masterclass.update({
      where: { id },
      data: {
        title,
        description,
        category,
        facilitatorName,
        date: new Date(date),
        time,
        duration,
        googleFormUrl,
        image: imageUrl || existingMasterclass.image,
        imagePublicId: imagePublicId || existingMasterclass.imagePublicId,
        isActive
      }
    })

    res.status(200).json({
      success: true,
      message: 'Masterclass updated successfully',
      data: masterclass
    })
  } catch (error) {
    console.error('Error updating masterclass:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update masterclass',
      error: error.message
    })
  }
}

// Delete masterclass
export const deleteMasterclass = async (req, res) => {
  try {
    const { id } = req.params

    // Get masterclass
    const masterclass = await prisma.masterclass.findUnique({
      where: { id }
    })

    if (!masterclass) {
      return res.status(404).json({
        success: false,
        message: 'Masterclass not found'
      })
    }

    // Delete image from Cloudinary if exists
    if (masterclass.imagePublicId) {
      try {
        await deleteFromCloudinary(masterclass.imagePublicId)
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err)
      }
    }

    // Delete masterclass from database
    await prisma.masterclass.delete({
      where: { id }
    })

    res.status(200).json({
      success: true,
      message: 'Masterclass deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting masterclass:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete masterclass',
      error: error.message
    })
  }
}

// Toggle masterclass active status
export const toggleMasterclassStatus = async (req, res) => {
  try {
    const { id } = req.params

    const masterclass = await prisma.masterclass.findUnique({
      where: { id }
    })

    if (!masterclass) {
      return res.status(404).json({
        success: false,
        message: 'Masterclass not found'
      })
    }

    const updatedMasterclass = await prisma.masterclass.update({
      where: { id },
      data: { isActive: !masterclass.isActive }
    })

    res.status(200).json({
      success: true,
      message: `Masterclass ${updatedMasterclass.isActive ? 'activated' : 'deactivated'}`,
      data: updatedMasterclass
    })
  } catch (error) {
    console.error('Error toggling masterclass status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle masterclass status',
      error: error.message
    })
  }
}