import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa'; 
import '../App.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://globe-mart.onrender.com/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavorites(response.data.favorites);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post(
        'https://globe-mart.onrender.com/api/cart/add',
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand,
          stock: product.stock,
          rating: product.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('API response:', response.data); 

      if (response.status === 200) {
        const updatedCartItems = response.data.cart?.items;

        if (updatedCartItems) {
          console.log('Cart updated:', updatedCartItems);
          setCart(updatedCartItems); 
        } else {
          console.error('No items found in the response cart.');
        }
      }
    } catch (error) {
      console.error('Failed to add to cart', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      await axios.post(
        'https://globe-mart.onrender.com/api/favorites/remove',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(favorites.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove favorite');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Your Favorites</h2>
      <div className="products-row">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product.productId} className="product-card">
              {/* Favorites Icon */}
              <div
                className="favorite-icon"
                onClick={() => handleRemoveFavorite(product.productId)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  cursor: 'pointer',
                  color: 'red', 
                }}
              >
                <FaHeart size={20} />
              </div>
              <img src={product.thumbnail} alt={product.title} />
              <h5>{product.title}</h5>
              <p className="price">Price: ${product.price}</p>
              <p className="brand">Brand: {product.brand}</p>
              <p className="rating">Rating: {product.rating} ⭐</p>
              <p className="stock">Stock: {product.stock}</p>
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleAddToCart(product)} 
              >
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
