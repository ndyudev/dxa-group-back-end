const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // KHÔNG dùng dấu {}

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.put('/change-password', auth, userController.changePassword);

module.exports = router;