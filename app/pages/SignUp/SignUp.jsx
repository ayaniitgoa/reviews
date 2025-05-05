"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import styles from "./SignUp.module.css";
import ReviewTextHeader from "../../components/ReviewTextHeader/ReviewTextHeader";
import GoogleButtonSignIn from "../../components/GoogleButton/GoogleButtonSignIn";

function SignUp() {
  const [user, setUser] = useState(null);

  return (
    <div className={`${styles.centerDiv}`}>
      <ReviewTextHeader user={user} />
      <GoogleButtonSignIn />
    </div>
  );
}

export default SignUp;
