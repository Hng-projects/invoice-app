import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { InvoicesHeader } from "./components/invoices/InvoicesHeader";
import { EmptyState } from "./components/invoices/EmptyState";
import { InvoiceList } from "./components/invoices/InvoiceList";
import { InvoiceForm } from "./components/invoices/InvoiceForm";
import type { InvoiceItemProps } from "./components/invoices/InvoiceItem";
import styles from "./app.module.css";
import { MOCK_INVOICES } from "./data/mockInvoices";

function App() {
  const [invoices, setInvoices] = useState<InvoiceItemProps[]>(MOCK_INVOICES);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveInvoice = (newInvoice: InvoiceItemProps) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

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
            onNewInvoice={() => setIsFormOpen(true)}
          />
          {filteredInvoices.length > 0 ? (
            <InvoiceList invoices={filteredInvoices} />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveInvoice} />
    </div>
  );
}

export default App;
