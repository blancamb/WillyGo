from rest_framework import serializers
from .models import Chat
from clubs.models import Club
from jwt_auth.serializers import UserDetailSerializer
from django.contrib.auth import get_user_model
from clubs.serializers import ClubSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')

class PopulatedClubSerializer(ClubSerializer):
    members = UserSerializer(many=True)

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = '__all__'

class PopulatedChatSerializer(ChatSerializer):
    club = PopulatedClubSerializer()


