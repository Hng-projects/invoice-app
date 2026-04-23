import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./sidebar.module.css";
import avatarImg from "../../../assets/avatar.png";
import { useTheme } from "../../../contexts/ThemeContext";
import { Link } from "react-router";

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.logoContainer}>
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="Invoice App Logo"
          className={styles.logo}
        />
      </Link>

      <div className={styles.actions}>
        <button
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        <div className={styles.avatarContainer}>
          <img src={avatarImg} alt="User avatar" className={styles.avatar} />
        </div>
      </div>
    </aside>
  );
}
