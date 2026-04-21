import { TextField } from "../../ui/TextField";
import type { Invoice } from "../../../types";
import styles from "./invoice-form.module.css";

interface BillToSectionProps {
  errors: { [key: string]: string };
  defaultValues?: Invoice;
}

export function BillToSection({ errors, defaultValues }: BillToSectionProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Bill To</legend>
      <div className={styles.rowFull}>
        <TextField
          id="clientName"
          name="clientName"
          label="Client's Name"
          placeholder="e.g. Alex Grim"
          error={errors["clientName"]}
          defaultValue={defaultValues?.clientName}
        />
      </div>
      <div className={styles.rowFull}>
        <TextField
          id="clientEmail"
          name="clientEmail"
          label="Client's Email"
          placeholder="e.g. alexgrim@mail.com"
          error={errors["clientEmail"]}
          defaultValue={defaultValues?.clientEmail}
        />
      </div>
      <div className={styles.rowFull}>
        <TextField
          id="clientStreet"
          name="clientStreet"
          label="Street Address"
          placeholder="84 Church Way"
          error={errors["clientStreet"]}
          defaultValue={defaultValues?.clientAddress?.street}
        />
      </div>
      <div className={styles.row3}>
        <TextField
          id="clientCity"
          name="clientCity"
          label="City"
          placeholder="Bradford"
          error={errors["clientCity"]}
          defaultValue={defaultValues?.clientAddress?.city}
        />
        <TextField
          id="clientPostCode"
          name="clientPostCode"
          label="Post Code"
          placeholder="BD1 9PB"
          error={errors["clientPostCode"]}
          defaultValue={defaultValues?.clientAddress?.postCode}
        />
        <TextField
          id="clientCountry"
          name="clientCountry"
          label="Country"
          placeholder="United Kingdom"
          error={errors["clientCountry"]}
          defaultValue={defaultValues?.clientAddress?.country}
        />
      </div>
    </fieldset>
  );
}
