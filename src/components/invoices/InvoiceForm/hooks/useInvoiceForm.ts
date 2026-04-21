import { useState, useEffect, type FormEvent } from "react";
import { format, addDays } from "date-fns";
import type { Invoice } from "../../../../types";
import type { FormItem } from "../types";

export function useInvoiceForm(
  isOpen: boolean,
  onClose: () => void,
  isEdit: boolean | undefined,
  onSave: ((invoice: Invoice) => void) | undefined,
) {
  const [items, setItems] = useState<FormItem[]>([
    { id: "1", name: "", qty: "", price: "", total: 0 },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [paymentTerms, setPaymentTerms] = useState<string>("30");

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: "",
        qty: "1",
        price: "0.00",
        total: 0,
      },
    ]);
  };

  const handleItemChange = (
    id: string,
    field: keyof FormItem,
    value: string,
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "qty" || field === "price") {
            const qtyVal = parseFloat(updated.qty) || 0;
            const priceVal = parseFloat(updated.price) || 0;
            updated.total = qtyVal * priceVal;
          }
          return updated;
        }
        return item;
      }),
    );
  };

  const preventEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        e.preventDefault();
      }
    }
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = [
      "senderStreet",
      "senderCity",
      "senderPostCode",
      "senderCountry",
      "clientName",
      "clientEmail",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
      "description",
    ];

    requiredFields.forEach((field) => {
      const val = formData.get(field) as string;
      if (!val || val.trim() === "") {
        newErrors[field] = "can't be empty";
      }
    });

    const email = formData.get("clientEmail") as string;
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors["clientEmail"] = "invalid format";
      }
    }

    if (items.length === 0) {
      newErrors["items"] = "An item must be added";
    }

    items.forEach((item, index) => {
      if (!item.name || item.name.trim() === "") {
        newErrors[`item-${index}-name`] = "can't be empty";
      }
      const qty = parseFloat(item.qty);
      if (!item.qty || isNaN(qty) || qty <= 0) {
        newErrors[`item-${index}-qty`] = "Invalid";
      }
      const price = parseFloat(item.price);
      if (!item.price || isNaN(price) || price <= 0) {
        newErrors[`item-${index}-price`] = "Invalid";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveInvoice = (statusToSave: "draft" | "pending") => {
    const form = document.getElementById("invoice-form") as HTMLFormElement;
    if (!form || !onSave) return;

    const formData = new FormData(form);

    if (statusToSave === "pending" || isEdit) {
      if (!validateForm(formData)) return;
    } else {
      setErrors({});
    }

    const clientName =
      (formData.get("clientName") as string) ||
      (statusToSave === "draft" ? "Draft" : "New Client");

    const due = addDays(invoiceDate, parseInt(paymentTerms, 10) || 30);
    const paymentDue = format(due, "dd MMM yyyy");

    onSave({
      id: "RT" + Math.floor(Math.random() * 9000 + 1000),
      createdAt: format(invoiceDate, "dd MMM yyyy"),
      paymentDue,
      description: (formData.get("description") as string) || "Graphic Design",
      paymentTerms: parseInt(paymentTerms, 10) || 30,
      clientName,
      clientEmail: (formData.get("clientEmail") as string) || "",
      status: statusToSave,
      senderAddress: {
        street: (formData.get("senderStreet") as string) || "",
        city: (formData.get("senderCity") as string) || "",
        postCode: (formData.get("senderPostCode") as string) || "",
        country: (formData.get("senderCountry") as string) || "",
      },
      clientAddress: {
        street: (formData.get("clientStreet") as string) || "",
        city: (formData.get("clientCity") as string) || "",
        postCode: (formData.get("clientPostCode") as string) || "",
        country: (formData.get("clientCountry") as string) || "",
      },
      items: items.map((i) => ({
        name: i.name,
        quantity: parseInt(i.qty) || 0,
        price: parseFloat(i.price) || 0,
        total: i.total,
      })),
      total: items.reduce((acc, item) => acc + item.total, 0),
    });

    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveInvoice("pending");
  };

  const hasEmptyErrors = Object.values(errors).includes("can't be empty");
  const hasItemsError = !!errors["items"];

  return {
    items,
    errors,
    invoiceDate,
    setInvoiceDate,
    paymentTerms,
    setPaymentTerms,
    handleAddItem,
    handleItemChange,
    handleDeleteItem,
    preventEnterSubmit,
    handleSubmit,
    saveInvoice,
    hasEmptyErrors,
    hasItemsError,
  };
}
