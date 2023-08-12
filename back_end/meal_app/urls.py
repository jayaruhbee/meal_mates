from django.urls import path
from .views import Meal_manager
# Ingredient

urlpatterns = [
    path("", Meal_manager.as_view(), name = "all_meals"),
]