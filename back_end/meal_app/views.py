from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal
from meal_plan_app.models import Meal_plan, Day
from meal_app.serializers import MealSerializer
from meal_plan_app.serializers import  DaySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# TODO: CHECK SERIALIZERS, MAKE USER PERMISSIONS, MAKE ALL INLINE OR REMOVE INLINE FROM OTHER VIEWS
# VIEW ALL MEALS, CREATE NEW MEAL INSTANCE, DELETE MEAL

# VIEW ALL MEALS
class All_meals(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request,meal_plan_id):
        # GET SPECIFIED MEAL PLAN OR 404 IF NOT EXIST
        meal_plan = get_object_or_404(Meal_plan,user = request.user, id = meal_plan_id)
        # SET DAYS TO THE DAYS OF MEAL OF MEAL PLAN
        days = meal_plan.days_of_meals
        # SERIALIZE THE DAYS TO ACCESS THE MEALS
        serialized_days = DaySerializer(days, many = True).data
        meals = []
        for day in serialized_days:
            # SOME DAYS HAVE NULL MEALS NOW
            a_meal = days.get(id=day['id']).daily_meal
            if a_meal is not None:
                meals.append(days.get(id = day['id']).daily_meal)
        # NO DUPES IN LIST
        meals = list(set(meals))
        serialized_meals = MealSerializer(meals, many = True).data

        return Response(serialized_meals,status = status.HTTP_200_OK)

# MANAGE ALL OF THE DAILY MEALS
class Meal_manager(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, meal_plan_id, meal_id):
        # GET DAILY MEAL
        meal = get_object_or_404(Day,meal_plan = meal_plan_id, daily_meal = meal_id)
        return Response(DaySerializer(meal).data,
                        status = status.HTTP_200_OK)
    
    def delete(self, request, meal_plan_id, day_id):
        # GET THE SPECIFIC DAILY MEAL W DAY/PLAN ID 
        # TURN THE MEAL MODEL INTO NULL INSTEAD OF DELETING.
        meal = get_object_or_404(Day,meal_plan = meal_plan_id, id = day_id)
        meal.daily_meal = None
        meal.full_clean()
        meal.save()
        return Response('Daily Meal successfully deleted',
                        status = status.HTTP_204_NO_CONTENT)
        
        # EDIT DAILY MEAL
    def put(self, request, meal_plan_id, day_id, meal_id):
        # ACCESS CURRENT DAILY MEAL WITH MEAL PLAN AND DAY ID
        a_daily_meal = get_object_or_404(Day, meal_plan = meal_plan_id, id = day_id)
        # GET THE NEW MEAL W ID
        new_meal = get_object_or_404(Meal, id = meal_id)
        # ASSIGN THE DAILY MEAL TO THE PROVIDED MEAL
        a_daily_meal.daily_meal = new_meal
        a_daily_meal.full_clean()
        a_daily_meal.save()
        a_daily_meal = DaySerializer(a_daily_meal).data
        return Response('Meal successfully updated', 
                        status = status.HTTP_204_NO_CONTENT)            
        

    # CREATE MEAL ASSOC WITH MEAL PLAN & DAY? OR MAKE THEM WITHOUT SO WE CAN CREATE OUR OWN MEALS AND NOT ALWAYS HAVE THEM ASSIGNED WITH A MEAL PLAN..OR BOTH?/RETURN 201
    def post(self, request, meal_plan_id, meal_id):
        # GET PLAN
        meal_plan = get_object_or_404(Meal_plan, id = meal_plan_id)
        # GET MEAL...TRY EXCEPT TO CREATE?
        a_meal = get_object_or_404(Meal,id = meal_id)
        # CREATE MEAL INSTANCE 
        daily_meal_instance = Day.objects.create(meal_plan = meal_plan, daily_meal = a_meal)
        daily_meal_instance.save()
        daily_meal_instance= DaySerializer(daily_meal_instance).data
        return Response(daily_meal_instance,
                        status = status.HTTP_201_CREATED)
        
#  CREATE MEAL, EDIT, DELETE, AND VIEW MEAL 
class Meals_manager(APIView):
    def get(self, request, meal_id):
        meal = get_object_or_404(Meal, id = meal_id)
        return Response(MealSerializer(meal).data, 
                        status = status.HTTP_200_OK)
    
    def put(self,request,meal_id):
        meal = get_object_or_404(Meal, id = meal_id)
        meal.title = request.data.get("title", meal.title)
        meal.image = request.data.get("image", meal.image)
        meal.category = request.data.get("category", meal.category)
        meal.instructions = request.data.get("instructions", meal.instructions)
        meal.ingredients = request.data.get("ingredients", meal.ingredients)
        meal.notes = request.data.get("notes", meal.notes)
        # FULL CLEAN TO MAKE SURE THEY DONT VIOLATE THE VALIDATORS
        meal.full_clean()
        meal.save()
        return Response('Meal Updated',
                        status = status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        meal = Meal(**request.data)
        meal.full_clean()
        meal.save()
        return Response(MealSerializer(meal).data,
                        status = status.HTTP_201_CREATED)
        
    def delete(self, request, meal_id):
        meal = get_object_or_404(Meal, id = meal_id)
        meal.delete()
        return Response('Meal deleted',
                        status = status.HTTP_204_NO_CONTENT)
 
    
    