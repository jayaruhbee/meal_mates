from django.urls import path
from .views import Follower, Manage_follows, All_users, Specific_users


urlpatterns = [
    path('get_users/', All_users.as_view(), name = "get_all_users"),
    path('get_specific_users/<str:name>/', Specific_users.as_view(), name = "get_specific_users"),
    path('all_followers/', Follower.as_view(), name = "get_all_followers"),
    
    path('all_followed/', Manage_follows.as_view(), name = "get_all_followed"),
    path('follow/<int:following_id>/', Manage_follows.as_view(), name = "follow_user"),
    path('unfollow/<int:following_id>/', Manage_follows.as_view(), name = "unfollow_user"),
]