from rest_framework import serializers
from .models import Message
from chats.models import Chat
from clubs.models import Club
from jwt_auth.serializers import UserDetailSerializer

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('club',)

class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = ('id','members',)

class PopulatedClubSerializer(ClubSerializer):
    members = UserDetailSerializer(many=True)

class PopulatedChatSerializer(ChatSerializer):
    club = PopulatedClubSerializer()

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'


class PopulatedMessageSerializer(MessageSerializer):
    chat = PopulatedChatSerializer()
    user = UserDetailSerializer()

