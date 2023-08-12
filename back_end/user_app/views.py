from django.shortcuts import render
from .models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from .serializers import UserSerializer
# TODO: WANT ABILITY DELETE USER?, USER PERMISSIONS VIEW, 

# SIGNUP/SIGNIN/LOGOUT/INFO

# SIGN UP - CREATE AN ACCOUNT & RETURN A 201
class Sign_up(APIView):
    def post(self, request):
        # SET USERNAME TO EMAIL TO CREATE USER & CREATE USER WITH THE DATA
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        # CREATE A NEW TOKEN
        token = Token.objects.create(user=user)
        # RETURN TOKEN AND EMAIL AS RESPONSE
        return Response(
            {"user": {"email": user.email}, "token": token.key},
            status = status.HTTP_201_CREATED
        )
# SIGN IN - AUTHENTICATE & SIGN IN  - RETURN A 200 OR 404/ BUT 400 IS OK TOO   
class Sign_in(APIView):
    def post(self, request):
        # SET USERNAME TO EMAIL TO AUTHENTICATE & AUTHENTICATE WITH DATA PROVIDED
        request.data['username'] = request.data['email']
        user = authenticate(**request.data)
        if user:
            # GET OR CREATE TOKEN FOR USER ONCE AUTHENTICATED & RETURN EMAIL/TOKEN AS RESPONSE
            token, created = Token.objects.get_or_create(user = user)
            return Response({'user': UserSerializer(user).data , 'token': token.key},
                status = status.HTTP_200_OK)
        else:
            # RETURN ERROR RESPONSE IF AUTHENTICATION FAILS
            return Response("No user matching these credentials",
                            status = status.HTTP_400_BAD_REQUEST)
            
# LOG OUT - DELETE USER'S TOKEN & RETURN 204               
class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        # DELETE AUTH TOKEN FOR USER
        request.user.auth_token.delete()
        # RETURN SUCCESS RESPONSE FOR LOGGING OUT
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# INFO - VIEW INFO IF AUTHENTICATED
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        return Response({"user": UserSerializer(user).data})