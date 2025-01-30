import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";

const Footer = () => {
  const categories = [
    'Beauty', 'Fragrances', 'Furniture', 'Groceries',
    'Laptops', 'Motorcycle', 'Smartphones',
    'Sunglasses', 'Tablets', 'Tops', 'Vehicle'
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              <Link to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <p>&copy; {new Date().getFullYear()} Globe Mart Shopping. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
