import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <div className="container navbar">
      <Link to="/" className="logo">
        Cartit
      </Link>
      <div className="nav-links">
        <Link to="/category">Category</Link>
        <Link to="/cart">Cart</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/orders">Orders</Link>}
        {isLoggedIn && (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
