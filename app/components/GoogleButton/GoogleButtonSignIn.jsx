import React from "react";
import styles from "./GoogleButtonSignIn.module.css";
import axios from "axios";
import * as Global from "../../constants/global";
import { useAuthStore } from "../../store/authStore.jsx";
import GoogleButton from "react-google-button";

function GoogleSignInButton() {
  const login = useAuthStore((state) => state.login);

  return (
    <div className="">
      <GoogleButton onClick={login} />
    </div>
  );
}

export default GoogleSignInButton;
