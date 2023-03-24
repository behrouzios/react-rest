
from rest_framework import serializers
from core.models import Product,Link,User,Order,OrderItem

class userSerializer(serializers.ModelSerializer):
     class Meta:
        model=User
        fields="__all__" 
        extra_kwargs={
            "password": {"write_only":True}
            
        }

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields="__all__"
class LinkSerializer(serializers.ModelSerializer):
    products=ProductSerializer(many=True)
    user=userSerializer()
    class Meta:
        model=Link
        fields="__all__"