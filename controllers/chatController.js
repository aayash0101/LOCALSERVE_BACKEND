import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { io } from '../server.js';

// @desc    Get my conversations
// @route   GET /api/conversations
export const getConversations = async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.user._id,
  })
    .populate('participants', 'name avatar role')
    .sort({ updatedAt: -1 });

  res.json(conversations);
};

// @desc    Start or get conversation
// @route   POST /api/conversations
export const startConversation = async (req, res) => {
  const { recipientId } = req.body;

  let conversation = await Conversation.findOne({
    participants: { $all: [req.user._id, recipientId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [req.user._id, recipientId],
    });
  }

  await conversation.populate('participants', 'name avatar role');
  res.json(conversation);
};

// @desc    Get messages in a conversation
// @route   GET /api/conversations/:id/messages
export const getMessages = async (req, res) => {
  const messages = await Message.find({ conversation: req.params.id })
    .populate('sender', 'name avatar')
    .sort({ createdAt: 1 });

  res.json(messages);
};

export const sendMessage = async (req, res) => {
  const { text } = req.body;

  const message = await Message.create({
    conversation: req.params.id,
    sender: req.user._id,
    text,
  });

  await Conversation.findByIdAndUpdate(req.params.id, {
    lastMessage: text,
    updatedAt: new Date(),
  });

  await message.populate('sender', 'name avatar');

  io.to(req.params.id).emit('new_message', message);

  res.status(201).json(message);
};