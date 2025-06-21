const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { validateNews } = require('../middlewares/validation');
const { uploadLimiter } = require('../middlewares/rateLimit');

// @route   GET api/news
// @desc    Get all news
// @access  Public
router.get('/', newsController.getAllNews);

// @route   GET api/news/:id
// @desc    Get news by ID
// @access  Public
router.get('/:id', newsController.getNewsById);

// @route   POST api/news
// @desc    Create news
// @access  Private/Admin
router.post('/', [auth, auth.admin], uploadLimiter, upload, validateNews, newsController.createNews);

// @route   PUT api/news/:id
// @desc    Update news
// @access  Private/Admin
router.put('/:id', [auth, auth.admin], uploadLimiter, upload, validateNews, newsController.updateNews);

// @route   DELETE api/news/:id
// @desc    Delete news
// @access  Private/Admin
router.delete('/:id', [auth, auth.admin], newsController.deleteNews);

module.exports = router;