from django.db import models
from user_app.models import User


class Follow(models.Model):
    follower = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followers")

    def __str__(self):
        return f"following: {self.follower}, followers: {self.following}"
