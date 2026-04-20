import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import styles from "./filter.module.css";

const STATUSES = ["Draft", "Pending", "Paid"];

export function Filter() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={styles.trigger}>
          <span>
            Filter <span className={styles.triggerText}>by status</span>
          </span>
          <span className={styles.icon}>
            {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={styles.content}
          sideOffset={22}
          align="center"
        >
          {STATUSES.map((status) => (
            <label key={status} className={styles.option}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected.includes(status)}
                onChange={() => toggleStatus(status)}
              />
              <div className={styles.customCheck}>
                <FiCheck size={12} className={styles.checkIcon} strokeWidth={4} />
              </div>
              {status}
            </label>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
