from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Club
from trips.models import Trip

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ('id', 'name')


class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = '__all__'


class PopulatedClubSerializer(ClubSerializer):
    members = UserSerializer(many=True)
    created_trips = TripSerializer(many=True)
    