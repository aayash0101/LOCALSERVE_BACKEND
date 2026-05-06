import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['cleaning', 'plumbing', 'electrical', 'tutoring', 'beauty', 'moving', 'repair', 'gardening', 'other'],
  },
  price: { type: Number, required: true },
  priceType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ type: String }],
  location: {
    district: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

serviceSchema.index({ title: 'text', description: 'text', category: 'text' });

export default mongoose.model('Service', serviceSchema);