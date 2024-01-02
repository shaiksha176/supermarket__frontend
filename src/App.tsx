import React from "react";
import "./App.css";
import Home from "./pages/home/page";
import Navbar from "./components/navbar/Navbar";
import Category from "./pages/category/Page";
import Cart from "./pages/cart/Page";
import Login from "./pages/login/Page";
import Orders from "./pages/orders/Page";
import { Routes, Route } from "react-router-dom";
import Client from "./layout/Client";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Client />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
