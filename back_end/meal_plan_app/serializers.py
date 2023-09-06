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
    days_of_meals = serializers.SerializerMethodField()
    
    class Meta:
        model = Meal_plan
        fields = ["id", "user", "days_of_meals"]
        
    def get_days_of_meals(self, instance):
        days = instance.days_of_meals.all().order_by('date')
        return DaySerializer(days, many = True).data
