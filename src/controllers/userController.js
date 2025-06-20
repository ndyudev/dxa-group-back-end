const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Đăng ký user mới
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, company, phone } = req.body;
    
    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }
    
    // Tạo user mới
    const user = new User({
      email,
      password,
      fullName,
      company,
      phone,
      role: 'client' // Mặc định là client
    });
    
    await user.save();
    
    // Tạo token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        company: user.company
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Đăng ký thất bại', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    
    // Kiểm tra mật khẩu
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    
    // Cập nhật thời gian đăng nhập cuối
    user.lastLogin = new Date();
    await user.save();
    
    // Tạo token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        company: user.company
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Đăng nhập thất bại', error: error.message });
  }
};

// Lấy thông tin profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Cập nhật profile
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, company, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, company, phone },
      { new: true }
    ).select('-password');
    
    res.json({
      message: 'Cập nhật profile thành công',
      user
    });
  } catch (error) {
    res.status(400).json({ message: 'Cập nhật thất bại', error: error.message });
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    // Kiểm tra mật khẩu hiện tại
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
    }
    
    // Cập nhật mật khẩu mới
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Đổi mật khẩu thất bại', error: error.message });
  }
}; 