from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal_plan, Day
from. serializers import MealPlanSerializer, DaySerializer
from user_app.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from datetime import date, timedelta
# TODO:ADD USER PERMISSION VIEWS, TRY/EXCEPT

# VIEW ALL MEAL PLANS, VIEW MEAL PLAN BY WEEK, CREATE MEAL PLAN, DELETE MEAL PLAN, VIEW ANOTHER USERS PLAN- UNDER SPECIFIC?

class All_meal_plans(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    # GET ALL MEAL PLANS OF USER IF AUTH
    def get(self, request):
        meal_plans = Meal_plan.objects.filter(user = request.user)
        return Response(MealPlanSerializer(meal_plans, many=True).data,
                        status = status.HTTP_200_OK)
        
class Meal_plan_manager(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    # GET SPECIFIC PLAN BELONGING TO USER IF AUTH & RETURN 200
    def get(self, request, meal_plan_id):
        # meal_plan = Meal_plan.objects.get(user = request.user, id = meal_plan_id)
        meal_plan = Meal_plan.objects.get(id = meal_plan_id)
        return Response(MealPlanSerializer(meal_plan).data,
                        status = status.HTTP_200_OK)
        
    
    # # CREATE NEW MEAL PLAN WITH NO DAILY INSTANCES & RETURN 201
    # def post(self, request):
    #     # CREATE NEW PLAN BELONGING TO AUTH USER
    #     meal_plan = Meal_plan.objects.create(user = request.user)
    #     return Response(MealPlanSerializer(meal_plan).data,
    #                     status = status.HTTP_201_CREATED)
    
    
    # CREATING MEAL PLAN AND SETTING DAILY INSTANCES FOR EACH DAY OF WEEK M-S
    def post(self, request):
        # CREATE MEAL PLAN INSTANCE
        today = date.today()
        current_date = today
        # MONDAY == 0
        # FINDING MONDAY OF THE WEEK MEAL PLAN IS CREATED
        while current_date.weekday() != 0:
            current_date -= timedelta(days=1)
# GET ALL DAYS FOR PREV MONDAY ASSOC WITH USER, IF GREATER THAN 0, MEAL PLAN FOR THIS WEEK ALREADY EXISTS
# WHEN ALLOWING USER TO SELECT WEEK, CHECK IF THE DAY SELECTED 

        if Day.objects.filter(date=current_date, meal_plan__user=request.user).count() > 0:
            return Response("meal plan starting on previous Monday already exists", status=status.HTTP_400_BAD_REQUEST)  
        meal_plan = Meal_plan.objects.create(user = request.user)
        # CREATE 7 DAILY MEAL INSTANCES
        for day_num in range(7):
            day_date = current_date + timedelta(days=day_num)
            
            Day.objects.create(
                meal_plan=meal_plan,
                date = day_date)
            
        serialized_days_of_plan = DaySerializer(meal_plan.days_of_meals.all(), many=True).data
        return Response( serialized_days_of_plan,
                        status=status.HTTP_201_CREATED)

    # DELETE MEAL PLAN & RETURN 204
    def delete(self, request, meal_plan_id):
        # FIND THE MEAL PLAN BY ITS ID
        meal_plan = get_object_or_404(Meal_plan, id = meal_plan_id)
        meal_plan.delete()
        return Response('Meal Plan has been removed', 
                        status = status.HTTP_204_NO_CONTENT)
        

        
        
# VIEW PLANS OF PAL AND PLAN OF PAL
class Pal_plans(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    
    def get(self, request, pal_id, pal_plan_id = None):
        # GETTING A PLAN OF A SPECIFIC PAL 
        if pal_plan_id:
            plan = get_object_or_404(Meal_plan, id = pal_plan_id)
            pal_plan = MealPlanSerializer(plan).data
            return Response(pal_plan, status = status.HTTP_200_OK)

        else:
            pal = get_object_or_404(User, id = pal_id)
            if pal_id and not pal_plan_id:
                pal_plans = MealPlanSerializer(pal.meal_plans, many = True).data
                return Response(pal_plans, status = status.HTTP_200_OK)



