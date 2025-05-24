import React from "react";
import styles from "./GoogleButtonSignIn.module.css";
import { useAuthStore } from "../../store/authStore.jsx";
import { FcGoogle } from "react-icons/fc"; // Using react-icons for Google logo

function GoogleSignInButton() {
  const login = useAuthStore((state) => state.login);

  return (
    <button className={styles.googleButton} onClick={login}>
      <FcGoogle className={styles.googleIcon} />
      <span className={styles.buttonText}>Continue with Google</span>
    </button>
  );
}

export default GoogleSignInButton;