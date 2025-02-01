const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // User ID is still an ObjectId
    ref: 'User',
    required: true,
  },
  productId: {
    type: Number, // Change this to Number if productId is a number
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorites', favoritesSchema);