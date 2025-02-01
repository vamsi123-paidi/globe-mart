import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  console.log('Token:', localStorage.getItem('token'));
  console.log('User ID:', localStorage.getItem('userId'));

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('User not logged in. Please log in  view your cart.');
        setLoading(false);
        return;
      }

      const response = await axios.get('https://globe-mart.onrender.com/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API response:', response.data);

      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setError('Session expired. Please log in again.');
        return;
      }

      if (response.data && response.data.items) {
        setCart(response.data.items);
      } else if (response.data.message === 'Cart not found or is empty') {
        setError('Your cart is empty.');
        setCart([]); // Set cart to an empty array
      } else {
        setError('No items found in your cart.');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to fetch cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.put(
        `https://globe-mart.onrender.com/api/cart/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Quantity updated successfully:', response.data);

      setCart((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity. Please try again.');
    }
  };

  const handleRemove = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'https://globe-mart.onrender.com/api/cart/remove',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log('Item removed successfully:', response.data.items);
        setCart(response.data.items);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      setError('Failed to remove item. Please try again.');
    }
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete('https://globe-mart.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setCart([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart. Please try again.');
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  console.log('Current cart:', cart);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="products-row">
            {cart.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="product-card">
                <img src={item.thumbnail || 'default-image.jpg'} alt={item.title} />
                <h5>{item.title}</h5>
                <p className="price">Price: ${item.price}</p>
                <p className="brand">Brand: {item.brand}</p>
                <p className="rating">Rating: {item.rating} ⭐</p>
                <p className="stock">Stock: {item.stock}</p>
                <div className="mb-2">
                  <label className="me-2">Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}
                    className="form-control w-27"
                  />
                </div>
                <button className="btn btn-outline-danger mb-2" onClick={() => handleRemove(item.productId)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-warning mb-3" onClick={handleClearCart}>
              Clear Cart
            </button>
            <h4 className="totalprice">Total Price: ${totalPrice}</h4>
            <div className="checkout-btn">
              <button className="btn btn-primary mt-3" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
