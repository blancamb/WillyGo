from rest_framework import serializers
from django.contrib.auth import get_user_model
from clubs.models import Club
from .models import Trip

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')

class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = '__all__'

class PopulatedClubSerializer(ClubSerializer):
    members = UserSerializer(many=True)


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = '__all__'

class PopulatedTripSerializer(TripSerializer):
    owner = PopulatedClubSerializer()

