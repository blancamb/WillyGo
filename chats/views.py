# pylint: disable=no-member, no-self-use

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Chat
from .serializers import ChatSerializer, PopulatedChatSerializer


class ChatListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        chats = Chat.objects.all()
        serialized_chats = PopulatedChatSerializer(chats, many=True)
        return Response(serialized_chats.data, status=status.HTTP_200_OK)


    def post(self, request):
        request.data['club'] = request.user.id
        new_chat = ChatSerializer(data=request.data)
        if new_chat.is_valid():
            new_chat.save()
            return Response(new_chat.data, status=status.HTTP_201_CREATED)
        return Response(new_chat.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class ChatDetailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get_chat(self, pk):
        try:
            return Chat.objects.get(pk=pk)
        except Chat.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        chat = self.get_chat(pk)
        serialized_chat = PopulatedChatSerializer(chat)
        return Response(serialized_chat.data)

    def delete(self, request, pk):
        chat_to_delete = self.get_chat(pk)
        chat_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
