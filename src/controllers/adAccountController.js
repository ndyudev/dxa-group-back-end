const AdAccount = require('../models/AdAccount');
const User = require('../models/User');

// Lấy tất cả tài khoản quảng cáo của client
exports.getAllAdAccounts = async (req, res) => {
  try {
    const { clientId } = req.query;
    const filter = clientId ? { client: clientId } : {};
    const adAccounts = await AdAccount.find(filter).populate('client', 'fullName email');
    res.json(adAccounts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Tạo tài khoản quảng cáo mới
exports.createAdAccount = async (req, res) => {
  try {
    const adAccount = new AdAccount(req.body);
    await adAccount.save();
    res.status(201).json(adAccount);
  } catch (error) {
    res.status(400).json({ message: 'Tạo tài khoản quảng cáo thất bại', error });
  }
};

// Lấy chi tiết tài khoản quảng cáo
exports.getAdAccountById = async (req, res) => {
  try {
    const adAccount = await AdAccount.findById(req.params.id).populate('client', 'fullName email');
    if (!adAccount) return res.status(404).json({ message: 'Không tìm thấy tài khoản quảng cáo' });
    res.json(adAccount);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi truy vấn', error });
  }
};

// Cập nhật tài khoản quảng cáo
exports.updateAdAccount = async (req, res) => {
  try {
    const adAccount = await AdAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!adAccount) return res.status(404).json({ message: 'Không tìm thấy tài khoản quảng cáo' });
    res.json(adAccount);
  } catch (error) {
    res.status(400).json({ message: 'Cập nhật thất bại', error });
  }
};

// Xóa tài khoản quảng cáo
exports.deleteAdAccount = async (req, res) => {
  try {
    const adAccount = await AdAccount.findByIdAndDelete(req.params.id);
    if (!adAccount) return res.status(404).json({ message: 'Không tìm thấy tài khoản quảng cáo' });
    res.json({ message: 'Đã xóa tài khoản quảng cáo' });
  } catch (error) {
    res.status(400).json({ message: 'Xóa thất bại', error });
  }
}; 