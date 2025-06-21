const { body, validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// News validation rules
const validateNews = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  body('category')
    .isIn(['transfer', 'match', 'general'])
    .withMessage('Category must be transfer, match, or general'),
  handleValidationErrors
];

// User registration validation
const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Match validation
const validateMatch = [
  body('homeTeam')
    .trim()
    .notEmpty()
    .withMessage('Home team is required'),
  body('awayTeam')
    .trim()
    .notEmpty()
    .withMessage('Away team is required'),
  body('date')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('status')
    .optional()
    .isIn(['upcoming', 'ongoing', 'completed'])
    .withMessage('Status must be upcoming, ongoing, or completed'),
  handleValidationErrors
];

// Transfer validation
const validateTransfer = [
  body('playerName')
    .trim()
    .notEmpty()
    .withMessage('Player name is required'),
  body('fromClub')
    .trim()
    .notEmpty()
    .withMessage('From club is required'),
  body('toClub')
    .trim()
    .notEmpty()
    .withMessage('To club is required'),
  body('status')
    .optional()
    .isIn(['rumor', 'confirmed'])
    .withMessage('Status must be rumor or confirmed'),
  handleValidationErrors
];

module.exports = {
  validateNews,
  validateRegistration,
  validateLogin,
  validateMatch,
  validateTransfer,
  handleValidationErrors
}; 