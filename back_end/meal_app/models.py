from django.db import models


class Meals(models.Model):
    title = models.CharField()
    image = models.TextField()
    instructions = models.TextField()
    category = models.CharField()

    def __str__(self):
        return f"Title: {self.title}, Category: {self.category}, Instructions: {self.instructions}"


class Ingredients(models.Model):
    title = models.CharField()
    measurement = models.CharField()
    meal = models.ForeignKey(
        Meals, on_delete=models.CASCADE, related_name="ingredients")

    def __str__(self):
        return f"Title: {self.title}, Measurement: {self.measurement}"
