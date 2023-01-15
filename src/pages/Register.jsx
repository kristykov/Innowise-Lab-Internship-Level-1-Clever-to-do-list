import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFirebase } from "react-redux-firebase";
import classes from "./Register.module.scss";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState(null);
  const [errorAuth, setErrorAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Auth token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const onSubmit = (data) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const userId = res.user.uid;
        localStorage.setItem("UserId", userId);
        setUser(userId);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorAuth("Email already in use");
          console.log("The email is already in use.");
        }
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes["container-card"]}>
        <h2 className={classes["container-card-title"]}>
          Let&apos;s create a new account for you
        </h2>
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
            Register
          </button>
        </form>
        {errorAuth === "Email already in use" && (
          <p className={classes["container-card-form-subtitle-error"]}>
            {errorAuth}.
            <a className={classes["container-card-form-link"]} href="/login">
              Login here
            </a>
          </p>
        )}
        {(user || isLoggedIn) && <Navigate replace to="/home" />}
      </div>
    </div>
  );
};

export default Register;
