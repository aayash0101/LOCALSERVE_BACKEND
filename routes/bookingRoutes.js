import express from 'express';
import { createBooking, getMyBookings, getProviderBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/mine', protect, getMyBookings);
router.get('/provider', protect, getProviderBookings);
router.put('/:id', protect, updateBookingStatus);

export default router;