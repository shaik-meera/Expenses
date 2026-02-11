import csv
from collections import defaultdict
from datetime import datetime

def monthly_summary(csv_file="expenses.csv"):
    summary = defaultdict(float)

    with open(csv_file, newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            date = datetime.strptime(row["date"], "%Y-%m-%d")
            month_key = date.strftime("%Y-%m")
            amount = float(row["amount"])
            summary[month_key] += amount

    return summary


if __name__ == "__main__":
    result = monthly_summary()
    print("\nMonthly Expense Summary:\n")
    for month, total in sorted(result.items()):
        print(f"{month} : ₹{total}")
