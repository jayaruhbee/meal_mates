from django.db import models


class Meal(models.Model):
    title = models.CharField()
    image = models.TextField()
    instructions = models.TextField()
    category = models.CharField()

    def __str__(self):
        return f"Title: {self.title}, Category: {self.category}, Instructions: {self.instructions}"


class Ingredient(models.Model):
    title = models.CharField()
    measurement = models.CharField()

    def __str__(self):
        return f"Title: {self.title}, Measurement: {self.measurement}"


class Meal_ingredient(models.Model):
    meal = models.ForeignKey(
        Meal, on_delete=models.CASCADE, related_name='meal_ingredients')
    ingredient = models.OneToOneField(
        Ingredient, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Meal: {self.meal}, Ingredient: {self.ingredient}"
