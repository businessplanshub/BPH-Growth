import { v2 as cloudinary } from 'cloudinary'

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
      resource_type: 'raw',  // CHANGED: Force raw for all non-images
      type: 'upload',
      access_mode: 'public',
      invalidate: true  // Clear cache
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
            { quality: 'auto', fetch_format: 'auto' } // Auto optimize
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
      
      uploadStream.end(fileBuffer)
    })
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error)
    throw error
  }
}

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw'
    })
    console.log('✅ File deleted from Cloudinary:', publicId)
    return result
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error)
    throw error
  }
}

// NEW: Generate download URL with attachment flag
export const generateDownloadUrl = (publicId, filename) => {
  try {
    // Determine resource type based on public_id folder
    let resourceType = 'raw'
    
    // If it's in resources folder, use raw type
    if (publicId.includes('resources')) {
      resourceType = 'raw'
    }
    
    // Generate a signed URL with download flag
    const url = cloudinary.url(publicId, {
      resource_type: resourceType,
      type: 'upload',
      flags: 'attachment',
      secure: true,
      sign_url: true
    })
    
    console.log('✅ Generated download URL for:', publicId)
    return url
  } catch (error) {
    console.error('❌ Error generating download URL:', error)
    throw error
  }
}

export default cloudinary

// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// // Upload file from path (for resources/documents)
// export const uploadToCloudinary = async (filePath, folder = 'resources') => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: `bph-growth/${folder}`,
//       resource_type: 'raw',
//       type: 'upload',
//       access_mode: 'public',
//       invalidate: true
//     })

//     console.log('✅ File uploaded to Cloudinary:', result.secure_url)
//     return result
//   } catch (error) {
//     console.error('❌ Cloudinary upload error:', error)
//     throw error
//   }
// }

// // Upload image from buffer (for insights/blogs with multer)
// export const uploadImageToCloudinary = async (fileBuffer, folder = 'insights') => {
//   try {
//     return new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: `bph-growth/${folder}`,
//           resource_type: 'image',
//           transformation: [
//             { width: 1200, height: 630, crop: 'limit' },
//             { quality: 'auto', fetch_format: 'auto' }
//           ]
//         },
//         (error, result) => {
//           if (error) {
//             console.error('❌ Cloudinary upload error:', error)
//             reject(error)
//           } else {
//             console.log('✅ Image uploaded to Cloudinary:', result.secure_url)
//             resolve(result)
//           }
//         }
//       )
      
//       uploadStream.end(fileBuffer)
//     })
//   } catch (error) {
//     console.error('❌ Cloudinary upload error:', error)
//     throw error
//   }
// }

// // Delete file from Cloudinary
// export const deleteFromCloudinary = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: 'raw',
//       invalidate: true
//     })
//     console.log('✅ File deleted from Cloudinary:', publicId)
//     return result
//   } catch (error) {
//     console.error('❌ Cloudinary delete error:', error)
//     throw error
//   }
// }

// /**
//  * Generate a signed download URL with attachment flag
//  * This creates a time-limited signed URL that forces download
//  * 
//  * @param {string} publicId - The public ID of the file in Cloudinary
//  * @param {string} filename - The desired filename for download
//  * @returns {string} - Signed URL for downloading
//  */
// export const generateDownloadUrl = (publicId, filename) => {
//   try {
//     // Clean the publicId - ensure it doesn't have double extensions
//     let cleanPublicId = publicId;
    
//     console.log('🔧 Generating download URL for publicId:', cleanPublicId);
    
//     // Generate a SIGNED URL with attachment flag that expires in 1 hour
//     const url = cloudinary.url(cleanPublicId, {
//       resource_type: 'raw',
//       type: 'upload',
//       flags: 'attachment',
//       secure: true,
//       sign_url: true,
//       // Add expiration - 1 hour from now
//       expires_at: Math.floor(Date.now() / 1000) + 3600
//     });
    
//     console.log('✅ Generated signed download URL:', url);
//     return url;
//   } catch (error) {
//     console.error('❌ Error generating download URL:', error);
//     throw error;
//   }
// }

// /**
//  * Get a direct public URL for a raw file
//  * Use this when the file was uploaded with public access
//  * 
//  * @param {string} publicId - The public ID of the file
//  * @returns {string} - Direct public URL
//  */
// export const getPublicUrl = (publicId) => {
//   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
//   return `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}`;
// }

// export default cloudinary