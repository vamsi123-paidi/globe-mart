import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'; // Use your existing styles

const OffersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state || { offer: "No offer selected." }; // Get the offer from navigation state

  // Function to handle navigation to the home page
  const handleGoToHome = () => {
    navigate('/'); // Navigate to the home page
  };

  // Function to handle navigation to specific offer pages
  const handleGoToOfferPage = () => {
    if (offer.includes("Electronics")) {
      navigate('/electronics'); // Example: Redirect to electronics page
    } else if (offer.includes("Apparel")) {
      navigate('/apparel'); // Example: Redirect to apparel page
    } else if (offer.includes("Home Appliances")) {
      navigate('/home-appliances'); // Example: Redirect to home appliances page
    } else {
      navigate('/'); // Default to home page
    }
  };

  return (
    <div className="offers-page-container">
      <h1>Special Offer</h1>
      <div className="offer-details">
        <h2>{offer}</h2>
        <p>Here are the details of this amazing offer:</p>
        <ul>
          <li>🔥 Limited Time Only!</li>
          <li>🎁 Exclusive Discounts!</li>
          <li>🚚 Free Shipping Available!</li>
        </ul>
        <button className="btn btn-primary" onClick={handleGoToHome}>
          Go to Home
        </button>
        <button className="btn btn-secondary" onClick={handleGoToOfferPage}>
          Explore Offer
        </button>
      </div>
    </div>
  );
};

export default OffersPage;