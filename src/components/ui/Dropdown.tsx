import * as Select from "@radix-ui/react-select";
import { FaChevronDown } from "react-icons/fa";
import styles from "./dropdown.module.css";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({
  id,
  label,
  options,
  value,
  onValueChange,
  placeholder,
  className = "",
}: DropdownProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger id={id} className={styles.trigger} aria-label={label}>
          <Select.Value placeholder={placeholder || options[0]?.label} />
          <Select.Icon className={styles.icon}>
            <FaChevronDown size={12} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            sideOffset={8}
          >
            <Select.Viewport className={styles.viewport}>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={styles.item}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
