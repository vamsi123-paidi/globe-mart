import React from 'react';
import { FaFire, FaGift, FaShippingFast } from 'react-icons/fa';
import { motion } from 'framer-motion';
import electronicsImage from '../assets/electronics.jpeg'; // Add your image path
import '../App.css';

const ElectronicsPage = () => {

  return (
    <div className="electronics-page-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Electronics Offers
      </motion.h1>
      <motion.img
        src={electronicsImage}
        alt="Electronics"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Check out our amazing deals on electronics!
      </motion.p>
      <ul>
        <li><FaFire /> Up to 50% off on smartphones!</li>
        <li><FaGift /> Buy 1 Get 1 Free on headphones!</li>
        <li><FaShippingFast /> Free shipping on all orders!</li>
      </ul>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default ElectronicsPage;