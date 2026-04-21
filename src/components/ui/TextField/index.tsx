import { type InputHTMLAttributes } from "react";
import styles from "./text-field.module.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hideLabelOnDesktop?: boolean;
  className?: string;
}

export function TextField({
  label,
  id,
  error,
  hideLabelOnDesktop,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <div className={`${styles.container} ${error ? styles.hasError : ""} ${hideLabelOnDesktop ? styles.hideLabelDesktop : ""} ${className}`}>
      <div className={styles.labelWrapper}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}
