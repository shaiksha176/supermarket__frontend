import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  register as authRegister,
  reset,
  login,
  User,
} from "../../redux/features/auth/authSlice";
import { Box, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
type FormData = {
  email: string;
  password: string;
  username: string;
};

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isLoading, isError, isSuccess, message, user } = useSelector(
  //   (state: any) => state.auth,
  // );
  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    // console.log("Form Errors:", errors);
    dispatch(authRegister(data) as any);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/cart");
    }
    // dispatch(reset());
  }, [isSuccess, dispatch]);

  // Check for the presence of the token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, redirect to the home page
      navigate("/");
    }
  }, [navigate]);

  // if (isLoading) return <p>Logging iN...</p>;

  return (
    <Box className="signup__container">
      <Box className="signup__header">
        <img src={require("../../images/logo.png")} className="logo" />
      </Box>
      <Box className="form__container" style={{ marginTop: "100px" }}>
        <Box>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <label>Email</label>
              <input
                {...register("email", {
                  required: "email is required",
                  minLength: {
                    value: 6,
                    message: "Email must be at least 6 characters",
                  },
                })}
              />
              {errors.email && <small>{errors.email.message}</small>}
            </Box>
            <Box>
              <label>Username</label>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                })}
              />
              {errors.username && <small>{errors.username.message}</small>}
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
            <button type="submit" className="signup__btn">
              Sign Up
            </button>
          </form>
          <p>OR</p>

          <button id="signup__helper__text" onClick={() => navigate("/login")}>
            Already have an account? <span>Login here</span>
          </button>
        </Box>
        <img src={require("../../images/signup-img.png")} />
      </Box>
    </Box>
  );
};

export default Signup;
