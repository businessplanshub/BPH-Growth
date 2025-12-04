import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  getAllResources,
  getAllResourcesAdmin,
  createResource,
  updateResource,
  deleteResource,
  toggleResourceStatus,
  trackDownload,
  uploadResourceImage
} from '../controllers/resourceController.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
import { publicLimiter, adminLimiter, uploadLimiter } from '../middleware/ratelimiters.js'
import { uploadFile, uploadImage } from '../middleware/cloudinaryUpload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()

// Public routes
router.get('/', publicLimiter, getAllResources)
router.post('/download', publicLimiter, trackDownload)

// Admin routes
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllResourcesAdmin)
router.post('/upload-image', authenticateToken, authorizeAdmin, uploadLimiter, uploadImage.single('image'), uploadResourceImage)
router.post('/', authenticateToken, authorizeAdmin, uploadLimiter, adminLimiter, uploadFile.single('file'), createResource)
router.put('/:id', authenticateToken, authorizeAdmin,  adminLimiter, uploadFile.single('file'), updateResource)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, deleteResource)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, toggleResourceStatus)

export default router

// import express from 'express'
// import multer from 'multer'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import {
//   getAllResources,
//   getAllResourcesAdmin,
//   createResource,
//   updateResource,
//   deleteResource,
//   toggleResourceStatus,
//   trackDownload,
//   uploadResourceImage,
//   proxyDownload  // NEW: Import the proxy download function
// } from '../controllers/resourceController.js'
// import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
// import { publicLimiter, adminLimiter, uploadLimiter } from '../middleware/ratelimiters.js'
// import { uploadFile, uploadImage } from '../middleware/cloudinaryUpload.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router()

// // Public routes
// router.get('/', publicLimiter, getAllResources)
// router.post('/download', publicLimiter, trackDownload)

// // NEW: Public proxy download route - this fetches from Cloudinary and streams to user
// // This bypasses Cloudinary's authentication issues by having your server fetch the file
// router.get('/file/:id', publicLimiter, proxyDownload)

// // Admin routes
// router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllResourcesAdmin)
// router.post('/upload-image', authenticateToken, authorizeAdmin, uploadLimiter, uploadImage.single('image'), uploadResourceImage)
// router.post('/', authenticateToken, authorizeAdmin, uploadLimiter, adminLimiter, uploadFile.single('file'), createResource)
// router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, uploadFile.single('file'), updateResource)
// router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, deleteResource)
// router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, toggleResourceStatus)

// export default router