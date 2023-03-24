from django.urls import path
from .views import (RegisterView,LoginView, AuthenticatedUserView,
LogoutView, ProfileInfoAPIView,PasswordfoAPIView)

urlpatterns = [
    path("register",RegisterView.as_view() ),
    path("login",LoginView.as_view() ),
    path("user",AuthenticatedUserView.as_view()),
    path("logout",LogoutView.as_view()),
    path("users/info",ProfileInfoAPIView.as_view()),
    path("users/passwords",PasswordfoAPIView.as_view()),



]