import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Service from './models/Service.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB...');

  // Clear existing data (except admin)
  await User.deleteMany({ role: { $ne: 'admin' } });
  await Service.deleteMany();
  await Booking.deleteMany();
  await Review.deleteMany();
  console.log('Cleared old data...');

  // Create Providers
  const providers = await User.create([
    {
      name: 'Ramesh Shrestha',
      email: 'ramesh@localserve.com',
      password: 'password123',
      role: 'provider',
      isApproved: true,
      phone: '9841000001',
      bio: 'Professional plumber with 8 years of experience in Kathmandu valley.',
      location: { district: 'Kathmandu', city: 'Thamel' },
    },
    {
      name: 'Sita Maharjan',
      email: 'sita@localserve.com',
      password: 'password123',
      role: 'provider',
      isApproved: true,
      phone: '9841000002',
      bio: 'Expert home cleaner with eco-friendly products. Serving Lalitpur for 5 years.',
      location: { district: 'Lalitpur', city: 'Patan' },
    },
    {
      name: 'Bikash Tamang',
      email: 'bikash@localserve.com',
      password: 'password123',
      role: 'provider',
      isApproved: true,
      phone: '9841000003',
      bio: 'Certified electrician. Licensed and insured. Available 7 days a week.',
      location: { district: 'Bhaktapur', city: 'Bhaktapur' },
    },
    {
      name: 'Priya Thapa',
      email: 'priya@localserve.com',
      password: 'password123',
      role: 'provider',
      isApproved: true,
      phone: '9841000004',
      bio: 'Mathematics and Science tutor. 6 years experience. SEE and +2 specialist.',
      location: { district: 'Kathmandu', city: 'Baneshwor' },
    },
    {
      name: 'Anil Gurung',
      email: 'anil@localserve.com',
      password: 'password123',
      role: 'provider',
      isApproved: true,
      phone: '9841000005',
      bio: 'Professional moving service. Careful handling guaranteed. Serving all districts.',
      location: { district: 'Kathmandu', city: 'Kalimati' },
    },
    {
      name: 'Sunita Rai',
      email: 'sunita@localserve.com',
      password: 'password123',
      role: 'provider',
      isApproved: true,
      phone: '9841000006',
      bio: 'Beauty and wellness expert. Bridal makeup, hair styling, and skincare.',
      location: { district: 'Lalitpur', city: 'Jawalakhel' },
    },
  ]);

  console.log(`Created ${providers.length} providers...`);

  // Create Customers
  const customers = await User.create([
    {
      name: 'Aarav Sharma',
      email: 'aarav@localserve.com',
      password: 'password123',
      role: 'customer',
      phone: '9851000001',
      location: { district: 'Kathmandu', city: 'Lazimpat' },
    },
    {
      name: 'Nisha Karki',
      email: 'nisha@localserve.com',
      password: 'password123',
      role: 'customer',
      phone: '9851000002',
      location: { district: 'Lalitpur', city: 'Kupondole' },
    },
    {
      name: 'Suraj Basnet',
      email: 'suraj@localserve.com',
      password: 'password123',
      role: 'customer',
      phone: '9851000003',
      location: { district: 'Kathmandu', city: 'Chabahil' },
    },
  ]);

  console.log(`Created ${customers.length} customers...`);

  // Create Services
  const services = await Service.create([
    {
      title: 'Full Home Deep Cleaning',
      description: 'Complete deep cleaning of your home including kitchen, bathrooms, bedrooms and living areas. We use eco-friendly products safe for kids and pets.',
      category: 'cleaning',
      price: 2500,
      priceType: 'fixed',
      provider: providers[1]._id,
      location: { district: 'Lalitpur', city: 'Patan' },
      isActive: true,
      rating: 4.8,
      reviewCount: 2,
    },
    {
      title: 'Bathroom & Kitchen Cleaning',
      description: 'Specialized cleaning for bathrooms and kitchens. Removes tough stains, mold, and limescale. Leaves your space sparkling clean.',
      category: 'cleaning',
      price: 1200,
      priceType: 'fixed',
      provider: providers[1]._id,
      location: { district: 'Lalitpur', city: 'Patan' },
      isActive: true,
      rating: 4.5,
      reviewCount: 1,
    },
    {
      title: 'Pipe Leak Repair & Fixing',
      description: 'Fast and reliable pipe leak detection and repair. Serving Kathmandu valley. Same day service available for urgent cases.',
      category: 'plumbing',
      price: 800,
      priceType: 'hourly',
      provider: providers[0]._id,
      location: { district: 'Kathmandu', city: 'Thamel' },
      isActive: true,
      rating: 4.7,
      reviewCount: 2,
    },
    {
      title: 'Bathroom Fitting & Installation',
      description: 'Complete bathroom fitting including toilet, sink, shower installation. Quality materials and workmanship guaranteed.',
      category: 'plumbing',
      price: 5000,
      priceType: 'fixed',
      provider: providers[0]._id,
      location: { district: 'Kathmandu', city: 'Thamel' },
      isActive: true,
      rating: 4.6,
      reviewCount: 1,
    },
    {
      title: 'Home Electrical Wiring & Repair',
      description: 'Licensed electrician for all your electrical needs. Wiring, socket installation, switchboard repair, and electrical safety checks.',
      category: 'electrical',
      price: 1000,
      priceType: 'hourly',
      provider: providers[2]._id,
      location: { district: 'Bhaktapur', city: 'Bhaktapur' },
      isActive: true,
      rating: 4.9,
      reviewCount: 2,
    },
    {
      title: 'Solar Panel Installation',
      description: 'Professional solar panel installation and maintenance. Reduce your electricity bill and go green. Free consultation included.',
      category: 'electrical',
      price: 15000,
      priceType: 'fixed',
      provider: providers[2]._id,
      location: { district: 'Bhaktapur', city: 'Bhaktapur' },
      isActive: true,
      rating: 4.8,
      reviewCount: 1,
    },
    {
      title: 'SEE & +2 Math & Science Tuition',
      description: 'Expert tutoring for SEE and +2 students. Mathematics, Physics, Chemistry and Biology. Online and home visit options available.',
      category: 'tutoring',
      price: 1500,
      priceType: 'hourly',
      provider: providers[3]._id,
      location: { district: 'Kathmandu', city: 'Baneshwor' },
      isActive: true,
      rating: 4.9,
      reviewCount: 2,
    },
    {
      title: 'English Speaking & Writing Class',
      description: 'Improve your English communication skills. Business English, IELTS preparation, and conversational English for all levels.',
      category: 'tutoring',
      price: 1200,
      priceType: 'hourly',
      provider: providers[3]._id,
      location: { district: 'Kathmandu', city: 'Baneshwor' },
      isActive: true,
      rating: 4.7,
      reviewCount: 1,
    },
    {
      title: 'Home & Office Moving Service',
      description: 'Safe and reliable moving service for homes and offices. Packing, loading, transport and unloading included. All Kathmandu valley.',
      category: 'moving',
      price: 8000,
      priceType: 'fixed',
      provider: providers[4]._id,
      location: { district: 'Kathmandu', city: 'Kalimati' },
      isActive: true,
      rating: 4.6,
      reviewCount: 1,
    },
    {
      title: 'Bridal Makeup & Hair Styling',
      description: 'Complete bridal package including makeup, hair styling and draping. Trial session included. Bookings open for 2024 weddings.',
      category: 'beauty',
      price: 12000,
      priceType: 'fixed',
      provider: providers[5]._id,
      location: { district: 'Lalitpur', city: 'Jawalakhel' },
      isActive: true,
      rating: 5.0,
      reviewCount: 2,
    },
    {
      title: 'Party & Event Makeup',
      description: 'Glamorous makeup for parties, events and photoshoots. Natural and HD makeup options. Home visits available in Lalitpur.',
      category: 'beauty',
      price: 3500,
      priceType: 'fixed',
      provider: providers[5]._id,
      location: { district: 'Lalitpur', city: 'Jawalakhel' },
      isActive: true,
      rating: 4.8,
      reviewCount: 1,
    },
    {
      title: 'AC & Refrigerator Repair',
      description: 'Fast repair and servicing of all brands of AC and refrigerators. Gas refilling, compressor repair, and general servicing.',
      category: 'repair',
      price: 1500,
      priceType: 'fixed',
      provider: providers[2]._id,
      location: { district: 'Bhaktapur', city: 'Bhaktapur' },
      isActive: true,
      rating: 4.7,
      reviewCount: 1,
    },
  ]);

  console.log(`Created ${services.length} services...`);

  // Create Bookings
  const bookings = await Booking.create([
    {
      customer: customers[0]._id,
      service: services[0]._id,
      provider: providers[1]._id,
      date: new Date('2024-12-10'),
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'completed',
      totalPrice: 2500,
      notes: 'Please bring eco-friendly products',
    },
    {
      customer: customers[1]._id,
      service: services[0]._id,
      provider: providers[1]._id,
      date: new Date('2024-12-15'),
      timeSlot: '2:00 PM - 4:00 PM',
      status: 'completed',
      totalPrice: 2500,
    },
    {
      customer: customers[0]._id,
      service: services[2]._id,
      provider: providers[0]._id,
      date: new Date('2024-12-20'),
      timeSlot: '8:00 AM - 10:00 AM',
      status: 'completed',
      totalPrice: 800,
      notes: 'Kitchen pipe is leaking badly',
    },
    {
      customer: customers[2]._id,
      service: services[2]._id,
      provider: providers[0]._id,
      date: new Date('2025-01-05'),
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'completed',
      totalPrice: 800,
    },
    {
      customer: customers[0]._id,
      service: services[4]._id,
      provider: providers[2]._id,
      date: new Date('2025-01-10'),
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'completed',
      totalPrice: 1000,
    },
    {
      customer: customers[1]._id,
      service: services[4]._id,
      provider: providers[2]._id,
      date: new Date('2025-01-12'),
      timeSlot: '2:00 PM - 4:00 PM',
      status: 'completed',
      totalPrice: 1000,
    },
    {
      customer: customers[2]._id,
      service: services[6]._id,
      provider: providers[3]._id,
      date: new Date('2025-01-15'),
      timeSlot: '4:00 PM - 6:00 PM',
      status: 'completed',
      totalPrice: 1500,
    },
    {
      customer: customers[0]._id,
      service: services[6]._id,
      provider: providers[3]._id,
      date: new Date('2025-01-20'),
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'completed',
      totalPrice: 1500,
    },
    {
      customer: customers[1]._id,
      service: services[9]._id,
      provider: providers[5]._id,
      date: new Date('2025-01-25'),
      timeSlot: '8:00 AM - 10:00 AM',
      status: 'completed',
      totalPrice: 12000,
    },
    {
      customer: customers[2]._id,
      service: services[9]._id,
      provider: providers[5]._id,
      date: new Date('2025-02-01'),
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'completed',
      totalPrice: 12000,
    },
    // Upcoming bookings
    {
      customer: customers[0]._id,
      service: services[1]._id,
      provider: providers[1]._id,
      date: new Date('2026-05-20'),
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'confirmed',
      totalPrice: 1200,
    },
    {
      customer: customers[1]._id,
      service: services[3]._id,
      provider: providers[0]._id,
      date: new Date('2026-05-22'),
      timeSlot: '2:00 PM - 4:00 PM',
      status: 'pending',
      totalPrice: 5000,
      notes: 'Need new toilet installed',
    },
    {
      customer: customers[2]._id,
      service: services[8]._id,
      provider: providers[4]._id,
      date: new Date('2026-05-25'),
      timeSlot: '8:00 AM - 10:00 AM',
      status: 'pending',
      totalPrice: 8000,
      notes: '2BHK apartment, 3rd floor, no elevator',
    },
  ]);

  console.log(`Created ${bookings.length} bookings...`);

  // Create Reviews
  await Review.create([
    {
      customer: customers[0]._id,
      service: services[0]._id,
      provider: providers[1]._id,
      booking: bookings[0]._id,
      rating: 5,
      comment: 'Sita did an amazing job! The house was spotless and she was very professional. Highly recommend!',
    },
    {
      customer: customers[1]._id,
      service: services[0]._id,
      provider: providers[1]._id,
      booking: bookings[1]._id,
      rating: 4,
      comment: 'Great cleaning service. Very thorough and on time. Will book again.',
    },
    {
      customer: customers[0]._id,
      service: services[2]._id,
      provider: providers[0]._id,
      booking: bookings[2]._id,
      rating: 5,
      comment: 'Ramesh fixed the leak quickly and professionally. Very knowledgeable and fair pricing.',
    },
    {
      customer: customers[2]._id,
      service: services[2]._id,
      provider: providers[0]._id,
      booking: bookings[3]._id,
      rating: 4,
      comment: 'Good work, came on time and fixed the issue. Would recommend.',
    },
    {
      customer: customers[0]._id,
      service: services[4]._id,
      provider: providers[2]._id,
      booking: bookings[4]._id,
      rating: 5,
      comment: 'Bikash is excellent! Very careful and professional. Fixed everything perfectly.',
    },
    {
      customer: customers[1]._id,
      service: services[4]._id,
      provider: providers[2]._id,
      booking: bookings[5]._id,
      rating: 5,
      comment: 'Best electrician I have hired. Explained everything clearly and did a clean job.',
    },
    {
      customer: customers[2]._id,
      service: services[6]._id,
      provider: providers[3]._id,
      booking: bookings[6]._id,
      rating: 5,
      comment: 'Priya is an amazing tutor! My son improved his grades significantly. Very patient and clear.',
    },
    {
      customer: customers[0]._id,
      service: services[6]._id,
      provider: providers[3]._id,
      booking: bookings[7]._id,
      rating: 5,
      comment: 'Excellent teaching method. My daughter loves the sessions. Highly recommended!',
    },
    {
      customer: customers[1]._id,
      service: services[9]._id,
      provider: providers[5]._id,
      booking: bookings[8]._id,
      rating: 5,
      comment: 'Sunita made me look absolutely stunning on my wedding day. She is a true artist!',
    },
    {
      customer: customers[2]._id,
      service: services[9]._id,
      provider: providers[5]._id,
      booking: bookings[9]._id,
      rating: 5,
      comment: 'Perfect bridal makeup. Very professional and used high quality products. 10/10!',
    },
  ]);

  console.log('Created reviews...');
  console.log('✅ Seed complete!');
  console.log('---');
  console.log('Test accounts:');
  console.log('Admin    → admin@localserve.com / admin123');
  console.log('Provider → ramesh@localserve.com / password123');
  console.log('Provider → sita@localserve.com / password123');
  console.log('Customer → aarav@localserve.com / password123');
  console.log('Customer → nisha@localserve.com / password123');

  process.exit();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});