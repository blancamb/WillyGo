# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Trip
from clubs.models import Club
from .serializers import TripSerializer, PopulatedTripSerializer

class ClubTripsListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        trips = Trip.objects.filter(owner=pk)
        serialized_trips = PopulatedTripSerializer(trips, many=True)
        return Response(serialized_trips.data, status=status.HTTP_200_OK)


class TripsListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        user = self.request.user
        trips = Trip.objects.filter(owner__members__username = user)
        serialized_trips = PopulatedTripSerializer(trips, many=True)
        return Response(serialized_trips.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_trip = TripSerializer(data=request.data)
        if new_trip.is_valid():
            new_trip.save()
            return Response(new_trip.data, status=status.HTTP_201_CREATED)
        return Response(new_trip.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        

class TripDetailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get_trip(self, pk):
        try:
            return Trip.objects.get(pk=pk)
        except Trip.DoesNotExist:
            raise NotFound()
    
    def get(self, _request, pk):
        trip = self.get_trip(pk)
        serialized_trip = PopulatedTripSerializer(trip)
        return Response(serialized_trip.data)

    def put(self, request, pk):
        trip_to_update = self.get_trip(pk)
        updated_trip = TripSerializer(trip_to_update, data=request.data)
        if updated_trip.is_valid():
            updated_trip.save()
            return Response(updated_trip.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_trip.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        trip_to_delete = self.get_trip(pk)
        trip_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)