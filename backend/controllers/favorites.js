const Favorites = require('../models/favoritesSchema');
const mongoose = require('mongoose');

// Add to Favorites

exports.addToFavorites = async (req, res) => {
  try {
    const { productId, title, price, thumbnail, brand, stock, rating } = req.body;

    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if the product is already in favorites
    const existingFavorite = await Favorites.findOne({ userId: req.user.id, productId });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    // Add new item to favorites
    const newFavorite = new Favorites({
      userId: req.user.id,
      productId, // This is now a number
      title,
      price,
      thumbnail,
      brand,
      stock,
      rating,
    });

    await newFavorite.save();

    res.status(201).json({ message: 'Product added to favorites', favorite: newFavorite });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Remove from Favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate productId and user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Remove item from favorites
    const deletedFavorite = await Favorites.findOneAndDelete({ userId: req.user.id, productId });

    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Product not found in favorites' });
    }

    res.status(200).json({ message: 'Product removed from favorites', favorite: deletedFavorite });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get Favorites
exports.getFavorites = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Fetch all favorites for the user
    const favorites = await Favorites.find({ userId: req.user.id });

    res.status(200).json({ favorites });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};