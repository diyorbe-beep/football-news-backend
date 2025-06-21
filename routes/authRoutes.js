const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth'); // Add this import
const { validateRegistration, validateLogin } = require('../middlewares/validation');
const { authLimiter } = require('../middlewares/rateLimit');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authLimiter, validateRegistration, authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authLimiter, validateLogin, authController.login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getMe);

module.exports = router;