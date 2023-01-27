import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { login } from "../../store/auth/authSlice";

import classes from "./Register.module.scss";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [errorAuth, setErrorAuth] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.password.length < 6) {
      setPasswordError("Password is too short");
    }
    setLoading(true);
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
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
            Register
          </button>
        </form>
        {passwordError && (
          <p className={classes["container-card-form-subtitle-error"]}>
            {passwordError}
          </p>
        )}
        {errorAuth === "Email already in use" && (
          <p className={classes["container-card-form-subtitle-error"]}>
            {errorAuth}
            <a className={classes["container-card-form-link"]} href="/login">
              Login here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
