"use client";

import React from "react";
import styles from "./LoadingScreen.module.css";

export const LoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.logoContainer}>
          {/* Use your ReviewTextHeader component or a simplified version */}
          <span className={styles.logoText}>Reviews</span>
        </div>

        <div className={styles.loadingAnimation}>
          <div className={styles.spinner}></div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>

        <p className={styles.loadingText}>
          Curating the best reviews for you...
        </p>
      </div>
    </div>
  );
};
