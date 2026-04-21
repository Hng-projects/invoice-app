import styles from "./status-badge.module.css";

interface StatusBadgeProps {
  status: "paid" | "pending" | "draft";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[status]}`}>
      <div className={styles.dot} />
      {status}
    </div>
  );
}
