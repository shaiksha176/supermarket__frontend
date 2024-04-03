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
type FormData = {
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state: any) => state.auth,
  );
  console.table({ isError, isLoading, isSuccess, message });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isLoading, isError, isSuccess, message, user } = useSelector(
  //   (state: any) => state.auth,
  // );
  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    console.log("Form Errors:", errors);
    dispatch(login(data) as any);
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
    <div className="signup__container">
      <div className="signup__header">
        <img src={require("../../images/logo.png")} className="logo" />
      </div>
      <div className="form__container">
        <div>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Email</label>
              <input
                {...register("email", {
                  required: "email is required",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                })}
              />
              {errors.email && <small>{errors.email.message}</small>}
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && <small>{errors.password.message}</small>}
            </div>
            <button type="submit" className="signup__btn">
              Sign Up
            </button>
          </form>
          <p>OR</p>

          <button
            id="signup__helper__text"
            onClick={() => navigate("/login")}
          >
            Already have an account? <span>Login here</span>
          </button>
        </div>
        <img src={require("../../images/signup-img.png")} />
      </div>
    </div>
  );
};

export default Signup;
