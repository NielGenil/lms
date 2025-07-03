from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth.models import Group
# from django.contrib.auth.models import Permission
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['roles'] = [group.name for group in user.groups.all()]


        # token['permissions'] = [perm.name for perm in user.user_permissions.all()]


        # permissions = Permission.objects.filter(user=user) | Permission.objects.filter(group__user=user)
        # token['permissions'] = [perm.name for perm in permissions.distinct()]
        # ...

        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        username = validated_data['first_name']  # Set username to first_name
    
        user = User(**validated_data)
        user.username = username
        user.save()
        return user
    


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']

