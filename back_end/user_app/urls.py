from django.urls import path
from .views import Sign_up, Sign_in, Log_out, Info


urlpatterns = [
    path('', Info.as_view(), name = "info"),
    path('signup/', Sign_up.as_view(), name = "signup"),
    path('signin/', Sign_in.as_view(), name = "signin"),
    path('logout/', Log_out.as_view(), name = "logout"),
]