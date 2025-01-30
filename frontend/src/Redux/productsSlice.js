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
    loading: false,
    error: null,
  },
  reducers: {
    // You can keep any reducers related to categories, if needed
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
      });
  },
});

export default productsSlice.reducer;