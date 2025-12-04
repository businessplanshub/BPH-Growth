import { prisma } from '../config/database.js'
import { uploadImageToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js'
import { sendCustomerEmail } from '../config/email.js'
import { resourceDownloadTemplate } from '../utils/emailTemplates.js'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Upload placeholder image (still use Cloudinary for images)
export const uploadResourceImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      })
    }
    const imageUrl = req.file.path;   // Cloudinary URL
    const publicId = req.file.filename;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl,
        publicId,
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

// Create resource - Store files locally
export const createResource = async (req, res) => {
  try {
    const { category, title, description, imageUrl } = req.body

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required'
      })
    }

    // File info already contains Cloudinary upload result
    const fileUrl = req.file.path;        // secure URL from CloudinaryStorage
    const filePublicId = req.file.filename; // public_id from CloudinaryStorage
    const fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;
    
    // Determine file type
    const fileExtension = path.extname(req.file.originalname)
    const formatMap = {
      '.pdf': 'PDF',
      '.xlsx': 'XLSX',
      '.xls': 'XLS',
      '.pptx': 'PPTX',
      '.ppt': 'PPT',
      '.docx': 'DOCX',
      '.doc': 'DOC',
      '.zip': 'ZIP'
    };
    const fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'

    // Create resource in database
    const resource = await prisma.resource.create({
      data: {
        category,
        title,
        description,
        imageUrl: imageUrl || null,
        fileUrl,
        filePublicId,
        fileSize,
        fileType,
        isActive: true
      }
    })

    console.log('✅ Resource created:', resource.id, 'Type:', fileType)

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    })
  } catch (error) {
    console.error('Error creating resource:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create resource',
      error: error.message
    })
  }
}

// Update resource
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params
    const { category, title, description, isActive, imageUrl } = req.body

    const existingResource = await prisma.resource.findUnique({
      where: { id }
    })

    if (!existingResource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }

    let fileUrl = existingResource.fileUrl;
    let filePublicId = existingResource.filePublicId;
    let fileSize = existingResource.fileSize;
    let fileType = existingResource.fileType;

    if (req.file) {
      // Delete old file from Cloudinary
      if (existingResource.filePublicId) {
        try {
          await deleteFromCloudinary(existingResource.filePublicId)
        } catch (err) {
          console.error('Error deleting old file from Cloudinary:', err)
        }
      }

      // Upload new file to Cloudinary
      fileUrl = req.file.path;
      filePublicId = req.file.filename;
      fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;

      // Save new file
      const fileExtension = path.extname(req.file.originalname)
      const formatMap = {
        '.pdf': 'PDF',
        '.xlsx': 'XLSX',
        '.xls': 'XLS',
        '.pptx': 'PPTX',
        '.ppt': 'PPT',
        '.docx': 'DOCX',
        '.doc': 'DOC',
        '.zip': 'ZIP'
      }
      fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'
    }

    const resource = await prisma.resource.update({
      where: { id },
      data: {
        category,
        title,
        description,
        imageUrl: imageUrl !== undefined ? imageUrl : existingResource.imageUrl,
        fileUrl,
        filePublicId,
        fileSize,
        fileType,
        isActive
      }
    })

    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      data: resource
    })
  } catch (error) {
    console.error('Error updating resource:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update resource',
      error: error.message
    })
  }
}

// Delete resource
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params

    const resource = await prisma.resource.findUnique({
      where: { id }
    })

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }

    // Delete file from cloudinary
    if (resource.filePublicId) {
      try {
        await deleteFromCloudinary(resource.filePublicId)
        console.log('🗑️ File deleted from Cloudinary:', resource.filePublicId)
      } catch (err) {
        console.error('Error deleting file from Cloudinary:', err)
      }
    }

    // Delete from database
    await prisma.resource.delete({
      where: { id }
    })

    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting resource:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete resource',
      error: error.message
    })
  }
}

