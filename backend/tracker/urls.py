from django.urls import path
from .views import *

urlpatterns = [
    path("add/", add_expense_api),
    path("view/", view_expenses_api),
    path("total/", total_expense_api),
    path("monthly-summary/", monthly_summary_api),

]
