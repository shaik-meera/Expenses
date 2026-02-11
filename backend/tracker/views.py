from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .middleware import add_expense, read_expenses, calculate_total
import csv
from django.http import JsonResponse

def monthly_summary_api(request):
    month = request.GET.get("month")  # expecting YYYY-MM like 2026-01
    if not month:
        return JsonResponse({"error": "Month is required"}, status=400)

    total = 0

    with open("expenses.csv", "r", newline="") as file:
        reader = csv.reader(file)
        for row in reader:
            if not row or len(row) < 3:
                continue

            date_str = row[0].strip()   # DD-MM-YYYY
            amt_str = row[2].strip()

            # skip header
            if date_str.lower() == "date":
                continue

            # convert DD-MM-YYYY -> YYYY-MM
            parts = date_str.split("-")
            if len(parts) != 3:
                continue

            dd, mm, yyyy = parts
            row_month = f"{yyyy}-{mm}"  # YYYY-MM

            if row_month == month:
                try:
                    total += float(amt_str)
                except ValueError:
                    continue

    return JsonResponse({"month": month, "total": total})

@csrf_exempt
def add_expense_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        add_expense(data)
        return JsonResponse({"message": "Expense added successfully"})

def view_expenses_api(request):
    expenses = read_expenses()
    return JsonResponse({"expenses": expenses})

def total_expense_api(request):
    total = calculate_total()
    return JsonResponse({"total": total})
