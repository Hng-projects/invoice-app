import { useId, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import styles from "./date-picker.module.css";

export interface DatePickerProps {
  label: string;
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  className = "",
}: DatePickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const selectedDate = value;

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    if (onChange) onChange(day);
    setOpen(false);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);

  // Default bounds ensure standard generic calendar matrix.
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button id={id} className={styles.trigger}>
            <span>
              {selectedDate ? format(selectedDate, "dd MMM yyyy") : ""}
            </span>
            <span className={styles.icon}>
              <FiCalendar size={16} />
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={styles.content}
            sideOffset={8}
            align="start"
          >
            <div className={styles.header}>
              <button
                aria-label="Previous month"
                className={styles.navButton}
                onClick={handlePrevMonth}
              >
                <FiChevronLeft size={16} />
              </button>
              <span className={styles.monthLabel}>
                {format(currentMonth, "MMM yyyy")}
              </span>
              <button
                aria-label="Next month"
                className={styles.navButton}
                onClick={handleNextMonth}
              >
                <FiChevronRight size={16} />
              </button>
            </div>

            <div className={styles.grid}>
              {days.map((day) => {
                const isSelected = selectedDate
                  ? isSameDay(day, selectedDate)
                  : false;
                const isOutside = !isSameMonth(day, currentMonth);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    className={`${styles.day} ${
                      isOutside ? styles.dayOutside : ""
                    } ${isSelected ? styles.daySelected : ""}`}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
