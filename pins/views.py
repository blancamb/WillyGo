# pylint: disable=no-member, no-self-use


# ? CHECKED:
# All views working
# Only users can read and write
# GET ALL, GET SINGLE, CREATE -> only users (checked non users)
# UPDATE -> only owner (checked other users, checked non users)
# DELETE -> only owner (checked other users, checked non users)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Pin
from .serializers import PinSerializer, PopulatedPinSerializer


class PinListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        user = self.request.user
        pins = Pin.objects.filter(owner=user)
        serialized_pins = PopulatedPinSerializer(pins, many=True)
        return Response(serialized_pins.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_pin = PinSerializer(data=request.data)
        if new_pin.is_valid():
            new_pin.save()
            return Response(new_pin.data, status=status.HTTP_201_CREATED)
        return Response(new_pin.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TripPinsListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, _request, pk):
        pins = Pin.objects.filter(trips=pk)
        serialized_pins = PopulatedPinSerializer(pins, many=True)
        return Response(serialized_pins.data, status=status.HTTP_200_OK)

class PinDetailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get_pin(self, pk):
        try:
            return Pin.objects.get(pk=pk)
        except Pin.DoesNotExist:
            raise NotFound()

    def is_pin_owner(self, pin, user):
        if pin.owner.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        pin = self.get_pin(pk)
        serialized_pin = PinSerializer(pin)
        return Response(serialized_pin.data)

    def put(self, request, pk):
        pin_to_update = self.get_pin(pk)
        self.is_pin_owner(pin_to_update, request.user)
        request.data['owner'] = request.user.id
        updated_pin = PinSerializer(pin_to_update, data=request.data)
        if updated_pin.is_valid():
            updated_pin.save()
            return Response(updated_pin.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_pin.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        pin_to_delete = self.get_pin(pk)
        self.is_pin_owner(pin_to_delete, request.user)
        pin_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
