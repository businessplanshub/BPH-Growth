import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// -------------------------------------------
// IMAGE UPLOADS (Preview images for frontend)
// -------------------------------------------
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'bph-growth/resources/images',   // ✔ your folder
    resource_type: 'image',                  // ensures correct processing
    format: 'webp',                          // convert all images to webp (optional but recommended)
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname}`;
    }
  }
});

export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 50 * 1024 * 1024 },    // 50MB limit for images
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
    resource_type: "raw",   // IMPORTANT FOR PDFs, DOCX, ZIPs, etc
    type: "upload",         // Ensures PUBLIC ACCESS
    public_id: Date.now() + "-" + file.originalname,
  })
});

export const uploadFile = multer({
  storage: fileStorage,
  limits: { fileSize: 50 * 1024 * 1024 },    // 50MB max file size
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
      'application/x-zip-compressed'
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Invalid file type uploaded'), false);
    }

    cb(null, true);
  }
});

// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';

// // -------------------------------------------
// // IMAGE UPLOADS (Preview images for frontend)
// // -------------------------------------------
// const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'bph-growth/resources/images',
//     resource_type: 'image',
//     format: 'webp',
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.replace(/\.[^/.]+$/, ''); // Remove extension
//       return `${timestamp}-${originalName}`;
//     }
//   }
// });

// export const uploadImage = multer({
//   storage: imageStorage,
//   limits: { fileSize: 50 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowed.includes(file.mimetype)) {
//       return cb(new Error('Only JPG, PNG, WEBP images allowed'), false);
//     }
//     cb(null, true);
//   }
// });

// // -------------------------------------------
// // FILE UPLOADS (Downloads: PDF, ZIP, DOCX etc.)
// // -------------------------------------------
// const fileStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const timestamp = Date.now();
//     // Keep extension in the public_id for raw files
//     const originalName = file.originalname;
    
//     return {
//       folder: 'bph-growth/uploads',
//       resource_type: 'raw',
//       type: 'upload',
//       // IMPORTANT: Set access_mode to public for direct access
//       access_mode: 'public',
//       public_id: `${timestamp}-${originalName}`,
//       use_filename: false,
//       unique_filename: false
//     };
//   }
// });

// export const uploadFile = multer({
//   storage: fileStorage,
//   limits: { fileSize: 50 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowed = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'application/vnd.ms-powerpoint',
//       'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//       'application/zip',
//       'application/x-zip-compressed'
//     ];

//     if (!allowed.includes(file.mimetype)) {
//       return cb(new Error('Invalid file type uploaded'), false);
//     }

//     cb(null, true);
//   }
// });