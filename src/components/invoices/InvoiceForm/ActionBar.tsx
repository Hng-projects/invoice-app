import { Button } from "../../ui/Button";
import styles from "./invoice-form.module.css";

interface ActionBarProps {
  isEdit?: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
}

export function ActionBar({ isEdit, onClose, onSaveDraft }: ActionBarProps) {
  return (
    <div className={`${styles.actionBar} ${isEdit ? styles.actionBarEdit : ""}`}>
      {isEdit ? (
        <>
          <Button type="button" variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="invoice-form" variant="primary">
            Save Changes
          </Button>
        </>
      ) : (
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Discard
          </Button>
          <div className={styles.rightActions}>
            <Button type="button" variant="tertiary" onClick={onSaveDraft}>
              Save as Draft
            </Button>
            <Button type="submit" form="invoice-form" variant="primary">
              Save & Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
