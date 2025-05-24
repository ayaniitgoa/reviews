import React from "react";
import styles from "./ReviewTextHeader.module.css";

function ReviewTextHeader({ user }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleHeader}>
        <span className={styles.textGradient}>Reviews</span>
        <span className={styles.decorativeDot}>.</span>
      </div>
    </div>
  );
}

export default ReviewTextHeader;