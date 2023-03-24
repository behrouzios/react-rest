from django.shortcuts import render
from rest_framework.views import APIView
from core.models import Product
from .serializers import ProductSerializer
from django.core.cache import cache
import time
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
import math,random,time,string
from common.authentication import jwtAuthentication
from core.models import Link
from rest_framework.permissions import IsAuthenticated
class ProductFrontEnd(APIView):
    @method_decorator(cache_page(60*60*2, key_prefix="products_frontend"))
    def get(self,_):
        time.sleep(2)
        products=Product.objects.all()
        serializer=ProductSerializer(products , many=True)
        return Response (serializer.data)
class ProductBackEnd(APIView):
    def get(self,request):
        products=cache.get("products_backend")
        print(products,"hereeeeeeeeeee")
        if not products:
            time.sleep(2)
            products=list(Product.objects.all())
            cache.set("products_backend",products,timeout=60*30)
        s=request.query_params.get("search", None)
        if s:
            products=list([
               product for product in products 
               if (s.lower() in product.title.lower()) or (s.lower() in product.description.lower())
            ])        
        total=len(products)
        sort=request.query_params.get("sort",None)
        if sort=="asc":
            products.sort(key=lambda p:p.price) 
        if sort=="desc":
            products.sort(key=lambda p:p.price,reverse=True ) 
        per_page=9
        page=int(request.query_params.get("page",1))
        start=(page-1)*per_page
        end=page*per_page
        serializer=ProductSerializer(products , many=True)
        return Response({
                        "data": serializer.data[start:end],
                        "meta":{
                            "total":total,
                            "page":page,
                            "last_page":math.ceil(total/per_page)
                        }
                       } )
class LinkAPIView(APIView):
    authentication_classes=[jwtAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self,request):
        user=request.user
        serializer=LinkSerializer(data={
            "user": user.id,
            "code":"".join(random.choices(string.ascii_lowercase+string.digits,k=6)),
            "products":request.data["products"]
        })
        serializer.is_valid( raise_exception=True )
        serializer.save()
        return Response(serializer.data)
class StatsAPIView(APIView):
    authentication_classes=[jwtAuthentication]     
    permission_classes=[IsAuthenticated]         
    def get(self,request):
        user=request.user
        links=Link.objects.filter(user_id=user.id)  
        return Response([self.format(link) for link in links]) 
    def format(self,link):
        orders=Order.objects.filter(code=link.code,complete=1)
        return {
            "code":link.code,
            "count":len(orders),
            "revenue":sum(o.ambassador_revenue for o in orders)
        }
class RnkingsAPIView(APIView):
    pass
