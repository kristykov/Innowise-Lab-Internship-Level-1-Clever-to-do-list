import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/Authorisation/Register";
import Login from "../pages/Authorisation/Login";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage/HomePage";
import Task from "../components/Task/Task";

const Navigation = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/task" element={<Task />} />
        <Route path="/task/:id" element={<Task />} />
      </Route>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="*" element={<Navigate replace to="/home" />} />
    </Routes>
  </BrowserRouter>
);

export default Navigation;
