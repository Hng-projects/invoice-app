import { useState, type Dispatch, type SetStateAction } from "react";
import { Link, useParams, useOutletContext, useNavigate } from "react-router";
import * as Popover from "@radix-ui/react-popover";
import { FiChevronLeft } from "react-icons/fi";
import { StatusBadge } from "../../components/invoices/StatusBadge";
import { Button } from "../../components/ui/Button";
import { InvoiceForm } from "../../components/invoices/InvoiceForm";
import { DeleteModal } from "../../components/invoices/DeleteModal";
import type { Invoice } from "../../types";
import styles from "./invoice-details.module.css";

export function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, setInvoices } = useOutletContext<{
    invoices: Invoice[];
    setInvoices: Dispatch<SetStateAction<Invoice[]>>;
  }>();

  const invoice = invoices.find((inv) => inv.id === id);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusPopoverOpen, setIsStatusPopoverOpen] = useState(false);

  const handleSaveInvoice = (updatedInvoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)),
    );
  };

  const confirmDelete = () => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    navigate("/");
  };

  if (!invoice) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>Invoice not found</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const handleMarkAsPaid = () => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.goBack}>
        <FiChevronLeft size={16} /> Go back
      </Link>

      <div className={styles.actionBar}>
        <div className={styles.statusGroup}>
          <span>Status</span>
          <Popover.Root open={isStatusPopoverOpen} onOpenChange={setIsStatusPopoverOpen}>
            <Popover.Trigger asChild>
              <button 
                className={styles.badgeTrigger}
                disabled={invoice.status === "paid"}
              >
                <StatusBadge status={invoice.status} />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={styles.statusPopover}
                sideOffset={8}
                align="start"
              >
                {["draft", "pending", "paid"].map((st) => (
                  <button 
                    key={st} 
                    className={styles.statusOption}
                    onClick={() => {
                      setInvoices((prev) =>
                        prev.map((inv) => (inv.id === id ? { ...inv, status: st as any } : inv)),
                      );
                      setIsStatusPopoverOpen(false);
                    }}
                  >
                    <StatusBadge status={st as any} />
                  </button>
                ))}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className={styles.desktopButtons}>
          {invoice.status !== "paid" && (
            <Button variant="secondary" onClick={() => setIsEditFormOpen(true)}>
              Edit
            </Button>
          )}
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </Button>
          {invoice.status === "pending" && (
            <Button variant="primary" onClick={handleMarkAsPaid}>
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      <div className={styles.detailsCard}>
        <div className={styles.cardHeader}>
          <div className={styles.idGroup}>
            <span className={styles.id}>
              <span className={styles.hash}>#</span>
              {invoice.id}
            </span>
            <span className={styles.description}>{invoice.description}</span>
          </div>
          <div className={styles.senderAddress}>
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>

        <div className={styles.middleGrid}>
          <div className={styles.datesGroup}>
            <div className={styles.fieldGroup}>
              <span className={styles.label}>Invoice Date</span>
              <span className={styles.value}>{invoice.createdAt}</span>
            </div>
            <div className={styles.fieldGroup}>
              <span className={styles.label}>Payment Due</span>
              <span className={styles.value}>{invoice.paymentDue}</span>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <span className={styles.label}>Bill To</span>
            <span className={styles.value}>{invoice.clientName}</span>
            <div className={styles.clientAddress}>
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <span className={styles.label}>Sent to</span>
            <span className={styles.value}>{invoice.clientEmail}</span>
          </div>
        </div>

        <div className={styles.itemsTableWrapper}>
          <div className={styles.tablePaddingLayer}>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>QTY.</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className={styles.boldColumnLeft}>
                      <span className={styles.desktopItemName}>
                        {item.name}
                      </span>
                      <div className={styles.mobileItemDetails}>
                        <span className={styles.mobileItemName}>
                          {item.name}
                        </span>
                        <span className={styles.mobileItemMath}>
                          {item.quantity} x {formatCurrency(item.price)}
                        </span>
                      </div>
                    </td>
                    <td className={styles.desktopOnly}>{item.quantity}</td>
                    <td className={styles.desktopOnly}>
                      {formatCurrency(item.price)}
                    </td>
                    <td className={styles.boldColumn}>
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tableFooter}>
            <span>Amount Due</span>
            <span className={styles.grandTotal}>
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.mobileButtons}>
        {invoice.status !== "paid" && (
          <Button variant="secondary" onClick={() => setIsEditFormOpen(true)}>
            Edit
          </Button>
        )}
        <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
          Delete
        </Button>
        {invoice.status === "pending" && (
          <Button variant="primary" onClick={handleMarkAsPaid}>
            Mark as Paid
          </Button>
        )}
      </div>

      <InvoiceForm 
        isOpen={isEditFormOpen} 
        onClose={() => setIsEditFormOpen(false)} 
        isEdit={true} 
        defaultValues={invoice}
        onSave={handleSaveInvoice}
      />

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        invoiceId={invoice.id}
      />
    </div>
  );
}
