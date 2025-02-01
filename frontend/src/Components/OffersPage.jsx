import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'; 

const OffersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state || { offer: "No offer selected." };

  const handleGoToHome = () => {
    navigate('/'); 
  };

  const handleGoToOfferPage = () => {
    if (offer.includes("Electronics")) {
      navigate('/electronics');
    } else if (offer.includes("Apparel")) {
      navigate('/apparel'); 
    } else if (offer.includes("Home Appliances")) {
      navigate('/home-appliances');
    } else {
      navigate('/'); 
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
