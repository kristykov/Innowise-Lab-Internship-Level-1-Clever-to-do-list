import React from "react";
import { getFirebase } from "react-redux-firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./Header.module.scss";
import Button from "../elements/Button";
import { logout } from "../../store/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandle = () => {
    localStorage.removeItem("userId");
    dispatch(logout());
    const firebase = getFirebase();
    firebase.logout().then(() => {
      navigate("/login");
    });
  };
  return (
    <header className={s.header}>
      <Link to="/home">Tassker</Link>
      <nav>
        <Button type="button" aria-label="Log out" onClick={logoutHandle}>
          Log out
        </Button>
      </nav>
    </header>
  );
};

export default Header;
