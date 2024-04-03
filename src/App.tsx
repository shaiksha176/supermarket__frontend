import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Category from "./pages/category/Category";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import { Routes, Route } from "react-router-dom";
import Client from "./layout/Client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/register/Signup";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Client />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
