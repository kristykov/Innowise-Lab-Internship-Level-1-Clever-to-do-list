import React from "react";
import { getFirebase } from "react-redux-firebase";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import Button from "./elements/Button";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("UserId");
    const firebase = getFirebase();
    firebase.logout().then(() => {
      navigate("/login");
    });
  };
  return (
    <header className={classes.header}>
      <a href="#home">Tassker</a>
      <nav>
        <Button type="button" aria-label="Log out" onClick={logoutHandle}>
          Log out
        </Button>
      </nav>
    </header>
  );
};

export default Header;
