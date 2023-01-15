import React from "react";
import classes from "./Button.module.scss";

const Button = ({ children, type, onClick }) => (
  <button
    className={`${classes.button} ${
      type === "add-task" ? classes["add-task-btn"] : ""
    }`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
