import { FaPlus } from "react-icons/fa";
import { Button } from "../../ui/Button";
import { Filter } from "../Filter";
import styles from "./invoices-header.module.css";

export function InvoicesHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Invoices</h1>
        <p className={styles.subtitle}>No invoices</p>
      </div>
      <div className={styles.right}>
        <Filter />
        <Button icon={<FaPlus size={12} />} onClick={() => console.log("New Invoice")}>
          New <span className={styles.buttonText}>Invoice</span>
        </Button>
      </div>
    </header>
  );
}
