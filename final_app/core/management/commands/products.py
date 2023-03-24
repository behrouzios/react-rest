from faker  import Faker
from core.models import Product
from django.core.management import BaseCommand
from random import randrange
class Command(BaseCommand):
    def handle(self,*args, **kwargs):
        faker=Faker()
        for _ in range(30):
            
            Product.objects.create(
                title=faker.name(),
                description=faker.text(100),
                image=faker.image_url(100),
                price=randrange(10,100)
                
                
                
            )