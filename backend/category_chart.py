import csv
from collections import defaultdict
import matplotlib.pyplot as plt

def category_wise_chart(csv_file="expenses.csv"):
    category_totals = defaultdict(float)

    with open(csv_file, newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            category = row["category"]
            amount = float(row["amount"])
            category_totals[category] += amount

    categories = list(category_totals.keys())
    amounts = list(category_totals.values())

    plt.figure()
    plt.bar(categories, amounts)
    plt.xlabel("Category")
    plt.ylabel("Total Amount")
    plt.title("Category-wise Expense Report")
    plt.show()


if __name__ == "__main__":
    category_wise_chart()
