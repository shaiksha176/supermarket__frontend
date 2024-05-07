import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
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

const Login: React.FC = () => {
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
      navigate("/");
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
    <>
      <img src={require("../../images/logo.png")} className="logo" />
      <div className="login__container">
        <div className="login__inputs">
          <div>
            <h1>Log In</h1>
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
              <button type="submit" className="login__btn">
                Login
              </button>
            </form>
            <p>OR</p>
            {/* <button className="google__btn">Sign In with Google</button> */}
            {/* <div>{isError && <p>{message}</p>}</div> */}
            <button
              id="login__account__creation"
              onClick={() => navigate("/register")}
            >
              Don't have an account? <span>Sign up for free</span>
            </button>
          </div>
        </div>
        <div className="login__banner">
          <img src={require("../../images/login.jpg")} />
        </div>
      </div>
    </>
  );
};

export default Login;
