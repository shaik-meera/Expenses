import { useEffect, useState } from "react";
import Papa from "papaparse";

function MonthlySummary() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data || []);
      },
    });
  };

  // ✅ Works with your CSV date format: DD-MM-YYYY
  useEffect(() => {
    if (!selectedMonth || csvData.length === 0) {
      setMonthlyTotal(0);
      return;
    }

    let total = 0;

    csvData.forEach((row) => {
      const rawDate = (row?.[0] ?? "").trim(); // e.g. "10-01-2026"
      const amountStr = (row?.[2] ?? "").toString().trim();

      // Skip header row
      if (rawDate.toLowerCase() === "date") return;

      // Convert DD-MM-YYYY → YYYY-MM
      const parts = rawDate.split("-");
      if (parts.length !== 3) return;

      const [, month, year] = parts;
      const formattedMonth = `${year}-${month}`; // e.g. "2026-01"

      if (formattedMonth === selectedMonth) {
        const amt = parseFloat(amountStr);
        if (!isNaN(amt)) total += amt;
      }
    });

    setMonthlyTotal(total);
  }, [selectedMonth, csvData]);

  return (
    <div className="box">
      <h2>Monthly Summary (CSV)</h2>

      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      <input type="file" accept=".csv" onChange={handleFileUpload} />

      <h3>Total: ₹{monthlyTotal}</h3>
    </div>
  );
}

export default MonthlySummary;
