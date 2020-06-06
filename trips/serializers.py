from rest_framework import serializers
from clubs.models import Club
from .models import Trip


class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = '__all__'

class PopulatedTripSerializer(TripSerializer):
    owner = ClubSerializer()

