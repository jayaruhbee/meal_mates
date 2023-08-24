from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField()
    last_name = models.CharField()
    email = models.TextField(unique=True)
    # image = models.ImageField(upload_to='meal_images/', blank = True, null = True)
    # image_url = models.TextField(blank = True, null = True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    # has followers(field=following) and following(field=follower) related names from Follow

    def __str__(self):
        return f'Name: {self.first_name} {self.last_login}, Email: {self.email}'
    
    
    
    
    
    
    
    
    
    
    
    
    
    
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete = models.CASCADE, related_name="user")
#     first_name = models.CharField(blank = True)
#     last_name = models.CharField(blank = True)
#     profile_picture = models.ImageField(upload_to='user_images/', default='user_images/default.png', blank = True, null = True)

# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user = instance)
        
# def save_profile(sender, instance, **kwargs):
#     instance.profile.save
    
#     # CREATES AND SAVES PROFILE WHEN USER INSTANCE IS CREATED
# post_save.connect(create_profile, sender=User)
# post_save.connect(save_profile, sender=User)
    
    