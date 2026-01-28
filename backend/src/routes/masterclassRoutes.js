import express from 'express'
import {
  createMasterclass,
  getAllMasterclasses,
  getAllMasterclassesAdmin,
  getMasterclassById,
  updateMasterclass,
  deleteMasterclass,
  toggleMasterclassStatus,
  uploadImage
} from '../controllers/masterclassController.js'
import { upload } from '../utils/uploadHelper.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'
import { publicLimiter, adminLimiter, uploadLimiter } from '../middleware/ratelimiters.js'

const router = express.Router()

// Public routes
router.get('/', publicLimiter, getAllMasterclasses)

// Admin routes (MUST come BEFORE /:id route!)
router.get('/admin', authenticateToken, authorizeAdmin, adminLimiter, getAllMasterclassesAdmin)
router.post('/', authenticateToken, authorizeAdmin, adminLimiter, createMasterclass)
router.post('/upload-image', authenticateToken, authorizeAdmin, uploadLimiter, upload.single('image'), uploadImage)
router.put('/:id', authenticateToken, authorizeAdmin, adminLimiter, updateMasterclass)
router.delete('/:id', authenticateToken, authorizeAdmin, adminLimiter, deleteMasterclass)
router.patch('/:id/toggle', authenticateToken, authorizeAdmin, adminLimiter, toggleMasterclassStatus)

// Dynamic ID route (MUST come LAST!)
router.get('/:id', publicLimiter, getMasterclassById)

export default router