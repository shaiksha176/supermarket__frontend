import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
};

type RegisterCredentials = {
  username: string;
  password: string;
  // Add any other fields as needed
};

// Get User from local storage
const user = JSON.parse(localStorage.getItem("user") || "null") as any;

const initialState: User = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(),
          ...credentials,
        });
      }, 5000);
    });
    return promise;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "user registration successfull";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
