const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const authMiddleware = require('../middleware/authMiddleware');

// Applying the middleware to routes
router.post('/add', authMiddleware, cartController.addToCart);
router.get('/:userId', authMiddleware, cartController.getCart); 
router.post('/remove', authMiddleware, cartController.removeFromCart);
router.delete('/', authMiddleware, cartController.clearCart); 


module.exports = router;
