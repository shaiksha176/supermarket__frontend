import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { Box, Stack } from "@mui/material";
const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "80%", margin: "0 auto" }}
    >
      <Box>
        <Link to="/">
          <img
            src={require("../../images/logo.png")}
            style={{ width: "100px" }}
          />
        </Link>
      </Box>

      <Stack direction="row" gap={3}>
        <Link to="/category">
          <img
            src={require("../../images/category.png")}
            style={{ width: "30px" }}
          />
        </Link>
        <Link to="/cart">
          <img
            src={require("../../images/carts.png")}
            style={{ width: "30px" }}
          />
        </Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && (
          <Link to="/orders">
            <img
              src={require("../../images/grocery-cart.png")}
              style={{ width: "30px" }}
            />
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/" onClick={handleLogout}>
            <img
              src={require("../../images/logout.png")}
              style={{ width: "30px" }}
            />
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
