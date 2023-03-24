from django.db import models
from django.contrib.auth.models import AbstractUser,AbstractBaseUser,BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self,username,email,password=None):
        if not email:
            raise ValueError("user must have an email")
        if not password:
            raise ValueError(("please enter the password"))
        
        user = self.model(email=self.normalize_email(email), username=username,)
        user.set_password(password)
       

        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password):
        if not email:
            raise ValueError("user must have an email")
        if not password:
            raise ValueError(("please enter the password"))

        user = self.create_user(
        username=username,
        email=self.normalize_email(email),
        password=password,

        )
        user.set_password(password)
        user.is_admin=True
        user.is_staff=True 
        user.is_superuser=True
               
       
        user.save(using=self._db)
        return user



class User(AbstractBaseUser):
    first_name = models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    email=models.CharField(max_length=255, unique=True)
    password=models.CharField(max_length=255)
    is_ambassador=models.BooleanField(default=True)
    is_admin=models.BooleanField(default= False)
    is_active=models.BooleanField(default= True)
    is_superuser=models.BooleanField(default= False)
    is_staff=models.BooleanField(default=False)
    username=models.CharField(max_length=30,unique=True)
    USERNAME_FIELD="email"
    REQUIRED_FIELDS = ['username']
    objects=UserManager()
    def __str__(self):
        return self.email
    def has_perm(self,perm,obj=None):
        return self.is_admin
    def has_module_perms(self,app_label):
        return True
    @property
    def name(self):
        return self.first_name+" "+self.last_name
    @property
    def revenue(self):
        orders=Order.objects.filter(user_id=self.pk,complete=True)
        return sum(o.ambassador_revenue for o in orders  )
class Product(models.Model):
    title=models.CharField(max_length=255)
    description=models.CharField(max_length=2222)
    image=models.CharField(max_length=50)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    def __str__(self):
        return self.title
    
class Link(models.Model):
    code=models.CharField(max_length=255,unique=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE )
    products=models.ManyToManyField(Product)
    created_at=models.DateTimeField( auto_now_add=True)
    updated_at=models.DateTimeField( auto_now=True)

class Order(models.Model):
    transaction_id=models.CharField(max_length=255,null=True,)
    user=models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    code=models.CharField(max_length=255)
    ambassado_email=models.CharField(max_length=255)
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    email=models.CharField(max_length=255)
    address=models.CharField(max_length=255)
    city=models.CharField(max_length=255)
    country=models.CharField(max_length=255)
    zip=models.CharField(max_length=255)
    complete=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    @property
    def name(self):
        return self.first_name+" "+self.last_name
    @property
    def ambassador_revenue(self):
        items=OrderItem.objects.filter(order_id=self.pk)
        return sum(i.ambassador_revenue for i in items )
        
        

class OrderItem(models.Model):
    order=models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    product_title=models.CharField(max_length=255)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    quantity=models.IntegerField()
    admin_revenue=models.DecimalField(max_digits=10,decimal_places=2)
    ambassador_revenue=models.DecimalField(max_digits=10,decimal_places=2)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
