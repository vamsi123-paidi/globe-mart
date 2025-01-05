import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import './App.css';
import Footer from './Components/Footer';
import ProductsPage from './Components/Products';
import CartPage from './Components/Cartpage';
import Searchbar from './Components/Searchbar';
import Navbarcomponent from './Components/Navbarcomponent';
import Scrollingadd from './Components/Scrollingadd';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Safely access cart, with a fallback to an empty array if cart is undefined or null
  const cart = useSelector((state) => state.cart?.cart || []);
  
  // Ensure cart is an array before calling reduce
  const totalItemsInCart = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const isEmptyCart = totalItemsInCart === 0;

  return (
    <Router>
      <>
        <Navbarcomponent />
        <Searchbar setSearchQuery={setSearchQuery} />
        <Scrollingadd />
        <Routes>
          <Route path="/" element={<ProductsPage searchQuery={searchQuery} />} />
          <Route path="/products/:category" element={<ProductsPage searchQuery={searchQuery} />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer isEmptyCart={isEmptyCart} />
      </>
    </Router>
  );
};

export default App;
