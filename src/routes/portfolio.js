const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { auth, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', portfolioController.getAllPortfolio);
router.get('/categories', portfolioController.getCategories);
router.get('/:id', portfolioController.getPortfolioById);

// Admin routes
router.post('/', auth, isAdmin, portfolioController.createPortfolio);
router.put('/:id', auth, isAdmin, portfolioController.updatePortfolio);
router.delete('/:id', auth, isAdmin, portfolioController.deletePortfolio);

module.exports = router; 