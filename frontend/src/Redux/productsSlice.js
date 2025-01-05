import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=200`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return { category, products: data.products };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;  // Pass error to rejected case
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const token = localStorage.getItem('authToken');
    console.log('Token retrieved:', token); // Log the token to verify if it's fetched correctly

    if (!token) {
      throw new Error('Unauthorized: Token missing');
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      return data.cart || [];
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  }
);



const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [
      'beauty', 'fragrances', 'furniture', 'groceries',
      'home-decoration', 'kitchen-accessories', 'laptops',
      'mens-shirts', 'mens-shoes', 'mens-watches', 'mobile-accessories',
      'motorcycle', 'skin-care', 'smartphones', 'sports-accessories',
      'sunglasses', 'tablets', 'tops', 'vehicle',
      'womens-bags', 'womens-dresses', 'womens-jewellery',
      'womens-shoes', 'womens-watches'
    ],
    productsByCategory: {},
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    updateCartQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling products fetching
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productsByCategory[action.payload.category] = action.payload.products;
        state.error = null;  // Clear error if fetch is successful
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handling cart fetching
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Update the cart with data from the API
        state.error = null;  // Clear error if fetch is successful
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = productsSlice.actions;

export default productsSlice.reducer;
