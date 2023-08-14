from django.contrib import admin

# Register your models here.
from .models import Meal_plan
from .models import Day
admin.site.register(Day)
admin.site.register(Meal_plan)
