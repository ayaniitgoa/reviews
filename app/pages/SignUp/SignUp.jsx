"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import styles from "./SignUp.module.css";
import ReviewTextHeader from "../../components/ReviewTextHeader/ReviewTextHeader";
import GoogleButtonSignIn from "../../components/GoogleButton/GoogleButtonSignIn";
import ReviewsBrowser from "@/app/components/ReviewsBrowser/ReviewsBrowser";

function SignUp() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <div className={`${styles.centerDiv}`}>
        <ReviewTextHeader user={user} />
        <GoogleButtonSignIn />
      </div>
    </div>
  );
}

export default SignUp;
