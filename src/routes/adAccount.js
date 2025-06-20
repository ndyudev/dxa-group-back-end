const express = require('express');
const router = express.Router();
const adAccountController = require('../controllers/adAccountController');

// Lấy tất cả tài khoản quảng cáo (có thể lọc theo client)
router.get('/', adAccountController.getAllAdAccounts);

// Tạo tài khoản quảng cáo mới
router.post('/', adAccountController.createAdAccount);

// Lấy chi tiết tài khoản quảng cáo
router.get('/:id', adAccountController.getAdAccountById);

// Cập nhật tài khoản quảng cáo
router.put('/:id', adAccountController.updateAdAccount);

// Xóa tài khoản quảng cáo
router.delete('/:id', adAccountController.deleteAdAccount);

module.exports = router; 