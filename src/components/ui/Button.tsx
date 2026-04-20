import React from "react";
import styles from "./button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  icon?: React.ReactNode;
  wide?: boolean;
}

export function Button({
  variant = "primary",
  icon,
  wide,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    icon ? styles.withIcon : "",
    wide ? styles.wide : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} {...props}>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
      {children}
    </button>
  );
}
