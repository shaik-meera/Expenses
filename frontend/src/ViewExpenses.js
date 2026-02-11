import { useEffect, useState } from "react";

function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/view/")
      .then(res => res.json())
      .then(data => setExpenses(data.expenses));
  }, []);

  const filteredExpenses = filterDate
  ? expenses.filter((e) => {
      const rawDate = (e[0] || "").trim(); // DD-MM-YYYY

      const parts = rawDate.split("-");
      if (parts.length !== 3) return false;

      const [dd, mm, yyyy] = parts;

      // Convert CSV date to YYYY-MM-DD
      const convertedDate = `${yyyy}-${mm}-${dd}`;

      return convertedDate === filterDate;
    })
  : expenses;

const total = filteredExpenses.reduce(
  (sum, e) => sum + Number(e[2] || 0),
  0
);


  return (
    <div className="box">
      <h2>All Expenses</h2>

      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((e, i) => (
            <tr key={i}>
              <td>{e[0]}</td>
              <td>{e[1]}</td>
              <td>{e[2]}</td>
              <td>{e[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Expense: ₹{total}</h3>
    </div>
  );
}

export default ViewExpenses;



