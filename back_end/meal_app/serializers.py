from rest_framework import serializers
from .models import Meal, Ingredient, Meal_ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        # fields = ['__all__']
        fields = ['id', 'title', 'measurement']


class MealIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()

    class Meta:
        model = Meal_ingredient
        fields = ['id','meal', 'ingredient']
        # fields = ['id', 'meal', 'ingredient']


class MealSerializer(serializers.ModelSerializer):
    meal_ingredients = MealIngredientSerializer(many = True)

    class Meta:
        model = Meal
        # fields = ['__all__', 'meal_ingredients']
        fields = ['id', 'title', 'image', 'instructions', 'category', 'meal_ingredients']