// Track download
export const trackDownload = async (req, res) => {
  try {
    const { email, resourceId } = req.body

    const resource = await prisma.resource.findUnique({
      where: { id: resourceId }
    })

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }

    // Track download
    await prisma.resourceDownload.create({
      data: {
        email,
        resourceId,
        resourceTitle: resource.title
      }
    })

    console.log(`📥 Download tracked: ${resource.title} by ${email}`)

    // Send email with download link
    try {
      await sendCustomerEmail({
        to: email,
        subject: `Your Resource: ${resource.title} - BPH Growth`,
        html: resourceDownloadTemplate({
          email,
          resourceTitle: resource.title,
          downloadUrl: resource.fileUrl,
        }),
      });
      console.log('✅ Download email sent to:', email)
    } catch (emailError) {
      console.error('⚠️ Email sending failed:', emailError.message)
    }

    // Return the Cloudinary URL directly for frontend download
    // Don't proxy through backend - let browser download directly from Cloudinary
    res.status(200).json({
      success: true,
      message: 'Download ready',
      data: {
        downloadUrl: resource.fileUrl // Cloudinary URL
      }
    })

  } catch (error) {
    console.error('Error tracking download:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process download',
      error: error.message
    })
  }
}

// Get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({
      success: true,
      data: resources
    })
  } catch (error) {
    console.error('Error fetching resources:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources',
      error: error.message
    })
  }
}

// Get all resources (Admin)
export const getAllResourcesAdmin = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'desc' }
    })

    const resourcesWithStats = await Promise.all(
      resources.map(async (resource) => {
        const downloadCount = await prisma.resourceDownload.count({
          where: { resourceId: resource.id }
        })
        return { ...resource, downloadCount }
      })
    )

    res.status(200).json({
      success: true,
      data: resourcesWithStats
    })
  } catch (error) {
    console.error('Error fetching resources:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources',
      error: error.message
    })
  }
}

// Toggle resource status
export const toggleResourceStatus = async (req, res) => {
  try {
    const { id } = req.params

    const resource = await prisma.resource.findUnique({
      where: { id }
    })

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }

    const updatedResource = await prisma.resource.update({
      where: { id },
      data: { isActive: !resource.isActive }
    })

    res.status(200).json({
      success: true,
      message: `Resource ${updatedResource.isActive ? 'activated' : 'deactivated'}`,
      data: updatedResource
    })
  } catch (error) {
    console.error('Error toggling resource status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle resource status',
      error: error.message
    })
  }
}


// import { prisma } from '../config/database.js'
// import { uploadImageToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js'
// import { sendCustomerEmail } from '../config/email.js'
// import { resourceDownloadTemplate } from '../utils/emailTemplates.js'
// import path from 'path'
// import fs from 'fs/promises'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // Upload placeholder image (still use Cloudinary for images)
// export const uploadResourceImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Image file is required'
//       })
//     }
//     const imageUrl = req.file.path;
//     const publicId = req.file.filename;

//     res.status(200).json({
//       success: true,
//       message: 'Image uploaded successfully',
//       data: {
//         imageUrl,
//         publicId,
//       }
//     })
//   } catch (error) {
//     console.error('Error uploading image:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to upload image',
//       error: error.message
//     })
//   }
// }

// // Create resource
// export const createResource = async (req, res) => {
//   try {
//     const { category, title, description, imageUrl } = req.body

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'File is required'
//       })
//     }

//     const fileUrl = req.file.path;
//     const filePublicId = req.file.filename;
    
//     let fileSize = '0 MB';
//     if (req.file.size) {
//       fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;
//     } else if (req.file.bytes) {
//       fileSize = `${(req.file.bytes / 1024 / 1024).toFixed(1)} MB`;
//     }
    
//     const fileExtension = path.extname(req.file.originalname)
//     const formatMap = {
//       '.pdf': 'PDF',
//       '.xlsx': 'XLSX',
//       '.xls': 'XLS',
//       '.pptx': 'PPTX',
//       '.ppt': 'PPT',
//       '.docx': 'DOCX',
//       '.doc': 'DOC',
//       '.zip': 'ZIP'
//     };
//     const fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'

//     console.log('📁 File uploaded:', {
//       fileUrl,
//       filePublicId,
//       fileSize,
//       fileType,
//       originalName: req.file.originalname
//     });

//     const resource = await prisma.resource.create({
//       data: {
//         category,
//         title,
//         description,
//         imageUrl: imageUrl || null,
//         fileUrl,
//         filePublicId,
//         fileSize,
//         fileType,
//         isActive: true
//       }
//     })

//     console.log('✅ Resource created:', resource.id, 'Type:', fileType)

