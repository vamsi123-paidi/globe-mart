import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaHeart, FaShoppingCart } from 'react-icons/fa';
import '../App.css';

const ProfilePage = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
    fetchFavorites();
    fetchCartItems();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://globe-mart.onrender.com/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setUser({ email: response.data.email, password: '' });
      } else {
        setError('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://globe-mart.onrender.com/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.favorites) {
        setFavorites(response.data.favorites);
      } else {
        setError('No favorites found');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to fetch favorites');
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://globe-mart.onrender.com/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.items) {
        setCartItems(response.data.items);
      } else {
        setError('No cart items found');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to fetch cart items');
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put('https://globe-mart.onrender.com/api/user/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Profile</h1>

      {/* Profile Information */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>
          <FaEdit style={styles.icon} /> Profile Information
        </h2>
        {isEditing ? (
          <form onSubmit={handleEditProfile} style={styles.form}>
            <label style={styles.label}>
              Email:
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              New Password:
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter new password"
                style={styles.input}
              />
            </label>
            <button type="submit" style={styles.button}>
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div style={styles.profileInfo}>
            <p style={styles.text}><strong>Email:</strong> {user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              style={styles.button}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>
          <FaShoppingCart style={styles.icon} /> Cart Items
        </h2>
        {cartItems.length > 0 ? (
          <div style={styles.cartGrid}>
            {cartItems.map((item) => (
              <div key={item.productId} style={styles.cartItem}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={styles.cartImage}
                />
                <h3 style={styles.cartTitle}>{item.title}</h3>
                <p style={styles.cartPrice}>${item.price}</p>
                <p style={styles.cartQuantity}>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.text}>No items in cart.</p>
        )}
      </div>

      {/* Favorites */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>
          <FaHeart style={styles.icon} /> Favorites
        </h2>
        {favorites.length > 0 ? (
          <div style={styles.favoritesGrid}>
            {favorites.map((product) => (
              <div key={product.productId} style={styles.favoriteItem}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={styles.favoriteImage}
                />
                <h3 style={styles.favoriteTitle}>{product.title}</h3>
                <p style={styles.favoritePrice}>${product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.text}>No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

// Inline Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  sectionHeading: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '20px',
  },
  icon: {
    marginRight: '10px',
    color: '#ff4757',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#ff4757',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginLeft: '10px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  text: {
    fontSize: '1rem',
    color: '#333',
  },
  cartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cartImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  cartTitle: {
    fontSize: '1rem',
    color: '#333',
    margin: '10px 0',
  },
  cartPrice: {
    fontSize: '1rem',
    color: '#ff4757',
    fontWeight: 'bold',
  },
  cartQuantity: {
    fontSize: '0.9rem',
    color: '#555',
  },
  favoritesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  favoriteItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  favoriteImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  favoriteTitle: {
    fontSize: '1rem',
    color: '#333',
    margin: '10px 0',
  },
  favoritePrice: {
    fontSize: '1rem',
    color: '#ff4757',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#333',
    marginTop: '50px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#ff4757',
    marginTop: '50px',
  },
};
