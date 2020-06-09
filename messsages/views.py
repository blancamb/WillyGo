# pylint: disable=no-member, no-self-use


# ? CHECKED:
# All views working
# Only users can read and write
# GET ALL, GET SINGLE, CREATE -> only users (checked non users)
# DELETE -> only owner (checked other users, checked non users)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Message
from .serializers import MessageSerializer, PopulatedMessageSerializer

class MessageListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        messages = Message.objects.all()
        serialized_messages = PopulatedMessageSerializer(messages, many=True)
        return Response(serialized_messages.data, status=status.HTTP_200_OK)

    def post(self, request):
        # request.data['user'] = request.user.id
        new_message = MessageSerializer(data=request.data)
        if new_message.is_valid():
            new_message.save()
            return Response(new_message.data, status=status.HTTP_201_CREATED)
        return Response(new_message.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class MessageDetailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get_message(self, pk):
        try:
            return Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            raise NotFound()

    def is_message_owner(self, message, user):
        if message.user.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        message = self.get_message(pk)
        serialized_message = MessageSerializer(message)
        return Response(serialized_message.data)

    def delete(self, request, pk):
        message_to_delete = self.get_message(pk)
        self.is_message_owner(message_to_delete, request.user)
        message_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
