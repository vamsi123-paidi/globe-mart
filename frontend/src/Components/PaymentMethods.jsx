import React, { useState } from 'react';
import '../paymentmethod.css';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentSubmit = () => {
    setTimeout(() => {
      setOrderConfirmed(true);
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>Select Your Payment Method</h2>

      <div className="payment-options">
        <div className="payment-option">
          <input
            type="radio"
            value="googlePay"
            checked={paymentMethod === 'googlePay'}
            onChange={handlePaymentMethodChange}
          />
          <label className="google-pay">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16WAKdwZYXlK2K4Na6nYy8KYUCKZvREJ9YQ&s"
              alt="Google Pay"
              className="payment-icon"
            />
            Google Pay
          </label>
        </div>

        <div className="payment-option">
          <input
            type="radio"
            value="paytm"
            checked={paymentMethod === 'paytm'}
            onChange={handlePaymentMethodChange}
          />
          <label className="paytm">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEjY90pS-UfgHJU4glc8Aiupp1xCn_jcvRQ&s"
              alt="Paytm"
              className="payment-icon"
            />
            Paytm
          </label>
        </div>

        <div className="payment-option">
          <input
            type="radio"
            value="phonePe"
            checked={paymentMethod === 'phonePe'}
            onChange={handlePaymentMethodChange}
          />
          <label className="phone-pe">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4x8kSTmPUq4PFzl4HNT0gObFuEhivHOFYg&s"
              alt="PhonePe"
              className="payment-icon"
            />
            PhonePe
          </label>
        </div>

        <div className="payment-option">
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={handlePaymentMethodChange}
          />
          <label className="cod">
          <img
              src="https://png.pngtree.com/png-clipart/20210523/ourmid/pngtree-cash-on-delivery-green-stamp-cod-png-image_3342456.jpg"
              alt="PhonePe"
              className="payment-icon"
            />
             Cash on Delivery
          </label>
        </div>
      </div>

      <button onClick={handlePaymentSubmit}>Proceed to Checkout</button>

      {orderConfirmed && (
        <div className="order-confirmation">
          <div className="confirmation-message">
            <h3>Your Order is Confirmed!</h3>
            <p>Thank you for shopping with us!</p>
            <i className="fas fa-check-circle"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
