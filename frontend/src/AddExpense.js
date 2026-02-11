function AddExpense() {

  const addExpense = async () => {
    const expense = {
      date: document.getElementById("date").value,
      category: document.getElementById("category").value,
      amount: document.getElementById("amount").value,
      description: document.getElementById("description").value
    };

    await fetch("http://127.0.0.1:8000/api/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    });

    alert("Expense Added Successfully");
  };

  return (
    <div className="box">

      
      <input id="date" placeholder="YYYY-MM-DD" /><br />
      <input id="category" placeholder="Category" /><br />
      <input id="amount" placeholder="Amount" /><br />
      <input id="description" placeholder="Description" /><br />
      <button onClick={addExpense}>Add Expense</button>
    </div>
  );
}

export default AddExpense;    