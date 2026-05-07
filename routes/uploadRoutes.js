import express from 'express';
import { uploadAvatar, uploadServiceImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/avatar', protect, upload.single('image'), uploadAvatar);
router.post('/service/:id', protect, upload.single('image'), uploadServiceImage);

export default router;