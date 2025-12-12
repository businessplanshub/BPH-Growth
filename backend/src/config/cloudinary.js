// cloudinary.js
import { v2 as cloudinary } from 'cloudinary'; // MANDATORY: Import v2 explicitly

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload file from path (for resources/documents)
export const uploadToCloudinary = async (filePath, folder = 'resources') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `bph-growth/${folder}`,
      resource_type: 'raw',
      type: 'upload',
      access_mode: 'public',
      invalidate: true
    })

    console.log('✅ File uploaded to Cloudinary:', result.secure_url)
    return result
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error)
    throw error
  }
}

// Upload image from buffer (for insights/blogs with multer)
export const uploadImageToCloudinary = async (fileBuffer, folder = 'insights') => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `bph-growth/${folder}`,
          resource_type: 'image',
          transformation: [
            { width: 1200, height: 630, crop: 'limit' }, // Max dimensions
            { quality: 'auto:best', fetch_format: 'auto' } // ENHANCED: Use auto:best for quality
          ]
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error)
            reject(error)
          } else {
            console.log('✅ Image uploaded to Cloudinary:', result.secure_url)
            resolve(result)
          }
        }
      )
      
      // Recommended: Use streamifier to pipe the buffer, though .end() is also fine.
      // import streamifier from 'streamifier'; streamifier.createReadStream(fileBuffer).pipe(uploadStream)
      uploadStream.end(fileBuffer)
    })
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error)
    throw error
  }
}

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'raw') => { // ENHANCED: Accept resourceType as an argument
  try {
    // Determine the type for accurate deletion (important for images vs. raw)
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    })
    console.log(`✅ File deleted from Cloudinary (${resourceType}):`, publicId)
    return result
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error)
    throw error
  }
}

// NEW: Generate download URL with attachment flag
export const generateDownloadUrl = (publicId) => { // SIMPLIFIED: Removed filename param as Cloudinary handles it
  try {
    // NOTE: Cloudinary's .url() is smart enough to handle the type unless specified.
    // However, to ensure consistency with your upload methods (which use 'raw' for docs), we keep 'raw'.
    const url = cloudinary.url(publicId, {
      resource_type: 'raw', // assuming this is mainly for raw (document) downloads
      type: 'upload',
      flags: 'attachment', // Forces browser to download instead of display
      secure: true,
      sign_url: true // IMPORTANT for secure/private content
    })
    
    console.log('✅ Generated download URL for:', publicId)
    return url
  } catch (error) {
    console.error('❌ Error generating download URL:', error)
    throw error
  }
}

export default cloudinary