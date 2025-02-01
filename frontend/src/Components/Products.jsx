import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../Redux/productsSlice'; 
import axios from 'axios';
import { FaHeart } from 'react-icons/fa'; 
import '../App.css';

const ProductsPage = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { categories, productsByCategory, loading, error } = useSelector((state) => state.products);
  const { category } = useParams();
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]); 

  // Fetch products by category using Redux
  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((cat) => {
        if (!productsByCategory[cat]) {
          dispatch(fetchProductsByCategory(cat)); 
        }
      });
    }
  }, [categories, dispatch, productsByCategory]);

  const getAllProducts = () => {
    return categories.flatMap((cat) => productsByCategory[cat] || []);
  };

  const handleToggleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add favorites.');
        return;
      }
  
      const product = getAllProducts().find((p) => p.id === productId);
      if (!product) {
        alert('Product not found.');
        return;
      }
  
      const payload = {
        productId: Number(product.id), 
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
        stock: product.stock,
        rating: product.rating,
      };
  
      console.log('Request Payload:', payload);
  
      const response = await axios.post(
        'https://globe-mart.onrender.com/api/favorites/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setFavorites([...favorites, productId]);
      alert('Product added to favorites.');
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Failed to update favorites. Please try again.');
    }
  };

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

  const sortProducts = (products) => {
    const sortedProducts = [...products];
    if (sortOrder === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  const filterProducts = (products) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const formattedCategory = category ? category.replace(/-/g, ' ') : null;

  if (searchQuery) {
    const allProducts = getAllProducts();
    const filteredProducts = filterProducts(allProducts);

    return (
      <div>
        <h2>Search Results for "{searchQuery}"</h2>
        <div className="products-row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {/* Favorites Icon */}
                <div
                  className="favorite-icon"
                  onClick={() => handleToggleFavorite(product.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    color: favorites.includes(product.id) ? 'red' : 'gray',
                  }}
                >
                  <FaHeart size={20} />}
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
            <p>No products found for the search "{searchQuery}".</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {formattedCategory ? (
        <div className="category-section">
          <div className="category-header">
            <h2>{formattedCategory.toUpperCase()}</h2>
            <div className="filter-container">
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
          <div className="products-row">
            {sortProducts(productsByCategory[formattedCategory] || []).map((product) => (
              <div key={product.id} className="product-card">
                {/* Favorites Icon */}
                <div
                  className="favorite-icon"
                  onClick={() => handleToggleFavorite(product.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    color: favorites.includes(product.id) ? 'red' : 'gray',
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
            ))}
          </div>
        </div>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="category-section">
            <h2>{cat.replace(/-/g, ' ').toUpperCase()}</h2>
            <div className="products-row">
              {sortProducts(productsByCategory[cat] || []).map((product) => (
                <div key={product.id} className="product-card">
                  {/* Favorites Icon */}
                  <div
                    className="favorite-icon"
                    onClick={() => handleToggleFavorite(product.id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      color: favorites.includes(product.id) ? 'red' : 'gray',
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
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductsPage;
