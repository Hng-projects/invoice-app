import { DatePicker } from "../../ui/DatePicker";
import { Dropdown } from "../../ui/Dropdown";
import { TextField } from "../../ui/TextField";
import styles from "./invoice-form.module.css";

interface InvoiceDetailsSectionProps {
  errors: { [key: string]: string };
  invoiceDate: Date;
  setInvoiceDate: (date: Date) => void;
  paymentTerms: string;
  setPaymentTerms: (terms: string) => void;
  portalContainer: HTMLElement | null;
}

export function InvoiceDetailsSection({
  errors,
  invoiceDate,
  setInvoiceDate,
  paymentTerms,
  setPaymentTerms,
  portalContainer,
}: InvoiceDetailsSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <div className={styles.row2}>
        <DatePicker 
          label="Invoice Date" 
          value={invoiceDate} 
          onChange={setInvoiceDate}
          portalContainer={portalContainer} 
        />
        <Dropdown
          id="paymentTerms"
          label="Payment Terms"
          value={paymentTerms}
          onValueChange={setPaymentTerms}
          portalContainer={portalContainer}
          options={[
            { value: "1", label: "Net 1 Day" },
            { value: "7", label: "Net 7 Days" },
            { value: "14", label: "Net 14 Days" },
            { value: "30", label: "Net 30 Days" },
          ]}
        />
      </div>
      <div className={styles.rowFull}>
        <TextField 
          id="description" 
          name="description" 
          label="Project Description" 
          placeholder="e.g. Graphic Design"
          error={errors["description"]} 
        />
      </div>
    </fieldset>
  );
}
