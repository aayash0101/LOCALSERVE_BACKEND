import { uploadToCloudinary } from '../utils/cloudinary.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

export const uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const result = await uploadToCloudinary(req.file.buffer, 'avatars');

  await User.findByIdAndUpdate(req.user._id, { avatar: result.secure_url });

  res.json({ url: result.secure_url });
};

export const uploadServiceImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  if (service.provider.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const result = await uploadToCloudinary(req.file.buffer, 'services');

  service.images.push(result.secure_url);
  await service.save();

  res.json({ url: result.secure_url, images: service.images });
};