from django.urls import path
from .views import *

urlpatterns = [
    path('create_user/',user_create)
]