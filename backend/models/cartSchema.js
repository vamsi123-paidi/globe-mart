const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  brand: { type: String },
  stock: { type: Number },
  rating: { type: Number },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 } 
});


module.exports = mongoose.model('Cart', cartSchema);
