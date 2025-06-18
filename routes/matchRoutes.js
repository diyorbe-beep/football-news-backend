const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const auth = require('../middlewares/auth');

// @route   GET api/matches
// @desc    Get all matches
// @access  Public
router.get('/', matchController.getAllMatches);

// @route   GET api/matches/:id
// @desc    Get match by ID
// @access  Public
router.get('/:id', matchController.getMatchById);

// @route   POST api/matches
// @desc    Create match
// @access  Private/Admin
router.post('/', [auth, auth.admin], matchController.createMatch);

// @route   PUT api/matches/:id
// @desc    Update match
// @access  Private/Admin
router.put('/:id', [auth, auth.admin], matchController.updateMatch);

// @route   DELETE api/matches/:id
// @desc    Delete match
// @access  Private/Admin
router.delete('/:id', [auth, auth.admin], matchController.deleteMatch);

module.exports = router;