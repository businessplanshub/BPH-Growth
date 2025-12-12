// cloudinaryUploads.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js'; // This now imports the v2 object

// -------------------------------------------
// IMAGE UPLOADS (Preview images for frontend)
// -------------------------------------------
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'bph-growth/resources/images',
    resource_type: 'image',
    format: 'webp',
    public_id: (req, file) => {
      // Use crypto or a slugify function for more robust naming if possible
      return `${Date.now()}-${file.originalname}`;
    }
  }
});

export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, WEBP images allowed'), false);
    }
    cb(null, true);
  }
});

// -------------------------------------------
// FILE UPLOADS (Downloads: PDF, ZIP, DOCX etc.)
// -------------------------------------------
const fileStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "bph-growth/uploads",
    resource_type: "raw",
    type: "upload",
    public_id: Date.now() + "-" + file.originalname,
  })
});

export const uploadFile = multer({
  storage: fileStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
      'application/x-zip-compressed',
      // Added common text file types for completeness
      'text/plain',
      'text/csv'
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Invalid file type uploaded'), false);
    }

    cb(null, true);
  }
});