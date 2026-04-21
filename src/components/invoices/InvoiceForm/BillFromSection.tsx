import { TextField } from "../../ui/TextField";
import type { Invoice } from "../../../types";
import styles from "./invoice-form.module.css";

interface BillFromSectionProps {
  errors: { [key: string]: string };
  defaultValues?: Invoice;
}

export function BillFromSection({
  errors,
  defaultValues,
}: BillFromSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Bill From</legend>
      <div className={styles.rowFull}>
        <TextField
          id="senderStreet"
          name="senderStreet"
          label="Street Address"
          placeholder="19 Union Terrace"
          error={errors["senderStreet"]}
          defaultValue={defaultValues?.senderAddress?.street}
        />
      </div>
      <div className={styles.row3}>
        <TextField
          id="senderCity"
          name="senderCity"
          label="City"
          placeholder="London"
          error={errors["senderCity"]}
          defaultValue={defaultValues?.senderAddress?.city}
        />
        <TextField
          id="senderPostCode"
          name="senderPostCode"
          label="Post Code"
          placeholder="12345"
          error={errors["senderPostCode"]}
          defaultValue={defaultValues?.senderAddress?.postCode}
        />
        <TextField
          id="senderCountry"
          name="senderCountry"
          label="Country"
          placeholder="United Kingdom"
          error={errors["senderCountry"]}
          defaultValue={defaultValues?.senderAddress?.country}
        />
      </div>
    </fieldset>
  );
}
