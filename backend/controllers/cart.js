const Cart = require('../models/cartSchema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Ensure the User model is correctly imported

// Middleware for authentication
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is used for authentication

exports.addToCart = async (req, res) => {
  try {
    const { productId, title, price, thumbnail, brand, stock, rating, quantity = 1 } = req.body;

    // Log user info and validate productId, quantity
    console.log('Authenticated User:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    // Check if the item already exists in the cart
    const existingCartItem = await Cart.findOne({ userId: req.user.id, productId });

    if (existingCartItem) {
      // Update quantity if item exists
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = existingCartItem.price * existingCartItem.quantity;
      
      await existingCartItem.save();
      
      // Fetch updated cart items
      const updatedCart = await Cart.find({ userId: req.user.id }).exec();
      
      return res.status(200).json({
        message: 'Cart item quantity updated successfully',
        cart: { items: updatedCart },
      });
    }

    // Add new item to cart if it doesn't exist
    const totalPrice = price * quantity;
    const newCartItem = new Cart({
      userId: req.user.id,
      productId,
      title,
      price,
      thumbnail,
      brand,
      stock,
      rating,
      totalPrice,
      quantity,
    });

    await newCartItem.save();

    // Fetch updated cart items
    const updatedCart = await Cart.find({ userId: req.user.id }).exec();

    res.status(201).json({
      message: 'Item added to cart successfully',
      cart: { items: updatedCart },
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.find({ userId }).exec();  // Query for all items for the given user

    console.log(cart);  // Log the fetched cart data

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: 'Cart not found or is empty' });
    }

    return res.status(200).json({ items: cart });  // Send back cart items
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Error fetching cart' });
  }
};




exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const userId = req.user.id;

    const cartItem = await Cart.findOneAndDelete({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const updatedCart = await Cart.find({ userId });

    res.status(200).json({ message: 'Item removed', items: updatedCart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Server error while removing item' });
  }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Cart.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart is already empty' });
    }

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Server error while clearing cart' });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    const cartItem = await Cart.findOne({ userId: req.user.id, productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.price * quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart item updated successfully', cartItem });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
