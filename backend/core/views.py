from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RegisterUserSerializer
from django.shortcuts import render


class UserCreateListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    
# Create your views here.
class RegisterView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer