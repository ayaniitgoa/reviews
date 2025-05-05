import React from "react";
import styles from "./TopBar.module.css";
import { useAuthStore } from "../../store/authStore.jsx";
import { Settings } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

function TopBar() {
  const { user, loading, logout } = useAuthStore();
  return (
    <div className={`${styles.topbar}`}>
      <div className={`${styles.reviewLogoText} `}>Reviews.</div>
      <SearchBar />
      <div className={`${styles.rightSideTopBar} `}>
        <div>{user.name}</div>
        <button onClick={logout}>Logout</button>
        <Settings />
      </div>
    </div>
  );
}

export default TopBar;
