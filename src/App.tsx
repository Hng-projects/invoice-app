import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./components/layout/Sidebar";
import styles from "./app.module.css";
import { MOCK_INVOICES } from "./data/mockInvoices";
import type { Invoice } from "./types";

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem("invoicesData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse invoices from localStorage", err);
      }
    }
    localStorage.setItem("invoicesData", JSON.stringify(MOCK_INVOICES));
    return MOCK_INVOICES;
  });

  useEffect(() => {
    localStorage.setItem("invoicesData", JSON.stringify(invoices));
  }, [invoices]);

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.pageInner}>
          <Outlet context={{ invoices, setInvoices }} />
        </div>
      </main>
    </div>
  );
}

export default App;
