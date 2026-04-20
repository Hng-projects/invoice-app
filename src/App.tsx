import { Sidebar } from "./components/layout/Sidebar";
import { InvoicesHeader } from "./components/invoices/InvoicesHeader";
import { EmptyState } from "./components/invoices/EmptyState";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.pageInner}>
          <InvoicesHeader />
          <EmptyState />
        </div>
      </main>
    </div>
  );
}

export default App;
