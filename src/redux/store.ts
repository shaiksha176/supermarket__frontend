import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import productsReducer from "./features/products/productSlice";
import orderReducer from "./features/orders/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
    orders: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
