const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/auth').isAdmin;

// Public routes
router.post('/', contactController.createContact);

// Admin routes
router.get('/', auth, isAdmin, contactController.getAllContacts);
router.put('/:id/status', auth, isAdmin, contactController.updateContactStatus);
router.delete('/:id', auth, isAdmin, contactController.deleteContact);

module.exports = router; 