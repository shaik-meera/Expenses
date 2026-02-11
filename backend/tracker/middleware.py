import csv
import os

FILE_NAME = "expenses.csv"

def create_csv():
    if not os.path.exists(FILE_NAME):
        with open(FILE_NAME, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["date", "category", "amount", "description"])
def add_expense(data):
    create_csv()
    with open(FILE_NAME, "a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([
            data["date"],
            data["category"],
            data["amount"],
            data["description"]
        ])

def read_expenses():
    create_csv()
    with open(FILE_NAME, "r") as file:
        reader = csv.reader(file)
        next(reader)  # skip header
        return list(reader)

def calculate_total():
    create_csv()
    total = 0
    with open(FILE_NAME, "r") as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            total += float(row[2])
    return total