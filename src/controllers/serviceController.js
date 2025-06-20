const Service = require('../models/Service');

// Lấy tất cả dịch vụ (phân trang & tìm kiếm)
exports.getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const filter = { isActive: true };
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    const total = await Service.countDocuments(filter);
    const services = await Service.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({
      data: services,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Tạo dịch vụ mới
exports.createService = async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
    features: req.body.features,
    price: req.body.price,
    duration: req.body.duration,
    category: req.body.category
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy chi tiết dịch vụ
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật dịch vụ
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    Object.assign(service, req.body);
    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa dịch vụ
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 