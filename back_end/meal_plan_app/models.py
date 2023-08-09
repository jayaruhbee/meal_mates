from django.db import models
from meal_app.models import Meals
from user_app.models import Users


class Meal_plans(models.Model):
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="meal_plans")
    monday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="monday_meal")
    tuesday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="tuesday_meal")
    wednesday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="wednesday_meal")
    thursday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="thursday_meal")
    friday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="friday_meal")
    saturday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="saturday_meal")
    sunday = models.ForeignKey(
        Meals, on_delete=models.SET_NULL, null=True, blank=True, related_name="sunday_meal")
