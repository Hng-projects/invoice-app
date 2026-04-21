import { FiChevronLeft } from "react-icons/fi";
import type { Invoice } from "../../../types";
import { BillFromSection } from "./BillFromSection";
import { BillToSection } from "./BillToSection";
import { InvoiceDetailsSection } from "./InvoiceDetailsSection";
import { ItemListSection } from "./ItemListSection";
import { ActionBar } from "./ActionBar";
import { useNativeModal } from "./hooks/useNativeModal";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import styles from "./invoice-form.module.css";

export interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  onSave?: (invoice: Invoice) => void;
}

export function InvoiceForm({
  isOpen,
  onClose,
  isEdit,
  onSave,
}: InvoiceFormProps) {
  const { dialogRef, portalContainer } = useNativeModal(isOpen);

  const {
    items,
    errors,
    invoiceDate,
    setInvoiceDate,
    paymentTerms,
    setPaymentTerms,
    handleAddItem,
    handleItemChange,
    handleDeleteItem,
    preventEnterSubmit,
    handleSubmit,
    saveInvoice,
    hasEmptyErrors,
    hasItemsError,
  } = useInvoiceForm(isOpen, onClose, isEdit, onSave);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className={styles.scrollArea}>
        <button
          className={styles.goBack}
          onClick={onClose}
          aria-label="Go back"
          type="button"
        >
          <FiChevronLeft size={16} /> Go back
        </button>

        <h2 className={styles.mainTitle}>
          {isEdit ? "Edit #XM9141" : "New Invoice"}
        </h2>

        <form
          id="invoice-form"
          className={styles.form}
          onSubmit={handleSubmit}
          onKeyDown={preventEnterSubmit}
        >
          <BillFromSection errors={errors} />

          <BillToSection errors={errors} />

          <InvoiceDetailsSection
            errors={errors}
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            paymentTerms={paymentTerms}
            setPaymentTerms={setPaymentTerms}
            portalContainer={portalContainer}
          />

          <ItemListSection
            items={items}
            errors={errors}
            onItemChange={handleItemChange}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
          />

          {(hasEmptyErrors || hasItemsError) && (
            <div className={styles.validationErrors}>
              {hasEmptyErrors && <p>- All fields must be added</p>}
              {hasItemsError && <p>- {errors["items"]}</p>}
            </div>
          )}
        </form>
      </div>

      <ActionBar
        isEdit={isEdit}
        onClose={onClose}
        onSaveDraft={() => saveInvoice("draft")}
      />
    </dialog>
  );
}
