import Booking from '../models/Booking.js';
import Service from '../models/Service.js';


export const createBooking = async (req, res) => {
  const { serviceId, date, timeSlot, notes } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const booking = await Booking.create({
    customer: req.user._id,
    service: serviceId,
    provider: service.provider,
    date,
    timeSlot,
    notes,
    totalPrice: service.price,
  });

  res.status(201).json(booking);
};


export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id })
    .populate('service', 'title images price priceType')
    .populate('provider', 'name avatar')
    .sort({ createdAt: -1 });

  res.json(bookings);
};


export const getProviderBookings = async (req, res) => {
  const bookings = await Booking.find({ provider: req.user._id })
    .populate('service', 'title images price priceType')
    .populate('customer', 'name avatar phone')
    .sort({ createdAt: -1 });

  res.json(bookings);
};


export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const isProvider = booking.provider.toString() === req.user._id.toString();
  const isCustomer = booking.customer.toString() === req.user._id.toString();

  if (!isProvider && !isCustomer) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  if (isCustomer && status !== 'cancelled') {
    return res.status(403).json({ message: 'Customers can only cancel bookings' });
  }

  booking.status = status;
  await booking.save();

  res.json(booking);
};