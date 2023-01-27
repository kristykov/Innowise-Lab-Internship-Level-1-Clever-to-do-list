import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFirebase } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";
import classes from "./Register.module.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [errorAuth, setErrorAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const userId = res.user.uid;
        localStorage.setItem("userId", userId);
        dispatch(login(userId));
      })
      .then(() => {
        navigate("/home");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/wrong-password") {
          setErrorAuth("Wrong Password");
        } else if (error.code === "auth/user-not-found") {
          setErrorAuth("Email not found, please register");
        }
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes["container-card"]}>
        <h2 className={classes["container-card-title"]}>Login</h2>
        <form
          className={classes["container-card-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          {loading && <p>Loading...</p>}
          <label htmlFor="email">
            <input
              className={classes["container-card-form-input"]}
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email"
            />
          </label>
          <label htmlFor="password">
            <input
              className={classes["container-card-form-input"]}
              id="password"
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
          </label>
          <button
            type="submit"
            aria-label="Submit"
            className={classes["container-card-form-submit"]}
          >
            Login
          </button>
          <p className={classes["container-card-form-subtitle"]}>
            Don&apos;t have an account?
            <a href="/register" className={classes["container-card-form-link"]}>
              Register here
            </a>
          </p>
        </form>
        {errorAuth && (
          <p className={classes["container-card-form-subtitle-error"]}>
            {errorAuth}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
