import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import './App.css';
import Footer from './Components/Footer';
import ProductsPage from './Components/Products';
import CartPage from './Components/Cartpage';
import Searchbar from './Components/Searchbar';
import Navbarcomponent from './Components/Navbarcomponent';
import Scrollingadd from './Components/Scrollingadd';
import Checkoutpage from './Components/Checkoutpage';
import PaymentMethods from './Components/PaymentMethods';
import FavoritesPage from './Components/FavoritesPage';
import OffersPage from './Components/OffersPage';
import ElectronicsPage from './Components/ElectronicsPage';
import ApparelPage from './Components/ApparelPage';
import HomeAppliancesPage from './Components/HomeAppliancesPage';
import ProfilePage from './Components/ProfiePage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation(); 

  const cart = useSelector((state) => state.cart?.cart || []);
  const totalItemsInCart = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;
  const isEmptyCart = totalItemsInCart === 0;

  useEffect(() => {
    setSearchQuery('');
  }, [location]);

  return (
    <div>
      <Navbarcomponent />
      <Searchbar setSearchQuery={setSearchQuery} />
      <Scrollingadd />
      <Routes>
        <Route path="/" element={<ProductsPage searchQuery={searchQuery} />} />
        <Route path="/products/:category" element={<ProductsPage searchQuery={searchQuery} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route exact path="/checkout" element={<Checkoutpage />} />
        <Route path='/payment' element={<PaymentMethods />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/offers" element={<OffersPage />} /> 
        <Route path="/electronics" element={<ElectronicsPage />} /> 
        <Route path="/apparel" element={<ApparelPage />} /> 
        <Route path="/home-appliances" element={<HomeAppliancesPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
      <Footer isEmptyCart={isEmptyCart} />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
