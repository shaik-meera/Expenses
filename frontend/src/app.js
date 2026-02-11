import { useEffect, useState } from "react";
import LoginLocal from "./LoginLocal";

import AddExpense from "./AddExpense";
import ViewExpenses from "./ViewExpenses";
import MonthlySummary from "./MonthlySummary";

import "./style.css";

function App() {
  const [logged, setLogged] = useState(false);

  // keep login even after refresh
  useEffect(() => {
    const a = localStorage.getItem("access");
    const r = localStorage.getItem("refresh");
    setLogged(!!(a && r));
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLogged(false);
  };

  // show login page first
  if (!logged) {
    return <LoginLocal onSuccess={() => setLogged(true)} />;
  }

  return (
    <div className="page-container">
      {/* ✅ Top-right logout (scrolls with page) */}
      <button className="exit-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="container">
        <h1>Personal Expense Tracker</h1>

        <div className="main-container">
          <div className="left-panel">
            <AddExpense />
            <MonthlySummary />
          </div>

          <div className="right-panel">
            <ViewExpenses />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
