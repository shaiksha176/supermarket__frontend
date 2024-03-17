import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "../cart/cartSlice";

// Define the order interface
export interface Order {
  customer: number | string;
  items: {
    product: number | string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered";
  address: {
    street?: string;
    city: string;
    postalCode?: string;
    state?: string;
  };
  paymentDetails: {
    paymentMethod: string;
  };
}

// Define the order state interface
interface OrderState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasFetched: boolean;
}

// Define the initial state
const initialState: OrderState = {
  orders: [],
  status: "idle",
  error: null,
  hasFetched: false,
};

// Define the asynchronous thunk to fetch orders from the API
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/orders"); // Replace with your API endpoint
    return response.data as Order[];
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
});

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (data: Order) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        data,
      ); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  },
);

// Create the order slice
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.status = "succeeded";
          state.orders = action.payload;
          state.hasFetched = true;
        },
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch orders";
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("order created successfully");
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create order";
      });
  },
});

// Export the order reducer
export default orderSlice.reducer;
