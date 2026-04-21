import { FiChevronRight } from "react-icons/fi";
import { StatusBadge } from "../StatusBadge";
import styles from "./invoice-item.module.css";
import { Link } from "react-router";

export interface InvoiceItemProps {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: "paid" | "pending" | "draft";
}

export function InvoiceItem({
  id,
  paymentDue,
  clientName,
  total,
  status,
}: InvoiceItemProps) {
  const formattedTotal = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(total);

  return (
    <Link to={`/invoice/${id}`} className={styles.card}>
      <div className={styles.mobileTop}>
        <span className={styles.id}>
          <span className={styles.hash}>#</span>
          {id}
        </span>
        <span className={styles.client}>{clientName}</span>
      </div>

      <div className={styles.mobileBottom}>
        <div className={styles.leftGroup}>
          <span className={styles.date}>Due {paymentDue}</span>
          <span className={styles.amount}>{formattedTotal}</span>
        </div>
        <div className={styles.statusWrapper}>
          <StatusBadge status={status} />
        </div>
      </div>

      <div className={styles.chevron}>
        <FiChevronRight size={16} />
      </div>
    </Link>
  );
}
