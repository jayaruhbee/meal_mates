from django.urls import path
from .views import Meal_manager, All_meals


urlpatterns = [
    path("<int:meal_plan_id>/", All_meals.as_view(), name = "all_meals"),
    path("<int:meal_plan_id>/<int:meal_id>/", Meal_manager.as_view(), name = "specific_meal"),
    path("delete_meal/<int:meal_plan_id>/<int:day_id>/", Meal_manager.as_view(), name = "delete_meal"),
    path("update_meal/<int:meal_plan_id>/<int:day_id>/<int:meal_id>/", Meal_manager.as_view(), name = "update_meal"),
    path("create_meal/<int:meal_plan_id>/<int:meal_id>/", Meal_manager.as_view(), name = "create_meal"),
]