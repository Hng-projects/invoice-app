import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { InvoicesHeader } from "./components/invoices/InvoicesHeader";
import { EmptyState } from "./components/invoices/EmptyState";
import { InvoiceList } from "./components/invoices/InvoiceList";
import type { InvoiceItemProps } from "./components/invoices/InvoiceItem";
import styles from "./app.module.css";
import { MOCK_INVOICES } from "./data/mockInvoices";

function App() {
  const [invoices] = useState<InvoiceItemProps[]>(MOCK_INVOICES);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);

  const handleToggleStatus = (status: string) => {
    setFilterStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const filteredInvoices = invoices.filter((invoice) =>
    filterStatuses.length === 0
      ? true
      : filterStatuses.includes(invoice.status),
  );

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.pageInner}>
          <InvoicesHeader
            invoiceCount={filteredInvoices.length}
            selectedStatuses={filterStatuses}
            onToggleStatus={handleToggleStatus}
          />
          {filteredInvoices.length > 0 ? (
            <InvoiceList invoices={filteredInvoices} />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
