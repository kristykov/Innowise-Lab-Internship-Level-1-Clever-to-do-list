import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { isAuthenticated, userIdSelector } from "../store/auth/authSlice";

const ProtectedRoute = () => {
  const isAuth = useSelector(isAuthenticated);
  const hasUserId = useSelector(userIdSelector);

  if (!isAuth && !hasUserId) {
    return (
      <div style={{ margin: "200px" }}>
        <h2>Unauthorized</h2>
        <span>
          <NavLink style={{ color: "#f58742" }} to="/login">
            Login here
          </NavLink>
        </span>
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
