const express = require('express');
const { register, login, getUserData, updateUserData } = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is used for authentication

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required')
], login);

module.exports = router;

router.get('/', authMiddleware, getUserData)

// Update user profile (only email for now)
router.put('/profile', authMiddleware,updateUserData)