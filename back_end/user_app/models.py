from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField()
    last_name = models.CharField()
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='user_images/', default='user_images/default.png', blank = True, null = True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    # has followers(field=following) and following(field=follower) related names from Follow

    def __str__(self):
        return f'Name: {self.first_name} {self.last_login}, Email: {self.email}'
