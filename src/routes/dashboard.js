const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth, isAdmin } = require('../middleware/auth');

// API thống kê dashboard (admin)
router.get('/stats', auth, isAdmin, dashboardController.getDashboardStats);

module.exports = router; 