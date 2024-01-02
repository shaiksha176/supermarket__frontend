import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <div className="container navbar">
      <Link to="/" className="logo">
        Cartit
      </Link>
      <div className="nav-links">
        <Link to="/category">Category</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
};

export default Navbar;
