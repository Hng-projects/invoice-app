import { useState, type Dispatch, type SetStateAction } from "react";
import { useOutletContext } from "react-router";
import { InvoicesHeader } from "../../components/invoices/InvoicesHeader";
import { EmptyState } from "../../components/invoices/EmptyState";
import { InvoiceList } from "../../components/invoices/InvoiceList";
import { InvoiceForm } from "../../components/invoices/InvoiceForm";
import type { Invoice } from "../../types";

export function Home() {
  const { invoices, setInvoices } = useOutletContext<{
    invoices: Invoice[];
    setInvoices: Dispatch<SetStateAction<Invoice[]>>;
  }>();

  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveInvoice = (newInvoice: Invoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleToggleStatus = (status: string) => {
    if (status === "all") {
      setFilterStatuses([]);
      return;
    }

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
    <>
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
      <InvoiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveInvoice}
      />
    </>
  );
}
