import { Button } from "../../ui/Button";
import { useNativeModal } from "../InvoiceForm/hooks/useNativeModal";
import styles from "./delete-modal.module.css";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invoiceId: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, invoiceId }: DeleteModalProps) {
  const { dialogRef } = useNativeModal(isOpen);

  return (
    <dialog ref={dialogRef} className={styles.dialog} onCancel={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Confirm Deletion</h2>
        <p className={styles.description}>
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </dialog>
  );
}
