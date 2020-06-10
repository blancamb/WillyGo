from rest_framework import serializers
from .models import Request
from clubs.models import Club
from jwt_auth.serializers import UserDetailSerializer

class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = ('name',)


class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'


class PopulatedRequestSerializer(RequestSerializer):
    sender = UserDetailSerializer()
    recipient = UserDetailSerializer()