//     res.status(201).json({
//       success: true,
//       message: 'Resource created successfully',
//       data: resource
//     })
//   } catch (error) {
//     console.error('Error creating resource:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create resource',
//       error: error.message
//     })
//   }
// }

// // Update resource
// export const updateResource = async (req, res) => {
//   try {
//     const { id } = req.params
//     const { category, title, description, isActive, imageUrl } = req.body

//     const existingResource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!existingResource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     let fileUrl = existingResource.fileUrl;
//     let filePublicId = existingResource.filePublicId;
//     let fileSize = existingResource.fileSize;
//     let fileType = existingResource.fileType;

//     if (req.file) {
//       if (existingResource.filePublicId) {
//         try {
//           await deleteFromCloudinary(existingResource.filePublicId)
//         } catch (err) {
//           console.error('Error deleting old file from Cloudinary:', err)
//         }
//       }

//       fileUrl = req.file.path;
//       filePublicId = req.file.filename;
      
//       if (req.file.size) {
//         fileSize = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;
//       } else if (req.file.bytes) {
//         fileSize = `${(req.file.bytes / 1024 / 1024).toFixed(1)} MB`;
//       }

//       const fileExtension = path.extname(req.file.originalname)
//       const formatMap = {
//         '.pdf': 'PDF',
//         '.xlsx': 'XLSX',
//         '.xls': 'XLS',
//         '.pptx': 'PPTX',
//         '.ppt': 'PPT',
//         '.docx': 'DOCX',
//         '.doc': 'DOC',
//         '.zip': 'ZIP'
//       }
//       fileType = formatMap[fileExtension.toLowerCase()] || 'FILE'
//     }

//     const resource = await prisma.resource.update({
//       where: { id },
//       data: {
//         category,
//         title,
//         description,
//         imageUrl: imageUrl !== undefined ? imageUrl : existingResource.imageUrl,
//         fileUrl,
//         filePublicId,
//         fileSize,
//         fileType,
//         isActive
//       }
//     })

//     res.status(200).json({
//       success: true,
//       message: 'Resource updated successfully',
//       data: resource
//     })
//   } catch (error) {
//     console.error('Error updating resource:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update resource',
//       error: error.message
//     })
//   }
// }

// // Delete resource
// export const deleteResource = async (req, res) => {
//   try {
//     const { id } = req.params

//     const resource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     if (resource.filePublicId) {
//       try {
//         await deleteFromCloudinary(resource.filePublicId)
//         console.log('🗑️ File deleted from Cloudinary:', resource.filePublicId)
//       } catch (err) {
//         console.error('Error deleting file from Cloudinary:', err)
//       }
//     }

//     await prisma.resource.delete({
//       where: { id }
//     })

//     res.status(200).json({
//       success: true,
//       message: 'Resource deleted successfully'
//     })
//   } catch (error) {
//     console.error('Error deleting resource:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete resource',
//       error: error.message
//     })
//   }
// }

// // Track download - returns resource ID for the proxy download endpoint
// export const trackDownload = async (req, res) => {
//   try {
//     const { email, resourceId } = req.body

//     if (!email || !resourceId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and resourceId are required'
//       })
//     }

//     const resource = await prisma.resource.findUnique({
//       where: { id: resourceId }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     // Track download
//     await prisma.resourceDownload.create({
//       data: {
//         email,
//         resourceId,
//         resourceTitle: resource.title
//       }
//     })

//     console.log(`📥 Download tracked: ${resource.title} by ${email}`)

//     if (!resource.fileUrl) {
//       return res.status(500).json({
//         success: false,
//         message: 'This resource does not have a valid file.'
//       });
//     }

//     // Generate the proxy download URL (your backend will fetch from Cloudinary)
//     const baseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`
//     const proxyDownloadUrl = `${baseUrl}/api/resources/file/${resourceId}`
    
//     console.log('📎 Proxy download URL:', proxyDownloadUrl);

//     // Send email with the proxy download link
//     try {
//       await sendCustomerEmail({
//         to: email,
//         subject: `Your Resource: ${resource.title} - BPH Growth`,
//         html: resourceDownloadTemplate({
//           email,
//           resourceTitle: resource.title,
//           downloadUrl: proxyDownloadUrl,
//         }),
//       });
//       console.log('✅ Download email sent to:', email)
//     } catch (emailError) {
//       console.error('⚠️ Email sending failed:', emailError.message)
//     }

