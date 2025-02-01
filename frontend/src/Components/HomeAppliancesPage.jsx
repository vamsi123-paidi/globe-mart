import React from 'react';
import { FaFire, FaGift, FaShippingFast } from 'react-icons/fa';
import { motion } from 'framer-motion';
import appliancesImage from '../assets/homeappliences.jpeg'; // Add your image path
import '../App.css';

const HomeAppliancesPage = () => {

  return (
    <div className="home-appliances-page-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Home Appliances Offers
      </motion.h1>
      <motion.img
        src={appliancesImage}
        alt="Home Appliances"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Discover unbeatable deals on home appliances!
      </motion.p>
      <ul>
        <li><FaFire /> Up to 60% off on washing machines!</li>
        <li><FaGift /> Free installation on all ACs!</li>
        <li><FaShippingFast /> Free shipping on orders above $100!</li>
      </ul>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default HomeAppliancesPage;