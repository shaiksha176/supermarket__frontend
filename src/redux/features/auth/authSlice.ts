import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../utils/constants";

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
  email: string;
  // Add any other fields as needed
};

type LoginCredentials = {
  email: string;
  password: string;
};

// Get User from local storage
const user = JSON.parse(localStorage.getItem("user") || "null") as any;

const initialState: User = {
  user: user ? user : null,
  isError: false,
  isSuccess: localStorage.getItem("token") ? true : false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        credentials
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Registration  failed!");
      }
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Login  failed!");
      }
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.user = "";
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
        console.log(action);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "user login successful";
        const token = action.payload?.token; // Adjust this based on your API response structure
        if (token) {
          localStorage.setItem("token", token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Failed to log in";
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
