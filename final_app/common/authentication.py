import jwt,datetime
from final_app import settings
from rest_framework.authentication import BaseAuthentication
from core.models import User
from rest_framework import exceptions
from django.conf import settings

class jwtAuthentication(BaseAuthentication):
    
    def authenticate(self, request):
        
        is_ambassador="api/ambassador" in request.path
        token=request.COOKIES.get("jwt")
        if not token:
            return None
        try:
            payload=jwt.decode(token,settings.SECRET_KEY,algorithms=["HS256"])

        except jwt.ExpiredSignature:
            raise exceptions.AuthenticationFailed("unauthenticated")
        if (is_ambassador and payload["scope"]!= "ambassador" ) or (not is_ambassador and payload["scope"]!="admin"):
            raise  exceptions.AuthenticationFailed("invalid scope")
        user=User.objects.get(pk=payload["admin_id"])
        if user is None:
            raise exceptions.AuthenticationFailed("user not found")
        return (user,None)
    @staticmethod
    def generate_jwt(id ,scope):
       payload={
           "admin_id":id,
           "exp":datetime.datetime.utcnow()+datetime.timedelta(days=1),
           "iat":datetime.datetime.utcnow(),
           "scope":scope
       }  
       return jwt.encode(payload,settings.SECRET_KEY,algorithm="HS256")