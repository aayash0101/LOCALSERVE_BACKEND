import User from '../models/User.js';
import Booking from '../models/Booking.js';

export const getPendingProviders = async (req, res) => {
  const providers = await User.find({ role: 'provider', isApproved: false }).select('-password');
  res.json(providers);
};


export const approveProvider = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  ).select('-password');

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};


export const rejectProvider = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Provider rejected and removed' });
};


export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('customer', 'name email')
    .populate('service', 'title')
    .populate('provider', 'name email')
    .sort({ createdAt: -1 });

  res.json(bookings);
};