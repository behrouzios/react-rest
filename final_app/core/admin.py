from django.contrib import admin
from .models import User,Product,Order
from django.contrib.auth.admin import UserAdmin


# Register your models here.
# class SuperUser(UserAdmin):
#     ordering=["id"]
#     pass
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Order)