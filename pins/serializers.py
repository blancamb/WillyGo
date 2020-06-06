from rest_framework import serializers
from .models import Pin
from trips.models import Trip
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ('id', 'name')


class PinSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pin
        fields = '__all__'

class PopulatedPinSerializer(PinSerializer):
    trips = TripSerializer(many=True)
    owner = UserSerializer()

