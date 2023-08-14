from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Meal_plan
from. serializers import MealPlanSerializer
from friendship_app.models import Follow
from friendship_app.serializers import Follow
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# TODO:ADD USER PERMISSION VIEWS, TRY/EXCEPT
# TODO:FIX ACCESS W SERIALIZERS

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
        meal_plan = Meal_plan.objects.get(user = request.user, id = meal_plan_id)
        return Response(MealPlanSerializer(meal_plan).data,
                        status = status.HTTP_200_OK)
    
    # CREATE NEW MEAL PLAN & RETURN 201
    def post(self, request):
        # CREATE NEW PLAN BELONGING TO AUTH USER
        meal_plan = Meal_plan.objects.create(user = request.user)
        return Response(MealPlanSerializer(meal_plan).data,
                        status = status.HTTP_201_CREATED)

    # DELETE MEAL PLAN & RETURN 204
    def delete(self, request, meal_plan_id):
        # FIND THE MEAL PLAN BY ITS ID
        meal_plan = get_object_or_404(Meal_plan, id = meal_plan_id)
        meal_plan.delete()
        return Response('Meal Plan has been removed', 
                        status = status.HTTP_204_NO_CONTENT)
        

        
        
# VIEW PLANS OF THOSE FOLLOWING/WANT TO GRAB INDIVIDUAL PLAN?
class Pal_plans(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # GETTING PLANS OF ALL USER IS FOLLOWING
        pals = Follow.objects.filter(follower = request.user).values('following')
        # FILTER TO MEAL PLANS OF USERS IN PALS      
        pals_plans = Meal_plan.objects.filter(user__in = pals)
        pals_plans = MealPlanSerializer(pals_plans, many = True).data 
        # TODO: MOVE TO INLINE AFTER
        return Response(pals_plans, 
                        status = status.HTTP_200_OK)      
        


