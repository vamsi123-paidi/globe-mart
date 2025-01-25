const Cart = require('../models/cartSchema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is used for authentication

exports.addToCart = async (req, res) => {
    // Ensure the user is authenticated
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    try {
        // Verify the token and get the userId from the decoded token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const userId = verified.id;

        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid productId or quantity' });
        }

        const objectId = new mongoose.Types.ObjectId(productId);

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        // If no cart exists for the user, create a new one
        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId: objectId, quantity }],
            });
            await cart.save();
            return res.status(200).json({ message: 'Item added to cart' });
        }

        // If cart exists, check if the item is already in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === objectId.toString());

        if (itemIndex > -1) {
            // Item already exists in cart, so update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Item doesn't exist in the cart, add new item
            cart.items.push({ productId: objectId, quantity });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
};

// Fetch Cart
// Fetch Cart
exports.getCart = async (req, res) => {
    const userId = req.params.userId;  // This should match the token passed from frontend

    try {
        // Fetch only one cart for the given userId
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
  
    try {
      const { productId } = req.body;
  
      console.log('Received productId:', productId); // Debug log
  
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const userId = verified.id;
  
      const objectId = new mongoose.Types.ObjectId(productId); // Convert to ObjectId
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== objectId.toString()
      );
      await cart.save();
  
      res.status(200).json(cart); // Return the updated cart
    } catch (error) {
      console.error('Error removing item from cart:', error); // Log the error
      res.status(500).json({ error: 'Server error while removing item' });
    }
  };
  

// Clear the entire cart
exports.clearCart = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  
    try {
      // Verify the token and get the userId from the decoded token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const userId = verified.id;  // userId from the token
  
      // Find the user's cart and clear it
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      // Clear all items in the cart
      cart.items = [];
      await cart.save();
  
      res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Server error while clearing cart' });
    }
  };
  

  