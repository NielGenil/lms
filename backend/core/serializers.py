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
    


from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'password_confirm']

    def validate(self, data):
        # Ensure password and password_confirm match
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Passwords must match."})
        return data

    def create(self, validated_data):
        # Remove password_confirm from validated data before creating user
        validated_data.pop('password_confirm', None)
        user = User.objects.create_user(**validated_data)
        return user


