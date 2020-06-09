from rest_framework import serializers
from .models import Chat
from clubs.models import Club
from messsages.models import Message
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

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

class PopulatedMessageSerializer(MessageSerializer):
    user = UserSerializer()

class PopulatedChatSerializer(ChatSerializer):
    club = PopulatedClubSerializer()
    messages = PopulatedMessageSerializer(many=True)


