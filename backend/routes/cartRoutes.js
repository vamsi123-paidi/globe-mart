const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to routes
router.post('/add', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getCart);  // Simplified to use userId from token
router.post('/remove', authMiddleware, cartController.removeFromCart);
router.delete('/', authMiddleware, cartController.clearCart);
router.put('/:productId', authMiddleware, cartController.updateCartQuantity);
module.exports = router;
