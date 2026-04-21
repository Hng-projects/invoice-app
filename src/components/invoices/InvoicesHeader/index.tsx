import { FaPlus } from "react-icons/fa";
import { Button } from "../../ui/Button";
import { Filter } from "../Filter";
import styles from "./invoices-header.module.css";

interface InvoicesHeaderProps {
  invoiceCount: number;
}

export function InvoicesHeader({ invoiceCount }: InvoicesHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Invoices</h1>
        <p className={styles.subtitle}>
          {invoiceCount === 0 ? (
            "No invoices"
          ) : (
            <>
              <span className={styles.mobileSubtitle}>{invoiceCount} invoices</span>
              <span className={styles.desktopSubtitle}>There are {invoiceCount} total invoices</span>
            </>
          )}
        </p>
      </div>
      <div className={styles.right}>
        <Filter />
        <Button icon={<FaPlus size={12} />} onClick={() => console.log("New Invoice")}>
          New<span className={styles.buttonText}>{" "}Invoice</span>
        </Button>
      </div>
    </header>
  );
}
