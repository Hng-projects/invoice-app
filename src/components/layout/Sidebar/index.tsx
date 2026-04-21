import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./sidebar.module.css";
import avatarImg from "../../../assets/avatar.png";
import { useTheme } from "../../../contexts/ThemeContext";

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

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
