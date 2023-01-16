import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFirebase } from "react-redux-firebase";
import classes from "./Register.module.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState(null);
  const [errorAuth, setErrorAuth] = useState(null);

  const onSubmit = (data) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const userId = res.user.uid;
        localStorage.setItem("UserId", userId);
        <Navigate replace to="/home" />;
        setUser(userId);
      })
      .catch((error) => {
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
            Don&apos;t have an account?{" "}
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
        {user && <Navigate replace to="/home" />}
      </div>
    </div>
  );
};

export default Login;
