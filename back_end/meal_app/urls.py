from django.urls import path
from .views import Meal_manager, All_meals, Meals_manager


urlpatterns = [
    path("<int:meal_plan_id>/", All_meals.as_view(), name = "all_meals"),
    path("<int:meal_plan_id>/<int:meal_id>/", Meal_manager.as_view(), name = "specific_meal"),
    path("delete_meal/<int:meal_plan_id>/<int:day_id>/", Meal_manager.as_view(), name = "delete_meal"),
    path("update_meal/<int:meal_plan_id>/<int:day_id>/<int:meal_id>/", Meal_manager.as_view(), name = "update_meal"),
    path("create_daily_meal/<int:meal_plan_id>/<int:meal_id>/", Meal_manager.as_view(), name = "create_daily_meal"),
    path("create_meal/", Meals_manager.as_view(), name ="create_meal"),
    path("edit_meal/<int:meal_id>/", Meals_manager.as_view(), name ="edit_meal"),
    path("meal/<int:meal_id>/", Meals_manager.as_view(), name ="view_meal"),
    path("delete_meal/<int:meal_id>/", Meals_manager.as_view(), name ="delete_meal"),
]