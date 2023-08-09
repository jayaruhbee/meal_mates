from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    first_name = models.CharField()
    last_name = models.CharField()
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    # has followers(field=following) and following(field=follower) related names from Follows

    def __str__(self):
        return f"email: {self.email}"
