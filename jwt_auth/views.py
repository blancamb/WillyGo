from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, UserDetailSerializer

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        created_user = UserSerializer(data=request.data)
        if created_user.is_valid():
            created_user.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(created_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied()

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = self.get_user(username)
        if not user.check_password(password):
            raise PermissionDenied()
        dt = datetime.now() + timedelta(days=10) 
        token = jwt.encode({
            'sub': user.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY)
        return Response({'token': token, 'message': f'Hi {user.username}, welcome back!'})




#! DELETE WHEN DEPLOYING? - list of all users   **************

class UserListView(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialized_user = UserDetailSerializer(users, many=True)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
