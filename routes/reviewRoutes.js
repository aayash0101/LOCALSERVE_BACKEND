import express from 'express';
import { createReview, getServiceReviews, getProviderReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/service/:id', getServiceReviews);
router.get('/provider/:id', getProviderReviews);

export default router;