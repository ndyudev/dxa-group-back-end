const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { auth, isAdmin } = require('../middleware/auth');

// Get all services
router.get('/', serviceController.getAllServices);

// Get service by ID
router.get('/:id', serviceController.getServiceById);

// Create new service
router.post('/', serviceController.createService);

// Update service
router.put('/:id', serviceController.updateService);

// Delete service
router.delete('/:id', serviceController.deleteService);

module.exports = router; 