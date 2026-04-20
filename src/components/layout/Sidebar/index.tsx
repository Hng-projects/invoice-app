import { useState, useEffect } from "react";
import { FaMoon, FaCircle } from "react-icons/fa";
import styles from "./sidebar.module.css";
import avatarImg from "../../../assets/avatar.png";

export function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoSemiCircle}></div>
        <img src="/logo.svg" alt="Invoice App Logo" className={styles.logo} />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FaCircle size={20} /> : <FaMoon size={20} />}
        </button>

        <div className={styles.avatarContainer}>
          <img src={avatarImg} alt="User avatar" className={styles.avatar} />
        </div>
      </div>
    </aside>
  );
}
