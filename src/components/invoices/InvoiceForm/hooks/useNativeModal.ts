import { useEffect, useRef, useState } from "react";

export function useNativeModal(isOpen: boolean) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setPortalContainer(dialog);

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.hasAttribute('data-radix-focus-guard') && (el.offsetWidth > 0 || el.offsetHeight > 0));
      
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement || document.activeElement === dialog) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      dialog.addEventListener("keydown", handleFocusTrap);
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
      dialog.removeEventListener("keydown", handleFocusTrap);
    }

    return () => {
      dialog.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen]);

  return { dialogRef, portalContainer };
}
