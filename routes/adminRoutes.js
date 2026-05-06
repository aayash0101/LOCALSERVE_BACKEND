import express from 'express';
import { getPendingProviders, approveProvider, rejectProvider, getAllUsers, getAllBookings } from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorizeRoles('admin'));

router.get('/providers/pending', getPendingProviders);
router.put('/providers/:id/approve', approveProvider);
router.put('/providers/:id/reject', rejectProvider);
router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);

export default router;