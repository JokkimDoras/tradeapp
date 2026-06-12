const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/validateAuth');

// Core Authentication Mappings
router.post('/register', authMiddleware.validateRegisterInput, authController.registerUser);
router.post('/login', authMiddleware.validateLoginInput, authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;