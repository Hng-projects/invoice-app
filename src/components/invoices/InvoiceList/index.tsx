import { InvoiceItem } from "../InvoiceItem";
import styles from "./invoice-list.module.css";
import type { Invoice } from "../../../types";

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <div className={styles.list}>
      {invoices.map((invoice) => (
        <InvoiceItem key={invoice.id} {...invoice} />
      ))}
    </div>
  );
}
