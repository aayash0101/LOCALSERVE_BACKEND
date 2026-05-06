import express from 'express';
import { getConversations, startConversation, getMessages, sendMessage } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getConversations);
router.post('/', protect, startConversation);
router.get('/:id/messages', protect, getMessages);
router.post('/:id/messages', protect, sendMessage);

export default router;