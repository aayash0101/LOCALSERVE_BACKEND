import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  const { keyword, category, minPrice, maxPrice, district, page = 1, limit = 10 } = req.query;

  const query = { isActive: true };

  if (keyword) query.$text = { $search: keyword };
  if (category) query.category = category;
  if (district) query['location.district'] = district;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const total = await Service.countDocuments(query);
  const services = await Service.find(query)
    .populate('provider', 'name avatar location isApproved')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ services, total, page: Number(page), pages: Math.ceil(total / limit) });
};


export const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate('provider', 'name avatar bio location phone isApproved');

  if (!service) return res.status(404).json({ message: 'Service not found' });

  res.json(service);
};


export const createService = async (req, res) => {
  const { title, description, category, price, priceType, location } = req.body;

  if (req.user.role !== 'provider') {
    return res.status(403).json({ message: 'Only providers can create services' });
  }

  if (!req.user.isApproved) {
    return res.status(403).json({ message: 'Your account is pending admin approval' });
  }

  const service = await Service.create({
    title, description, category, price, priceType,
    location, provider: req.user._id,
  });

  res.status(201).json(service);
};


export const updateService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) return res.status(404).json({ message: 'Service not found' });
  if (service.provider.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  Object.assign(service, req.body);
  await service.save();

  res.json(service);
};

export const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) return res.status(404).json({ message: 'Service not found' });
  if (service.provider.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await service.deleteOne();
  res.json({ message: 'Service deleted' });
};