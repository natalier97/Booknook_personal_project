from django.shortcuts import render
from rest_framework.views import APIView
from .models import User
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from django.contrib.auth import login, logout, authenticate
from django.core.exceptions import ValidationError


# Create your views here.

class Sign_Up(APIView):

    def post(self, request):
        data = request.data.copy()
        #username will be the email that is being sent in request
        data['username'] = request.data.get("email")
        new_User = User(**data)
        try:
            new_User.full_clean()

            #hashes password & saves instance automatically 
            new_User = User.objects.create_user(**data)
            login(request, new_User)

            token = Token.objects.create(user = new_User)
            return Response({
                "user": new_User.first_name, 
                "token": token.key,
            }, status=HTTP_201_CREATED)
        except ValidationError:
            return Response(ValidationError, status=HTTP_400_BAD_REQUEST)


#request will contain email(aka username) & password
class Log_in(APIView):

    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get('email')

        #going to authenticate that email&pw are in db --> returns User object
        auth_user = authenticate(username=data.get("username"), password=data.get("password"))
        if auth_user:
            token, created = Token.objects.get_or_create(user = auth_user)
            login(request, auth_user)
            return Response({
                "user": auth_user.first_name, 
                "token": token.key,
            }, status=HTTP_200_OK)
        
        return Response("No user found matching these credentials", status=HTTP_400_BAD_REQUEST)


##class to authenticate user has a valid token/is authenticated
class TokenReq(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]



##testing dont forget to add Authorization header = Token <token>
class Info(TokenReq):
       def get(self, request):
        return Response({
            "user": request.user.first_name
        }, status=HTTP_200_OK) 

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)




 


