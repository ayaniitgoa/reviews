import React, { useState, useRef } from "react";
import styles from "./TopBar.module.css";
import { useAuthStore } from "../../store/authStore.jsx";
import { Settings, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";
import { useRouter } from "next/navigation";

function TopBar() {
  const router = useRouter();
  const { user, loading, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    router.push("/"); // Redirect to homepage
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.logoContainer} onClick={handleLogoClick}>
        <div className={styles.headerWrapper}>
          <span className={styles.reviewLogoText}>Reviews</span>
          <span className={styles.headerDot}>.</span>
        </div>
      </div>
      <SearchBar />
      <div className={styles.rightSideTopBar}>
        <div className={styles.userName}>{user?.name}</div>
        <div className={styles.settingsMenu} ref={menuRef}>
          <button
            className={styles.settingsButton}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Settings size={20} />
            {showMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showMenu && (
            <div className={styles.dropdownMenu}>
              <button
                className={styles.menuItem}
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
              >
                <LogOut size={16} className={styles.menuIcon} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
