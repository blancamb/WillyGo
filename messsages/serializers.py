from rest_framework import serializers
from .models import Message
from chats.models import Chat
from jwt_auth.serializers import UserDetailSerializer

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('club',)

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

class PopulatedMessageSerializer(MessageSerializer):
    chat = ChatSerializer()
    user = UserDetailSerializer()

