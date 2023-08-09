from django.db import models
from user_app.models import Users


class Follows(models.Model):
    follower = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="followers")

    def __str__(self):
        return f"following: {self.follower}, followers: {self.following}"
