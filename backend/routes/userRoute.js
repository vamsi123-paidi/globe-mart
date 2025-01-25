const express = require('express');
const { register, login } = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required')
], login);

module.exports = router;
