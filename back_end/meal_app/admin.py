from django.contrib import admin

# Register your models here.from .models import Follow
from .models import Meal
admin.site.register(Meal)