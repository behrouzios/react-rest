from django.shortcuts import render
from rest_framework.response import Response
from common.serializers import userSerializer
from core.models import User,Product
from rest_framework.views import APIView
from rest_framework import generics,mixins
from .serializers import ProductSerializer,LinkSerializer,OrderSerializer,OrderItemSerializer
from common.authentication import jwtAuthentication
from rest_framework.permissions import IsAuthenticated
from core.models import Link,Order
from random import random
class AmbassadorAPIView(APIView):
    authentication_classes=[jwtAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self,_):
        ambassadors=User.objects.filter(is_ambassador=True)
        serializer=userSerializer(ambassadors,many=True)
        return Response(serializer.data)
class ProductGenericAPI(generics.GenericAPIView, mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,mixins.ListModelMixin,mixins.CreateModelMixin,mixins.DestroyModelMixin):

    authentication_classes=[jwtAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    def get(self,request,pk=None):
        if pk:
            return self.retrieve(request,pk)
        return self.list(request)
    def post(self,request):
        response=self.create(request)
        # for key in cache.key("*"):
        #     if "products_frontend" in key:
        #         cache.delete(key)
        # cache.delete("products.backend")
        return response
    def put(self,request,pk=None):
        response=self.partial_update(request,pk)
        # for key in cache.key("*"):
        #     if "products_frontend" in key:
                
        
        #         cache.delete(key)
        # cache.delete("products.backend")
        return response
    def delete(self,request,pk=None):
        response=self.destroy(request,pk)
        # for key in cache.key("*"):
        #     if "products_frontend" in key:
        #          cache.delete(key)
        # cache.delete("products.backend")
        return response
class LinkAPIView(APIView):
    authentication_classes=[jwtAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self,request,pk=None):
            links=Link.objects.filter(user_id=pk)  
            serializer=LinkSerializer(links,many=True)
            return Response(serializer.data)
        
class OrderAPIView(APIView):
    authentication_classes=[jwtAuthentication]
    permission_classes=[IsAuthenticated]
    print("hre first")
    def get(self,request):
        orders=Order.objects.filter(complete=True)
        serializer=OrderSerializer(orders,many=True)
        print("hre second")

        print(serializer.data,"here")
        return Response(serializer.data)
            


    
    