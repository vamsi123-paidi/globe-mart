const express = require('express');
const User = require('../models/userSchema'); // Import User model
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middlewares/authenticate')

// Add item to cart
router.post('/cart', authenticate, async (req, res) => {
  const { productId, name, price, quantity } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the product already exists in the cart
    const productIndex = user.cart.findIndex(item => item.productId === productId);
    if (productIndex >= 0) {
      // If it exists, update the quantity
      user.cart[productIndex].quantity += quantity;
    } else {
      // If it doesn't exist, add the new product
      user.cart.push({ productId, name, price, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's cart
router.get('/cart', authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.user);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
  
module.exports = router;
