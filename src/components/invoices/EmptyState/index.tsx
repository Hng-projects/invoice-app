import emptyImage from "../../../assets/no_invoice_vector.png";
import styles from "./empty-state.module.css";

export function EmptyState() {
  return (
    <div className={styles.container}>
      <img src={emptyImage} alt="No invoices available" className={styles.image} />
      <h2 className={styles.title}>There is nothing here</h2>
      <p className={styles.description}>
        Create an invoice by clicking the <span className={styles.bold}>New <span className={styles.desktopText}>Invoice</span></span> button and get started
      </p>
    </div>
  );
}
