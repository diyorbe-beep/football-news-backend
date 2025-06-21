const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');
const auth = require('../middlewares/auth');
const { validateTransfer } = require('../middlewares/validation');

// @route   GET api/transfers
// @desc    Get all transfers
// @access  Public
router.get('/', transferController.getAllTransfers);

// @route   GET api/transfers/:id
// @desc    Get transfer by ID
// @access  Public
router.get('/:id', transferController.getTransferById);

// @route   POST api/transfers
// @desc    Create transfer
// @access  Private/Admin
router.post('/', [auth, auth.admin], validateTransfer, transferController.createTransfer);

// @route   PUT api/transfers/:id
// @desc    Update transfer
// @access  Private/Admin
router.put('/:id', [auth, auth.admin], validateTransfer, transferController.updateTransfer);

// @route   DELETE api/transfers/:id
// @desc    Delete transfer
// @access  Private/Admin
router.delete('/:id', [auth, auth.admin], transferController.deleteTransfer);

module.exports = router;