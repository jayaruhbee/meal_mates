from rest_framework import serializers
from .models import Meal_plan, Day
from user_app.serializers import UserSerializer
from meal_app.serializers import MealSerializer


class DaySerializer(serializers.ModelSerializer):
    daily_meal = MealSerializer()

    class Meta:
        model = Day
        fields = ["id", "date", "daily_meal"]

class MealPlanSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    days_of_meals = DaySerializer(many = True)
    
    class Meta:
        model = Meal_plan
        fields = ["id", "user", "days_of_meals"]

