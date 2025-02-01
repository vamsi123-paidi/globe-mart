import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../checkoutpage.css"
import { useNavigate } from 'react-router-dom';

const Checkoutpage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not logged in');
        return;
      }

      const response = await axios.get('https://globe-mart.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.items) {
        setCart(response.data.items);
        calculateTotalAmount(response.data.items);
      } else {
        setError('No cart found for this user');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total amount from cart items
  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle address change
  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Handle quantity change
  const handleQuantityChange = (e, productId) => {
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        item.quantity = parseInt(e.target.value, 10);
      }
      return item;
    });
    setCart(newCart);
    calculateTotalAmount(newCart);
  };


  const handleProceedToCheckout = () => {
    navigate('/payment'); 
  };

  return (
    <div className="checkout-page">
      {loading ? (
        <p>Loading cart...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Checkout</h2>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>Your Cart</h3>
            {cart.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.thumbnail || "https://via.placeholder.com/150"} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.title}</p>
                  <div className="cart-item-quantity">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(e, item.productId)}
                    />
                  </div>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address Form */}
          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={shippingAddress.name}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={handleAddressChange}
              />
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Total: ${totalAmount}</p>
            <p>Shipping: $10 (estimated)</p>
            <p>Taxes: ${totalAmount * 0.1}</p>
            <p>
              Total Amount: $ {totalAmount + 10 + totalAmount * 0.1}
            </p>
          </div>

          <div className="checkout-button">
            <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkoutpage;
