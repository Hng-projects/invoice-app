import { FaTrash } from "react-icons/fa";
import { TextField } from "../../ui/TextField";
import { Button } from "../../ui/Button";
import type { FormItem } from "./types";
import styles from "./invoice-form.module.css";

interface ItemListSectionProps {
  items: FormItem[];
  errors: { [key: string]: string };
  onItemChange: (id: string, field: keyof FormItem, value: string) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: () => void;
}

export function ItemListSection({
  items,
  errors,
  onItemChange,
  onDeleteItem,
  onAddItem,
}: ItemListSectionProps) {
  return (
    <div className={styles.itemListSection}>
      <h3 className={styles.itemListTitle}>Item List</h3>

      <div className={styles.tableHeaders}>
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
        <span className={styles.opacity0}>Action</span>
      </div>

      <div className={styles.itemRows}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemNameWrapper}>
              <TextField 
                id={`item-${index}-name`} 
                label="Item Name" 
                value={item.name} 
                placeholder="Banner Design"
                onChange={(e) => onItemChange(item.id, "name", e.target.value)} 
                error={errors[`item-${index}-name`]}
                hideLabelOnDesktop 
              />
            </div>
            <div className={styles.itemMetricsWrapper}>
              <div className={styles.qtyWrap}>
                <TextField 
                  id={`item-${index}-qty`} 
                  label="Qty." 
                  type="number"
                  min="0"
                  value={item.qty} 
                  placeholder="1"
                  onChange={(e) => onItemChange(item.id, "qty", e.target.value)} 
                  error={errors[`item-${index}-qty`]}
                  hideLabelOnDesktop 
                />
              </div>
              <div className={styles.priceWrap}>
                <TextField 
                  id={`item-${index}-price`} 
                  label="Price" 
                  type="number"
                  min="0"
                  value={item.price} 
                  placeholder="156.00"
                  onChange={(e) => onItemChange(item.id, "price", e.target.value)} 
                  error={errors[`item-${index}-price`]}
                  hideLabelOnDesktop 
                />
              </div>
              <div className={styles.totalWrap}>
                <TextField 
                  id={`item-${index}-total`} 
                  label="Total" 
                  type="number"
                  value={(!item.qty || !item.price) ? "" : item.total.toFixed(2)}
                  readOnly
                  hideLabelOnDesktop 
                />
              </div>
              <div className={styles.actionWrap}>
                {items.length > 1 && (
                  <button type="button" className={styles.deleteBtn} aria-label="Delete" onClick={() => onDeleteItem(item.id)}>
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" className={styles.addItemBtn} wide onClick={onAddItem}>
        + Add New Item
      </Button>
    </div>
  );
}
