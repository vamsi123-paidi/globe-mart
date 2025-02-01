import React from 'react';
import { FaFire, FaGift, FaShippingFast } from 'react-icons/fa';
import apparelImage from '../assets/apparels.jpeg'; // Add your image path
import '../App.css';

const ApparelPage = () => {
  return (
    <div className="apparel-page-container">
      <h1>Apparel Offers</h1>
      <img src={apparelImage} alt="Apparel" />
      <p>Explore our exclusive deals on apparel!</p>
      <ul>
        <li><FaFire /> Up to 70% off on winter wear!</li>
        <li><FaGift /> Buy 2 Get 1 Free on t-shirts!</li>
        <li><FaShippingFast /> Free shipping on orders above $50!</li>
      </ul>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default ApparelPage;