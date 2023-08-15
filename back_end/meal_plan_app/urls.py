from django.urls import path
from .views import All_meal_plans, Meal_plan_manager, Pal_plans

urlpatterns = [
    path("", All_meal_plans.as_view(), name = "all_meal_plans"),
    path("create_plan/", Meal_plan_manager.as_view(), name = "create_plan"),
    path("meal_plan/<int:meal_plan_id>/", Meal_plan_manager.as_view(), name = "specific_meal_plans"),
    path("delete_plan/<int:meal_plan_id>/", Meal_plan_manager.as_view(), name = "delete_plan"),
    path("pal_plans/<int:pal_id>/", Pal_plans.as_view(), name = "pal_plans"),
    path("pal_plans/<int:pal_id>/<int:pal_plan_id>/", Pal_plans.as_view(), name = "pal_plan"),
    
    

]