//     // Return the proxy URL for immediate download
//     res.status(200).json({
//       success: true,
//       message: 'Download ready',
//       data: {
//         downloadUrl: proxyDownloadUrl,
//         filename: `${resource.title}.${resource.fileType.toLowerCase()}`
//       }
//     })

//   } catch (error) {
//     console.error('Error tracking download:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process download',
//       error: error.message
//     })
//   }
// }

// // NEW: Proxy download endpoint - fetches file from Cloudinary and streams to user
// export const proxyDownload = async (req, res) => {
//   try {
//     const { id } = req.params

//     const resource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     if (!resource.fileUrl) {
//       return res.status(404).json({
//         success: false,
//         message: 'File not available'
//       })
//     }

//     console.log('📥 Proxying download for:', resource.title)
//     console.log('📎 Fetching from Cloudinary:', resource.fileUrl)

//     // Fetch the file from Cloudinary using your server (bypasses browser auth issues)
//     const cloudinaryResponse = await fetch(resource.fileUrl)

//     if (!cloudinaryResponse.ok) {
//       console.error('❌ Cloudinary fetch failed:', cloudinaryResponse.status, cloudinaryResponse.statusText)
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to fetch file from storage'
//       })
//     }

//     // Get content type from Cloudinary response or determine from file type
//     const contentTypeMap = {
//       'PDF': 'application/pdf',
//       'DOCX': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'DOC': 'application/msword',
//       'XLSX': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'XLS': 'application/vnd.ms-excel',
//       'PPTX': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//       'PPT': 'application/vnd.ms-powerpoint',
//       'ZIP': 'application/zip'
//     }
    
//     const contentType = contentTypeMap[resource.fileType] || 'application/octet-stream'
//     const filename = `${resource.title}.${resource.fileType.toLowerCase()}`
    
//     // Set headers for file download
//     res.setHeader('Content-Type', contentType)
//     res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`)
    
//     // Get content length if available
//     const contentLength = cloudinaryResponse.headers.get('content-length')
//     if (contentLength) {
//       res.setHeader('Content-Length', contentLength)
//     }

//     // Stream the file to the response
//     const arrayBuffer = await cloudinaryResponse.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)
    
//     console.log('✅ Streaming file to client:', filename, `(${buffer.length} bytes)`)
    
//     res.send(buffer)

//   } catch (error) {
//     console.error('Error in proxy download:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to download file',
//       error: error.message
//     })
//   }
// }

// // Get all resources (Public)
// export const getAllResources = async (req, res) => {
//   try {
//     const resources = await prisma.resource.findMany({
//       where: { isActive: true },
//       orderBy: { createdAt: 'desc' }
//     })

//     res.status(200).json({
//       success: true,
//       data: resources
//     })
//   } catch (error) {
//     console.error('Error fetching resources:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch resources',
//       error: error.message
//     })
//   }
// }

// // Get all resources (Admin)
// export const getAllResourcesAdmin = async (req, res) => {
//   try {
//     const resources = await prisma.resource.findMany({
//       orderBy: { createdAt: 'desc' }
//     })

//     const resourcesWithStats = await Promise.all(
//       resources.map(async (resource) => {
//         const downloadCount = await prisma.resourceDownload.count({
//           where: { resourceId: resource.id }
//         })
//         return { ...resource, downloadCount }
//       })
//     )

//     res.status(200).json({
//       success: true,
//       data: resourcesWithStats
//     })
//   } catch (error) {
//     console.error('Error fetching resources:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch resources',
//       error: error.message
//     })
//   }
// }

// // Toggle resource status
// export const toggleResourceStatus = async (req, res) => {
//   try {
//     const { id } = req.params

//     const resource = await prisma.resource.findUnique({
//       where: { id }
//     })

//     if (!resource) {
//       return res.status(404).json({
//         success: false,
//         message: 'Resource not found'
//       })
//     }

//     const updatedResource = await prisma.resource.update({
//       where: { id },
//       data: { isActive: !resource.isActive }
//     })

//     res.status(200).json({
//       success: true,
//       message: `Resource ${updatedResource.isActive ? 'activated' : 'deactivated'}`,
//       data: updatedResource
//     })
//   } catch (error) {
//     console.error('Error toggling resource status:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to toggle resource status',
//       error: error.message
//     })
//   }
// }