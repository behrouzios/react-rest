from django.urls import path,include
from .views import ProductFrontEnd,ProductBackEnd,LinkAPIView,StatsAPIView
urlpatterns = [

    path("",include("common.urls")),
    path("products/frontend",ProductFrontEnd.as_view()),
    path("products/backend",ProductBackEnd.as_view()),
    path("links",LinkAPIView.as_view()),
    path("stats",StatsAPIView.as_view()),



]