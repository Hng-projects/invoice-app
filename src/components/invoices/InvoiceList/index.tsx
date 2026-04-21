import { InvoiceItem, type InvoiceItemProps } from "../InvoiceItem";
import styles from "./invoice-list.module.css";

interface InvoiceListProps {
  invoices: InvoiceItemProps[];
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
