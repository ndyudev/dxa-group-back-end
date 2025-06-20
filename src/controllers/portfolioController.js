const Portfolio = require('../models/Portfolio');
console.log('Portfolio model:', Portfolio);

// Lấy tất cả portfolio items (phân trang & filter)
exports.getAllPortfolio = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category || 'all';
    const featured = req.query.featured === 'true';

    const filter = { isActive: true };
    if (category !== 'all') {
      filter.category = category;
    }
    if (featured) {
      filter.featured = true;
    }

    const total = await Portfolio.countDocuments(filter);
    const portfolio = await Portfolio.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: portfolio,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio',
      error: error.message
    });
  }
};

// Tạo portfolio item mới
exports.createPortfolio = async (req, res) => {
  console.log('createPortfolio called');
  try {
    const portfolio = new Portfolio(req.body);
    const newPortfolio = await portfolio.save();
    
    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: newPortfolio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating portfolio item',
      error: error.message
    });
  }
};

// Lấy portfolio item theo ID
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio item',
      error: error.message
    });
  }
};

// Cập nhật portfolio item
exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating portfolio item',
      error: error.message
    });
  }
};

// Xóa portfolio item
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting portfolio item',
      error: error.message
    });
  }
};

// Lấy categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
}; 