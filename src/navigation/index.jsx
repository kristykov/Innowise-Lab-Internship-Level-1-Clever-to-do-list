import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../store/auth/authSlice";
import Register from "../pages/Register";
import Login from "../pages/Login";

import HomePage from "../pages/HomePage";
import Task from "../components/Task";

const Navigation = () => {
  const authenticated = useSelector(isAuthenticated);
  // const userId = localStorage.getItem("UserId");
  // const [authenticated, setAuthenticated] = useState(userId);

  // useEffect(() => {
  //   setAuthenticated(userId);
  // }, [userId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {authenticated && <Route path="/home" element={<HomePage />} />}
        {authenticated && <Route path="/task" element={<Task />} />}
        {authenticated && <Route path="/task/:id" element={<Task />} />}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
