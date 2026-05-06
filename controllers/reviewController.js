import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

export const createReview = async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.status !== 'completed') {
    return res.status(400).json({ message: 'Can only review completed bookings' });
  }
  if (booking.customer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const review = await Review.create({
    customer: req.user._id,
    service: booking.service,
    provider: booking.provider,
    booking: bookingId,
    rating,
    comment,
  });

  const reviews = await Review.find({ service: booking.service });
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await Service.findByIdAndUpdate(booking.service, {
    rating: avgRating.toFixed(1),
    reviewCount: reviews.length,
  });

  res.status(201).json(review);
};

export const getServiceReviews = async (req, res) => {
  const reviews = await Review.find({ service: req.params.id })
    .populate('customer', 'name avatar')
    .sort({ createdAt: -1 });

  res.json(reviews);
};


export const getProviderReviews = async (req, res) => {
  const reviews = await Review.find({ provider: req.params.id })
    .populate('customer', 'name avatar')
    .populate('service', 'title')
    .sort({ createdAt: -1 });

  res.json(reviews);
};