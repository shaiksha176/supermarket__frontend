import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the product interface
interface Product {
  id: number;
  name: string;
  price: number;
  // Add other product properties as needed
}

// Define the product state interface
interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasFetched: boolean;
}

// Define the initial state
const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
  hasFetched: false,
};

// Define the asynchronous thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      return response.data as Product[];
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  },
);

// Create the product slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
          state.hasFetched = true;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

// Export the product reducer
export default productSlice.reducer;
