from django.shortcuts import render
from rest_framework.views import APIView
from core.models import Link,Order,Product,OrderItem
from .serializers import  LinkSerializer
from rest_framework.response import Response
import decimal
from django.db import transaction
import stripe
class LinkAPIView(APIView):
    
    def get(self,request):
        link=Link.objects.all()
        serializer=LinkSerializer(link)
        return Response(serializer.data)
    
class OrderAPIView(APIView):
    @transaction.atomic
    def post(self,rquest):
        data=request.data
        link=Link.objects.filter(code=data["code"]).first
        if not link:
            raise exceptions.APIExceptions("invalid")
        try:
            order=Order()
            order.code=link.code
            order.user_id=link.user.id
            order.ambassador_email=link.user.email
            order.first_name=data["first_name"]
            order.last_name=data["last_name"]
            order.email=data["email"]
            order.address=data["address"]
            order.country=data["country"]
            order.city=data["city"]
            order.zip=data["zip"]
            
   
            line_items=[]
            for item in data["products"]:
                product=Product.objects.filter(pk=item["product_id"]).first()
                quantity=decimal.Decimal(item["quantity"])
                order_item=Orderitem()
                order_item.order=order
                order_item.title=product.title
                order_item.price=product.price
                order_item.quantity=quantity
                order_item.ambassador_revenue=decimal.Decimal(0.1)*product.price.quantity
                order_item.order=decimal.Decimal(0.9)*product.price.quantity
               
                order_item.save()
                
            line_items.append({
                    "name":product.title,
                    "description":product.description,
                    "images":[
                        product.image
                    ],
                    "ammount":int(100*product.price),
                    "currency":"usd",
                    "quantity":quantity
                    
                })
            order.save()      
            return Response({
                    "message":"success"
                })
            stripe.api_key="sk_test_51L3kg6BlGOumB4oFZ7AdjCzET1dYcB1x9gz9plvbchEtb4RtRsVo2YD1gDZk7S0trYcuf5JK3eix4CWlwRZXVryl00SMYWtmoi"
            source=stripe.checkout.Session.create(
                success_url="http://localhost:5000/success?source={CHECKOUT_SESSION_ID}",
                cancel_url="http://localhost:5000/error",
                payment_method_types=["cards"],
                line_items=line_items
            )
            order.transaction_id=source["id"]
            order.save()
            
        except Exception:
            transaction.rollback()
        return Response({
            "message":"error is happend"
        })