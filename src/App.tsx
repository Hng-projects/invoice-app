import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { InvoicesHeader } from "./components/invoices/InvoicesHeader";
import { EmptyState } from "./components/invoices/EmptyState";
import { InvoiceList } from "./components/invoices/InvoiceList";
import type { InvoiceItemProps } from "./components/invoices/InvoiceItem";
import styles from "./App.module.css";
import { MOCK_INVOICES } from "./data/mockInvoices";

function App() {
  const [invoices] = useState<InvoiceItemProps[]>(MOCK_INVOICES);

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.pageInner}>
          <InvoicesHeader invoiceCount={invoices.length} />
          {invoices.length > 0 ? (
            <InvoiceList invoices={invoices} />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
