import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./components/layout/Sidebar";
import styles from "./app.module.css";
import { MOCK_INVOICES } from "./data/mockInvoices";
import type { Invoice } from "./types";

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);

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
