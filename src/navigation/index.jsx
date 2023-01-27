import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userIdSelector } from "../store/auth/authSlice";
import Register from "../pages/Authorisation/Register";
import Login from "../pages/Authorisation/Login";

import HomePage from "../pages/HomePage/HomePage";
import Task from "../components/Task/Task";

const Navigation = () => {
  const hasUserId = useSelector(userIdSelector);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        {hasUserId && <Route path="/home" element={<HomePage />} />}
        {hasUserId && <Route path="/task" element={<Task />} />}
        {hasUserId && <Route path="/task/:id" element={<Task />} />}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
