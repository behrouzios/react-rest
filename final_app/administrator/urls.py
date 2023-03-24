
from django.urls import path,include

from .views import AmbassadorAPIView,ProductGenericAPI,LinkAPIView, OrderAPIView
urlpatterns = [

    path("",include("common.urls")),
    path("ambassadors", AmbassadorAPIView.as_view()),
    path("products",ProductGenericAPI.as_view()),
    path("products/<int:pk>",ProductGenericAPI.as_view()),
    path("users/<int:pk>/links",LinkAPIView.as_view()),
    path("orders",OrderAPIView.as_view()),



    
]