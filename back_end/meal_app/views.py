from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal, Ingredient, Meal_ingredient
from. serializers import MealSerializer, IngredientSerializer, MealIngredientSerializer
from meal_plan_app.models import Meal_plan, Day
# from meal_plan_app.serializers import MealPlanSerializer, DaySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


# VIEW ALL MEALS, CREATE NEW MEAL INSTANCE, DELETE MEAL

class Meal_manager(APIView):
    # AUTH IN ORDER TO VIEW USER'S MEALS
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # GRAB ALL MEALS BELONGING TO USER, RETURN 200
        all_meals = Meal.objects.filter(user = request.user)
        return Response(MealSerializer(all_meals, many = True).data, 
                        status = status.HTTP_200_OK)
    
    
    def post(self, request, meal_id, meal_plan_id):
        # CREATE MEAL FOR USER, FOR DAY AND MEAL PLAN?, RETURN 201
        try:
            meal_plan = get_object_or_404(Meal, id = meal_id)
        except Meal_plan.DoesNotExist:
            meal_plan = Meal_plan.objects.create(user = request.user)
        
        a_meal_plan = Meal_plan.objects.filter()
        meal = Day.objects.create(daily_meal = meal_id) 
        
        
        
        
        
        # TODO: meal vs daily meal in wrong order I think
    # def delete(self, request, meal_id, meal_plan_id):
    #     # DELETE MEAL FOR USER, RETURN 204
    #     # GET MEAL PLAN FROM USER
    #     meal_plan = Meal_plan.objects.get(user = request.user, id = meal_plan_id)
    #     # GET THE DAILY MEAL WITHIN THE MEAL PLAN TO DELETE
    #     daily_meal = Day.objects.get(meal_plan = meal_plan, daily_meal = meal_id)
    #     daily_meal.delete()
    #     return Response("Meal removed",
    #                     status = status.HTTP_204_NO_CONTENT)
    
    
    def delete(self, request, meal_id):
        a_meal = MealSerializer(get_object_or_404(request.user.all_meals))
        a_meal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class Meal_by_category(APIView):
    # GET ALL MEALS BY CATEGORY, RETURN 200, NO AUTH 
    def get(self, request, category):
        meal = Meal.objects.filter(category = category)
        return Response(MealSerializer(meal, many = True), 
                        status = status.HTTP_200_OK)