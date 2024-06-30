import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  register as authRegister,
  reset,
  login,
} from "../../redux/features/auth/authSlice";
import { Box, Button, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../../redux/store";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(login(data));
  };

  // Redirect on successful login
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  // Check for the presence of the token and redirect if found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <img src={require("../../images/logo.png")} className="logo" alt="Logo" />
      <Box className="login__container">
        <Box className="login__inputs">
          <Box>
            <Typography component="h1">Log In</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <label>Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 6,
                      message: "Email must be at least 6 characters",
                    },
                  })}
                />
                {errors.email && <small>{errors.email.message}</small>}
              </Box>
              <Box>
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && <small>{errors.password.message}</small>}
              </Box>
              <button type="submit" className="login__btn">
                Login
              </button>
            </form>
            <p>OR</p>
            <button
              id="login__account__creation"
              onClick={() => navigate("/register")}
            >
              Don't have an account? <span>Sign up for free</span>
            </button>
          </Box>
        </Box>
        <Box className="login__banner">
          <img src={require("../../images/login.jpg")} alt="Login banner" />
        </Box>
      </Box>
    </>
  );
};

export default Login;
