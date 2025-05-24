"use client";

import React, { useState } from "react";
import styles from "./SignUp.module.css";
import ReviewTextHeader from "../../components/ReviewTextHeader/ReviewTextHeader";
import GoogleButtonSignIn from "../../components/GoogleButton/GoogleButtonSignIn";

function SignUp() {
  const [user, setUser] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.brandSection}>
          <div className={styles.logoContainer}>
            <ReviewTextHeader user={user} />
          </div>
          <div className={styles.brandContent}>
            <h2 className={styles.tagline}>Join Our Community</h2>
            <div className={styles.dividerLine}></div>
            <p className={styles.brandText}>
              Your all-in-one review hub. No more jumping between sites - get
              and share honest opinions about anything in one trusted place.
            </p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.formTitle}>Create Account</h3>

          <GoogleButtonSignIn className={styles.googleButton} />

          <div className={styles.divider}>
            <span className={styles.dividerText}>or sign up with email</span>
          </div>

          <form className={styles.emailForm}>
            <div className={styles.nameFields}>
              <input
                type="text"
                placeholder="First name"
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Last name"
                className={styles.input}
              />
            </div>

            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Create password (8+ characters)"
              className={styles.input}
            />

            <div className={styles.terms}>
              <input type="checkbox" id="terms" className={styles.checkbox} />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              Continue
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
