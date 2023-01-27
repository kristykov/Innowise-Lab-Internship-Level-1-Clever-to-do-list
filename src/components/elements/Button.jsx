import React from "react";
import s from "./Button.module.scss";

const Button = ({ children, type, onClick }) => (
  <button
    className={`${s.button} ${type === "add-task" ? s["add-task-btn"] : ""}`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
