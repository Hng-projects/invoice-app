import { type InputHTMLAttributes } from "react";
import styles from "./text-field.module.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
}

export function TextField({
  label,
  id,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}
