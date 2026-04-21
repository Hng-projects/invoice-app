import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import styles from "./filter.module.css";

export interface FilterProps {
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
}

export function Filter({ selectedStatuses, onToggleStatus }: FilterProps) {
  const [open, setOpen] = useState(false);

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
          {["All", "Draft", "Pending", "Paid"].map((label) => {
            const val = label.toLowerCase();
            const isChecked =
              val === "all"
                ? selectedStatuses.length === 0
                : selectedStatuses.includes(val);

            return (
              <label key={val} className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isChecked}
                  onChange={() => onToggleStatus(val)}
                />
                <div className={styles.customCheck}>
                  <FiCheck size={12} className={styles.checkIcon} strokeWidth={4} />
                </div>
                {label}
              </label>
            );
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
