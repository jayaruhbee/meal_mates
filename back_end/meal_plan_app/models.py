from django.db import models
from meal_app.models import Meal
from user_app.models import User
from datetime import date


class Meal_plan(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name = 'meal_plans')
    
class Day(models.Model):
    date = models.DateField(default=date.today())
    meal_plan = models.ForeignKey(
        Meal_plan, on_delete=models.CASCADE, related_name = 'days_of_meals')
    daily_meal = models.ForeignKey(
        Meal, on_delete=models.CASCADE, related_name = 'daily_meal', null = True)
